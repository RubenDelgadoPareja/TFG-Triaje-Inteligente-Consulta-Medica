export type Undefinable<T> = T | undefined;

export const isDefined = <T>(value: Undefinable<T>): value is T =>
  value !== undefined;
export const isNotDefined = <T>(value: Undefinable<T>): value is undefined =>
  value === undefined;
