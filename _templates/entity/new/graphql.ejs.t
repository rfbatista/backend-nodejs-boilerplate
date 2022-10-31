---
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/graphql/<%= h.changeCase.pascal %>.ts
unless_exists: true
---
import Container from "typedi";
import Create<%= h.changeCase.pascal(name) %>UseCase from "@modules/<%= h.changeCase.snake(module) %>/use_cases/Create<%= h.changeCase.pascal(name) %>UseCase";
import Pagination from "@shared/Pagination";
import { gql } from 'apollo-server'

const schemas = gql`
  type <%= h.changeCase.pascal %> {
    id: ID!
  }

  extend type Mutation {
    create<%= h.changeCase.pascal %>(id: ID!): <%= h.changeCase.pascal %>
  }
`;

const resolvers = {
  Mutation: {
    create<%= h.changeCase.pascal %>: async (_: unknown, args: unknown, context: { companyId: string }) => {
      const useCase = Container.get(Create<%= h.changeCase.pascal %>UseCase);
      const result = await useCase.execute({ companyId: context.companyId })
      return result
    },
  },
};

export { resolvers as <%= h.changeCase.pascal %>Resolvers, schemas as <%= h.changeCase.pascal %>Schemas };
