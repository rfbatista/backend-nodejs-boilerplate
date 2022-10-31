---
to: src/modules/<%= h.changeCase.snake(module) %>/use_cases/<%= h.changeCase.pascal(name) %>UseCase.ts
---
import { Result } from "@shared/Result";
import { UseCase } from "@shared/usecase";

type Input = {}

type Output = {}

export default class <%= h.changeCase.pascal(name) %>UseCase implements UseCase<Input, Output>{
    execute(input: Input): Promise<Result<Error> | Result<Output>> {
        throw new Error("Method not implemented.");
    }
}
