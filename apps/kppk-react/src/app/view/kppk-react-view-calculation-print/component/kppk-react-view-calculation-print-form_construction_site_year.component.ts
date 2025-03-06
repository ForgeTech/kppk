import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONSTRUCTION_SITE_ENERGY_USAGE_YEAR_ENERGY_USAGE_EXACT, FG_FORM_CONSTRUCTION_SITE_CONTEXT } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-view-calculation-print-form_construction_site_year',
  imports: [CommonModule],
  template: `
  @let t = translationsS();
  @let data = input_dataS();
  <table class="table">
    <tr>
      <th class="text-left" colspan="6">
      {{ t?.year_energy_usage }}
      </th>
    </tr>
  @for( year of data; track $index; let i = $index ) {
      <tr>
        <td class="text-left font-bold" colspan="6">
          {{ t?.year }} {{ i+1 }}
        </td>
      </tr>
      <tr>
        <th class="text-align">{{ t?.january_energy_usage }}</th>
        <th class="text-align">{{ t?.february_energy_usage }}</th>
        <th class="text-align">{{ t?.march_energy_usage }}</th>
        <th class="text-align">{{ t?.april_energy_usage }}</th>
        <th class="text-align">{{ t?.may_energy_usage }}</th>
        <th class="text-align">{{ t?.june_energy_usage }}</th>
      </tr>
      <tr>
        <td class="text-right">{{ year.january_energy_usage.value }} <span class="unit">{{ year.january_energy_usage.unit }}</span></td>
        <td class="text-right">{{ year.february_energy_usage.value }} <span class="unit">{{ year.february_energy_usage.unit }}</span></td>
        <td class="text-right">{{ year.march_energy_usage.value }} <span class="unit">{{ year.march_energy_usage.unit }}</span></td>
        <td class="text-right">{{ year.april_energy_usage.value }} <span class="unit">{{ year.april_energy_usage.unit }}</span></td>
        <td class="text-right">{{ year.may_energy_usage.value }} <span class="unit">{{ year.may_energy_usage.unit }}</span></td>
        <td class="text-right">{{ year.june_energy_usage.value }} <span class="unit">{{ year.june_energy_usage.unit }}</span></td>
      </tr>
      <tr>
        <th class="text-align">{{ t?.july_energy_usage }}</th>
        <th class="text-align">{{ t?.august_energy_usage }}</th>
        <th class="text-align">{{ t?.september_energy_usage }}</th>
        <th class="text-align">{{ t?.october_energy_usage }}</th>
        <th class="text-align">{{ t?.november_energy_usage }}</th>
        <th class="text-align">{{ t?.december_energy_usage }}</th>
      </tr>
      <tr>
        <td class="text-right">{{ year.july_energy_usage.value }} <span class="unit">{{ t?.[year.july_energy_usage.unit] }}</span></td>
        <td class="text-right">{{ year.august_energy_usage.value }} <span class="unit">{{ t?.[year.august_energy_usage.unit] }}</span></td>
        <td class="text-right">{{ year.september_energy_usage.value }} <span class="unit">{{ t?.[year.september_energy_usage.unit] }}</span></td>
        <td class="text-right">{{ year.october_energy_usage.value }} <span class="unit">{{ t?.[year.october_energy_usage.unit] }}</span></td>
        <td class="text-right">{{ year.november_energy_usage.value }} <span class="unit">{{ t?.[year.november_energy_usage.unit] }}</span></td>
        <td class="text-right">{{ year.december_energy_usage.value }} <span class="unit">{{ t?.[year.december_energy_usage.unit] }}</span></td>
      </tr>
    }
  </table>
  
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormConstructionSiteYearComponent {
  public $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "april_energy_usage": "calc",
    "august_energy_usage": "calc",
    "december_energy_usage": "calc",
    "february_energy_usage": "calc",
    "january_energy_usage": "calc",
    "july_energy_usage": "calc",
    "june_energy_usage": "calc",
    "march_energy_usage": "calc",
    "may_energy_usage": "calc",
    "november_energy_usage": "calc",
    "october_energy_usage": "calc",
    "september_energy_usage": "calc",
    "year_energy_usage": "calc",
    "year": "calc",
    "kWh": "calc",
  });
  protected translationsS = toSignal(this.translations$, {initialValue: undefined});

  public input_dataS = input.required<CONSTRUCTION_SITE_ENERGY_USAGE_YEAR_ENERGY_USAGE_EXACT>({alias: 'data'});
}
