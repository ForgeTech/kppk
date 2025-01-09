import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { FgEventService } from '../../service/fg-event/fg-event.service';
import { filter, take, takeUntil } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { FgBaseService } from '../../base/fg-base.service';
import { FgSpinnerGuardEvent } from './fg-spinnerguard.event';

@Injectable({
  providedIn: 'root',
})
export class FgSpinnerGuard extends FgBaseService  {
  /** CONSTRUCTOR */
  constructor(
    public $router: Router,

    @Optional() protected override $log: NGXLogger
  ) {
    super()
  }
  canActivate(): boolean | Observable<boolean> {
    this.initSpinner();
    return true;
  }
  canDeactivate(): boolean | Observable<boolean> {
    this.initSpinner();
    return true;
  }
  protected initSpinner() {
    this.$event.emitEvent(new FgSpinnerGuardEvent(FgSpinnerGuardEvent.START, this));
    this.$router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        take(1),
        takeUntil(this.ON_DESTROY$)
      )
      .subscribe(() => {
        this.emitEvent(new FgSpinnerGuardEvent(FgSpinnerGuardEvent.END, this));
      });
  }
}
