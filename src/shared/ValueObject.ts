export abstract class ValueObject<Props> {
  protected props: Map<keyof Props, Props[keyof Props]>;
  constructor(props: Props) {
    const obj = Object.entries(props);
    this.props = new Map(obj) as Map<keyof Props, Props[keyof Props]>;
  }
}
