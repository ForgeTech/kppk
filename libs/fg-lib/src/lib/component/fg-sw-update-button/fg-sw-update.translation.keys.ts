import { translation_key } from './../../util/fg-translation.utils';
import { Injectable } from '@angular/core';
/** Translation key-file for sw update-available-component */
@Injectable({ providedIn: 'root' })
export class FgSWUpdateTranslationKeys {
  public readonly TOOLTIP = translation_key('sw_update_available_tooltip');
  public readonly BUTTON_LABEL = translation_key('sw_update_button_label');
  /** CONSTRUCTOR */
  constructor() {}
}
