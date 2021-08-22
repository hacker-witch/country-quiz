import { ApplicationError } from "./applicationError";

export class UnexpectedError extends ApplicationError {
  constructor() {
    super(
      "There was an unexpected error. Please, try accessing this page again later."
    );
  }
}
