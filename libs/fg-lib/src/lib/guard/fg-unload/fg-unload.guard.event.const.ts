/** Event to be dispatched when view can deactivate route */
export const CAN_DEACTIVATE = 'Event_FgUnloadGuard_can_deactivate';
/** Event to be dispatched when view cannot deactivate route */
export const CANNOT_DEACTIVATE = 'Event_FgUnloadGuard_cannot_deactivate';
/**
 * Event to be dispatched when view wants to restart navigation to last navigation-start url
 * after it was interrupted by unload-guard - will automatically allow navigation from
 * previously blocked view
 */
export const CONTINUE = 'Event_FgUnloadGuard_continue';
