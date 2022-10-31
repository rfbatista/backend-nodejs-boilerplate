---
to: src/h.changeCase.snakes/<%= h.changeCase.snake %>/use_cases/Create<%= camel %>UseCase.ts
unless_exists: true
---
import { Result } from "@shared/Result";
import { UseCase } from "@shared/usecase";
import <%= h.changeCase.pascal(name) %>, { <%= h.changeCase.pascal(name) %>Dto } from "@modules/<%= h.changeCase.snake(module) %>/entities/<%=  h.changeCase.pascal(name) %>";
import <%=  h.changeCase.pascal(name) %>Repository from "@h.changeCase.snakes/<%= h.changeCase.snake(module) %>/repositories/<%= h.changeCase.pascal(name) %>Repository";
import { Service } from "typedi";

type Input = {
  companyId: string;
};

type Output = <%=  h.changeCase.pascal(name) %>Dto;

@Service()
export default class Create<%=  h.changeCase.pascal(name) %>UseCase implements UseCase<Input, Output> {

  constructor(private <%=  h.changeCase.pascal(name) %>Repository: <%=  h.changeCase.pascal(name) %>Repository) {}

  async execute(input: Input): Promise<Result<Error> | Result<Output>> {
    const <%=  h.changeCase.camel(name) %>OrError = <%=  h.changeCase.pascal(name) %>.create({
      companyId: input.companyId
    });
    if(<%= h.changeCase.camel(name) %>OrError.isFailure){
      return Result.fail(new Error()) as Result<Error>;
    }
    try {
      const <%= h.changeCase.camel(name) %> = await this.<%=  h.changeCase.pascal(name) %>Repository.save(<%=  h.changeCase.camel(h.changeCase.pascal) %>OrError.getValue())
      return Result.ok(<%=  h.changeCase.camel(name) %>.toDto())
    } catch(error) {
      return Result.fail(error) as Result<Error>
    }
  }

}
