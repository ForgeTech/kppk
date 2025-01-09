import { ErrorHandler, Injectable, inject } from '@angular/core';

import { NGXLogger } from 'ngx-logger';

import { Subject } from 'rxjs';
import { FgBaseService } from '@kppk/fg-lib';
import { FgEventService } from '@kppk/fg-lib';
import { FgUserNotificationService, snackTypes } from './fg-user-notification.service';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class FgGlobalError extends FgBaseService implements ErrorHandler {
  protected $notification = inject(FgUserNotificationService);
  $translate = inject(TranslocoService);

  protected ERROR$ = new Subject<any>();
  public readonly error$ = this.ERROR$.asObservable();

  handleError(error: any) {
    this.$log.error('Error from global error handler');
    // console.log(error);
    if (!error) return;
    if (error.errors && error.errors.ErrorMessages && error.errors.ErrorMessages.length > 0) return;

    if (
      // Ignore following errors
      // @TODO Should only exist during development - hide for
      // presentation
      error.message !== 'Service workers are disabled or not supported by this browser'
    ) {
      let mBbody: string = '';
      //unselect event in whiteboard fires (minor)error - dont show to UI
      const tempDrawError = mBbody.includes('this.tempDraw');
      if (!tempDrawError) {
        this.$notification.notify({
          header: 'general.message.global_error',
          body: mBbody,
          snackType: snackTypes.Error,
        });
      }
    }
    this.ERROR$.next(error);
  }
}
