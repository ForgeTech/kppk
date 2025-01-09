import { ErrorHandler, Injectable } from '@angular/core';

import { NGXLogger } from 'ngx-logger';

import { Subject, switchMap } from 'rxjs';
import { FgBaseService } from '@kppk/fg-lib';
import { FgEventService } from '@kppk/fg-lib';
import { UserNotificationService, snackTypes } from '@agrardata-pdv-workspace/pdv-shared';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class PdvPublicGlobalError extends FgBaseService implements ErrorHandler {
  protected ERROR$ = new Subject<any>();
  public readonly error$ = this.ERROR$.asObservable();

  constructor(
    protected $notification: UserNotificationService,
    public override $event: FgEventService,
    public override $log: NGXLogger,
    public $translate: TranslocoService,
  ) {
    super($event, $log);
    // this.$translate.langChanges$
    //   .pipe(switchMap(lang => this.$translate.selectTranslation('general'.concat('/', lang))))
    //   .subscribe(translation => {
    //     this.$translate.setTranslation(translation, this.$translate.getActiveLang());
    //   });
  }

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
