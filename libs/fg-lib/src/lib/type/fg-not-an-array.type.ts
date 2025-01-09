/**
 * Constrains a type to something other than an array.
 */
export type FgNotAnArray = (object | string | bigint | number | boolean) & { length?: never };
