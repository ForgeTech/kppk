import { Injectable } from '@angular/core';

/**
 * FgPwaInstallEvent -
 * Class containing the events to be dispatched by FgAllowCookieComponent
 */

export class FgPwaInstallEvent {
  /** Event to be dispatched when user installs pwa */
  public static readonly BEFORE_INSTALL = 'Event_FgPwaInstallEvent_before_install';
  /** Event to be dispatched when user installs pwa */
  public static readonly INSTALLED = 'Event_FgPwaInstallEvent_installed';
  /** Event to be dispatched when user installs pwa */
  public static readonly USER_ACCEPTED_INSTALL_PROMPT = 'Event_FgPwaInstallEvent_user_accepted_install_prompt';
  /** Event to be dispatched when user installs pwa */
  public static readonly USER_DECLINED_INSTALL_PROMPT = 'Event_FgPwaInstallEvent_user_declined_install_prompt';
  /** CONSTRUCTOR */
  constructor() {}
}
