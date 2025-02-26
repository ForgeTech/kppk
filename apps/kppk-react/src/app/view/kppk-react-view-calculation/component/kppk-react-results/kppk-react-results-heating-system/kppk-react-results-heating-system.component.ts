import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORM_HEATING_SYSTEM_DATA } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-results-heating-system',
  imports: [CommonModule],
  templateUrl: './kppk-react-results-heating-system.component.html',
  styleUrl: './kppk-react-results-heating-system.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactResultsHeatingSystemComponent {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "heating_system_air_water": "calc",
    "heating_system_calc_usage": "calc",
    "heating_system_district": "calc",
    "heating_system_gas": "calc",
    "heating_system_geothermal": "calc",
    "heating_system_pellets": "calc",
    "heating_system_system_co2_usage": "calc", 
    "heating_system_system_co2_year": "calc",
    "heating_system_system_select": "calc",
    "heating_system": "calc",
    "tCo2": "units",
    "tCo2/year": "units",
    "year": "units",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});
  public form = input.required<FORM_HEATING_SYSTEM_DATA>();
  protected heating_system_translationS = computed( () => {
    const t = this.translationS();
    const value = this.form().system_select.value;
    let result = "-";
    if(t && value) {
      result = t['heating_system_'.concat(value) as keyof typeof t];
    }
    return result;
  })
}
