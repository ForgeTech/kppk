import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FgBaseService } from '../../../base/fg-base.service';
import { FgAuthEvent } from '../../../service/fg-auth/fg-auth.event';
import { OAuthStorage } from 'angular-oauth2-oidc';

/**
 * FgTokenInterceptor -
 * This interceptor is used to read a users authentification-token from a
 * cookie and attach it as authentification-header to the intercepted
 * http-request
 */
@Injectable({
  providedIn: 'root',
})
export class FgTokenInterceptor extends FgBaseService implements HttpInterceptor {
  private authStorage = inject(OAuthStorage);

  protected token: string | false = false;
  /** CONSTRUCTOR */
  constructor() {
    super()
    this.subscribe(this.getEventObservable<FgAuthEvent>(FgAuthEvent.AUTHORIZED), event => {
      this.token = event.data?.token ? event.data.token : false;
    });
  }
  /** Interception Methode, that will be called on an Http-Request */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check cookie-storage for user authentification-token
    return of(this.token).pipe(
      map(token => {
        // If token is found, clone request and attach authorization header
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + this.authStorage.getItem('access_token'),
            },
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