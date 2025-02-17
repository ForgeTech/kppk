export type FgNgxLoggerMethodeType = 'trace' | 'debug' | 'info' | 'log' | 'warn' | 'error' | 'fatal';


/**
 * FgEnvironmentDevelopmentEventConfigInterface -
 * Interface describes the available for event loging
 * configuration
 */
export interface FgEnvironmentDevelopmentEventConfigInterface {
  /** Allows passing of event signatures that should be logged */
  eventsTolog: string[];
  /** Allows changing the level that is used for logging the events */
  level: FgNgxLoggerMethodeType;
}
