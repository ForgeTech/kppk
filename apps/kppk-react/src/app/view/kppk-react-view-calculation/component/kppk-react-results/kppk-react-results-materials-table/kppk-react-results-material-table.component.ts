import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORM_MATERIALS_RESULT } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-results-material-table',

  imports: [CommonModule],
  templateUrl: './kppk-react-results-material-table.component.html',
  styleUrl: './kppk-react-results-material-table.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactResultsMaterialTableComponent {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "name": "calc",
    "co2_transport": "calc",
    "gwp": "calc",
    "gwp_oeko": "calc",
    "kgCo2": "units",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});

  public rows_s = input.required<FORM_MATERIALS_RESULT>({ alias: 'results' });
}
