import { Result } from "@shared/Result";
import { ValueObject } from "@shared/ValueObject";

type Props = {
  address: string;
};

export default class Email extends ValueObject<Props> {
  static create(email: string): Result<Error> | Result<Email> {
    return Result.ok(new Email({ address: email }));
  }
  toString(): string {
    return this.props.get("address") as string;
  }
}
