import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FgBaseService } from '../../../base/fg-base.service';
import { FgEnvironmentService } from '../../../service/fg-environment/fg-environment.service';

/**
 * FgUrlOverridesInterceptor -
 * This interceptor is used to override the url segments of the
 * current request allow to redirect request based on the environment
 */
@Injectable({
  providedIn: 'root',
})
export class FgUrlOverridesInterceptor extends FgBaseService implements HttpInterceptor {
  protected $env = inject(FgEnvironmentService);
  /** Interception Methode, that will be called on an Http-Request */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check cookie-storage for user authentification-token
    return of(request).pipe(
      map(request => {
        let overridenRequest;
        if (this.$env.request?.urlOverrides) {
          this.$env.request?.urlOverrides.forEach(override => {
            if (request.url.indexOf(override.match) !== -1) {
              this?.$log.info(request);
              overridenRequest = request.clone({
                url: request.url.replace(override.match, override.replace),
              });
              this?.$log.info(
                'INFO: FgUrlOverridesInterceptor: Original request to: ',
                request.url,
                ' has been overwritten to: ',
                overridenRequest.url
              );
              this?.$log.info(overridenRequest);
            }
          });
        }
        return overridenRequest || request;
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
