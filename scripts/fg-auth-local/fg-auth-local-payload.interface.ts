import { FgAuthLocalUserInterface } from './fg-auth-local-user.interface';

/**
 * FgAuthLocalPayloadInterface -
 *
 */
export interface FgAuthLocalPayloadInterface {
  /**
   * The filename used as token value, to be used
   * as token that can be revalidated
   */
  token: string;
  /** A salt value specific to the user */
  userSalt: string;
  /** A salt value specific to the application */
  sharedSalt: string;
  /** A users auth-local profile-data */
  profile: FgAuthLocalUserInterface;
}
