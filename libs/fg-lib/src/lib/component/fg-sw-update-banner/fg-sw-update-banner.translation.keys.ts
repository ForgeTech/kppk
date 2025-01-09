import { translation_key } from './../../util/fg-translation.utils';
import { Injectable } from '@angular/core';
/** Translation key-file for sw update-available-component */
@Injectable({ providedIn: 'root' })
export class FgSWUpdateBannerTranslationKeys {
  public readonly TOOLTIP = translation_key('sw_update_banner_available_button_tooltip');
  public readonly BUTTON_LABEL = translation_key('sw_update_banner_button_label');
  /** CONSTRUCTOR */
  constructor() {}
}
