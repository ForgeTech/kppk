/**
 * FgAuthErrorLogoutEvent -
 * Provides the event-constants used to Flag-Application
 */

export class FgAuthErrorLogoutInterceptorEvent {
  /**
   * Event to be thrown when AuthErrorInterceptor detects an authorization error on http-request
   */
  public static readonly HTTP_AUTH_ERROR: string = 'Fg-auth-error-logout-interceptor-http-auth-error';
  /** Constructor */
  // constructor() {}
}
