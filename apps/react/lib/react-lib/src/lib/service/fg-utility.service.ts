import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  protected $translate = inject(TranslocoService);

  public translateEnum(enumObject: object, prefix = 'missing') {
    const object: { [key: string]: string } = { ...enumObject };

    return Object.keys(object)
      .filter(key => isNaN(+key))
      .map(key => {
        const translationKey = `${prefix}.${key.toLowerCase()}`;
        return {
          label: this.$translate.translate(translationKey),
          value: object[key],
        };
      });
  }

  public translate(key: string, prefix = 'missing') {
    return this.$translate.selectTranslate(`${prefix}.${key}`);
  }
}
