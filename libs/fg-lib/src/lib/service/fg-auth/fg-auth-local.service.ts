import { catchError, delay, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CookieOptions } from 'ngx-cookie';
import { FgAuthLocalPayloadInterface } from './fg-auth-local-payload.interface';
import {
  FgAuthAbstractService,
  FgAuthChangePasswordInterface,
  FgAuthTokenInterface,
  FgAuthUserInterface,
  FG_AUTH_TOKEN_STORAGE_KEY,
  FG_AUTH_CREDENTIALS_STORAGE_KEY,
} from './fg-auth.abstract.service';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { FgTimeStringService } from '../fg-timestring/fg-timestring.service';
import { HmacSHA256 } from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import Base64 from 'crypto-js/enc-base64';
import { FgStorageNgxCookieService } from '../fg-storage/fg-storage-ngx-cookie.service';

export const FG_AUTH_LOCAL_USER_PROFILE = 'fg-auth-local-user-profile';

export interface FgAuthLocalCredentialsInterface {
  profile: any;
  sharedSalt: string;
  token: string;
  userSalt: string;
}
/**
 * FgAuthLocalService -
 * Service used to simulate backend-authentification by locally
 * checking authorization against user-credential files generated
 * by auth-lcoal nodejs script.
 *
 * It works by importing a generated
 * salt.json file used to encode passed username/password, then tries
 * to find and find a user-credential json-file with generated hash
 * as filename.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthLocalService extends FgAuthAbstractService<
  FgAuthUserInterface,
  FgAuthTokenInterface,
  FgAuthChangePasswordInterface
> {
  /** PATH TO auth local files */
  protected PATH = './assets/auth-local/users/';
  /** PATH TO auth local key files */
  protected KEY_PATH = './assets/auth-local/key/';
  /** Property used to stream */
  protected SALT$: Observable<string>;

  /** CONSTRUCTOR */
  constructor(
    protected $time: FgTimeStringService,
    /** Provide http-client service */
    protected $http: HttpClient,
    /** Provide storage service */
    protected $cookie: FgStorageNgxCookieService,
    /** Provide storage service */
    protected $storage: FgStorageService,
    // protected override $cookie: FgStorageNgxCookieService,
    // /** Provide storage service */
    // protected override $storage: FgStorageService,    
    /** (Optional) Provide envirement service */
    @Optional() protected $env: FgEnvironmentService
  ) {
    super()
    // super($cookie, $storage, $event, $log );

    this.SALT$ = this.$http.get(this.KEY_PATH + 'salt.json').pipe(
      map((result: any) => result.publicSalt.toString()),
      shareReplay(1)
    );
  }

  /** Greate a base64 encoded hash that can be used as path/filename/url */
  protected createHashValidForPathUrl(toHash: string, salt: string): string {
    return Base64.stringify(HmacSHA256(toHash, salt)).split('+').join('-').split('/').join('_');
  }
  /**
   * Used to check if entity can be authenticated by authentification-service using passed credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _authorize(options: FgAuthUserInterface): Observable<FgAuthTokenInterface> {
    const authorize$ = this.SALT$.pipe(
      switchMap(salt => {
        const filename = this.createHashValidForPathUrl(options.username + options.password, salt) + '.json';
        return this.$http.get<FgAuthLocalPayloadInterface>(this.PATH + filename);
      }),
      tap(result => {
        // If option cache is active and no error occured this
        // are valid credentials and should be stored
        if (options.cache) {
          this.$storage.setItem(FG_AUTH_CREDENTIALS_STORAGE_KEY, options);
        }
        // Store payload object using payload profile-email as key
        this.$storage.setItem(FG_AUTH_LOCAL_USER_PROFILE, result);
      }),
      map((result: FgAuthLocalPayloadInterface) => {
        const authToken = {
          username: result.profile.email,
          forcePasswordChange: false,
          token: result.token,
          profile: result.profile,
        };
        const options: CookieOptions = {
          expires: this.$time.getCookieExpirationDate(result.profile.cookieLifeTime),
        };
        return { authToken, options };
      }),
      tap(values => {
        // Store payload object using payload profile-email as key
        this.$cookie.setItem(FG_AUTH_TOKEN_STORAGE_KEY, values.authToken, values.options);
      }),
      map(values => values.authToken)
    );
    return authorize$;
  }
  /**
   * Used to update/change the password of an authenticated entity
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _changePassword(options?: any): Observable<any | false> {
    this.$log.error(`ERROR: FgAuthLocalService doesn't support changePassword-methode!`);
    return of(false).pipe(delay(this.$time.transform('2s')));
  }
  /**
   * Used in cases of lost credentials to reset an users password to a value specified by authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _resetPassword(options?: any): Observable<any | false> {
    this.$log.error(`ERROR: FgAuthLocalService doesn't support resetPassword-methode!`);
    return of(false).pipe(delay(this.$time.transform('2s')));
  }
  /**
   * Used to add credentials for a new entity with authentification-privilages to the authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _registerUser(options?: any): Observable<any | false> {
    this.$log.error(`ERROR: FgAuthLocalService doesn't support registerUser-methode!`);
    return of(false).pipe(delay(this.$time.transform('2s')));
  }
  /**
   * Used to receive an entities locally stored set of credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _getStoredCredentials(options?: any): Observable<FgAuthUserInterface | false> {
    return this.$storage
      .getItem(FG_AUTH_CREDENTIALS_STORAGE_KEY)
      .pipe(map(result => (result ? (result as FgAuthUserInterface) : false)));
  }
  /**
   * Used to receive an entities locally stored set of authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _getStoredAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    const getStoredAuthData$ = this.$cookie
      .getItem(FG_AUTH_TOKEN_STORAGE_KEY)
      .pipe(map(result => (result ? (result as FgAuthTokenInterface) : false)));
    return getStoredAuthData$;
  }
  /**
   * Used to invalidate/remove an entites current authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _logout(options?: any): void {
    this.$cookie.removeItem(FG_AUTH_TOKEN_STORAGE_KEY);
    this.$storage.removeItem(FG_AUTH_LOCAL_USER_PROFILE);
  }
  /**
   * Used to receive an updated set of authorization-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _refreshAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    let path: string;
    return this._getStoredAuthData().pipe(
      switchMap((payload: any) => {
        path = this.PATH + payload.token + '.json';
        return this.$http.get(path) as Observable<FgAuthLocalPayloadInterface>;
      }),
      catchError(() => {
        this.$log.debug('WARNING: FgAuthLocalService METHODE: refreshAuthData - failed for path: ' + path);
        return of(false) as Observable<false>;
      }),
      map(result => {
        if (result !== false) {
          const token = {
            username: result.profile.email,
            token: result.token,
            forcePasswordChange: false,
            profile: result.profile,
          };
          return token;
        } else {
          return result;
        }
      })
    );
  }
}
