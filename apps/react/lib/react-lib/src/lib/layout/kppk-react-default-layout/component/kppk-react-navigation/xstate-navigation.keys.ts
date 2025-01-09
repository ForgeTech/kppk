import { Injectable } from '@angular/core';
import { translation_key } from '@kppk/fg-lib';

/**
 * RoseActionService -
 * Translation key-service for rose ui-actions
 */
@Injectable({
  providedIn: 'root'
})
export class RoseNavigationKeysService {
  public readonly CLOSE_NAVIGATION_MENUITEM = translation_key( 'menuitem-close-navigation' );
  public readonly GO_TO_LOGIN_MENUITEM = translation_key( 'menuitem-go-to-login' );
  /** CONSTRUCTOR */
  constructor() { }
}
