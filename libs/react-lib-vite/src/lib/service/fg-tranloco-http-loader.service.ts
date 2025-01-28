import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  protected $http = inject(HttpClient);

  /** Methode to return imported translation */
  getTranslation(langPath: string) {
    return this.$http.get<Translation>(`i18n/${langPath}.json`);
  }
}
