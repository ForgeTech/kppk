import { Injectable } from '@angular/core';
import { translation_key } from 'src/app/modules/fg-shared/utils/fg-translation/fg-translation.utils';
/**
 * Translation-Key File for material application-view
 */
@Injectable({ providedIn: 'root' })
export class FgUnloadGuardTranslationKeys {
  public readonly DATA_LOSS_WARNING = translation_key('fg_unload_guard_data_loss_warning');
  /**
   * CONSTRUCTOR
   */
  constructor() {}
}
