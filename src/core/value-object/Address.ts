import { Result } from "core/result";
import { ValueObject } from "core/value-object";
import { Coordinate } from "./coordinates";

type Props = {
  local?: Coordinate;
  city?: string;
  street?: string;
  postalCode?: string;
  state?: string;
  country?: string;
}

export default class Address extends ValueObject<Props> {
  static create(props: Props){
    return Result.ok(new Address(props))
  }

  get city(): string {
    return this.props.get('city') as 'string'
  }

  get street(): string {
    return this.props.get('street') as 'string'
  }

  get postalCode(): string {
    return this.props.get('postalCode') as 'string'
  }

  get state(): string {
    return this.props.get('state') as 'string'
  }

  get country(): string {
    return this.props.get('country') as 'string'
  }
}


