import { FgEvent } from '../fg-event/fg-event.class';

/**
 * FgSWUpdateEvent -
 * Provide signatures for events dispatched by FgSWUpdateService
 */
export class FgSWUpdateEvent extends FgEvent {
  /** Event to be dispatched after a service-worker update has been performed */
  public static SW_UPDATE_ACTIVATED = 'Event_FgSWUpdateService_activated';
  /** Event to be dispatched when a service-worker update become available */
  public static VERSION_DETECTED = 'Event_FgSWUpdateService_version_detected';
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
