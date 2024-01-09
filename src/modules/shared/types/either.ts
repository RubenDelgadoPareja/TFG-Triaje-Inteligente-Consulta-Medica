import { Nullable } from './nullable.type';

type Left<T> = { kind: 'left'; leftValue: T };
type Right<T> = { kind: 'right'; rightValue: T };

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) {}

  isLeft(): boolean {
    return this.value.kind === 'left';
  }

  isRight(): boolean {
    return this.value.kind === 'right';
  }

  get left(): Nullable<L> {
    switch (this.value.kind) {
      case 'left':
        return this.value.leftValue;
      default:
        return null;
    }
  }

  get right(): Nullable<R> {
    switch (this.value.kind) {
      case 'right':
        return this.value.rightValue;
      default:
        return null;
    }
  }

  static Left<L, R>(value: L): Either<L, R> {
    return new Either<L, R>({ kind: 'left', leftValue: value });
  }

  static Right<L, R>(value: R): Either<L, R> {
    return new Either<L, R>({ kind: 'right', rightValue: value });
  }
}
