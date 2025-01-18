import { ErrorHandler, Injectable } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';

export const ERROR_KPPK_GLOBAL_MSG ='FATAL ERROR: Unhandeled error cought by global \'KppkGlobalError\' handler!';

@Injectable({
  providedIn: 'root',
})
export class KppkGlobalError extends FgBaseService implements ErrorHandler {
  handleError(error: Error) {
    this.$log?.fatal( ERROR_KPPK_GLOBAL_MSG );
    this.$log?.fatal( error );
  }
}
