/**
 * FgNotificationEvent -
 * Provide signatures for events dispatched by FgNotificationEvent
 */
export class FgNotificationEvent {
  /** Event to be dispatched when permission is changed by the user */
  public static PERMISSION_CHANGE = 'Event_FgNotificationService_permission_change';
  /** Event to be dispatched when notification is received via service-worker push-subscribtion */
  public static MESSAGE_RECEIVED = 'Event_FgNotificationService_message_received';
  /** Event to be dispatched when permission is requested by the application */
  public static PERMISSION_REQUESTED = 'Event_FgNotificationService_permission_requested';
  /** Event to be dispatched when permission is requested by the application */
  public static ACTION = 'Event_FgNotificationService_action';
  /** CONSTRUCTOR */
  constructor() {}
}
