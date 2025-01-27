import { Injectable } from '@angular/core';

/**
 * RoseActionService -
 * Translation key-service for rose ui-actions
 */
@Injectable({
  providedIn: 'root'
})
export class RoseNavigationKeysService {
  public readonly CLOSE_NAVIGATION_MENUITEM = 'menuitem-close-navigation';
  public readonly GO_TO_LOGIN_MENUITEM = 'menuitem-go-to-login';
}
