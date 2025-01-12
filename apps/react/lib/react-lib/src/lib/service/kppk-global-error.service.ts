import { ErrorHandler, Injectable } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';

@Injectable({
  providedIn: 'root',
})
export class KppkGlobalError extends FgBaseService implements ErrorHandler {
  handleError(error: any) {
    this.$log.fatal('Error from global error handler');
    this.$log.fatal( error );
  }
}
