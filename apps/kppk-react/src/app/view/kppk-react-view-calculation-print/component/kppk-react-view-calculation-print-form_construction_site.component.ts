import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FG_FORM_CONSTRUCTION_SITE_CONTEXT, CALCULATION_TYPE_ENUM, POWER_SUPPLY_POWER_TYPE_ENUM } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';
import { KppkReactViewCalculationPrintFormConstructionSiteYearComponent } from './kppk-react-view-calculation-print-form_construction_site_year.component';

@Component({
  selector: 'kppk-react-view-calculation-print-form_construction_site',
  imports: [
    CommonModule,
    KppkReactViewCalculationPrintFormConstructionSiteYearComponent
  ],
  templateUrl: 'kppk-react-view-calculation-print-form_construction_site.component.html',
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormConstructionSiteComponent {
  public input_dataS = input<FG_FORM_CONSTRUCTION_SITE_CONTEXT | undefined>(undefined, {alias: 'data'});
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "austria_common_energy_mix": "calc",
    "austria_green_power_mix": "calc",
    "calculation_type": "calc",
    "construction_site": "calc",
    "custom": "calc",
    "energy_usage_build_type": "calc",
    "energy_usage_calculation_type": "calc",
    "energy_usage_custom": "calc",
    "energy_usage_headline": "calc",
    "energy_usage_power_type": "calc",
    "energy_usage_settings": "calc",
    "energy_usage_values": "calc",
    "estimate": "calc",
    "exact_entry": "calc",
    "fuel_oil_usage": "calc",
    "gross_floor_area": "calc",
    "heating_supply_settings": "calc",
    "heating_supply_values": "calc",
    "heating_supply": "calc",
    "kWh/month": "units",
    "l": "units",
    "m2": "units",
    "month": "units",
    "MWh/month": "units",
    "operation_period": "calc",
  });
  protected translationsS = toSignal(this.translations$, {initialValue: undefined});
  public calculation_type_enum =  CALCULATION_TYPE_ENUM;
  public power_type_enum =  POWER_SUPPLY_POWER_TYPE_ENUM;

  get_power_type_translation( power_type: POWER_SUPPLY_POWER_TYPE_ENUM ): string {
    const trans = this.translationsS();
    const result = trans?.[ power_type as keyof typeof trans] ?? 'missing_translation';
    return result;
  } 
  get_calculation_type_translation( calculation_type: CALCULATION_TYPE_ENUM ): string {
    const trans = this.translationsS();
    const result = trans?.[ calculation_type as keyof typeof trans] ?? 'missing_translation';
    return result;
  } 
  get_column_number( calculation_type: CALCULATION_TYPE_ENUM ): number {
    let result = 2;
    if(calculation_type === this.calculation_type_enum.custom) {
      result = 4;
    }
    else if(calculation_type === this.calculation_type_enum.estimate) {
      result = 6;
    }
    return result;
  } 
}
