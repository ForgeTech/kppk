import { Injectable } from '@angular/core';

/**
 * FgBadgingApiEvent -
 * Class containing the events to be used with fgBadgingApi
 */

export class FgBadgingApiEvent {
  /** Event to be thrown when badge is set */
  public static readonly SET = 'Event_FgBadgingApiEvent_badge_set';
  /** Event to be thrown when badge is cleared */
  public static readonly CLEARED = 'Event_FgBadgingApiEvent_badge_cleared';
  constructor() {}
}
