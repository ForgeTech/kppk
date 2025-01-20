import { Portal } from '@angular/cdk/portal';
/**
 * FgLayoutDrawerTriggerOptionsInterface -
 * Available options to pass to fg-layout-drawer trigger
 */
export interface FgLayoutDrawerOpenDrawerOptionsInterface {
  hasBackdrop?: boolean;
  mode: 'over' | 'push' | 'side';
  portalContent?: Portal<any>;
  position: 'start' | 'end';
  target?: string;
}
