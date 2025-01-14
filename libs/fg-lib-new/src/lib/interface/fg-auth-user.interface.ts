/** Interface for defining user-login data */
export interface FgAuthUserInterface {
  id?: number;
  username: string;
  password: string;
  token?: string;
  cache: boolean;
}

/** Interface for defining user-login data */
export interface FgAuthChangePasswordInterface {
  id?: number;
  username: string;
  password: string;
  passwordRepeat: boolean;
}

/** Interface for the auth-token object, received from server */
export interface FgAuthTokenInterface {
  username: string;
  token: string | false;
  forcePasswordChange: boolean;
}