import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-warn-box-reset',

  imports: [CommonModule],
  template: `
    @let t = translationS();
    <div
      class="border-l-4 border-yellow-500 bg-yellow-100 p-2 text-yellow-700"
      role="alert"
    >
      <p>
        <span class="font-bold">{{ t?.caution }}</span>
        <br/>
        <span>{{ t?.caution_resets_following }}</span>
      </p>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkWarnBoxResetComponent {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "caution": "calc",
    "caution_resets_following": "calc",
  });
  protected translationS = toSignal(this.translation$, {initialValue: undefined})
}
