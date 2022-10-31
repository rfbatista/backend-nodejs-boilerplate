import BaseError from "@shared/BaseError";

export class InvalidEmailError extends BaseError {
  constructor() {
    super("A1", "email invalido");
  }
}
