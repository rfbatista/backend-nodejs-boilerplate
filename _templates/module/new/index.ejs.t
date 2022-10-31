---
to: src/modules/<%= h.changeCase.snake(name) %>/index.ts
unless_exists: true
---
import { makeModule } from '@context/container';
import graphqlRegister from '@modules/<%= h.changeCase.snake(name) %>/graphql';

const <%=  h.changeCase.camel(name) %>Module = makeModule('<%=  h.changeCase.lower(name) %>', async ({ build }): Promise<void> => {
  await build(graphqlRegister)
})

export default <%=  h.changeCase.camel(name) %>Module

