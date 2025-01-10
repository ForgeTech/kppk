import { Injectable, inject } from '@angular/core';
import {
  FgAuthChangePasswordInterface,
  FgAuthTokenInterface,
  FgAuthUserInterface,
  FG_AUTH_CREDENTIALS_STORAGE_KEY,
  FG_AUTH_TOKEN_STORAGE_KEY,
} from './fg-auth.abstract.service';
import { map, Observable, of } from 'rxjs';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { FgAuthAbstractService } from './fg-auth.abstract.service';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgStorageNgxCookieService } from '../fg-storage/fg-storage-ngx-cookie.service';

/**
 * FgAuthService -
 * Service can be used to authenticate a user with the backend-service
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthService extends FgAuthAbstractService<
  FgAuthUserInterface,
  FgAuthTokenInterface,
  FgAuthChangePasswordInterface
> {
  protected $cookie = inject(FgStorageNgxCookieService);
  protected $storage = inject(FgStorageService);
  protected $env = inject(FgEnvironmentService, { optional: true });

  /** Holds user credentials if provided by environment file */
  protected credentials: FgAuthUserInterface | false = false;
  /** Holds user token if provided by environment file */
  protected token: FgAuthTokenInterface | false = false;
  /** CONSTRUCTOR */
  constructor() {
    super()
    // super($cookie, $storage, $event, $log );
    if (this?.$env?.development?.enabled && this?.$env?.development?.authorize) {
      this.credentials = this.$env.development.authorize.credentials;
    }
    if (this?.$env?.development?.enabled && this.$env.development.authorize?.token) {
      this.token = this.$env.development.authorize.token;
    }
    if (this?.$env?.production === false) {
      const warning =
        'WARNING: FgAuthService: is only a Mock-Service and should be' +
        'overriden by using DI to provide the applications actual implementation';
      this?.$log ? this.$log.warn(warning) : console.log(warning);
    }
    // this.$log.fatal('AUTH_SERVICE')
    // this.credentials$.subscribe( result => {
    //   this.$log.fatal('CREDENTIALS');
    //   this.$log.fatal( result )
    // })
    // this.isAuthorized$.subscribe( result => {
    //   this.$log.fatal('IS_AUTHORIZED');
    //   this.$log.fatal( result )
    // })
  }
  /**
   * Used to check if entity can be authenticated by authentification-service using passed credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _authorize(options: FgAuthUserInterface): Observable<false | FgAuthTokenInterface> {
    if (this.token) {
      const obs$ = this.$cookie.setItem<FgAuthTokenInterface>(FG_AUTH_TOKEN_STORAGE_KEY, this.token);
      obs$.subscribe(result => {
        this.$storage.setItem(FG_AUTH_CREDENTIALS_STORAGE_KEY, this.credentials);
      });
      return obs$;
    }
    return of(false);
  }
  /**
   * Used to update/change the password of an authenticated entity
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _changePassword(options?: any): Observable<any | false> {
    return of(false);
  }
  /**
   * Used in cases of lost credentials to reset an unauthorized entities password to a value specified by authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _resetPassword(options?: any): Observable<any | false> {
    return of(false);
  }
  /**
   * Used to add credentials for a new entity with authentification-privilages to the authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _registerUser(options?: any): Observable<any | false> {
    return of(false);
  }
  /**
   * Used to receive an entities locally stored set of credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _getStoredCredentials(cache: boolean = true): Observable<FgAuthUserInterface | false> {
    if (cache) {
      return this.$storage.getItem<FgAuthUserInterface>(FG_AUTH_CREDENTIALS_STORAGE_KEY);
    } else {
      return this.$storage.removeItem(FG_AUTH_CREDENTIALS_STORAGE_KEY).pipe(map(() => false));
    }
  }
  /**
   * Used to receive an entities locally stored set of authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _getStoredAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    return this.$cookie.getItem<FgAuthTokenInterface>(FG_AUTH_TOKEN_STORAGE_KEY);
  }
  /**
   * Used to invalidate/remove an entites current authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _logout(options?: any): void {
    this.$cookie.removeItem(FG_AUTH_TOKEN_STORAGE_KEY);
  }
  /**
   * Used to receive an updated set of authorization-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _refreshAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    return this.getStoredAuthData();
  }
}
