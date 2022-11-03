export default class BaseError extends Error {
  code: string;
  details?: string;
  httpCode: string;
  constructor(code, message, details?, httpCode?) {
    super(message);
    this.code = code;
    this.httpCode = httpCode || code;
    this.details = details;
  }
}
