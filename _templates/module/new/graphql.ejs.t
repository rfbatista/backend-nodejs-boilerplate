---
to: src/modules/<%= h.changeCase.snake(name) %>/graphql/index.ts
unless_exists: true
---
import { ModuleContext, GraphqlSchemaHook, GraphqlResolverHook } from '@context/container'
import resolvers from './resolvers'
import schemas from './schemas'


export default async function graphqlRegister({ hooks }: ModuleContext){
  (hooks.get('addGraphqlResolver') as GraphqlResolverHook)(resolvers);
  (hooks.get('addGrapqlSchema') as GraphqlSchemaHook)(schemas);
}
