/**
 * Interface for FgNotification server-connection-settings
 */
export interface FgNotificaionInterface {
  device?: string;
  fingerprint?: string;
  endpoint: string;
  expirationTime: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
/**
 * Interface to be used with environment-file to add configuration for
 * notification-permission delay
 */
export interface FgNotificaionConfigInterface {
  requestNotificationDelay: 'manual' | number;
  detectNotificationChangeDelay?: number;
}
