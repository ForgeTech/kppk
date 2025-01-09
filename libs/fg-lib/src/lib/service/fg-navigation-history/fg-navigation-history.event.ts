import { Injectable } from '@angular/core';

/**
 * FgNavigationHistoryEvent -
 * Class containing the events to be dispatched or received by FgNavigationHistoryService
 */

export class FgNavigationHistoryEvent {
  /** Event to be thrown when user wants to navigate to previous-route */
  public static readonly UPDATE = 'Event_navigation_history_update';
  /** CONSTRUCTOR */
  constructor() {}
}
