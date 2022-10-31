---
to: src/modules/<%= h.changeCase.snake(name) %>/graphql/schemas.ts
unless_exists: true
---
import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
  }

  extend type Mutation {
  }
`
