import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FgBaseService } from '../../../base/fg-base.service';
import { FgEnvironmentService } from '../../../service/fg-environment/fg-environment.service';
import { FgHttpErrorResponseEvent } from './fg-http-error-response.event';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class FgHttpErrorResponseInterceptor extends FgBaseService implements HttpInterceptor {
  protected $env = inject(FgEnvironmentService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            this.$event.emitEvent(new FgHttpErrorResponseEvent(FgHttpErrorResponseEvent.HTTP_ERROR_RESPONSE, this, error));
          }
          return error;
        }),
      )
      .pipe(
        map(evt => {
          return evt as HttpEvent<any>;
        }),
      );
  }
}
