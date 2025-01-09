import { FgAuthUserInterface, FgAuthTokenInterface } from './fg-auth.abstract.service';
import { Observable } from 'rxjs';

/**
 * FgAuthServiceInterface -
 *
 */
export interface FgAuthServiceInterface {
  /** Flag signaling if user is currently authorized with the application */
  isAuthorized$: Observable<boolean>;
  /**
   * Used to check if entity can be authenticated by authentification-service using passed credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  authorize(options?: any): Observable<any | false>;
  /**
   * Used to update/change the password of an authenticated entity
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  changePassword(options?: any): Observable<any | false>;
  /**
   * Used in cases of lost credentials to reset an unauthorized entities password to a value specified by authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  resetPassword(options?: any): Observable<any | false>;
  /**
   * Used to add credentials for a new entity with authentification-privilages to the authentification-service
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  registerUser(options?: any): Observable<any | false>;
  /**
   * Used to receive an entities locally stored set of credentials
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  getStoredCredentials(options?: any): Observable<FgAuthUserInterface | false>;
  /**
   * Used to receive an entities locally stored set of authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  getStoredAuthData(options?: any): Observable<FgAuthTokenInterface | false>;
  /**
   * Used to invalidate/remove an entites current authentification-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  logout(options?: any): void;
  /**
   * Used to receive an updated set of authorization-data
   * @param options (OPTIONAL) Object containing any properties needed for implementation with specific authentification-service
   */
  refreshAuthData(options?: any): Observable<FgAuthTokenInterface | false>;
}
