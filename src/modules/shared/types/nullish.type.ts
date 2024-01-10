import { Nullable } from './nullable.type';
import { Undefinable } from './undefinable.type';

/**
 * @description
 * Nullish is a custom type that can be a primitive type or null or undefined
 */
export type Nullish<T> = Undefinable<T> | Nullable<T>;
export const isNullish = <T>(value: T): value is NonNullable<T> =>
  value === null || value === undefined;
export const isNotNullish = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;
