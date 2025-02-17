import { FgPrintViewBaseComponentStateInterface } from './fg-print-view-base-component-state.interface';

/**
 * FgViewBaseComponentStateInterface -
 * Properties for managing state of view base component
 */
export interface FgViewBaseComponentStateInterface
  extends FgPrintViewBaseComponentStateInterface {
  viewBase: boolean;
}
