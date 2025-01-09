export interface FgSwPushSubscribtionInterface {
  endpoint: string;
  expirationTime: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
