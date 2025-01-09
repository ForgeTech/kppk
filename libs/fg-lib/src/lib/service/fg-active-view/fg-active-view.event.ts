import { Injectable } from '@angular/core';
import { FgViewBaseComponent } from '../../base';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-active-view.event.const';
import { FgActiveViewService } from './fg-active-view.service';

/** Turn const values imported to type-module to be processed */
type FgActiveViewEventModule = typeof EVENTS;
/** Provides typing for FgActiveViewEvent  */
export type FgActiveViewEventType = FgActiveViewEventModule[keyof FgActiveViewEventModule];

/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgActiveViewEvent extends FgEventGeneric<FgActiveViewEventType, FgActiveViewService, FgViewBaseComponent> {
  /** Event to be thrown detection of device-information was performed */
  public static readonly UPDATE = EVENTS.UPDATE;
}
