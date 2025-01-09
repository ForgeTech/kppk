import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  /** CONSTRUCTOR */
  constructor(protected http: HttpClient) {}
  /** Methode to return imported translation */
  getTranslation(langPath: string) {
    return this.http.get<Translation>(`./assets/i18n/${langPath}.json`);
  }
}
