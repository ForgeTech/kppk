import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEMOLISH_DISPOSAL_FORM_MATERIAL } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-results-demolish-disposal',
  imports: [CommonModule],
  templateUrl: './kppk-react-results-demolish-disposal.component.html',
  styleUrl: './kppk-react-results-demolish-disposal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactResultsDemolishDisposalComponent {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "demolish_disposal": "calc",
    "co2_transport": "calc",
    "kgCo2": "units",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});

  public form = input.required<DEMOLISH_DISPOSAL_FORM_MATERIAL>();
}
