---
inject: true
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/graphql/index.ts
after: export default async function graphqlRegister
---
  (hooks.get('addGraphqlResolver') as GraphqlResolverHook)(<%= h.changeCase.pascal %>Resolvers);
  (hooks.get('addGrapqlSchema') as GraphqlSchemaHook)(<%= h.changeCase.pascal %>Schemas);
