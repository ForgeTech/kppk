import { FgGlobalServiceInterface } from './fg-global.interface';
import { FgGlobalService } from './fg-global.service';

/**
 * FgNodeGlobalService -
 * provides global-scope for nodejs-environments
 */
export class FgNodeGlobalService extends FgGlobalService implements FgGlobalServiceInterface {
  public isBrowser = false;
  // USE @ts-ignore TO FIX TS2304: Cannot find name 'global'. error
  // READ: https://stackoverflow.com/questions/37355244/ignore-cannot-find-module-error-on-typescript
  nativeGlobal<Node>() {
    return global as Node;
  }
}
