import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FG_FORM_CONSTRUCTION_SITE_CONTEXT } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-view-calculation-print-form_construction_site',
  imports: [CommonModule],
  template: `
    @let t = translationsS();
    @let data = input_dataS()?.value;
    @if(data) {
      <table class="table">
        <tbody>
          <tr>
            <td colspan="1">{{ t?.energy_usage_settings }}<td>
          </tr>
          @let energy_usage_power_type = data.energy_usage_settings.energy_usage_power_type;
          <tr>
            <td>{{ t?.energy_usage_power_type }}</td>
            <td>
              {{ energy_usage_power_type.value }}
              <span class="unit">{{ energy_usage_power_type.unit }}</span>
            </td>
          </tr>
          @let energy_usage_build_type = data.energy_usage_settings.energy_usage_build_type;
          <tr>
            <td>{{ t?.energy_usage_build_type }}</td>
            <td>
              {{ energy_usage_build_type.value }}
              <span class="unit">{{ energy_usage_build_type.unit }}</span>
            </td>
          </tr>
          @let energy_usage_calculation_type = data.energy_usage_settings.energy_usage_calculation_type;
          <tr>
            <td>{{ t?.energy_usage_calculation_type }}</td>
            <td>
              {{ energy_usage_calculation_type.value }}
              <span class="unit">{{ energy_usage_calculation_type.unit }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    }
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormConstructionSiteComponent {
  public $translate = inject(FgTranslate);
  public input_dataS = input<FG_FORM_CONSTRUCTION_SITE_CONTEXT | undefined>(undefined, {alias: 'data'});
  protected translations$ = this.$translate.get_translations$({
    "energy_usage_settings": "calc",
    "energy_usage_power_type": "calc",
    "energy_usage_build_type": "calc",
    "energy_usage_calculation_type": "calc",
    "energy_usage_values": "calc",
    "operation_period": "calc",
    "gross_floor_area": "calc",
    "energy_usage_custom": "calc",
    "year_energy_usage": "calc",
    "january_energy_usage": "calc",
    "february_energy_usage": "calc",
    "march_energy_usage": "calc",
    "april_energy_usage": "calc",
    "may_energy_usage": "calc",
    "june_energy_usage": "calc",
    "july_energy_usage": "calc",
    "august_energy_usage": "calc",
    "september_energy_usage": "calc",
    "october_energy_usage": "calc",
    "november_energy_usage": "calc",
    "december_energy_usage": "calc",
  });
  protected translationsS = toSignal(this.translations$, {initialValue: undefined});
}
