import { FgNgxLoggerMethodeType } from '../type';

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
