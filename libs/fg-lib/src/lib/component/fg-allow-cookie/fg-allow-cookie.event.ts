import { Injectable } from '@angular/core';

/**
 * FgAllowCookieEvent -
 * Class containing the events to be dispatched by FgAllowCookieComponent
 */

export class FgAllowCookieEvent {
  /** Event to be thrown when user accepts use of cookies */
  public static readonly ACCEPT_COOKIES = 'Event_FgAllowCookieComponent_accept_cookies';
  /** Event to be thrown when user rejects use of cookies */
  public static readonly REJECT_COOKIES = 'Event_FgAllowCookieComponent_reject_cookies';
  /** Event to dispatch when cookie-warning should be shown */
  public static readonly SHOW_COOKIE_WARNING = 'Event_FgAllowCookieComponent_show_cookie-warning';
  /** Event to dispatch when cookie-warning should be hidden */
  public static readonly HIDE_COOKIE_WARNING = 'Event_FgAllowCookieComponent_hide_cookie-warning';
  constructor() {}
}
