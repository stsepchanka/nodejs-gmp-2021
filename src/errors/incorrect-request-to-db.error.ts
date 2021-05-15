import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class IncorrectRequestToDBError extends Error {
  status: StatusCodes;
  text: string;

  constructor(message: string) {
    super();
    this.status = StatusCodes.BAD_REQUEST;
    this.text = `${getReasonPhrase(this.status)}: ${message}`;
  }
}
