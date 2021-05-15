export class NotFoundError extends Error {
  text: string;

  constructor(message: string) {
    super();
    this.text = message;
  }
}
