import { translation_key } from './../../util/fg-translation.utils';
import { Injectable } from '@angular/core';
/**
 * Translation key-file for vorlonjs debug-server connection
 */
@Injectable({ providedIn: 'root' })
export class FgModalTranslationKeys {
  public readonly BUTTON_LABEL_CLOSE = translation_key('modal_button_label_close');
  public readonly BUTTON_LABEL_CANCEL = translation_key('modal_button_label_cancel');
  public readonly BUTTON_LABEL_NEXT = translation_key('modal_button_label_next');
  public readonly BUTTON_LABEL_PREV = translation_key('modal_button_label_prev');
  public readonly BUTTON_LABEL_CONTINUE = translation_key('modal_button_label_continue');
  /** CONSTRUCTOR */
  constructor() {}
}
