import { Injectable } from '@angular/core';
import { DeviceInfo } from 'ngx-device-detector';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-apple-ios.event.const';
import { AppleIosType, FgAppleIosService } from './fg-apple-ios.service';

/** Turn const values imported to type-module to be processed */
type FgAppleIosEventModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgAppleIosEvent = FgAppleIosEventModule[keyof FgAppleIosEventModule];

/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgDetectDeviceTypeUserAgentEvent extends FgEventGeneric<
  FgAppleIosEvent,
  FgAppleIosService,
  AppleIosType | string | false
> {
  /** Event to be thrown detection of device-information was performed */
  public static readonly DETECTED = EVENTS.DETECTED;
}
