---
to: src/modules/<%= h.changeCase.snake(name) %>/graphql/resolvers.ts
unless_exists: true
---
import Container from 'typedi'
import { GraphqlResolver } from "@infrastructure/graphql";

interface Resolvers {
  Query: {
  },

  Mutation: {
  }
}

const resolvers: Resolvers = {
  Query: {
  },
  Mutation: {
  },
};

export default resolvers
