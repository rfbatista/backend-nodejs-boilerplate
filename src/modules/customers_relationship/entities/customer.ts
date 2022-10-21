import AggregateRoot from "core/aggregate-root";
import IdentityCard from "../value-object/identity-document";
import Contact from "./contact";

type Props = {
  name: string;
  identityDocument?: IdentityCard;
  contacts?: Contact[]
}

export default class Customer extends AggregateRoot<Props>{}
