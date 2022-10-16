import { Result } from "core/result";
import { ValueObject } from "core/value-object";

type Props = {
  address: string;
};

export default class Email extends ValueObject<Props> {
  static create(email: string) {
    return Result.ok(new Email({ address: email }));
  }
  toString(): string {
    return this.props.get("address") as string;
  }
}
