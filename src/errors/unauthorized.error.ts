export class UnauthorizedError extends Error {
  text: string;

  constructor(message: string) {
    super();
    this.text = message;
  }
}
