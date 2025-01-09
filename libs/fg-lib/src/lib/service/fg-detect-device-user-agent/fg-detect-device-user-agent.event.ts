import { Injectable } from '@angular/core';
import { DeviceInfo } from 'ngx-device-detector';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-detect-device-user-agent.event.const';
import { FgDetectDeviceTypeUserAgentService } from './fg-detect-device-user-agent.service';

/** Turn const values imported to type-module to be processed */
type FgDetectDeviceTypeUserAgentModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgDetectDeviceTypeUserAgentEventType = FgDetectDeviceTypeUserAgentModule[keyof FgDetectDeviceTypeUserAgentModule];

/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgDetectDeviceTypeUserAgentEvent extends FgEventGeneric<
  FgDetectDeviceTypeUserAgentEventType,
  FgDetectDeviceTypeUserAgentService,
  DeviceInfo
> {
  /** Event to be thrown detection of device-information was performed */
  public static readonly DETECTED = EVENTS.DETECTED;
}
