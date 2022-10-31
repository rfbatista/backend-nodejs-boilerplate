import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeModule } from '@context/container';
import { errorHanlder } from '@infrastructure/middlewares/error-handler';
import { notFoundHanlder } from '@infrastructure/middlewares/not-found-hanlder';
import { requestId } from '@infrastructure/middlewares/request-Id';
import { resultHanlder } from '@infrastructure/middlewares/result-handler';
import cors from 'cors';

async function getGraphQlMiddlewareServer(schemas: any, resolvers: any): Promise<express.RequestHandler> {
  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers: resolvers,
  });
  // Note you must call `server.start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  return expressMiddleware(server)
}
const server = makeModule(
  'server',
  async ({ onReady, logger, registerHook, config: { http } }): Promise<void> => {
    const serverExpress: Express = express();
    const apiRouter = Router();

    serverExpress
      .use(requestId())
      .use(cors())
      .use(json({ limit: '50mb' }))
      .use(morgan(`[:date[clf]] :method :url :status :res[content-length] - :response-time ms`))
      .use(helmet())
      .use(json({ limit: '1mb' }))
      .use(urlencoded({ extended: true }))
      .use('/api', apiRouter)
      .use(notFoundHanlder)
      .use(errorHanlder)
      .use(resultHanlder);

    const resolvers = []
    const schemas = []

    const addResolver = (resolver: any) => resolvers.push(resolver);
    const addSchema = (schema: any) => schemas.push(schema)

    onReady(
      async () =>
        new Promise(async (resolve) => {
          const graphqlMiddlware = await getGraphQlMiddlewareServer(schemas, resolvers);
          graphqlRouter.use(graphqlMiddlware)
          serverExpress.listen(http.port, () => {
            logger.info(`Webserver listening at: http://${http.host}:${http.port}`);
            resolve();
          });
        }),
    );

    registerHook('apiRouter', apiRouter)
    registerHook('addGrapqlSchema', addSchema)
    registerHook('addGraphqlResolver', addResolver)

  },
);

export { server };
