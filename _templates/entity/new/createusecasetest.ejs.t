---
to: src/modules/<%= h.changeCase.snake(module) %>/use_cases/__tests__/Create<%= h.changeCase.pascal(name) %>UseCase.unit.test.ts
unless_exists: true
---
import Create<%= h.changeCase.pascal(name) %>UseCase from "@modules/<%= h.changeCase.snake(module) %>/use_cases/Create<%= h.changeCase.pascal(name) %>UseCase";

describe('Create<%= h.changeCase.pascal(name) %>UseCase', () => {
})
