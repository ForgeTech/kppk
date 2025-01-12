import { NgxLoggerMethodeType } from '../../../../fg-lib/src/lib/type';

/**
 * FgEnvironmentApiConfigInterface -
 * Interface describes the available properties that can be configured
 * for overrides in http interceptors
 */
export interface FgEnvironmentApiConfigInterface {
  /** Allows overriding the baseUrl of the request
   * CAUTION: FgUrlOverrideInterceptor
   */
  urlOverrides?: { match: string; replace: string }[];
  /**
   * Contains httpHeaders that should be added to
   * requests.
   * CAUTION! See class FgHttpHeaderInterceptor
   */
  httpHeaders?: { header: string; value: string }[];
}
