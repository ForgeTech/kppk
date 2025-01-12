import { FgUserRoleConfigInterface } from './fg-user-role.config.interface';
import { FgUiSettingsConfigInterface } from './fg-ui-settings.config.interface';
import { FgUserConfigInterface } from './fg-user.config.interface';
import { FgAppSettingsInterface } from './fg-app-settings.config.interface';

/**
 * FgAppInterface -
 * Interface describes a common application data configuration
 */
export interface FgAppConfigInterface<
  U extends FgUserConfigInterface<FgUserRoleConfigInterface<any>, FgUiSettingsConfigInterface>,
  C extends FgAppSettingsInterface<FgUiSettingsConfigInterface>,
  M
> {
  /**
   * Unique identifier within a table -
   * used with remote database
   */
  id?: number;
  /**
   * Property to define the type of the configuration -
   * used with remote database
   */
  __typename?: string;
  /** Configuration data related to active-user */
  user?: U;
  /** Configuration data used to setup the application */
  config: C;
  /**
   * Configuration data providing the initial state of the
   * application model
   */
  model?: M;
}
