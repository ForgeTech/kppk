// NOTE: See stackoverflow thread
// https://stackoverflow.com/questions/41879327/deepreadonly-object-typescript
// for further information on implementation

/**
 * Type for Immutable primitives - by definition these types are immutable as they
 * are not refered by reference but by value
 */
type FgImmutablePrimitive = undefined | null | boolean | string | number | Function;

/**
 * Type recursicly applying immutable types to all child properties
 * of a type requiring them
 */
export type FgImmutable<T> = T extends FgImmutablePrimitive
  ? T
  : T extends Array<infer U>
  ? FgImmutableArray<U>
  : T extends Map<infer K, infer V>
  ? FgImmutableMap<K, V>
  : T extends Set<infer M>
  ? FgImmutableSet<M>
  : FgImmutableObject<T>;
/** Type for immutable array */
export type FgImmutableArray<T> = ReadonlyArray<FgImmutable<T>>;
/** Type for immutable map */
export type FgImmutableMap<K, V> = ReadonlyMap<FgImmutable<K>, FgImmutable<V>>;
/** Type for immutable set */
export type FgImmutableSet<T> = ReadonlySet<FgImmutable<T>>;
/** Type for immutable object */
export type FgImmutableObject<T> = { readonly [K in keyof T]: FgImmutable<T[K]> };
