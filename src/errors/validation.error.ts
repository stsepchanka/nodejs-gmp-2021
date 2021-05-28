export class ValidationError extends Error {
  details: ValidationDetails;

  constructor(details: ValidationDetails) {
    super();
    this.details = details;
  }
}

export interface ValidationDetails {
  status: string;
  errors: { path: string; message: string }[];
}
