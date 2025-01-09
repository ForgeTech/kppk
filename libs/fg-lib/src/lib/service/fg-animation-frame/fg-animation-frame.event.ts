import { Injectable } from '@angular/core';
import { FgViewBaseComponent } from '../../base';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-animation-frame.event.const';
import { FgAnimationFrameService } from './fg-animation-frame.service';

/** Turn const values imported to type-module to be processed */
type FgActiveViewEventModule = typeof EVENTS;
/** Provides typing for FgActiveViewEvent  */
export type FgActiveViewEventType = FgActiveViewEventModule[keyof FgActiveViewEventModule];

/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgAnimationFrameEvent extends FgEventGeneric<FgActiveViewEventType, FgAnimationFrameService, DOMHighResTimeStamp> {
  /** Event to be thrown detection of device-information was performed */
  public static readonly UPDATE = EVENTS.UPDATE;
}
