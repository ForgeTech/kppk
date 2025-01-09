import { Injectable, OnDestroy, Optional } from '@angular/core';
import { combineLatest, isObservable, Observable, of, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, NavigationStart, Router, RouterStateSnapshot } from '@angular/router';
import { FgUnloadGuardContinueEvent, FgUnloadGuardEvent } from './fg-unload.guard.event';
import { FgActiveViewService } from '../../service/fg-active-view/fg-active-view.service';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { FgEventService } from '../../service/fg-event/fg-event.service';
import { FgBaseService, FgViewBaseComponent } from '../../base';
import { NGXLogger } from 'ngx-logger';
import { FgEvent } from '../../service/fg-event/fg-event.class';
import { FgCanUnloadService } from '../../service/fg-can-unload/fg-can-unload.service';

@Injectable({
  providedIn: 'root',
})
export class FgUnloadGuard extends FgBaseService  {
  // Keep last navigation
  protected NAVIGATION_TARGET$: Observable<string>;
  // Publish guarded view
  protected GUARDED_VIEW$ = new Subject<FgViewBaseComponent>();

  /** CONSTRUCTOR */
  constructor(
    protected $router: Router,
    protected $canUnload: FgCanUnloadService,
    @Optional() protected $activeView: FgActiveViewService,

    @Optional() protected override $log: NGXLogger
  ) {
    super()

    // Save last NavigationStart event received from router
    this.NAVIGATION_TARGET$ = $router.events.pipe(
      // CAUTION! There is a tooling bug leaking Event_2
      // instead of router-navigation event leading to an erro
      // check periodically if this has been fixed
      // @ts-ignore
      filter(event => event instanceof NavigationStart),
      map((event: NavigationStart) => {
        return event.url;
      }),
      shareReplay(1)
    );

    // Listen for unloadguard continue event
    const continueEvent$ = this.$event.event$.pipe(
      filter(event => event.signature === FgUnloadGuardContinueEvent.CONTINUE)
    ) as Observable<FgUnloadGuardContinueEvent>;

    // Provide combination of events containing possible navigation targets fired on continue
    const combine$ = continueEvent$.pipe(
      switchMap(event => combineLatest([of(event), this.NAVIGATION_TARGET$, this.GUARDED_VIEW$]))
    );

    // Perform the redirect triggered by continue event
    this.subscribe(combine$, values => {
      const [event, navigationTarget, view] = values;
      // Deactivate unloadWarning field on view
      this.$canUnload.canOnload = true;
      // If event contains a sring in data, assume it's a new url to navigate too
      if (event.data && event.data.targetUrl) {
        this.$router.navigateByUrl(event.data.targetUrl);
      }
      // Only start navigation wen last navigation-url was previously set
      else if (navigationTarget) {
        this.$router.navigateByUrl(navigationTarget);
      }
    });
  }
  /** Implemented for CanActivate guard interface */
  canDeactivate(): boolean | Observable<boolean> {
    // Get canDeactivate value
    const canDeactivate$ = this.$activeView.activeView$.pipe(
      switchMap(view => {
        return this.$canUnload.canUnload$;
      })
    );

    // Combine activeView and canDeactivate
    const combined$ = combineLatest([this.$activeView.activeView$, canDeactivate$]);

    // Dispatch event according to canDeactivate
    this.subscribe(
      combined$,
      values => {
        const [activeView, canDeactivate] = values;
        if (canDeactivate === false) {
          this.emitEvent(new FgEvent(FgUnloadGuardEvent.CANNOT_DEACTIVATE, this, { activeView, canDeactivate }));
        } else {
          this.emitEvent(new FgEvent(FgUnloadGuardEvent.CAN_DEACTIVATE, this, { activeView, canDeactivate }));
        }
      },
      error => {
        this?.$log.error;
      }
    );
    return canDeactivate$;
  }
}
