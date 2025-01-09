import { Injectable } from '@angular/core';

/**
 * FgPwaInstallEvent -
 * Class containing the events to be dispatched by FgAllowCookieComponent
 */

export class FgPwaInstallEvent {
  /** Event to be dispatched when user installs pwa */
  public readonly PWA_INSTALL = 'Event_FgPwaInstallComponent_pwa_install';
  /** CONSTRUCTOR */
  constructor() {}
}
