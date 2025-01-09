/**
 * Constrains a type to an object other than an array.
 */
export type FgObjectButNotArray = object & { length?: never };
