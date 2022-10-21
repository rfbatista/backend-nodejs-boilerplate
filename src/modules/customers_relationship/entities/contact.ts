import Address from "@core/value-object/Address";
import Email from "@core/value-object/Email";
import { Entity } from "core/entity";
import { Result } from "core/result";

type Props = {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  email?: Email;
  address?: Address;
  phone?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export default class Contact extends Entity<Props> {
  static create(props: Props, id?: any) {
    return Result.ok(new Contact(props, id));
  }
  get firstName(): string {
    return this.props.get("firstName") as string;
  }
  get jobTitle(): string {
    return this.props.get("jobTitle") as string;
  }
  get phone(): string {
    return this.props.get("phone") as string;
  }
  get notes(): string {
    return this.props.get("notes") as string;
  }
  get lastName(): string {
    return this.props.get("lastName") as string;
  }
  get email(): Email {
    return this.props.get("email") as Email;
  }
  get address(): Address {
    return this.props.get("address") as Address;
  }
  get createdAt(): Date {
    return this.props.get("createdAt") as Date;
  }
  get updatedAt(): Date {
    return this.props.get("updatedAt") as Date;
  }
  get deletedAt(): Date {
    return this.props.get("deletedAt") as Date;
  }
  toDto() {
    return this.props;
  }
  updateProps(props: Partial<Props>) {
    for (const key of Object.keys(props)) {
      this.props.set(key as keyof Props, props[key]);
    }
  }
}
