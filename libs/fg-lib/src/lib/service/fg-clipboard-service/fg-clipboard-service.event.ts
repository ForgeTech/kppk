import { Injectable } from '@angular/core';
import { FgEventGeneric } from '../fg-event/fg-event.class';
import * as EVENTS from './fg-clipboard-service.event.const';
import { CopySuccessInterface, FgClipboardService } from './fg-clipboard-service.service';

/** Turn const values imported to type-module to be processed */
type FgClipboardServiceEventModule = typeof EVENTS;
/** Provides typing for FgClipboardServiceEvent */
export type FgClipboardServiceEventType = FgClipboardServiceEventModule[keyof FgClipboardServiceEventModule];

/**
 * FgClipboardServiceEvent -
 * Class containing the events to be dispatched by FgClipboardService
 */

export class FgClipboardServiceEvent extends FgEventGeneric<
  FgClipboardServiceEventType,
  FgClipboardService,
  CopySuccessInterface | boolean
> {
  /** Event to be thrown detection of device-information was performed */
  public static readonly COPIED = EVENTS.COPIED;
  /** Event to be thrown when copy to clipboard is successful */
  public static readonly SUCCESS = EVENTS.SUCCESS;
  /** Event to be thrown when copy to clipboard fails */
  public static readonly ERROR = EVENTS.ERROR;
}
