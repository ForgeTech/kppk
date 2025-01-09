import { Injectable, Optional } from '@angular/core';
import { Subject, BehaviorSubject, Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router, Route } from '@angular/router';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgNavigateBackEvent } from './fg-navigate-back.event';
import { FgStorageService } from '../fg-storage/fg-storage.service';
import { FgEvent } from '../fg-event/fg-event.class';
import { FgBaseService } from '../../base';
import { NGXLogger } from 'ngx-logger';

/** Key used to persist back-navigation history to cookie */
export const BACK_NAVIGATION_KEY: string = 'back_navigation_history_cookie';

/**
 * FgNavigateBackService -
 * Service to allow the navigation to return to previous active-route
 */
@Injectable({
  providedIn: 'root',
})
export class FgNavigateBackService extends FgBaseService {
  /** Holds possible default-route - that is used if there is no previous route-available, if false
   * defaults to reloading the current-page */
  public navigationBackDefaultRoute: string | undefined;
  /** Holds currently active url */
  protected ACTIVE_ROUTE_URL = '';
  /** Holds subscribtion to navigate-back event */
  protected NAVIGATE_BACK_SUBSCRIPTION: Subscription | undefined;
  /** Holds subscription to  */
  protected LISTEN_TO_BACK_NAVIGATION_SUBSCRIBTION: Subscription | undefined;
  /** This subject is used to dispatch changes to the route-params */
  protected PREVIOUS_ROUTES: string[] = [];
  /** Clone and return array of backnavigation-routes */
  get previousRoutes(): string[] {
    return [...this.PREVIOUS_ROUTES];
  }
  /** Allows setting new backnavigation-routes */
  set previousRoutes(backnavigationRoutes: string[]) {
    this.PREVIOUS_ROUTES = backnavigationRoutes;
  }
  public dispatchTriggeredEventInsteadOfNavigation = false;
  /** Flags if navigating-back is currently possible */
  protected NAVIGATION_BACK_AVAILABLE = false;
  /** Flags if navigating-back is currently possible */
  public navigationBackAvailable$ = new BehaviorSubject(this.NAVIGATION_BACK_AVAILABLE);
  /** CONSTRUCTOR */
  constructor(
    public $router: Router,
    /** Provides reference to storage service */
    public $storage: FgStorageService,
  ) {
    super()
    // Check if there is a valid navigation-back cookie set, use it to continue
    // previous naviate-back history
    this.$storage.getItem(BACK_NAVIGATION_KEY).subscribe(history => {
      if (history instanceof Array) {
        this.PREVIOUS_ROUTES = history;
      }
    });
  }
  /** Allows setting a function receiving a route and returning 'true' if it should be ignored
   * form backtracking-history, or 'fasle' if it should be added
   */
  public ignoreRoutesFromBackNavigation: (route: NavigationEnd) => boolean = (route: NavigationEnd) => {
    return false;
  };
  /** Methode allows to call and perform the back-navigation directly from service */
  public performBackNavigation(): void {
    const navigationTargetUrl: string | false = this.getNavigateBackTarget();
    let targetUrl: string | false = false;
    if (navigationTargetUrl !== false) {
      targetUrl = navigationTargetUrl;
    } else if (this.navigationBackDefaultRoute) {
      // console.log( this.navigationBackDefaultRoute );
      targetUrl = this.navigationBackDefaultRoute;
    }
    if (targetUrl !== false) {
      if (this.dispatchTriggeredEventInsteadOfNavigation === false) {
        this.$router.navigate([targetUrl]);
      } else {
        this.emitEvent(new FgEvent(FgNavigateBackEvent.TRIGGERED, this, targetUrl));
      }
    }
  }
  /** Start back-navigation tracking */
  public startBackNavigationTracking(): void {
    // Register to history-update and activated-route event to enable/disable navigation-back
    this.NAVIGATE_BACK_SUBSCRIPTION = this.$router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.ACTIVE_ROUTE_URL = this.$router.url.replace('/', '');
        this.setNavigationBackTarget(event);
        // console.log( 'PREVIOUS ROUTE ');
        // console.table( this._previousRoutes );
        // If history contains at least two navigationEndEvents - the initial and the second-navigation
        if (this.PREVIOUS_ROUTES.length > 1 || this.allowDefaultNavigationTarget()) {
          this.NAVIGATION_BACK_AVAILABLE = true;
        } else {
          this.NAVIGATION_BACK_AVAILABLE = false;
        }
        this.navigationBackAvailable$.next(this.NAVIGATION_BACK_AVAILABLE);
      });
    // Subscribe to navigation-back event to allow back-navigation to be triggered from components
    // without direct refernce to navigate-back service
    this.LISTEN_TO_BACK_NAVIGATION_SUBSCRIBTION = this.$event.event$
      .pipe(filter(event => event.signature === FgNavigateBackEvent.BACK))
      .subscribe(event => {
        this.performBackNavigation();
      });
  }
  /** Stop back-navigation tracking*/
  public stopBackNavigationTracking(): void {
    if (this.LISTEN_TO_BACK_NAVIGATION_SUBSCRIBTION) {
      this.LISTEN_TO_BACK_NAVIGATION_SUBSCRIBTION.unsubscribe();
      this.LISTEN_TO_BACK_NAVIGATION_SUBSCRIBTION = undefined;
    }
    if (this.NAVIGATE_BACK_SUBSCRIPTION) {
      this.NAVIGATE_BACK_SUBSCRIPTION.unsubscribe();
      this.NAVIGATE_BACK_SUBSCRIPTION = undefined;
      this.PREVIOUS_ROUTES = [];
    }
  }
  /** Allows removing last navigation-item from backnavigation-history stack */
  public removeLastBackNavigationHistoryItem(): void {
    this.getNavigateBackTarget();
    this.$storage.setItem(BACK_NAVIGATION_KEY, this.PREVIOUS_ROUTES);
  }
  /** Methode clears back-navigation history */
  public resetBackNavigationHistory(): Observable<unknown> {
    this.PREVIOUS_ROUTES = [];
    return this.$storage.removeItem(BACK_NAVIGATION_KEY);
  }
  /** Methode checking if default-navigation should be allowed */
  protected allowDefaultNavigationTarget(): boolean {
    let allowNavigation = true;
    let found: Route[] | false = false;
    // Only check if default-route is set
    if (this.navigationBackDefaultRoute) {
      // Check elements in router-config for active url
      found = this.$router.config.filter(route => {
        return route.path === this.ACTIVE_ROUTE_URL || route.redirectTo === this.ACTIVE_ROUTE_URL;
      });
      // Check if found routes are matching default-route, if so
      // don't allow default-navigation
      for (let i = 0; i < found.length; i++) {
        const route: Route = found[i];
        if (route.path === this.navigationBackDefaultRoute || route.redirectTo === this.navigationBackDefaultRoute) {
          allowNavigation = false;
          break;
        }
      }
    } else {
      allowNavigation = false;
    }
    return allowNavigation;
  }
  /** Methode to add passed NavigationEnd-Event to navigate back-history */
  protected setNavigationBackTarget(event: NavigationEnd): void {
    let ignoreBecauseDublicate = false;
    // Check if event refers to the same path as the last added, if so - ignore
    // and dont't add it to history
    if (this.PREVIOUS_ROUTES.length > 0) {
      const lastNavigationEndUrl: string = this.PREVIOUS_ROUTES[0];
      if (
        event.url === lastNavigationEndUrl ||
        event.url === lastNavigationEndUrl ||
        event.urlAfterRedirects === lastNavigationEndUrl ||
        event.urlAfterRedirects === lastNavigationEndUrl
      ) {
        ignoreBecauseDublicate = true;
      }
    }
    // If received navigation shouldn't be ignored add to previous routes and persist to cookie
    if (!ignoreBecauseDublicate && !this.ignoreRoutesFromBackNavigation(event)) {
      this.PREVIOUS_ROUTES.unshift(event.url);
      this.$storage.setItem(BACK_NAVIGATION_KEY, this.PREVIOUS_ROUTES);
    }
  }
  /**
   * Get NavigateBack-Target from navigation-history stack if availabel. Valid navigate-back target is
   * the seconde history item, as the last entry is the current active-link
   */
  protected getNavigateBackTarget(): string | false {
    let found: string | false = false;
    if (this.PREVIOUS_ROUTES && this.PREVIOUS_ROUTES.length > 1) {
      // Remove first entry as it's active route
      this.PREVIOUS_ROUTES.shift();
      // Take second as navigate-back target
      found = this.PREVIOUS_ROUTES.shift() || false;
    }
    return found;
  }
}
