import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { FgOfflineErrorInterceptorEvent } from './fg-offline-error.interceptor.event';
import { FgEventService } from '../../../service/fg-event/fg-event.service';
import { FgEvent } from '../../../service/fg-event/fg-event.class';

/**
 * FgOfflineErrorInterceptor -
 * Http-Interceptor that should signal to the application
 * when there is no connection to the webserver
 */
@Injectable()
export class FgOfflineErrorInterceptor implements HttpInterceptor {
  /** CONSTRUCTOR */
  constructor(private $event: FgEventService, private events: FgOfflineErrorInterceptorEvent, private $log: NGXLogger) {}
  /**
   * Methode called when http-request ist intercepted - checking if there is and
   * http error/status-code of 502 Bad Gateway attached
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error && error.status === 0) {
          this.$event.emitEvent(new FgEvent(this.events.HTTP_OFFLINE, this, error));
        }
        const notification = error.message || error.statusText;
        // Rethrow the error-message
        return throwError(error);
      })
    );
  }
}
