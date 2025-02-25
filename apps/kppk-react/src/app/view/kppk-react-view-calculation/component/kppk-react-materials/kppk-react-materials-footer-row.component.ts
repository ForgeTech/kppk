import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkFormlyModule } from '@kppk/react-lib';
import { KppkReactFieldsUtils } from '../../service/kppk-react-fields-utils.service';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-footer-row',

  imports: [CommonModule, KppkFormlyModule],
  template: `
    @let t = translationS();
    <div class="flex flex-row">
      <div class="flex-auto"></div>
      <div>{{ row()?.length }} {{ t?.item_count }}</div>
    </div>
  `,
  styles: `
  :host {
    display: block;
  }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactMaterialsFooterRowComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "item_count": "calc",
  });
  protected translationS = toSignal(this.translations$, {initialValue: undefined})

  public row = input.required<any>();
  public results = input<any>();
  public keys = computed(() => {
    return Object.keys(this.results);
  });
}
