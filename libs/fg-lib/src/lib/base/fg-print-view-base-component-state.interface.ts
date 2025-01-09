/**
 * FgPrintViewBaseComponentStateInterface -
 * Properties for managing state of print view base component
 */
export interface FgPrintViewBaseComponentStateInterface {
  /** Property to check for available print-view, used in compinaton
   * with fg-print-service to make print-target url for view available
   * to the service.
   */
  printViewUrl: false | string;
}
