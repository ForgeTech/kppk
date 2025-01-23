import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_HEATING_SYSTEM_DATA } from '@kppk/react-lib';
import { z } from 'zod';
import { unit_kilogram_co2_parser } from '@kppk/react-lib';

export const kppk_react_results_material_sums_parser = z.object({
  co2_sum_transport: unit_kilogram_co2_parser,
  co2_sum: unit_kilogram_co2_parser,
  co2_sum_oeko: unit_kilogram_co2_parser,
});

export type KPPK_REACT_RESULTS_MATERIAL_SUMS = z.infer<typeof kppk_react_results_material_sums_parser>;

@Component({
  selector: 'kppk-react-results-material-sums',
  
  imports: [
    CommonModule,
    TranslocoModule
  ],
  template: `
  <table  *transloco="let t;" class="table-result col-span-6 table">
    <thead>
        <tr>
            <th colspan="2">
                <h2>Gebäudematerialien</h2>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ t('calc.co2_transport') }}</td>
            <td class="text-right">{{ data().co2_sum_transport.value | number:'1.2-2' }} <span class="unit inline-block w-[75px] text-left">{{ t('calc.' + data().co2_sum_transport.unit ) }}</span></td>
        </tr>
        <tr>
            <td>{{ t('calc.co2_creation') }}</td>
            <td class="text-right">{{ data().co2_sum.value | number:'1.2-2' }} <span class="unit inline-block w-[75px] text-left">{{ t('calc.' + data().co2_sum.unit ) }}</span></td>
        </tr>
        <tr>
            <td>{{ t('calc.co2_oeko_creation') }}</td>
            <td class="text-right">{{ data().co2_sum_oeko.value | number:'1.2-2' }} <span class="unit inline-block w-[75px] text-left">{{ t('calc.' + data().co2_sum_oeko.unit ) }}</span></td>
        </tr>
    </tbody>
  </table>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('calc')
  ]
})
export class KppkReactResultsMaterialSumsComponent {

  public data = input.required<KPPK_REACT_RESULTS_MATERIAL_SUMS>();
}


