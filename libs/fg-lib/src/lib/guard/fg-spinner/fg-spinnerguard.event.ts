import { Injectable } from '@angular/core';
import { FgEventGeneric } from '../../service/fg-event/fg-event.class';
import { FgSpinnerGuard } from './fg-spinner.guard';
import * as EVENTS from './fg-spinner.guard.event.const';

/** Turn const values imported to type-module to be processed */
type FgSpinnerEventModule = typeof EVENTS;
/** Provides typing for FgActiveViewEvent  */
export type FgSpinnerGuardType = FgSpinnerEventModule[keyof FgSpinnerEventModule];

/**
 * FgDetectDeviceTypeUserAgentServiceEvent -
 * Class containing the events to be dispatched by FgDetectDeviceTypeUserAgentServiceEventService
 */

export class FgSpinnerGuardEvent extends FgEventGeneric<FgSpinnerGuardType, FgSpinnerGuard | any, never> {
  /** Event to be dispatched when spinner-display should be started */
  public static readonly START = EVENTS.START;
  /** Event to be dispatched when spinner-display should be ended */
  public static readonly END = EVENTS.END;
  /** Event to be dispatched when spinner-display should be (re-)enabled
   * e.g. after being disabled */
  public static readonly ENABLE = EVENTS.ENABLE;
  /** Event to be dispatched when spinner-display should be disabled */
  public static readonly DISABLE = EVENTS.DISABLE;
}
