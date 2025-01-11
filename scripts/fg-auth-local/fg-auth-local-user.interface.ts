export interface FgAuthLocalUserInterface {
  id?: number;
  email: string;
  username?: string;
  password: string;
  /** 
   * String representing cookie-life-time used to calculate expiration data.
   * Valid values according to https://www.npmjs.com/package/timestring
   */
  cookieLifeTime: string;
  active: boolean;
}
