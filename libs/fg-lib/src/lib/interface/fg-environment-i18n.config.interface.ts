import { TranslocoConfig } from '@jsverse/transloco';

/**
 * FgEnvironmentI18nConfigInterface -
 * Interface describes the available for internationalization (i18n)
 * configuration
 */
export interface FgEnvironmentI18nConfigInterface extends TranslocoConfig {
  /**
   * Path to the folder where 'flag'-icons for fg-language-switch component are
   * located
   */
  assetPath: string;
}
