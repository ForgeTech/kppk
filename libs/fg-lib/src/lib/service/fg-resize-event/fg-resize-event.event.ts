import { Injectable } from '@angular/core';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-resize.event.const';
import { FgResizeEventService } from './fg-resize-event.service';

/** Turn const values imported to type-module to be processed */
type FgResizeEventServiceModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgResizeEventType = FgResizeEventServiceModule[keyof FgResizeEventServiceModule];

/**
 * FgResizeEvent -
 * Class containing the events to be dispatched by FgResizeEventService
 */

export class FgResizeEvent extends FgEventGeneric<
  FgResizeEventType,
  FgResizeEventService,
  {
    height: number;
    width: number;
  }
> {
  /** Event to be thrown on when global window element recieves resize-event */
  public static readonly RESIZE = EVENTS.RESIZE;
  /** Event to be thrown on when global window element recieves horizontal resize */
  public static readonly HORIZONTAL_RESIZE = EVENTS.HORIZONTAL_RESIZE;
  /** Event to be thrown on when global window element recieves vertical resize */
  public static readonly VERTICAL_RESIZE = EVENTS.VERTICAL_RESIZE;
}
