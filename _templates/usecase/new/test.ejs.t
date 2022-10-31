---
to: src/modules/<%= h.changeCase.snake(module) %>/use_cases/__tests__/<%= h.changeCase.pascal(name) %>UseCase.unit.test.ts
unless_exists: true
---
import <%= h.changeCase.pascal(name) %>UseCase from "@modules/<%= h.changeCase.snake(module) %>/use_cases/<%= h.changeCase.pascal(name) %>UseCase";

describe('<%= h.changeCase.pascal(name) %>UseCase', () => {
})
