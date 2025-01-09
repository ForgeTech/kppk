import { BehaviorSubject, combineLatest, Observable, shareReplay, Subject, take } from 'rxjs';
import { FgBaseService } from '../../base/fg-base.service';
import { Injectable, Optional } from '@angular/core';
import { FgEventService } from '../fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FgAuthEvent } from './fg-auth.event';

/** Key used for setting the cookie containing user-login data */
export const FG_AUTH_CREDENTIALS_STORAGE_KEY = 'fg-auth-user';

/** Defines the key used for storing the authentification-token in browser-storage */
export const FG_AUTH_TOKEN_STORAGE_KEY = 'fg-auth-token';

/** Interface for defining user-login data */
export interface FgAuthUserInterface {
  id?: number;
  username: string;
  password: string;
  token?: string;
  cache: boolean;
}

/** Interface for defining user-login data */
export interface FgAuthChangePasswordInterface {
  id?: number;
  username: string;
  password: string;
  passwordRepeat: boolean;
}

/** Interface for the auth-token object, received from server */
export interface FgAuthTokenInterface {
  username: string;
  token: string | false;
  forcePasswordChange: boolean;
}

/**
 * FgAuthAbstractService -
 * Abstract class to be extended by services providing user-authentification and
 * other common authentification-features
 */
@Injectable({
  providedIn: 'root',
})
export abstract class FgAuthAbstractService<
  CREDENTIALS extends FgAuthUserInterface,
  AUTHTOKEN extends FgAuthTokenInterface,
  CHANGE_USER extends FgAuthChangePasswordInterface
> extends FgBaseService {
  /** Streams the users current authentification status */
  protected CREDENTIALS$ = new Subject<CREDENTIALS | false>();
  /** Allows access to users current authenification status */
  public credentials$ = this.CREDENTIALS$.asObservable().pipe(shareReplay(1));
  /** Streams the users current authentification status */
  protected IS_AUTHORIZED$ = new Subject<AUTHTOKEN | false>();
  /** Allows access to users current authenification status */
  public isAuthorized$ = this.IS_AUTHORIZED$.asObservable().pipe(shareReplay(1));
  /** CONSTRUCTOR */
  constructor() {
    super()
  }
  /**
   * Initialize authentification service
   */
  public initialize() {
    // Attempt user authorization on receiving event
    this.subscribe(this.getEventObservable(FgAuthEvent.AUTHORIZE), event => {
      this.authorize(event.data as CREDENTIALS);
    });
    // Set IS_AUTHORIZED$ observable on receiving event
    this.subscribe(this.getEventObservable(FgAuthEvent.AUTHORIZED), event => {
      const authtoken = event.data as AUTHTOKEN;
      if (this.validateAuthToken(authtoken)) {
        this.IS_AUTHORIZED$.next(authtoken);
      } else {
        this.IS_AUTHORIZED$.next(false);
      }
    });
    // Check if auth- and credential-data is available
    // and set internals accordingly
    combineLatest([this.getStoredAuthData(), this.getStoredCredentials()]).subscribe(values => {
      const [authtoken, credentials] = values;
      this.IS_AUTHORIZED$.next(authtoken);
      this.CREDENTIALS$.next(credentials);
    });
  }
  /** (OVERRIDE IF REQUIRED ) Methode allowing for additional check on the auth token for validaty */
  protected validateAuthToken(token: AUTHTOKEN | false): boolean {
    return token ? true : false;
  }
  /** (OVERRIDE IF REQUIRED ) Methode allowing for additional check on the auth token for validaty */
  protected dispatchAuthorizationEvents(authToken$: Observable<AUTHTOKEN | false>, credentials?: CREDENTIALS): void {
    if (credentials) {
      this.CREDENTIALS$.next(credentials);
    }
    authToken$.pipe(take(1)).subscribe(
      token => {
        if (this.validateAuthToken(token)) {
          this.emitEvent(new FgAuthEvent(FgAuthEvent.AUTHORIZED, this, token));
        } else {
          const error = new Error('ERROR: FgAuthService: Authorization failed!');
          error.name = 'authorization-failed';
          this.emitEvent(new FgAuthEvent(FgAuthEvent.AUTHORIZATION_ERROR, this, error));
        }
      },
      error => {
        this.emitEvent(new FgAuthEvent(FgAuthEvent.AUTHORIZATION_ERROR, this, error));
      }
    );
  }
  /**
   * Used to check if entity can be authenticated by authentification-service using passed credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public authorize(options: CREDENTIALS): Observable<AUTHTOKEN | false> {
    const obs$ = this._authorize(options);
    // this.$log.fatal('FG_ABSTRACT: authorize');
    this.dispatchAuthorizationEvents(obs$, options);
    return obs$;
  }
  /**
   * Used to update/change the password of an authenticated entity
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public changePassword(options: CHANGE_USER): Observable<CREDENTIALS | false> {
    const obs$ = this._changePassword(options);
    obs$.subscribe(credentials => {
      if (credentials) {
        this.authorize(credentials);
      } else {
        const error = new Error('ERROR: FgAuthService: Authorization rejected!');
        error.name = 'passwordChangeFailed';
        this.emitEvent(new FgAuthEvent(FgAuthEvent.AUTHORIZATION_ERROR, this, error));
      }
    });
    return obs$;
  }
  /**
   * Used in cases of lost credentials to reset an unauthorized entities password to a value specified by authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public resetPassword(username: string): Observable<boolean> {
    const obs$ = this._resetPassword(username);
    obs$.subscribe(credentials => {
      if (credentials) {
        this.emitEvent(new FgAuthEvent(FgAuthEvent.PASSWORD_RESET_SUCCESS, this, true));
      } else {
        const error = new Error('ERROR: FgAuthService: Reset Password failed!');
        error.name = 'resetPasswordFailed';
        this.emitEvent(new FgAuthEvent(FgAuthEvent.AUTHORIZATION_ERROR, this, error));
      }
    });
    return obs$;
  }
  /**
   * Used to add credentials for a new entity with authentification-privilages to the authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public registerUser(options: CHANGE_USER): Observable<AUTHTOKEN | false> {
    const obs$ = this._registerUser(options);
    return obs$;
  }
  /**
   * Used to receive an entities locally stored set of credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public getStoredCredentials(cache: boolean = true): Observable<CREDENTIALS | false> {
    const obs$ = this._getStoredCredentials(cache);
    obs$.subscribe(credentials => {
      this.CREDENTIALS$.next(credentials);
    });
    return obs$;
  }
  /**
   * Used to receive an entities locally stored set of authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public getStoredAuthData(): Observable<AUTHTOKEN | false> {
    const obs$ = this._getStoredAuthData();
    return obs$;
  }
  /**
   * Used to invalidate/remove an entites current authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public logout(): void {
    this._logout();
  }
  /**
   * Used to receive an updated set of authorization-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public refreshAuthData(options?: AUTHTOKEN): Observable<AUTHTOKEN | false> {
    const obs$ = this._refreshAuthData(options);
    this.$log.fatal('FG_ABSTRACT: refreshAuthData');
    this.dispatchAuthorizationEvents(obs$);
    return obs$;
  }
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _authorize(options: CREDENTIALS): Observable<AUTHTOKEN | false>;
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _changePassword(options: CHANGE_USER): Observable<CREDENTIALS | false>;
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _resetPassword(username: string): Observable<boolean>;
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _registerUser(options: CHANGE_USER): Observable<AUTHTOKEN | false>;
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _getStoredCredentials(cache: boolean): Observable<CREDENTIALS | false>;
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _getStoredAuthData(): Observable<AUTHTOKEN | false>;
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _logout(): void;
  /**
   * IMPLEMTATION according to specific auth environment
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  protected abstract _refreshAuthData(options?: AUTHTOKEN): Observable<AUTHTOKEN | false>;
}
