import { ChangeDetectionStrategy, Component, inject, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkFormlyModule } from '../../../module/kppk-formly-form/kppk-formly.module';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { KppkReactFieldsUtils } from '../kppk-react-fields-utils.service';

@Component({
  selector: 'kppk-react-footer-row',
  
  imports: [CommonModule, KppkFormlyModule],
  template: `
  sfdsafds
  <div>{{ row()?.length}}</div>
  `,
  styles:  `
  :host {
    display: block;
  }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:  [provideTranslocoScope( 'general', 'calc' )]
})
export class KppkReactMaterialsFooterRowComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(TranslocoService);

  public row = input.required<any>();
  

}
