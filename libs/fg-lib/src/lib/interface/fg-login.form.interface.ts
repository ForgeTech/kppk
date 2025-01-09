/**
 * DevelopmentInterface -
 * Interface describes the available development-options
 * that can be proivide using the environment configuration
 */
export interface FgLoginFormInterface {
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
  /** Contains username for currently logged in user */
  username: string;
  /** Allows username for currently logged in user */
  password: string;
  /**
   *
   */
  cache: boolean;
}
