export abstract class IncError {
  protected constructor(public message: string) {
    Object.setPrototypeOf(this, IncError.prototype);
  }
}
