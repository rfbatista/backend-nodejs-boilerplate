---
to: src/modules/<%= module %>/use_cases/<%= entity %>/<%= name %>.ts
---
import { Result } from "@core/result";
import { UseCase } from "@core/usecase";

type Input = {}

type Output = {}

export default class <%= name %> implements UseCase<Input, Output>{
    execute(input: Input): Promise<Result<Error> | Result<Output>> {
        throw new Error("Method not implemented.");
    }
}
