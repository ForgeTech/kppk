import { SimpleChanges } from '@angular/core';

//  export FgEvent = FgEventGeneric<FgComponentBaseComponent | FgBaseService | object | false, object | false>

/**
 * FgEventGeneric -
 * This class is used as generic base for forge internal messaging events
 */
// @Injectable({ providedIn: 'root' })
export abstract class FgEventGeneric<
  SIGNATURE extends string,
  DISPATCHER extends any | false,
  DATA
> {
  /** CONSTRUCTOR */
  constructor(
    /** The unique string const signuature used to identify the event */
    public readonly signature: SIGNATURE,
    /**
     * Meant to hold a reference to the class-instance dispatching
     * the event
     */
    public readonly dispatcher: DISPATCHER | false = false,
    /** Meant to hold the possible payload of an event */
    public readonly data: DATA | false = false
  ) {}
}
/**
 * FgEvent -
 * This class is used as basic forge internal messages interface
 */
export class FgEvent extends FgEventGeneric<
  string,
  any | undefined,
  object | string | number | boolean
> {}

/**
 * FgLiveCycleEvent -
 * Type to be used for events dispatched on generic live-cycle methode-calls
 */
export class FgLiveCycleEvent extends FgEventGeneric<
  string,
  any | undefined,
  object | undefined
> {}

/**
 * FgBaseComponentOnChangesEvent -
 * Type to be used for event on ngOnChanges live-cycle methode-call
 */
export class FgLiveCycleOnChangesEvent extends FgEventGeneric<
  string,
  any | undefined,
  SimpleChanges
> {}
