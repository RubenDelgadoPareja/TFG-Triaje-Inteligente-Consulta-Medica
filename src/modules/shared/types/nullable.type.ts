/**
 * @description
 * Nullable is a custom type that can be a primitive type or null
 */
export type Nullable<T> = T | null;
/**
 * @description
 * NonNullable is a custom type that can be a primitive type and not null
 */
export type NonNullable<T> = Exclude<T, null>;

export const isNullable = <T>(value: Nullable<T>): value is null =>
  value === null;
export const isNotNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null;
