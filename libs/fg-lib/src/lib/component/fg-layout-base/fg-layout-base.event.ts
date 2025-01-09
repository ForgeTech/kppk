import { FgBaseService } from '../../base/fg-base.service';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgEventGeneric } from '../../service/fg-event/fg-event.class';
import { FgLayoutBaseEventOptionsInterface } from './fg-layout-base-event-options.interface';
import * as EVENTS from './fg-layout-base.event.const';

type FgLayoutBaseEventsModule = typeof EVENTS;
type FgLayoutBaseEventType = FgLayoutBaseEventsModule[keyof FgLayoutBaseEventsModule];

/**
 * FgLayoutBaseEvent -
 * Class containing the events to be dispatched/interact with
 * component implementing FgLayoutBaseComponent
 */
export class FgLayoutBaseEvent extends FgEventGeneric<
  FgLayoutBaseEventType,
  FgComponentBaseComponent | FgBaseService | object | false,
  FgLayoutBaseEventOptionsInterface | false
> {
  /** Event to be dispatched when user installs pwa */
  public static readonly SCROLL_TO = EVENTS.SCROLL_TO;
}
