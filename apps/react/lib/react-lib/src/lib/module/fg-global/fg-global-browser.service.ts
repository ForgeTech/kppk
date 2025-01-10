import { FgGlobalService } from './fg-global.service';
import { FgGlobalServiceInterface } from './fg-global.interface';

/** FgBrowserGlobalService - provides global-scope for browser-environments */
export class FgBrowserGlobalService extends FgGlobalService implements FgGlobalServiceInterface {
  public isBrowser = true;
  // USE @ts-ignore TO FIX TS2304: Cannot find name 'window'. error
  // READ: https://stackoverflow.com/questions/37355244/ignore-cannot-find-module-error-on-typescript
  // @ts-ignore
  public nativeGlobal<Window>() {
    return window as Window;
  }
}
