import { Result } from "./result";

interface UseCase<Input, Output> {
  execute(input: Input): Promise<Result<Output> | Result<Error>>;
}

export { UseCase };
