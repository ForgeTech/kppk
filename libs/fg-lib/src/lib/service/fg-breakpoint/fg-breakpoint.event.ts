import { Injectable } from '@angular/core';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-breakpoint.event.const';
import { FgBreakpointService } from './fg-breakpoint.service';

/** Turn const values imported to type-module to be processed */
type FgDetectDeviceTypeUserAgentModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgDetectDeviceTypeUserAgentEventType = FgDetectDeviceTypeUserAgentModule[keyof FgDetectDeviceTypeUserAgentModule];

/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgBreakpointEvent extends FgEventGeneric<FgDetectDeviceTypeUserAgentEventType, FgBreakpointService, string[]> {
  /** Event to be thrown detection of device-information was performed */
  public static readonly DETECTED = EVENTS.DETECTED;
}
