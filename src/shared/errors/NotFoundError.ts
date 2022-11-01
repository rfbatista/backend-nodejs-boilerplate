import BaseError from "@shared/BaseError";
import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends BaseError {
  constructor() {
    super(StatusCodes.NOT_FOUND, "NOT_FOUND");
  }
}
