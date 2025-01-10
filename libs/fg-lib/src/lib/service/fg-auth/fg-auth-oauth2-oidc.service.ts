import { catchError, map, shareReplay, switchMap, takeUntil, tap, throttleTime } from 'rxjs/operators';
import {
  FgAuthAbstractService,
  FgAuthChangePasswordInterface,
  FgAuthTokenInterface,
  FgAuthUserInterface,
} from './fg-auth.abstract.service';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { FgTimeStringService } from '../fg-timestring/fg-timestring.service';
import { Injectable, inject } from '@angular/core';
import { from, merge, Observable, of } from 'rxjs';
import { AuthConfig, OAuthService, AUTH_CONFIG, OAuthErrorEvent } from 'angular-oauth2-oidc';

export const FG_AUTH_LOCAL_USER_PROFILE = 'fg-auth-local-user-profile';

export interface FgAuthLocalCredentialsInterface {
  profile: any;
  sharedSalt: string;
  token: string;
  userSalt: string;
}
/**
 * FgAuthOAuth2OIDCService -
 *
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthOAuth2OIDCService extends FgAuthAbstractService<
  FgAuthUserInterface,
  FgAuthTokenInterface,
  FgAuthChangePasswordInterface
> {
  protected $time = inject(FgTimeStringService);
  protected $oauth2 = inject(OAuthService);
  protected $storage = inject(FgStorageService);
  protected $env = inject(FgEnvironmentService, { optional: true });

  protected refreshIsSetup: boolean = false;
  /** CONSTRUCTOR */
  constructor() {
    const authConfig = inject<AuthConfig>(AUTH_CONFIG);

    super()
    if (!authConfig) {
      this.$log.error('ERROR: FgAuthOAuth2OIDCService: No AUTH_CONFIG token provided for configuration!');
    } else {
      this.$oauth2.configure(authConfig);
    }
    this.IS_AUTHORIZED$.pipe(takeUntil(this.ON_DESTROY$)).subscribe(value => {
      if (value) {
        this.$oauth2.setupAutomaticSilentRefresh();
        this.refreshIsSetup = true;
      } else {
        this.$oauth2.stopAutomaticRefresh();
        this.refreshIsSetup = false;
      }
    });

    const accesstoken$ = from(this.$oauth2.refreshToken()).pipe(
      catchError(error => of(false)),
      map(result => this.$oauth2.hasValidAccessToken()),
      switchMap(valid => {
        return valid ? this.getStoredAuthData() : of(false);
      })
    );
    const hasValidAccessToken$ = merge(
      accesstoken$
      // this.$oauth2.events.pipe(
      //   // filter( event => {
      //   //   return event.type !== 'token_received' && event.type !== 'token_refreshed'
      //   // }),
      //   switchMap(value => {
      //     return accesstoken$;
      //   })
      // )
    );

    this.subscribe(hasValidAccessToken$, hasValidAccessToken => {
      // console.log( '>>>>>>>>>>>>>HAS_VALID_ACCESS_TOKEN' );
      // console.log( hasValidAccessToken )
      this.IS_AUTHORIZED$.next(hasValidAccessToken as false | FgAuthTokenInterface);
    });

    // this.$oauth2.events.pipe(

    // ).subscribe( event => {
    //   console.log('>>>>>>>>>>>>>>>>>>>>AUTH_EVENT');
    //   console.log( event );
    // })

    this.subscribe(this.$oauth2.events, event => {
      if (event instanceof OAuthErrorEvent) {
        this.$log.error('ERROR: FgAuthOAuth2OIDCService: angular-oauth2-oidc published error-event');
        this.$log.error(event);
        this.logout();
      } else {
        this.$log.warn('WARNING: FgAuthOAuth2OIDCService: angular-oauth2-oidc published error-event');
        this.$log.warn(event);
      }
      // if( event.type === )
      // this.IS_AUTHORIZED$.next(false);
    });
  }

  /**
   * Used to check if entity can be authenticated by authentification-service using passed credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _authorize(options: FgAuthUserInterface): Observable<FgAuthTokenInterface | false> {
    const authorize$: Observable<FgAuthTokenInterface | false> = from(
      // this.$oauth2.fetchTokenUsingPasswordFlow(options.username, options.password)
      this.$oauth2.fetchTokenUsingGrant('password', options)
    ).pipe(
      map(result => {
        if (result) {
          const token = {
            username: '',
            token: result.access_token,
            forcePasswordChange: false,
            // profile: result.profile,
          };
          return token;
        } else {
          return false;
        }
      }),
      tap(values => {
        this.IS_AUTHORIZED$.next(values);
      }),
      shareReplay(1)
    );
    return authorize$;
  }
  /**
   * Used to update/change the password of an authenticated entity
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _changePassword(options?: any): Observable<any | false> {
    this.$log.error(`ERROR: FgAuthOauth2OICDService doesn't support changePassword-methode!`);
    return of(false);
  }
  /**
   * Used in cases of lost credentials to reset an users password to a value specified by authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _resetPassword(options?: any): Observable<any | false> {
    this.$log.error(`ERROR: FgAuthOauth2OICDService doesn't support resetPassword-methode!`);
    return of(false);
  }
  /**
   * Used to add credentials for a new entity with authentification-privilages to the authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _registerUser(options?: any): Observable<any | false> {
    this.$log.error(`ERROR: FgAuthOauth2OICDService doesn't support registerUser-methode!`);
    return of(false);
  }
  /**
   * Used to receive an entities locally stored set of credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _getStoredCredentials(options?: any): Observable<FgAuthUserInterface | false> {
    return of(false);
  }
  /**
   * Used to receive an entities locally stored set of authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _getStoredAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    const storedAuthData = this.$oauth2.getAccessToken();
    // console.log('>>>>GET_STORED_AUTH_DATA');
    // console.log(this.$oauth2.getAccessToken());
    // const expires = new Date(0);
    // expires.setUTCMilliseconds(this.$oauth2.getAccessTokenExpiration());
    // console.log(expires.toLocaleTimeString());
    // let claims = this.$oauth2.getIdentityClaims();
    // if (claims) {
    //   console.log(claims);
    //   console.log('GIVEN_NAME', claims['given_name']);
    // }
    const getStoredAuthData = of(storedAuthData).pipe(
      map(token => {
        let result: FgAuthTokenInterface | false;
        if (token) {
          result = {
            username: '',
            token,
            forcePasswordChange: false,
          };
        } else {
          result = false;
        }
        return result;
      }),
      shareReplay(1)
    );
    return getStoredAuthData;
  }
  /**
   * Used to invalidate/remove an entites current authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _logout(options?: any): void {
    // console.log('>>>>AUTH_LOGOUT');
    this.$oauth2.logOut();
    this.IS_AUTHORIZED$.next(false);
  }
  /**
   * Used to receive an updated set of authorization-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected _refreshAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    // console.log('>>>>AUTH_REFRESH');
    // let path: string;
    const refreshToken$ = from(this.$oauth2.refreshToken()).pipe(
      map(result => {
        if (result) {
          const token = {
            username: '',
            token: result.access_token,
            forcePasswordChange: false,
            // profile: result.profile,
          };
          return token;
        } else {
          return false;
        }
      }),
      shareReplay(1)
    );
    return refreshToken$;
  }
}
