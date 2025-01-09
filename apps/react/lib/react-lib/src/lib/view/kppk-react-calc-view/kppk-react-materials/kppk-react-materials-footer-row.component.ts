import { ChangeDetectionStrategy, Component, computed, inject, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkFormlyModule } from '../../../module/kppk-formly-form/kppk-formly.module';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { KppkReactFieldsUtils } from '../kppk-react-fields-utils.service';

@Component({
  selector: 'kppk-react-footer-row',
  standalone: true,
  imports: [CommonModule, KppkFormlyModule],
  template: `
  <div *transloco="let t;" class="flex flex-row">
    <div class="flex-auto"></div>
    <!-- <pre>{{ results() | json}}</pre> -->
    <!-- @if( results() ) {
      @for (key of keys(); track $index) {
        <div>{{ key }} {{ t('calc.' + key)}} {{ results()[key].value }} {{ results()[key].unit }}</div>
      }
    } -->
    <div>{{ row()?.length }} {{ t('calc.item_count')}}</div>
  </div>
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
  public results = input<any>();
  public keys = computed( () => {
    return Object.keys( this.results )
  });
  

}
