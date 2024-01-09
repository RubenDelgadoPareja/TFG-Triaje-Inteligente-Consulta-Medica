import { IncError } from './inc.error';

export class FallbackError extends IncError {
  constructor() {
    super('Fallback error');
    Object.setPrototypeOf(this, FallbackError.prototype);
  }
}
