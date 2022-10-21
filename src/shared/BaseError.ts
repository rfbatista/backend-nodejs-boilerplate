export default class BaseError extends Error {
  code: string;
  httpCode: string;
  constructor(code, message, httpCode?) {
    super(message);
  }
}
