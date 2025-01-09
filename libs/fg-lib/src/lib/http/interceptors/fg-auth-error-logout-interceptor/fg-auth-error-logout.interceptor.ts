import { Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { FgAuthErrorLogoutInterceptorEvent } from './fg-auth-error-logout.interceptor.event';
import { FgEventService } from '../../../service/fg-event/fg-event.service';
import { FgBaseService } from '../../../base/fg-base.service';
import { FgEvent } from '../../../service/fg-event/fg-event.class';
import { StatusCodes } from 'http-status-codes';

const FG_AUTH_ERROR_LOGOUT_INTERCEPTOR_ADDITIONAL_ERROR_CHECK_METHODE_TOKEN = new InjectionToken<(error: Error) => boolean>('');

/**
 * FgAuthErrorLogoutInterceptor -
 * Http-Interceptor that should signal to the application
 * when user sends unauthorized request to a secured endpoint
 */
@Injectable()
export class FgAuthErrorLogoutInterceptor extends FgBaseService implements HttpInterceptor {
  /** CONSTRUCTOR */
  constructor(
    /** (Optional) Provide logger service */
    
    /**  (Optional) Provide event service */
    @Optional() protected override $event: FgEventService
  ) {
    super()
  }
  /**
   * Methode called when http-request ist intercepted - checking if there is and
   * http error/status-code of 401 Unauthorized attached, if so tries to logout-user
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        // console.log('INTERCEPTOR_ERROR');
        // console.log(error);
        if (
          error &&
          (error.status === StatusCodes.UNAUTHORIZED ||
            (error.status === StatusCodes.BAD_REQUEST && error.error === 'invalid_grant'))
          // ||(error.status === StatusCodes.INTERNAL_SERVER_ERROR && error.detail === 'No User found.')
        ) {
          // console.log('DISPATCH_HTTP_AUTH_ERROR');
          this.$event.emitEvent(new FgEvent(FgAuthErrorLogoutInterceptorEvent.HTTP_AUTH_ERROR, this, error));
        }
        // const notification = error.error.message || error.statusText;
        // Rethrow the error-message
        return throwError(error);
      })
    );
  }
}
