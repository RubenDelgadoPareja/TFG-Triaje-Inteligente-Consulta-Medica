import { Nullable } from './nullable.type';
import { Undefinable } from './undefinable.type';

export type Nullish<T> = Undefinable<T> | Nullable<T>;
export const isNullish = <T>(value: T): value is NonNullable<T> =>
  value === null || value === undefined;
export const isNotNullish = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;
