/**
 * FgEnvironmentServiceWorkerConfigInterface -
 * Interface describes the available properties that can be configured
 * for usage of (angular) service-worker features
 */
export interface FgEnvironmentServiceWorkerConfigInterface {
  /** Enable/Disable use of service-worker */
  enabled: boolean;
  /** Allows to configure and alternative service-worker file (possibly replacing/extending the default angular service-worker)
   * by holding the path to the service-worker file
   */
  script?: string;
  /** Allows to config the public key to be used for service-worker push notification service */
  pushServerPublicKey?: string;
  /** Allows defining and update-check interval that triggers servicw-worker update-detection periodically */
  updateCheckInterval?: number;
  /** Allows defining a deley before automatic window reload after update confirmation  */
  delayWindowReload?: number;
  /** Allows defining a deley before automatic window reload after update confirmation  */
  registrationStrategy?: string;
}
