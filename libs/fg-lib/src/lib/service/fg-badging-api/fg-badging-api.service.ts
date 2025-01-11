import { Injectable, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgBadgingApiEvent } from './fg-badging-api.event';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgEvent } from '../fg-event/fg-event.class';

/**
 * FgBadgingApiService ( Experimental ) -
 * Service to wrap progressive-web-application badging api
 * READ:
 * https://wicg.github.io/badging/
 * https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
 * CAUTION: EXPERIMENTAL FEATURE AVAILABLE ONLY VIA CHROME ORIGIN TRAIL
 */
@Injectable({
  providedIn: 'root',
})
export class FgBadgingApiService {
  protected $title = inject(Title);
  protected $global = inject(FgGlobalService);
  protected $router = inject(Router);
  protected $event = inject(FgEventService);
  protected $log = inject(NGXLogger);

  /** Hold browsers global window- or serviceworkers self-object, only when run in browser */
  protected WINDOW_OR_SELF: any;
  /** Observable flaging if a badge is currently set, and if so provides set values */
  protected BADGE_SET$ = new BehaviorSubject<boolean | any[]>(false);
  /** GETTER for badgeSet$ */
  get badgeSet$(): Observable<boolean | any[]> {
    return this.BADGE_SET$.asObservable();
  }
  /** ReadOnly-property providing badge-value */
  public readonly badge: false | any[] = false;
  /** Flag indicating if browser supports experimental api v1 */
  public readonly supportClientBadgeExperimentalAPIV1: boolean = false;
  /** Flag indicating if browser supports experimental api v2 */
  public readonly supportClientBadgeExperimentalAPIV2: boolean = false;
  /** Flag indicating if browser supports none-experimental client-badge-api */
  public readonly supportCLientBadgeAPI: boolean = false;
  /** CONSTRUCTOR */
  constructor() {
    if (this.$global.isBrowser) {
      this.WINDOW_OR_SELF = this.$global.nativeGlobal();
      // Check if the previous API surface is supported.
      if ('ExperimentalBadge' in window) {
        this.$log?.debug('SUPPORT BADGING V1');
        this.supportClientBadgeExperimentalAPIV1 = true;
      }
      // Check if the API is supported.
      if ('setExperimentalAppBadge' in navigator) {
        this.$log?.debug('SUPPORT BADGING V2');
        this.supportClientBadgeExperimentalAPIV2 = true;
      }
      // Check if none-experimental badgeing support is available
      if ('setClientBadge' in this.WINDOW_OR_SELF.navigator && 'clearClientBadge' in this.WINDOW_OR_SELF.navigator) {
        this.$log?.debug('SUPPORT BADGING API');
        this.supportCLientBadgeAPI = true;
      }
      /** Check if router-service is available in project */
      if (this.$router) {
        // If user-navigates to a different route and badge isn't false recall setBadge
        // to make sure title reflects set values
        this.$router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(event => {
          if (this.badge !== false) {
            this.setBadge(this.badge);
          }
        });
      }
      /** Check if fgEvent-service is available in project */
      if (this.$event) {
        // If event-service is available dispatch set/clear-badge-events
        this.badgeSet$.subscribe(badge => {
          if (badge !== false) {
            this.$event?.emitEvent(new FgEvent(FgBadgingApiEvent.SET, this, this.badge));
          } else {
            this.$event?.emitEvent(new FgEvent(FgBadgingApiEvent.CLEARED, this, this.badge));
          }
        });
      }
    }
  }
  /**
   * Wrapper to support first and second origin trial
   * and proposed final verions of the badging Api
   * See https://web.dev/badging-api/ for details.
   */
  public setBadge(...args: any[]) {
    this.$log.debug('SET_BADGE: ', args[0]);
    /** Set title with 'text'-badge */
    const title = this.$title.getTitle();
    this.$title.setTitle(`(${args[0]}) ${title}`);
    if (this.supportCLientBadgeAPI) {
      this.WINDOW_OR_SELF.setClientBadge(...args);
    } else if (this.supportClientBadgeExperimentalAPIV1) {
      // @ts-ignore
      this.WINDOW_OR_SELF.ExperimentalBadge.set(...args);
    } else if (this.supportClientBadgeExperimentalAPIV2) {
      // @ts-ignore
      this.WINDOW_OR_SELF.navigator.setExperimentalAppBadge(...args);
    }
  }
  /**
   * Wrapper to support first and second origin trial
   * and proposed final verions of the badging Api
   * See https://web.dev/badging-api/ for details.
   */
  public clearBadge() {
    this.$log.debug('CLEAR_BADGE: ');
    let title: string = this.$title.getTitle();
    // If title starts with '(', it's assumed to be a badge
    let titleStartsWithBadge: boolean = title.charAt(0) === '(';
    let titleBadgeEndPosition: number = title.indexOf(')');
    if (titleStartsWithBadge && titleBadgeEndPosition !== -1) {
      title = title.substr(0, titleBadgeEndPosition);
      this.$title.setTitle(title);
    }
    if (this.supportCLientBadgeAPI) {
      this.WINDOW_OR_SELF.navigator.clearBadge();
    } else if (this.supportClientBadgeExperimentalAPIV1) {
      // @ts-ignore
      this.WINDOW_OR_SELF.ExperimentalBadge.clear();
    } else if (this.supportClientBadgeExperimentalAPIV2) {
      // @ts-ignore
      this.WINDOW_OR_SELF.navigator.clearExperimentalAppBadge();
    }
  }
}
