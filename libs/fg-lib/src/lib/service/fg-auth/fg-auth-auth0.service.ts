import { Observable, of, from, throwError, Subject } from 'rxjs';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { FgAuthAbstractService, FgAuthTokenInterface, FgAuthUserInterface } from './fg-auth.abstract.service';
import createAuth0Client from '@auth0/auth0-spa-js';
import { Auth0Client, Auth0ClientOptions, RedirectLoginResult, RedirectLoginOptions } from '@auth0/auth0-spa-js/';
import { shareReplay, catchError, concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { Location } from '@angular/common';
import { NGXLogger } from 'ngx-logger';

/** Inject-Token Provider for auth0 public-key */
export const CONFIG_AUTH_AUTH0_SPA_JS_CLIENT_OPTIONS = new InjectionToken<Auth0ClientOptions>('');

/** Storage-key used to place in-app url in localstorage before auth-redirect  */
export const STORAGE_KEY_AUTH0_SPA_REDIRECT_URL = 'fg-auth0-spa-redirect-url';

/**
 * FgAuthService -
 * Abstract class to be extended by services providing user-authentification and
 * other common authentification-features
 */
@Injectable({
  providedIn: 'root',
})
export class FgAuthAuth0Service extends FgAuthAbstractService {
  /** Holds auth0-client after successful initialization */
  protected AUTH0_CLIENT$: Observable<Auth0Client>;
  /** Holds auth0-client options from $env or injector */
  protected AUTH0_CLIENT_OPTIONS: Auth0ClientOptions;
  /** Streams user-authentification state - user if authenticated / false if not */
  protected AUTHENTICATED$: Observable<any | false>;
  /** Holds user authentification-state */
  protected AUTHENTICATED: any | false;
  /** Holds user authentification-state */
  protected CALLBACK$: Observable<RedirectLoginResult>;
  /** Streams current user-profile */
  protected USER_PROFILE$: Subject<any> = new Subject();
  /** CONSTRUCTOR */
  constructor(
    public $router: Router,
    public $storage: FgStorageService,
    public $location: Location,
    /**
     * Provide value for CONFIG_AUTH_AUTH0_SPA_JS_CLIENT_OPTIONS vie angular DI
     * CAUTION! This value overrides values from envirement-service
     */
    @Inject(CONFIG_AUTH_AUTH0_SPA_JS_CLIENT_OPTIONS) protected configAuth0SpaJsClientOptions: Auth0ClientOptions,
  
  ) {
    super()
    // Set auth0 client-options for auth0 authentification service
    this.AUTH0_CLIENT_OPTIONS = configAuth0SpaJsClientOptions;
    // Initialize Auth0Client-Observable
    this.AUTH0_CLIENT$ = (from(createAuth0Client(this.AUTH0_CLIENT_OPTIONS)) as Observable<Auth0Client>).pipe(
      catchError(err => throwError(err)),
      shareReplay(1)
    );
    // Define observables for SDK methods that return promises by default
    // For each Auth0 SDK method, first ensure the client instance is ready
    // concatMap: Using the client instance, call SDK method; SDK returns a promise
    // from: Convert that resulting promise into an observable
    this.AUTHENTICATED$ = this.AUTH0_CLIENT$.pipe(
      concatMap((client: Auth0Client) => from(client.isAuthenticated())),
      tap(res => (this.AUTHENTICATED = res)),
      // switchMap( res => res === false
      //   ? of( false )
      //   : this.AUTH0_CLIENT$.pipe(
      //     map( ( client: Auth0Client ) => from( client.getUser() ) )
      // )),
      shareReplay(1)
    );
    this.isAuthorized$ = this.AUTHENTICATED$;
    this.CALLBACK$ = this.AUTH0_CLIENT$.pipe(
      concatMap((client: Auth0Client) => from(client.handleRedirectCallback())),
      shareReplay(1)
    );
    this.CALLBACK$.subscribe((result: RedirectLoginResult) => {
      console.log('CALLBACK RESULT');
      console.table(result);
    });
    // Handle redirect from Auth0 login
    // this.handleAuthCallback();
    // TODO: Call local-auth-setup on initialization
    // this.localAuthSetup();
  }
  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  // getUser$( options? ): Observable<any> {
  //   return this.AUTH0_CLIENT$.pipe(
  //     concatMap( ( client: Auth0Client ) => from( client.getUser( options) ) ),
  //     tap( user => this.USER_PROFILE$.next( user ) )
  //   );
  // }
  // TODO: Implement local application
  // private localAuthSetup(): Observable<any | false> {

  // }
  /**
   *
   */
  // private handleAuthCallback() {
  //   console.log( 'AUTH0 HANDLE CALLBACK' );
  //   // Call when app reloads after user logs in with Auth0
  //   console.log( this.$location.path )
  //   const params = window.location.search;
  //   if ( params.includes('code=') && params.includes('state=')) {
  //     let targetRoute: string; // Path to redirect to after login processsed
  //     const authComplete$ = this.CALLBACK$.pipe(
  //       // Have client, now call method to handle auth callback redirect
  //       tap(cbRes => {
  //         // Get and set target redirect route from callback results
  //         targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
  //       }),
  //       concatMap(() => {
  //         // Redirect callback complete; get user and login status
  //         return combineLatest([
  //           // this.getUser$(),
  //           this.AUTHENTICATED$
  //         ]);
  //       })
  //     );
  //     // Subscribe to authentication completion observable
  //     // Response will be an array of user and login status
  //     authComplete$.subscribe( ( [ /*user,*/ loggedIn ] ) => {
  //       console.log( 'AUTH0 AUTHORIZATTION COMPLETE' );
  //       // console.table( user );
  //       console.table( loggedIn );
  //       // Redirect to target route after callback processing
  //       // this.router.navigate( [ targetRoute ] );
  //     } );
  //   }
  // }
  /**
   * Used to check if entity can be authenticated by authentification-service using passed credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public authorize(options?: RedirectLoginOptions | false): Observable<any | false> {
    let OPTIONS: RedirectLoginOptions = {
      redirect_uri: this.AUTH0_CLIENT_OPTIONS.redirect_uri,
      appState: { target: this.$location.path },
      ui_locales: 'de',
    };
    if (options) {
      OPTIONS = Object.assign(OPTIONS, options);
    }
    // Ensure Auth0 client instance exists
    this.AUTHENTICATED$.subscribe(isAuthenticated => {
      console.log('AUTH0_AUTHENTICATED?');
      console.table(isAuthenticated);
      if (isAuthenticated === false) {
        // Store current path for later redirect within the application
        // this.$storage.setItem( STORAGE_KEY_AUTH0_SPA_REDIRECT_URL, window.location.pathname ).subscribe( done => {
        this.AUTH0_CLIENT$.subscribe(client => {
          console.log('AUTH0_NOT_AUTHENTICATED!');
          // A desired redirect path can be passed to login method
          // (e.g., from a route guard)
          // Call method to log in
          client.loginWithRedirect(OPTIONS);
        });
        // });
      } else {
        console.log('AUTH0_IS_AUTHENTICATED!');
      }
    });
    return this.AUTHENTICATED$;
  }
  /**
   * Used to update/change the password of an authenticated entity
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public changePassword(options?: any): Observable<any | false> {
    return of(false);
  }
  /**
   * Used in cases of lost credentials to reset an unauthorized entities password to a value specified by authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public resetPassword(options?: any): Observable<any | false> {
    return of(false);
  }
  /**
   * Used to add credentials for a new entity with authentification-privilages to the authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public registerUser(options?: any): Observable<any | false> {
    return of(false);
  }
  /**
   * Used to receive an entities locally stored set of credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public getStoredCredentials(options?: any): Observable<FgAuthUserInterface | false> {
    return of(false);
  }
  /**
   * Used to receive an entities locally stored set of authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public getStoredAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    return of(false);
  }
  /**
   * Used to invalidate/remove an entites current authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public logout(options?: any): void {
    // Ensure Auth0 client instance exists
    this.AUTH0_CLIENT$.subscribe((client: Auth0Client) => {
      // Call method to logout-user from auth0-service
      client.logout({
        client_id: this.AUTH0_CLIENT_OPTIONS.client_id,
        returnTo: this.AUTH0_CLIENT_OPTIONS.redirect_uri,
      });
    });
  }
  /**
   * Used to receive an updated set of authorization-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  public refreshAuthData(options?: any): Observable<FgAuthTokenInterface | false> {
    return of(false);
  }
}
