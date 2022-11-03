import {
    ApolloServerPlugin,
    BaseContext,
    GraphQLFieldResolverParams, GraphQLRequestContextExecutionDidStart, GraphQLRequestContextWillSendResponse, GraphQLRequestExecutionListener, GraphQLRequestListener,
    GraphQLRequestListenerDidResolveField
} from "@apollo/server";
import { Result } from "@shared/Result";
import { gql } from "apollo-server-express";
import Session from "./session";

export default gql`
  scalar Void

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export function wrapResolver(resolver: { Mutation?: Object; Query?: Object }) {
  let resolverWrapped = {};
  for (const resolverKey of ["Mutation", "Query"]) {
    if (resolver?.[resolverKey]) {
      resolverWrapped[resolverKey] = {};
      for (const key of Object.keys(resolver.Mutation)) {
        resolverWrapped[resolverKey][key] = async function (
          parent: unknown,
          args: any,
          context: Session
        ) {
          try {
            const result = await resolver.Mutation[key](parent, args, context);
            if (result instanceof Result) return result.getValue();
          } catch (error) {
            return error;
          }
        };
      }
    }
  }
  return resolverWrapped;
}

class GraphqlExecutionListener
  implements GraphQLRequestExecutionListener<BaseContext>
{
  async executionDidEnd(errors: unknown) {}

  willResolveField(
    fieldResolverParams: GraphQLFieldResolverParams<any, BaseContext>
  ): GraphQLRequestListenerDidResolveField | void {
    const { source, args, contextValue, info } = fieldResolverParams;
    return (error, result) => {
      /* console.log(error); */
    };
  }
}

class GraphqlListener implements GraphQLRequestListener<BaseContext> {
  async willSendResponse(
    requestContext: GraphQLRequestContextWillSendResponse<BaseContext>
  ): Promise<void> {
    const { response } = requestContext;
    if (
      response.body.kind === "single" &&
      "data" in response.body.singleResult
    ) {
      /* const result = response.body.singleResult.data; */
    }
  }

  async executionDidStart(
    requestContext: GraphQLRequestContextExecutionDidStart<BaseContext>
  ): Promise<void | GraphQLRequestExecutionListener<BaseContext>> {
    return new GraphqlExecutionListener();
  }
}

const plugins: ApolloServerPlugin<BaseContext> = {
  async requestDidStart(): Promise<GraphQLRequestListener<BaseContext>> {
    return new GraphqlListener();
  },
};

export { plugins as graphqlPlugins };

export type GraphqlResolver<T, U, V> = (
  parent: T,
  args: U,
  context: Session
) => Promise<Result<V> | Result<Error>>;
