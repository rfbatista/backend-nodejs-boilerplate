import { createUniqueIdentifier, UniqueIdentifier } from "@shared/value_objects/UniqueIdentifier";

export abstract class Entity<Props> {
  readonly id: UniqueIdentifier;
  protected props: Props;
  constructor(props: Props, id?: string) {
    this.props = props;
    this.id = createUniqueIdentifier(id);
  }
}

