export class ForbiddenError extends Error {
  text: string;

  constructor(message: string) {
    super();
    this.text = message;
  }
}
