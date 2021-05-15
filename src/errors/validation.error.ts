import { StatusCodes } from "http-status-codes";

export class ValidationError extends Error {
  status: StatusCodes;
  details: ValidationDetails;

  constructor(details: ValidationDetails) {
    super();
    this.status = StatusCodes.BAD_REQUEST;
    this.details = details;
  }
}

export interface ValidationDetails {
  status: string;
  errors: { path: string; message: string }[];
}
