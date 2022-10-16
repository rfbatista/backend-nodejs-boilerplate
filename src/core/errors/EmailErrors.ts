import BaseError from "@core/BaseError";
export class InvalidEmailError extends BaseError {
  constructor() {
    super("A1", "email invalido");
  }
}
