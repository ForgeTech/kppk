import { Injectable } from '@angular/core';
/**
 * FgOfflineErrorInterceptorEvent -
 * Provides the event-constants used by FgOfflineErrorInterceptor
 */

export class FgOfflineErrorInterceptorEvent {
  /** Event to be thrown when AuthErrorInterceptor detects that network is offline */
  public readonly HTTP_OFFLINE: string = 'fg-offline-error-interceptor-http-offline';
  /** Constructor */
  // constructor() {}
}
