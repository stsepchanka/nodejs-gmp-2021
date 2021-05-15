export class IncorrectRequestToDBError extends Error {
  text: string;

  constructor(message: string) {
    super();
    this.text = message;
  }
}
