import { FgEvent } from './fg-event.class';

// import {
//   IFgActionEntityInterface,
// } from '../../../../../fg-shared/interface/fg-interfaces.export';

/**
 * FgAction -
 * This class is representing a certain interaction that the user
 * can perform on the containing component
 */
export class FgAction /* implements IFgActionEntityInterface */ {
  /**
   * CONSTRUCTOR
   */
  constructor(
    /**
     * The event to dispatch on action activation
     */
    public event: FgEvent,
    /**
     * The code for coloring the angular-material component
     * to dispatch this action, like 'primary', 'accent', 'warning'
     */
    public color: string,
    /**
     * The label that should be displayed for this action
     */
    public label: string | Function,
    /**
     * Holds icon-key values to display icons using
     * mat-icon component
     * TODO: Implement any as an object containing multiple
     * 'state'-keys and the icon-name to be displayed for
     * this state
     */
    public icon: string | Function,
    /**
     * Holds the keyboard-navigation action-shortcut key-values/combinations
     * to use to activate this action
     */
    public key?: string,
    /**
     * Holds reference to the function that should be performed to
     * validate if action should be disabled
     */
    public disabled?: (any) => boolean
  ) {}
}
