---
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/use_cases/<%= entity %>/<%= h.changeCase.pascal %>.ts
---
import { Result } from "@shared/Result";
import { UseCase } from "@shared/usecase";

type Input = {}

type Output = {}

export default class <%= h.changeCase.pascal %> implements UseCase<Input, Output>{
    execute(input: Input): Promise<Result<Error> | Result<Output>> {
        throw new Error("Method not implemented.");
    }
}
