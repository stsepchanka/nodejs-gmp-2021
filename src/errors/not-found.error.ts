import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  status: StatusCodes;
  text: string;

  constructor(message: string) {
    super();
    this.status = StatusCodes.NOT_FOUND;
    this.text = `${getReasonPhrase(this.status)}: ${message}`;
  }
}
