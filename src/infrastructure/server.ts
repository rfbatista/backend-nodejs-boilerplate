import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeModule } from "@context/container";
import { errorHanlder } from "@infrastructure/middlewares/error-handler";
import { notFoundHanlder } from "@infrastructure/middlewares/not-found-hanlder";
import { requestId } from "@infrastructure/middlewares/request-Id";
import { resultHanlder } from "@infrastructure/middlewares/result-handler";
import cors from "cors";
import express, { json, Router, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import RootSchema, { graphqlPlugins, wrapResolver } from "./graphql";
import { Void } from "./graphql/customTypes";

async function getGraphQlMiddlewareServer(
  schemas: any,
  resolvers: any
): Promise<express.RequestHandler> {
  const server = new ApolloServer({
    typeDefs: [RootSchema, ...schemas],
    resolvers: [ { Void }, resolvers ],
    plugins: [graphqlPlugins],
    formatError: (formattedError, error: any) => {
      return formattedError
    },
  });
  // Note you must call `server.start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  return expressMiddleware(server);
}
const server = makeModule(
  "server",
  async ({
    onReady,
    logger,
    registerHook,
    onDisposing,
    config: { http },
  }): Promise<void> => {
    const serverExpress = express();
    const apiRouter = Router();
    const graphqlRouter = Router();

    serverExpress
      .use(requestId())
      .use(cors())
      .use(
        morgan(
          `[:date[clf]] :method :url :status :res[content-length] - :response-time ms`
        )
      )
      .use(helmet())
      .use(json())
      .use(urlencoded({ extended: true }))
      .use("/api", apiRouter)
      .use("/graphql", graphqlRouter)
      .use(notFoundHanlder)
      .use(errorHanlder)
      .use(resultHanlder);

    const resolvers = [];
    const schemas = [];

    const addResolver = (resolver: any) => resolvers.push(wrapResolver(resolver));
    const addSchema = (schema: any) => schemas.push(schema);

    onReady(async () => {
      const graphqlMiddlware = await getGraphQlMiddlewareServer(
        schemas,
        resolvers
      );
      graphqlRouter.use(graphqlMiddlware);
      const server = serverExpress.listen(http.port, () => {
        logger.info(`Webserver listening at: http://${http.host}:${http.port}`);
      });
      onDisposing(async () => {
        logger.info("closing server");
        server.close();
        logger.info("server closed");
      });
    });

    registerHook("apiRouter", apiRouter);
    registerHook("addGrapqlSchema", addSchema);
    registerHook("addGraphqlResolver", addResolver);
  }
);

export { server };
