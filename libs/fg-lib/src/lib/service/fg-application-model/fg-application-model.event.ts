import { Injectable } from '@angular/core';
import { FgBaseService } from '../../base/fg-base.service';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgViewBaseComponent } from '../../base/fg-view-base.component';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-application-model.event.const';

/** Turn const values imported to type-module to be processed */
type FgApplicationModelEventModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgApplicationModelEventType = FgApplicationModelEventModule[keyof FgApplicationModelEventModule];

/**
 * FgApplicationModelEvent -
 * Class containing the events to be used and dispatched by FgApplicationModelEvent
 */

export class FgApplicationModelEvent extends FgEventGeneric<
  FgApplicationModelEventType,
  FgBaseService | FgComponentBaseComponent,
  any
> {
  /** Event to be thrown when initializing application model */
  public static readonly INIT = EVENTS.INIT;
  /** Event to be thrown when initializing application model */
  public static readonly OVERRIDE = EVENTS.OVERRIDE;
}
