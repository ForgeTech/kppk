import { Injectable } from '@angular/core';

/**
 * FgViewBaseEvent -
 * Class containing the events to be dispatched by FgViewBaseComponents
 */
@Injectable({ providedIn: 'root' })
export class FgViewBaseEvent {
  /** Event to be dispatched when a view should enable the unload-warning*/
  public readonly UNLOAD_ENABLE_WARNING =
    'Event_FgViewBaseEvent_unload_enable_warning';
  /** Event to be dispatched when a view should disable the unload-warning*/
  public readonly UNLOAD_DISABLE_WARNING =
    'Event_FgViewBaseEvent_unload_disable_warning';
  /** CONSTRUCTOR */
  constructor() {}
}
