import { Injectable, inject } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { FgAllowCookieEvent } from './fg-allow-cookie.event';
import { FgAllowCookieComponent } from './fg-allow-cookie.component';
import { FgEvent } from '../../service/fg-event/fg-event.class';
import { FgStorageNgxCookieService } from '../../service/fg-storage/fg-storage-ngx-cookie.service';
import { CookieOptions } from 'ngx-cookie';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../../service/fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FgTimeStringService } from '../../service/fg-timestring/fg-timestring.service';
// import { Angulartics2GoogleAnalytics } from 'angulartics2';

/**
 * FgAllowCookieService -
 * Service used to check if user allowed being tracked
 * by using coogies/analytics services
 */
@Injectable({
  providedIn: 'root',
})
export class FgAllowCookieService extends FgBaseService {
  protected $time = inject(FgTimeStringService);
  protected $snackbar = inject(MatSnackBar);
  protected $cookie = inject(FgStorageNgxCookieService);

  protected SNACKBAR_REF: MatSnackBarRef<FgAllowCookieComponent> | undefined;
  /** Key for the cookie to set when user allowed use of tracking cookies */
  protected ALLOW_COOKIE_KEY = 'fg-allow-cookies';
  /** Value used for cookie when user accepted cookie-usage */
  protected COOKIES_ACCEPTED = 'fg-cookies-accepted';
  /** Value used for cookie when user declined cookie-usage */
  protected COOKIES_DECLINED = 'fg-cookies-declined';
  /** Streams state of a users decision to allow use of tracking cookies */
  protected COOKIE_ALLOWED$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Allows subscriptions to the state of a users-decision
   * about cookie-usage for tracking purposes
   */
  get cookiesAllowed$(): Observable<boolean> {
    return this.COOKIE_ALLOWED$.asObservable();
  }
  /** CONSTRUCTOR */
  constructor() {
    super()
    // Register event for when application should display cookie-warning
    this.subscribe(
      this.$event.event$.pipe(filter((event: FgEvent) => event.signature === FgAllowCookieEvent.SHOW_COOKIE_WARNING)),
      () => {
        if (!this.SNACKBAR_REF) {
          // Display cookie-warning snack-bar
          this.SNACKBAR_REF = this.$snackbar.openFromComponent(FgAllowCookieComponent, {
            panelClass: 'fg-allow-cookie',
          });
          this.SNACKBAR_REF.afterDismissed()
            .pipe(take(1))
            .subscribe(() => {
              this.SNACKBAR_REF = undefined;
            });
        }
      }
    );
    // Register event to user accepting cookies and start user-tracking
    this.subscribe(
      this.$event.event$.pipe(filter((event: FgEvent) => event.signature === FgAllowCookieEvent.ACCEPT_COOKIES)),
      () => {
        this.COOKIE_ALLOWED$.next(true);
        // if (this.$tracking) {
        //   this.$tracking.startTracking();
        // }
        const options: CookieOptions = {};
        options.expires = this.$time.getCookieExpirationDate('10 years');
        console.log('SET_COOKIE: ALLOW');
        this.$cookie.setItem(this.ALLOW_COOKIE_KEY, this.COOKIES_ACCEPTED, options);
      }
    );
    // Register event to user declining cookies and setting cookie accordingly, but set cookie to expire in an hour
    this.subscribe(this.$event.event$.pipe(filter(event => event.signature === FgAllowCookieEvent.REJECT_COOKIES)), () => {
      const options: CookieOptions = {};
      options.expires = this.$time.getCookieExpirationDate('7 days');
      this.$cookie.setItem(this.ALLOW_COOKIE_KEY, this.COOKIES_DECLINED, options);
      this.COOKIE_ALLOWED$.next(false);
    });
  }
  /** Checks if cookies-allowed cookie is available  */
  public checkCookiesAllowed(): void {
    // Check if cookie already exists, otherwise display cookie-warning
    this.subscribe(this.$cookie.getItem(this.ALLOW_COOKIE_KEY), userAcceptedCookie => {
      if (userAcceptedCookie === this.COOKIES_ACCEPTED) {
        // Dispatch show-event to make sure cookie-compliance message can be displayed
        this.emitEvent(new FgEvent(FgAllowCookieEvent.HIDE_COOKIE_WARNING, this, false));
      } else if (userAcceptedCookie !== this.COOKIES_DECLINED) {
        // Dispatch hide-event to make sure already displayed 'allow-cookie'-messages can be hidden
        this.emitEvent(new FgEvent(FgAllowCookieEvent.SHOW_COOKIE_WARNING, this, false));
      }
    });
  }
}
