import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FgBaseService } from '../../../base/fg-base.service';
import { FgEnvironmentService } from '../../../service/fg-environment/fg-environment.service';

/**
 * FgHttpHeaderInterceptor -
 * This interceptor is used to attach custom environment headers
 * to outgoing http-request
 */
@Injectable({
  providedIn: 'root',
})
export class FgHttpHeaderInterceptor extends FgBaseService implements HttpInterceptor {
  protected $env = inject(FgEnvironmentService);
  /** Interception Methode, that will be called on an Http-Request */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check cookie-storage for user authentification-token
    return of(request).pipe(
      map(request => {
        // Set http headers from api section
        if (this.$env?.request?.httpHeaders) {
          this.$env.request.httpHeaders.forEach(entry => {
            request = request.clone({
              headers: request.headers.set(entry.header, entry.value),
            });
          });
        }

        // Set http headers from development section
        if (this.$env?.development?.enabled === true && this.$env?.development?.httpHeaders) {
          if (this.$env?.request?.httpHeaders) {
            this.$env.development.httpHeaders.forEach(entry => {
              request = request.clone({
                headers: request.headers.set(entry.header, entry.value),
              });
            });
          }
        }

        // If no content-type header set, attach content-type 'application/json'
        // if (!request.headers.has('Content-Type')) {
        //   request = request.clone({
        //     headers: request.headers.set('Content-type', 'application/json'),
        //   });
        // }
        // If no accept header set, attach content-type 'application/json'
        if (!request.headers.has('Accept')) {
          request = request.clone({
            headers: request.headers.set('Accept', 'application/json'),
          });
        }
        // Prevent mime-sniffing for older browsers
        // https://www.keycdn.com/support/what-is-mime-sniffing
        if (!request.headers.has('X-Content-Type-Options')) {
          request = request.clone({
            headers: request.headers.set('X-Content-Type-Options', 'nosniff'),
          });
        }
        return request;
      }),
      switchMap((req: HttpRequest<any>) =>
        next.handle(req).pipe(
          map((event: HttpEvent<any>) => {
            return event;
          })
        )
      )
    );
  }
}
