import { FgAuthTokenInterface, FgAuthUserInterface } from './fg-auth-user.interface';
import { FgEnvironmentDevelopmentEventConfigInterface } from './fg-environment-develpment-event.config.interface';

/**
 * DevelopmentInterface -
 * Interface describes the available development-options
 * that can be proivide using the environment configuration
 */
export interface FgDevelopmentConfigInterface {
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
  /** Flag that indicated development-options should be used */
  enabled: boolean;
  /** Flag that should be used to bypass initial authentication
   * CAUTION! Doesn't enable features that require a auth-token, like
   * requests to secured service-endpoints
   */
  authorize?: {
    credentials: FgAuthUserInterface;
    token?: FgAuthTokenInterface;
  };
  event?: FgEnvironmentDevelopmentEventConfigInterface;
  /**
   * Contains httpHeaders that should be added to
   * requests. For example - allows passing authorization-headers
   * for development-environments
   */
  httpHeaders?: { header: string; value: string }[];
  /** Allows setting location of vorlonjs debug-server
   * like: https://localhost:1337/vorlon.js
   */
  vorlon?: string;
}
