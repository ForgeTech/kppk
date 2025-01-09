import { ApplicationRef, Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { SwUpdate, VersionDetectedEvent, VersionReadyEvent } from '@angular/service-worker';
import { timer, Subscription, Subject, BehaviorSubject, filter, takeUntil, map, shareReplay } from 'rxjs';
// import { FgSWUpdateActivatedEvent, FgSWUpdateAvailableEvent } from './fg-sw-update.event';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgSWUpdateEvent } from './fg-sw-update.event';
import { FgEvent } from '../fg-event/fg-event.class';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgBaseService } from '../../base/fg-base.service';

/** Constant defined for injection-token providing numeric value for check for service-worker-update interval*/
export const CONFIG_UPDATE_INTERVAL_VALUE = new InjectionToken<number>('number');
/** Constant defined for injection-token providing numeric value for window-reload delay after service-worker-update was installed */
export const CONFIG_DELAY_RELOAD_VALUE = new InjectionToken<number>('number');

/**
 * FgServiceWorkerUpdateService -
 * Service is used to check and notify the application
 * of available updates for service-worker.
 *
 * Note: Check is performed when application is stable after initialization and on a set
 * UPDATE_CHECK_INTERVAL
 *
 * Read: https://angular.io/guide/service-worker-communications
 */
@Injectable({
  providedIn: 'root',
})
export class FgSWUpdateService extends FgBaseService {
  /** Hold global window-object when service runs in browser environment */
  protected WINDOW: Window | undefined;
  protected ACTIVATE_UPDATE$ = new Subject<true>();
  /** The timestamp in ms showing when last sw update-check was performed */
  protected UPDATE_CHECK_PERFORMED_TIMESTAMP: number = 0;
  /** The interval in ms, after which the service-worker update-check is performed */
  protected UPDATE_CHECK_INTERVAL: number = 5000;
  /** Boolean-property signaling if update is available */
  protected UPDATE_AVAILABLE$: Subject<boolean> = new BehaviorSubject(false);
  /** GETTER for Boolean-property signaling if update is available */
  get updateAvailable$(): Observable<boolean> {
    return this.UPDATE_AVAILABLE$.asObservable().pipe(shareReplay(1));
  }
  /** Allows delaying the window reload after update-activation */
  protected DELAY_RELOAD: number = 1000;
  /** GETTER for DELAY_RELOAD */
  get delayReload(): number {
    return this.DELAY_RELOAD;
  }
  /** GETTER for DELAY_RELOAD */
  set delayReload(delayInMs: number) {
    this.DELAY_RELOAD = delayInMs;
  }
  /** Subscription to the Observables checking for sw-updates */
  protected APP_STABLE$$: Subscription | undefined;
  /** Subscription to the Observables checking for sw-updates */
  protected CHECK_UPDATE$$: Subscription | undefined;
  /** CONSTRUCTOR */
  constructor(
    /** Provide angular application-reference service */
    protected $appRef: ApplicationRef,
    /** Provide angular service-worker-update service*/
    protected $swUpdate: SwUpdate,
    /** Provide application global-object service */
    protected $global: FgGlobalService,
    /** Provide value for UPDATE_CHECK_INTERVAL via environment-service */
    @Optional() protected $env: FgEnvironmentService,
    /**
     * Provide value for UPDATE_CHECK_INTERVAL vie angular DI
     * CAUTION! This value overrides values from envirement-service
     */
    @Optional() @Inject(CONFIG_UPDATE_INTERVAL_VALUE) protected configUpdateIntervalValue: number,
    /**
     * Provide value for DELAY_RELOAD vie angular DI
     * CAUTION! This value overrides values from envirement-service
     */
    @Optional() @Inject(CONFIG_DELAY_RELOAD_VALUE) protected configDelayReloadValue: number
  ) {
    super()
    if (this.$global.isBrowser) {
      // Set global window-object
      this.WINDOW = this.$global.nativeGlobal<Window>();
      // Use interval-value received via updateCheckInterval environment-service
      if (this.$env && this.$env.serviceWorker?.updateCheckInterval) {
        this.UPDATE_CHECK_INTERVAL = this.$env.serviceWorker.updateCheckInterval;
      }
      // Use value from configUpdateIntervalValue injection-token
      if (this.configUpdateIntervalValue !== null) {
        this.UPDATE_CHECK_INTERVAL = this.configUpdateIntervalValue;
      }
      // Use interval-value received via delayWindowReload environment-service
      if (this.$env && this.$env.serviceWorker?.delayWindowReload) {
        this.DELAY_RELOAD = this.$env.serviceWorker?.delayWindowReload;
      }
      // Use value from configDelayReloadValue injection-token
      if (this.configDelayReloadValue !== null) {
        this.DELAY_RELOAD = this.configDelayReloadValue;
      }
      // Detect when new service-worker version was installed
      this.ACTIVATE_UPDATE$.subscribe(event => {
        // this.$log.info('>>>>>>>>>>>>>>>>>ACTIVATE_UPDATE');
        this.UPDATE_AVAILABLE$.next(false);
        this.$event.emitEvent(new FgEvent(FgSWUpdateEvent.SW_UPDATE_ACTIVATED, this, event));
        timer(this.DELAY_RELOAD).subscribe(() => {
          // this.$log.info('DELAY_RELOAD', this.DELAY_RELOAD);
          this.WINDOW?.location.reload();
        });
      });

      // this.$swUpdate.versionUpdates.pipe(takeUntil(this.onDestroy$)).subscribe(event => {
      //   console.log('ALL_SW_EVENTS');
      //   console.log(event);
      // });

      // Detect when new service-worker version is available
      this.$swUpdate.versionUpdates
        .pipe(
          filter(event => event.type === 'VERSION_READY'),
          map(event => event as VersionReadyEvent),
          takeUntil(this.onDestroy$)
        )
        .subscribe(event => {
          this.$log.info('>>>>>>>>>>>>>>>>>>>>>VERSION_DETECTED');
          // console.log(event);
          this.$log.info('Current version:', event.currentVersion.hash);
          this.$log.info('Available version:', event.latestVersion.hash);
          this.UPDATE_AVAILABLE$.next(true);
          this.$event.emitEvent(new FgEvent(FgSWUpdateEvent.VERSION_DETECTED, this, event));
        });
      // Subscribe to $swUpdate observables and emit fgServiceWorkerUpdate-events
      this.initSWUpdateCheck();
    }
    // this.$swUpdate.versionUpdates.subscribe(event => {
    //   console.log('>>>>>>>>>>>>>>EVENT');
    //   console.log(event);
    // });
  }
  /** Methode to be called to activate/install the available service-worker update */
  public installUpdate(): void {
    this.ACTIVATE_UPDATE$.next(true);
  }
  /** Initialise the sw-update subscription */
  protected async initSWUpdateCheck(): Promise<void> {
    // If environment isn't provided or serviceWorker is enabled perform
    // update checks
    // if (this.$env === null || this.$env.serviceWorker?.enabled === true) {
    // Perform initial update-check
    // console.log('>>>>>>>>>>UPDATE_CHECK_PERFORMED_1');
    this.$swUpdate.checkForUpdate();
    this.UPDATE_CHECK_PERFORMED_TIMESTAMP = new Date().getTime();
    // Check for updates when app is stable and update check interval was exceeded
    this.$appRef.isStable
      .pipe(
        filter(value => value),
        takeUntil(this.onDestroy$)
      )
      .subscribe(value => {
        const updateIntervalExceeded =
          new Date().getTime() - this.UPDATE_CHECK_PERFORMED_TIMESTAMP >= this.UPDATE_CHECK_INTERVAL;
        // console.log('>>>>>>>>>>APP_IS_STABLE', value, updateIntervalExceeded, this.$env?.serviceWorker?.enabled);
        if (this.$env?.serviceWorker?.enabled && updateIntervalExceeded) {
          // console.log('>>>>>>>>>>UPDATE_CHECK_PERFORMED', value);
          this.$swUpdate.checkForUpdate();
          this.UPDATE_CHECK_PERFORMED_TIMESTAMP = new Date().getTime();
        }
      });
  }
}
