import {
    UniqueIdentifier
} from "@core/domain/value-object/unique-identifier";

export abstract class Entity<Props> {
  readonly id: UniqueIdentifier;
  protected props: Map<keyof Props, Props[keyof Props]>;
  constructor(props: Props, id?: string) {
    const obj = Object.entries(props);
    this.props = new Map(obj) as Map<keyof Props, Props[keyof Props]>;
    this.id = new UniqueIdentifier(id);
  }
}

