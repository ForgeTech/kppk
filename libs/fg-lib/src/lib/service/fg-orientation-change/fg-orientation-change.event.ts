import { Injectable } from '@angular/core';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-orientation-change.event.const';
import { FgOrientationChangeInterface, FgOrientationChangeService } from './fg-orientation-change.service';

/** Turn const values imported to type-module to be processed */
type FgOrientationChangeEventModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgOrientationChangeEventType = FgOrientationChangeEventModule[keyof FgOrientationChangeEventModule];

/**
 * FgOrientationChangeEvent -
 * Class containing the events to be dispatched by FgOrientationChangeEventService
 */

export class FgOrientationChangeEvent extends FgEventGeneric<
  FgOrientationChangeEventType,
  FgOrientationChangeService,
  FgOrientationChangeInterface
> {
  /** Event to be thrown on detection of orientation change */
  public static readonly DETECTED = EVENTS.DETECTED;
}
