import { Inject, Injectable, Optional } from '@angular/core';
import { from, fromEvent, merge, Observable, of, shareReplay, Subject, switchMap } from 'rxjs';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgIsOnlineEvent } from './fg-is-online.event';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { Request } from 'express';
import { NGXLogger } from 'ngx-logger';
import { FgBaseService } from '../../base/fg-base.service';
import isOnline from 'is-online';
import { REQUEST } from '../../token/fg-request-response.token';
// import { HttpClient } from '@angular/common/http';
/**
 * FgIsOnlineService -
 * Service to detect if client is currently online/offline
 * Uses https://www.npmjs.com/package/is-online for actuall endpoint detection
 * or own ping endpoint to check if provided
 */
@Injectable({
  providedIn: 'root',
})
export class FgIsOnlineService extends FgBaseService {
  /** Hold global window-reference when available */
  protected WINDOW?: Window;
  /** Pushes the current is-online state */
  protected IS_ONLINE$ = new Subject<boolean>();
  /** Allows subscribing to current online-state */
  public readonly isOnline$ = this.IS_ONLINE$.asObservable().pipe(shareReplay(1));
  /** CONSTRUCTOR */
  constructor(
    /** Provide global object for node/browser */
    protected $global: FgGlobalService,
    
    /** (Optional) Required to provide user-agent in node/express environment */
    @Optional() @Inject(REQUEST) protected request: Request
  ) {
    super()
    // If in browser setup change-detection on window.navigator.onLine
    if (this.$global.isBrowser) {
      // this?.$log.info('FgIsOnlineService: Runs in browser!');
      this.WINDOW = this.$global.nativeGlobal<Window>();
      console.log(this.WINDOW);
      const networkStatusChange$ = merge(fromEvent(this.WINDOW, 'online'), fromEvent(this.WINDOW, 'offline')).pipe(
        switchMap(() => this.detect())
      );
      this.subscribe(networkStatusChange$, isOnline => {
        this.IS_ONLINE$.next(isOnline);
        this.emitEvent(new FgIsOnlineEvent(FgIsOnlineEvent.DETECTED, this, isOnline));
      });
    }
    // Run Initial detection
    this.subscribe(this.detect(), isOnline => {
      this.IS_ONLINE$.next(isOnline);
      this.emitEvent(new FgIsOnlineEvent(FgIsOnlineEvent.DETECTED, this, isOnline));
    });
  }
  /**
   * Detects if application is online based on environment
   * window.navigator.onLine and additonal server 'ping' check
   */
  public detect(): Observable<boolean> {
    let result$: Observable<boolean>;
    // Detection has only to run in browser
    if (this.$global.isBrowser) {
      // If onLine is true detect if servers are reachable
      if (this.WINDOW?.navigator.onLine === true) {
        result$ = from(isOnline());
      } else {
        // if onLine is false application is offline
        result$ = of(false);
      }
    }
    // If service runs on the server it's online by default
    else {
      result$ = of(true);
    }
    return result$;
  }
}
