import { ApplicationError } from "./applicationError";

export class NetworkError extends ApplicationError {
  constructor() {
    super(
      "There was a network error. Please, try accessing this page again later."
    );
  }
}
