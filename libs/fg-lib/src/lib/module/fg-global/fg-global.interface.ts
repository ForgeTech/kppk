/**
 * FgGlobalServiceInterface - Methods to be implemented by fg-global-service
 */
export interface FgGlobalServiceInterface {
  isBrowser: boolean;
  nativeGlobal<T>(): T;
}
