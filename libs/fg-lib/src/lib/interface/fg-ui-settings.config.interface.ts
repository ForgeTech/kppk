import { PREFERED_COLOR_SCHEME } from '../service/fg-prefers-color-scheme/fg-prefers-color-scheme.service';

/**
 * FgUiSettingsConfigInterface -
 * Interface defines common set of user-specific configuration
 */
export interface FgUiSettingsConfigInterface {
  /**
   * Languguage to be used
   */
  lang: string;
  /**
   * Indicates that the text-direction of the application
   * should be switched from right-to-left to left-to-right
   */
  textDirection: 'right-to-left' | 'left-to-right';
  /**
   * Should be used to adapt the application for left-handed
   * people on mobile-phones
   */
  uiLeftHanded: boolean;
  /**
   * Flag indicates that user accepted cookie usage,
   * for analytics purposes
   */
  acceptedCookies: boolean;
  /**
   * Flag indicating the prefered colortheme
   */
  theme: PREFERED_COLOR_SCHEME;
}
