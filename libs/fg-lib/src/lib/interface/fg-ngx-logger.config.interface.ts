import { NgxLoggerLevel } from 'ngx-logger';

/**
 * NgxLoggerConfigInterface -
 * Interface describes the available options for ngxLogger setup
 */
export interface FgNgxLoggerConfigInterface {
  /** Only log messages of this level or higher (OFF disables the logger for the client). */
  level: NgxLoggerLevel;
  /** Disables console logging, while still alerting the log monitor. */
  disableConsoleLogging?: boolean;
  /** Only send log messages of this level or higher to the server (OFF disables the logger for the server). */
  serverLogLevel?: NgxLoggerLevel;
  /** URL to POST logs. */
  serverLoggingUrl?: false | string;
  /** the response type of the HTTP Logging request. */
  httpResponseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
  /** Enables manual parsing of Source Maps
   * Note: In order for the enableSourceMaps flag to work,
   * your app must generate the source maps during the build process.
   * If your using AngularCli you can generate Source Maps by setting
   * "sourceMap": {"scripts": true} (or for older version of angularCli "sourceMap": true)
   * in your angular.json
   */
  enableSourceMaps?: boolean;
  /** Format for the timestamp displayed with each log message.
   * Can be any of the classic formatting options from the Angular DatePipe.
   */
  timestampFormat?:
    | 'short'
    | 'medium'
    | 'long'
    | 'full'
    | 'shortDate'
    | 'mediumDate'
    | 'longDate'
    | 'fullDate'
    | 'shortTime'
    | 'mediumTime'
    | 'longTime'
    | 'fullTime';
}
