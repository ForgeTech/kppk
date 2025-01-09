/** FgGlobalService -
 * Abstact Service-class to extend by environment implementation
 */
export abstract class FgGlobalService {
  abstract isBrowser: boolean;
  abstract nativeGlobal<T>(): T;
}
