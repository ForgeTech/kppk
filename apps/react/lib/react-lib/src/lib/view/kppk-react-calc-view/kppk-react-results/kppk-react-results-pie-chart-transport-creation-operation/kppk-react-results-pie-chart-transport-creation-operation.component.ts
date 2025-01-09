import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { REACT_VIEW_CALCULATION_CONTEXT } from 'apps/fg-react-demo/src/app/types/kppk-react-calculation.types';
import { KppkReactCalcViewColorsService } from '../../kppk-react-calc-view-colors.service';
import { mwh_to_kwh } from 'apps/fg-react-demo/src/app/machine/react-view-calculation/react-view-calculation-construction-site.utils';
import { KPPK_REACT_RESULTS_MATERIAL_SUMS } from '../kppk-react-results-material-sums/kppk-react-results-material-sums.component';


@Component({
  selector: 'kppk-react-results-pie-chart-transport-creation-operation',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    NgxChartsModule,
  ],
  template: `
  <table  *transloco="let t;" class="table-result table">
    <thead>
        <tr>
            <th colspan="2">
                <h2>Anfallendes CO₂ Transport-Erzeugung-Betrieb</h2>
            </th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td colspan="2">
          <div class="relative h-72 pb-[100px]">
            <ngx-charts-pie-chart
              [results]="result_transport_creation_operation_pie_s()"
              [scheme]="color_scheme"
              [labels]="true"
            >
              <ng-template #tooltipTemplate let-model="model">
                <!-- <pre>{{ model | json }}</pre> -->
                <div class="flex flex-col items-center justify-center p-4">
                    <span class="text-base">{{ model.series }}</span>
                    <span class="text-sm">{{ model.name }}</span>
                    <span class="text-xs">{{ model.value | number:'1.2-2' }} kgCo²</span>
                </div>
              </ng-template>
            </ngx-charts-pie-chart>
            <table class="table-legend absolute bottom-0 right-0 w-[150px]">
              <tr class="text-xs" [ngStyle]="{'background-color': this.color_scheme.domain[0]}">
                <td>Transport</td>
              <tr>
              <tr class="text-xs" [ngStyle]="{'background-color': this.color_scheme.domain[1]}">
                <td>Erzeugung</td>
              <tr>
              <tr class="text-xs" [ngStyle]="{'background-color': this.color_scheme.domain[2]}">
                <td>Gebäudebetrieb</td>
              <tr>
            
            </table>
          </div>
        </td>
    </tr>    
    @for( item of this.result_transport_creation_operation_pie_s(); track $index; let i = $index ) {
    <tr>
        <td class="text-left">{{ item.name }}</td>
        <td class="text-right">{{ item.value | number:'1.2-2' }} <span class="unit inline-block w-[75px] text-left">{{ t('calc.kgCo2') }}</span></td>
      </tr>
    }
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
export class KppkReactResultsPieChartTransportCreationOperationComponent {
  public data_s = input.required<REACT_VIEW_CALCULATION_CONTEXT>();
  public material_s = input.required<KPPK_REACT_RESULTS_MATERIAL_SUMS>();
  
  protected $colors = inject(KppkReactCalcViewColorsService);
  public color_scheme: any = {
    domain: [ this.$colors.transport, this.$colors.creation, this.$colors.operation ]
  };

  protected result_transport_creation_operation_pie_s = computed( () => {
    // const trans_gwp = this.$translate.translate('calc.co2_transport')
    // const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
    // const trans_co2_transport = this.$translate.translate('calc.co2_transport')
    const data = this.data_s();
    const transport = this.material_s().co2_sum_transport.value
    // + data.form_construction_site.value.results
    + data.form_container_village.value.results.distance_co2.value
    + data.form_demolish_disposal.value.results.consumption_co2_sum.value
    + data.form_excavation_pit.value.results.excavation.co2_transport.value
    + data.form_excavation_pit.value.results.excavation_pit_security.co2_transport.value;
    // + data.form_heating_system
    const creation = this.material_s().co2_sum.value
    + data.form_construction_site.value.results.co2_supply.value
    // + data.form_container_village.value.results
    // + data.form_demolish_disposal.value.results
    + data.form_excavation_pit.value.results.excavation_pit_security.co2_creation.value;
    // + data.form_heating_system.value.results
                                                                            // t to kg
    const operation = data.form_heating_system.value.results.calc_usage_co2.value * 1000; 
    
    const results_chart = [
      {
        name: 'Transport',
        value: transport
      },
      {
        name: 'Erzeugung',
        value: creation
      },
      {
        name: 'Gebäudebetrieb',
        value: operation
      },
    ];
    return results_chart;
  })
}
