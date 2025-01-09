import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import {
  FgAuthAbstractService,
  FgAuthUserInterface,
  FgAuthTokenInterface,
  FG_AUTH_USER_STORAGE_KEY,
  FG_AUTH_TOKEN_STORAGE_KEY,
} from './fg-auth.abstract.service';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgDateTimeService } from '../fg-date-time/fg-date-time.service';
import { FgEvent } from '../../class/fg-event.class';
import { CookieOptions } from 'ngx-cookie';

/**
 * FgVlvAuthService -
 * Service can be used to authenticate a user with the backend-service
 */
@Injectable({
  providedIn: 'root',
})
export class FgVlvAuthService extends FgAuthAbstractService {
  /** Holds the service-url of the  */
  protected SERVICE_URL = 'https://meinvlv.agrardata.at/api/auth/';
  /** CONSTRUCTOR */
  constructor(
    protected $env: FgEnvironmentService,
    protected $log: NGXLogger,
    protected $http: HttpClient,
    protected $router: Router,
    protected $storage: FgStorageService,
    protected $event: FgEventService,
    protected $date: FgDateTimeService
  ) {
    super();
  }
  /**
   * Perform login-request to vlv-authentification
   * @param data The data required to allow the user to login
   * @param ignoreForcePasswortResetRedirect This should only be used when logging in from create/change-password
   * screen when route contains user and password
   */
  public authorize(data: FgAuthUserInterface): Observable<any> {
    const loginResponse$: Subject<any> = new Subject();
    const operation = 'login';
    const request$ = this.$http.post<any>(this.SERVICE_URL + operation, data);
    request$.subscribe(
      (response: FgAuthTokenInterface) => {
        // Set user-authorized token-cookie - this token will be attached
        // to every http-request to authorize it with backend ()
        const options: CookieOptions = {};
        options.expires = this.$date.getCookieExpirationDate('1 day');
        loginResponse$.next(response);
      },
      error => {
        this.$log.error('Authorization for: ', data.username, ' not successful!');
        // this.$event.emit( new FgEvent( this.events.AUTHORIZATION_ERROR, this, error ) );
        loginResponse$.error(error);
      }
    );
    return loginResponse$.asObservable().pipe(take(1));
  }
  /**
   * Methode to update the users password
   * @param data The data required to update user-password
   */
  public changePassword(data: FgAuthUserInterface): Observable<any> {
    const operation = 'setpassword';
    const request$ = this.$http.post<any>(this.SERVICE_URL + operation, data);
    // If user has cached login-data - update set password
    request$.subscribe(response => {
      let user: any = this.$storage.getItem(FG_AUTH_USER_STORAGE_KEY);
      if (user) {
        user = JSON.parse(user);
        user.password = data.password;
        let options: CookieOptions = {};
        options.expires = this.$date.getCookieExpirationDate('1 year');
        this.$storage.setItem(FG_AUTH_USER_STORAGE_KEY, JSON.stringify(user), options);
      }
    });
    return request$;
  }
  /**
   * Methode to reset a users password, triggering an email sent on the server
   * @param data The data required to update user-password
   */
  public resetPassword(data: FgAuthUserInterface): Observable<any> {
    const operation = 'resetpassword';
    let request$ = this.$http.post<any>(this.SERVICE_URL + operation, data);
    // If user has cached login-data - set password to blank
    request$.subscribe(response => {
      let user: any = this.$storage.getItem(FG_AUTH_USER_STORAGE_KEY);
      if (user) {
        user = JSON.parse(user);
        user.password = '';
        let options: CookieOptions = {};
        options.expires = this.$date.getCookieExpirationDate('1 year');
        this.$storage.setItem(FG_AUTH_USER_STORAGE_KEY, JSON.stringify(user), options);
      }
    });
    return request$;
  }
  /**
   * Used to add credentials for a new entity with authentification-privilages to the authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  registerUser(options?: any): Observable<any | false> {
    return of(false);
  }
  /**
   * Returns the Auth-Token Object from cookie-storage if available,
   * false otherwise
   */
  public getStoredAuthData(): Observable<FgAuthTokenInterface | false> {
    return this.$storage
      .getItem(FG_AUTH_TOKEN_STORAGE_KEY)
      .pipe(map((cookie: string) => (cookie ? (JSON.parse(cookie) as FgAuthTokenInterface) : false)));
  }
  /**
   * Used to receive an entities locally stored set of credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public getStoredCredentials(options: any): Observable<FgAuthUserInterface | false> {
    return this.$storage
      .getItem(FG_AUTH_USER_STORAGE_KEY)
      .pipe(map((cookie: string) => (cookie ? (JSON.parse(cookie) as FgAuthUserInterface) : false)));
  }
  /**
   * Performs user-logout by deleting users auth-token
   * cookie
   */
  public logout(): void {
    this.$storage.removeItem(FG_AUTH_TOKEN_STORAGE_KEY);
  }
  /**
   * Used to receive an updated set of authorization-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public refreshAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    return of({
      token: 'cache',
      username: 'test',
      forcePasswordReset: false,
    });
  }
}
