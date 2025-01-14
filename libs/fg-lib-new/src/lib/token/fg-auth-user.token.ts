/** Key used for setting the cookie containing user-login data */
export const FG_AUTH_CREDENTIALS_STORAGE_KEY = 'fg-auth-user';

/** Defines the key used for storing the authentification-token in browser-storage */
export const FG_AUTH_TOKEN_STORAGE_KEY = 'fg-auth-token';

import { InjectionToken } from '@angular/core';

/**
 * Injection-Token used to provide the path to 'home' view
 */
export const FG_ROUTING_HOME_PATH = new InjectionToken<string>('');

/**
 * Injection-Token used to provide the path to 'login' view
 */
export const FG_ROUTING_LOGIN_PATH = new InjectionToken<string>('');
/**
 * Injection-Token used to provide the path to 'password change' view
 */
export const FG_ROUTING_PASSWORD_CHANGE_PATH = new InjectionToken<string>('');
/**
 * Injection-Token used to provide the path to 'logout' view
 */
export const FG_ROUTING_LOGOUT_PATH = new InjectionToken<string>('');
