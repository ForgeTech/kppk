import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FG_FORM_HEATING_SYSTEM_CONTEXT } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-view-calculation-print-form_heating_system',
  imports: [CommonModule],
  template: `
    @let t = translationsS();
    @let data = input_dataS().value;
    <h2>{{ t?.step_building_operations_headline }}</h2>
    <table class="table">

      <tr>
        <th colspan="2"  class="text-lg">
          {{ t?.heating_system }}
        </th>
        <th colspan="2">
          {{ t?.heating_system_settings }}
        </th>
      </tr>


      <tr>
        <td>
          {{ t?.heating_system_system_select }}
        </td>
        <td>
          {{ get_heating_system_select_translation( data.system_select.value) }}
          <span class="unit"></span>
        </td>
        <td colspan="2"></td>
      </tr>

      @if(data.system_select.value !== 'custom') {
        <tr>
          <td>
            {{ t?.heating_system_system_co2_duration }}
          </td>
          <td>
            {{ data.system_co2_duration.value }}
            <span class="unit">{{ t?.[data.system_co2_duration.unit] }}</span>
          </td>
          <td>
            {{ t?.heating_system_system_duration }}
          </td>
          <td>
            {{ data.system_duration.value }}
            <span class="unit">{{ t?.[data.system_duration.unit] }}</span>
          </td>
        </tr>
      }

      <tr>
        <td>
          {{ t?.heating_system_system_co2_year}}
        </td>
        <td>
          {{ data.system_co2_year.value }}
          <span class="unit">{{ t?.[data.system_co2_year.unit] }}</span>
        </td>
        <td>
          {{ t?.heating_system_calc_usage }}
        </td>
        <td>
          {{ data.calc_usage.value }}
          <span class="unit">{{ t?.[data.calc_usage.unit] }}</span>
        </td>
      </tr>
      
    </table>
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormHeatingSystemComponent {
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "step_building_operations_headline": "calc",
    "heating_system_settings": "calc",
    "heating_system_system_select": "calc",
    "heating_system_system_co2_duration": "calc",
    "heating_system_system_duration": "calc",
    "heating_system_system_co2_year": "calc",
    "heating_system_calc_usage": "calc",
    "heating_system": "calc",
    "heating_system_air_water": "calc",
    "heating_system_district": "calc",
    "heating_system_gas": "calc",
    "heating_system_geothermal": "calc",
    "heating_system_pellets": "calc",
    "year": "units",
    "tCo2/xyear": "units",
    "tCo2/year": "units",
  });
  protected translationsS = toSignal(this.translations$, {initialValue: undefined});

  protected get_heating_system_select_translation( system_type: string ): string {
    const trans = this.translationsS();
    const result = trans?.[ 'heating_system_' + system_type as keyof typeof trans ] ?? 'missing_translation';
    return result;
  } 

  public input_dataS = input.required<FG_FORM_HEATING_SYSTEM_CONTEXT>({alias: 'data'});
}
