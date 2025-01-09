/**
 * FgEnvironmentRequestConfigInterface -
 * Interface describes the available properties that can be configured
 * for overrides in http interceptors
 */
export interface FgEnvironmentRequestConfigInterface {
  /** Allows providing a baseUrl for api requests */
  apiBaseUrl: string;
  /** Allows overriding request urls
   * CAUTION: Requires FgUrlOverrideInterceptor to be configured on angular http-client
   */
  urlOverrides?: { match: string; replace: string }[];
  /**
   * Contains httpHeaders that should be added to
   * requests.
   * CAUTION! Requires FgHttpHeaderInterceptor to be configured on angular http-client
   */
  httpHeaders?: { header: string; value: string }[];
}
