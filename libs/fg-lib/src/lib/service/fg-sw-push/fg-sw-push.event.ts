import { Injectable } from '@angular/core';
import { FgEvent } from '../../class/fg-event.class';
import { UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker';

/**
 * FgSWPushEvent -
 * Provide signatures for events dispatched by FgSWPushService
 */
export class FgSWPushEvent extends FgEvent {
  /** Event to be dispatched when user subscribes from sw-push service */
  public static SUBSCRIBED = 'Event_FgSWPushService_subscribed';
  /** Event to be dispatched when user subscribes from sw-push service */
  public static SUBSCRIPTION_UPDATED = 'Event_FgSWPushService_subscription_updated';
  /** Event to be dispatched when user unsubscribes from sw-push service */
  public static UNSUBSCRIBE = 'Event_FgSWPushService_unsubscribe';
  /** Event to be dispatched when messages are received from sw-push service */
  public static MESSAGE_RECEIVED = 'Event_FgSWPushService_message_received';
  /** CONSTRUCTOR */
  // constructor(
  //   signatur: string,
  //   dispatcher: FgSWUpdateService,
  //   data: any = false
  // ) {
  //   super(
  //     signatur,
  //     dispatcher,
  //     data
  //   );
  // }
}
