/**
 * @description
 * Undefinable is a custom type that can be a primitive type or undefined
 */
export type Undefinable<T> = T | undefined;

export const isDefined = <T>(value: Undefinable<T>): value is T =>
  value !== undefined;
export const isNotDefined = <T>(value: Undefinable<T>): value is undefined =>
  value === undefined;
