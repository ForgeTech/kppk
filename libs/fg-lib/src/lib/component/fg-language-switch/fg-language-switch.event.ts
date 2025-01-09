import { Injectable } from '@angular/core';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgEventGeneric } from '../../service/fg-event/fg-event.class';
import * as EVENTS from './fg-language-switch.event.const';

/** Turn const values imported to type-module to be processed */
type FgLanguageSwitchEventModule = typeof EVENTS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type FgLanguageSwitchEventType = FgLanguageSwitchEventModule[keyof FgLanguageSwitchEventModule];

/**
 * FgLanguageSwitchEvent -
 * Class containing the events to be dispatched by
 * fg-language-switch-component
 */

export class FgLanguageSwitchEvent extends FgEventGeneric<FgLanguageSwitchEventType, FgComponentBaseComponent, string> {
  /** Event to be dispatched when user selects application language*/
  public static readonly LANGUAGE_SELECTION = EVENTS.LANGUAGE_SELECTION;
}
