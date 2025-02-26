import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORM_CONSTRUCTION_SITE } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-results-construction-site',
  imports: [CommonModule],
  templateUrl: './kppk-react-results-construction-site.component.html',
  styleUrl: './kppk-react-results-construction-site.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactResultsConstructionSiteComponent {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "construction_site": "calc",
    "energy_usage_headline": "calc",
    "energy_usage_power_type": "calc",
    "austria_common_energy_mix": "calc",
    "austria_green_power_mix": "calc",
    "fuel_oil_usage": "calc",
    "heating_supply_co2": "calc",
    "heating_supply": "calc",
    "oil_co2": "calc",
    "power_co2": "calc",
    "power_supply_co2": "calc",
    "power_usage": "calc",
    "sum_co2": "calc",
    "kgCo2": "units",
    "l": "units",
    "kWh": "units",
    "MWh": "units",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});
  public form = input.required<FORM_CONSTRUCTION_SITE>();
}
