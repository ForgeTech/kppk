import { Injectable } from '@angular/core';
import { DeviceInfo } from 'ngx-device-detector';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-is-online.event.const';
import { FgIsOnlineService } from './fg-is-online.service';

/** Turn const values imported to type-module to be processed */
type FgIsOnlineModule = typeof EVENTS;
/** Provides typing for FgIsOnlineEvent  */
export type FgIsOnlineEventType = FgIsOnlineModule[keyof FgIsOnlineModule];
/**
 * FgIsOnlineEvent -
 * Class containing the events to be dispatched by FgIsOnlineEventService
 */

export class FgIsOnlineEvent extends FgEventGeneric<FgIsOnlineEventType, FgIsOnlineService, boolean> {
  /** Event to be thrown detection of device-information was performed */
  public static readonly DETECTED = EVENTS.DETECTED;
}
