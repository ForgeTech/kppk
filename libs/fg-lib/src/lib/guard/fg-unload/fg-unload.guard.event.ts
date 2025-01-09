import { Injectable } from '@angular/core';
import { FgViewBaseComponent } from '../../base';
import { FgEventGeneric } from '../../service/fg-event/fg-event.class';
import { FgUnloadGuard } from './fg-unload.guard';
import * as EVENTS from './fg-unload.guard.event.const';

/** Turn const values imported to type-module to be processed */
type FgUnloadGuardEventModule = typeof EVENTS;
/** Provides typing for FgActiveViewEvent  */
export type FgUnloadGuardEventType = FgUnloadGuardEventModule[keyof FgUnloadGuardEventModule];

/**
 * FgUnloadGuardEventDataInterface -
 * Interface for UnloadGuardEvent payload
 */
export interface FgUnloadGuardEventDataInterface {
  view: FgViewBaseComponent;
  canDeactivate: boolean;
}

/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgUnloadGuardEvent extends FgEventGeneric<FgUnloadGuardEventType, FgUnloadGuard, FgUnloadGuardEventDataInterface> {
  /** Event to be dispatched when view can deactivate route */
  public static readonly CAN_DEACTIVATE = EVENTS.CAN_DEACTIVATE;
  /** S to be dispatched when view cannot deactivate route */
  public static readonly CANNOT_DEACTIVATE = EVENTS.CANNOT_DEACTIVATE;
}
/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgUnloadGuardContinueEvent extends FgEventGeneric<
  FgUnloadGuardEventType,
  FgUnloadGuard,
  { targetUrl: string } | false
> {
  /**
   * Event to be dispatched when view wants to restart navigation to last navigation-start url
   * after it was interrupted by unload-guard - will automatically allow navigation from
   * previously blocked view
   */
  public static readonly CONTINUE = EVENTS.CONTINUE;
}
