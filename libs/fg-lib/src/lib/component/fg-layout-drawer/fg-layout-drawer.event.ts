import { Injectable } from '@angular/core';
import { FgBaseService } from '../../base/fg-base.service';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgEventGeneric } from '../../service/fg-event/fg-event.class';
import { FgLayoutDrawerOpenDrawerOptionsInterface } from './fg-layout-drawer-open-drawer-options.interface';
import * as EVENTS from './fg-layout-drawer.event.const';

/** Turn const values imported to type-module to be processed */
type FgLayoutDrawerEventsModule = typeof EVENTS;
/** Provides typing for fgLayoutDrawerEvent */
export type FgLayoutDrawerEventType = FgLayoutDrawerEventsModule[keyof FgLayoutDrawerEventsModule];

/**
 * FgLayoutDrawerEvent -
 * Class containing the events to be dispatched to interact with FgLayoutDrawer-component
 */

export class FgLayoutDrawerEvent extends FgEventGeneric<
  FgLayoutDrawerEventType,
  FgComponentBaseComponent | FgBaseService | object | false,
  FgLayoutDrawerOpenDrawerOptionsInterface | false
> {
  /** Event to be thrown when vlv-layout-mobile drawer should be be opened */
  public static readonly OPEN_DRAWER = EVENTS.OPEN_DRAWER;
  /** Event to be thrown when vlv-layout-mobile drawer has been opened */
  public static readonly DRAWER_OPENED = EVENTS.DRAWER_OPENED;
  /** Event to be thrown when vlv-layout-mobile drawer should be be opened */
  public static readonly CLOSE_DRAWER = EVENTS.CLOSE_DRAWER;
  /** Event to be thrown when vlv-layout-mobile drawer has been closed */
  public static readonly DRAWER_CLOSED = EVENTS.DRAWER_CLOSED;
}
