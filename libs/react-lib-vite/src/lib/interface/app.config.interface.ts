import { FgAppConfigInterface } from '@kppk/fg-lib-new';
import { AppModelInterface } from './app.model.interface';
/**
 * AppConfigInterface -
 * Interface describes a common application data configuration
 */
export interface AppConfigInterface
  extends FgAppConfigInterface<any, any, AppModelInterface> {}
