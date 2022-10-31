---
inject: true
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/graphql/index.ts
after: import { h.changeCase.snakeContext } from "@context/container";
---
import { <%= h.changeCase.pascal %>Schemas, <%= h.changeCase.pascal %>Resolvers } from "./<%= h.changeCase.pascal %>";

