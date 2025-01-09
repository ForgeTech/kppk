import { Injectable } from '@angular/core';

/**
 * FgNavigateBackEvent -
 * Class containing the events to be dispatched or received by FgNavigateBackService
 */

export class FgNavigateBackEvent {
  /** Event to be thrown when user wants to navigate to previous-route */
  public static readonly BACK = 'Event_FgNavigateBack_navigate_back';
  /** Event to be thrown when back-navigation was triggered */
  public static readonly TRIGGERED = 'Event_FgNavigateBack_navigate_back_triggerd';
  constructor() {}
}
