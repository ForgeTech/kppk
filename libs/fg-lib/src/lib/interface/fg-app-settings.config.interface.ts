import { FgUiSettingsConfigInterface } from './fg-ui-settings.config.interface';

/**
 * FgAppSettingsInterface -
 * Interface holds common setup for application settings configuration
 */
export interface FgAppSettingsInterface<U extends FgUiSettingsConfigInterface> {
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
  /**
   * Contains default (user)settings for unauthorized users
   */
  settings: U;
}
