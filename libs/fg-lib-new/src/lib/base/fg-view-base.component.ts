import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Observable, Subject, BehaviorSubject, timer } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
// import { FgPrintViewBaseComponent } from './fg-print-view-base.component';
import { FgViewBaseService } from './fg-view-base.service';
// import { FgAllowCookieService } from '../component';

/**
 * FgViewBaseComponent -
 * Used to be extended for components that serve as
 * route-endpoints/view within the application
 */
@Component({
  selector: 'fg-view',
  templateUrl: './fg-view-base.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class FgViewBaseComponent extends FgPrintViewBaseComponent {
export class FgViewBaseComponent {
  protected $activatedRoute = inject( ActivatedRoute );
  // protected $allowCookies = inject( FgAllowCookieService );
  /** Property used to signal that view is ready to be displayed */
  public viewReady$ = new BehaviorSubject<boolean>(false);
  /** Property to signal if view can be unloaded without warning */
  // public unloadWarningDisabled = true;
  /** Subject to dispatch an event when url is changed by location-service
   * instead of the router
   */
  private LOCATION_URL_CHANGE: Subject<string> = new Subject();
  /** Return Observable dispatching value when an location-url change happens */
  public get locationUrlChange$() {
    return this.LOCATION_URL_CHANGE.asObservable().pipe(
      filter((value) => (value ? true : false)),
      distinctUntilChanged()
    );
  }
  /**
   * Methode should be overwritten by components wanting to implement logic
   * save-guarding the user from loosing data on window-naviagation, outside
   * of angular-application context, like window-refresh, window/tab-closing.
   *
   * CAUTION! For guarding navigation inside angular-context configure
   * fg-unload guard-service on angular-router application-routes
   */
  @HostListener('window:beforeunload')
  public canDeactivate(): Observable<boolean> | boolean {
    // return this.$view.$canUnload.canOnload;
  }

  /** CONSTRUCTOR */
  constructor() {
    this.$view.$activeRoute.updateActiveRoute(this.$activatedRoute);

    // Set active view on active view service
    this.$view.$activeView.updateActiveView(this);

    // Dispatch a location-change using the locationChange$ subject when
    // callback of location-service is called
    this.$view.$location.onUrlChange((url, state) => {
      this.LOCATION_URL_CHANGE.next(url);
    });

    // Create observable for enable/disable unload-warning message
    const enableDisableUnloadWarning$ =
      this.$view.$component.$event.event$.pipe(
        filter(
          (event) =>
            event.signature === this.$view.event.UNLOAD_ENABLE_WARNING ||
            event.signature === this.$view.event.UNLOAD_DISABLE_WARNING
        )
      );
    // Subscribe to unload-enable/disable event to set state accordingly
    this.subscribe(enableDisableUnloadWarning$, (event) => {
      if (event.signature === this.$view.event.UNLOAD_ENABLE_WARNING) {
        this.$view.$canUnload.canOnload = false;
      } else {
        this.$view.$canUnload.canOnload = true;
      }
    });

    // this.$view.$component.$event.emitEvent(new FgEvent(this.$view.event.UNLOAD_ENABLE_WARNING, this));

    // Check if user accepted cookies on every view-change ( with a delay after initialization )
    timer(1000).subscribe(() => {
      this.$allowCookies.checkCookiesAllowed();
    });
  }
}
