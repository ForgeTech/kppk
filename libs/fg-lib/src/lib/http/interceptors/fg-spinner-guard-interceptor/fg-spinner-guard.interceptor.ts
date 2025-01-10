import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FgBaseService } from '../../../base/fg-base.service';
import { FgEnvironmentService } from '../../../service/fg-environment/fg-environment.service';
import { NGXLogger } from 'ngx-logger';
import { FgEventService } from '../../../service/fg-event/fg-event.service';
import { FgSpinnerGuardEvent } from '../../../guard/fg-spinner/fg-spinnerguard.event';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class FgSpinnerGuardInterceptor extends FgBaseService implements HttpInterceptor {
  protected $env = inject(FgEnvironmentService);


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.$event.emitEvent(new FgSpinnerGuardEvent(FgSpinnerGuardEvent.START, this));
    return next
      .handle(request)
      .pipe(
        catchError(err => {
          this.$event.emitEvent(new FgSpinnerGuardEvent(FgSpinnerGuardEvent.END, this));
          if (err instanceof HttpErrorResponse) {
            const error = new Error(err.message) as any;
            error.status = err.status;
            throw error;
          }

          return err;
        }),
      )
      .pipe(
        map(evt => {
          if (evt instanceof HttpResponse) {
            this.$event.emitEvent(new FgSpinnerGuardEvent(FgSpinnerGuardEvent.END, this));
          }
          return evt as HttpEvent<any>;
        }),
      );
  }
}
