import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_HEATING_SYSTEM_DATA } from '@kppk/react-lib';
import { z } from 'zod';
import { unit_kilogram_co2_parser } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

export const kppk_react_results_material_sums_parser = z.object({
  co2_sum_transport: unit_kilogram_co2_parser,
  co2_sum: unit_kilogram_co2_parser,
  co2_sum_oeko: unit_kilogram_co2_parser,
});

export type KPPK_REACT_RESULTS_MATERIAL_SUMS = z.infer<
  typeof kppk_react_results_material_sums_parser
>;

@Component({
  selector: 'kppk-react-results-material-sums',
  imports: [CommonModule],
  template: `
    @let t = translationS();
    <table class="table-result col-span-6 table">
      <thead>
        <tr>
          <th colspan="2">
            <h2>{{ t?.material }}</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ t?.co2_transport }}</td>
          <td class="text-right">
            {{ data().co2_sum_transport.value | number : '1.2-2' }}
            <span class="unit inline-block w-[75px] text-left">{{
              t?.[ data().co2_sum_transport.unit]
            }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ t?.co2_creation }}</td>
          <td class="text-right">
            {{ data().co2_sum.value | number : '1.2-2' }}
            <span class="unit inline-block w-[75px] text-left">{{
              t?.[ data().co2_sum_transport.unit]
            }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ t?.co2_oeko_creation }}</td>
          <td class="text-right">
            {{ data().co2_sum_oeko.value | number : '1.2-2' }}
            <span class="unit inline-block w-[75px] text-left">{{
              t?.[ data().co2_sum_transport.unit]
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactResultsMaterialSumsComponent {
    protected $translate = inject(FgTranslate);
    protected translation$ = this.$translate.get_translations$({
      "material": "calc",
      "co2_transport": "calc",
      "co2_creation": "calc",
      "co2_oeko_creation": "calc",
      "kgCo2": "units"
    })
    protected translationS = toSignal(this.translation$, {initialValue: undefined});
  public data = input.required<KPPK_REACT_RESULTS_MATERIAL_SUMS>();
}
