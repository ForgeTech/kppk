import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { REACT_VIEW_CALCULATION } from '@kppk/react-lib';
import { KppkReactCalcViewColorsService } from '../../../service/kppk-react-calc-view-colors.service';
import { KPPK_REACT_RESULTS_MATERIAL_SUMS } from '../kppk-react-results-material-sums/kppk-react-results-material-sums.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  selector: 'kppk-react-results-pie-chart-transport-creation-operation',
  imports: [CommonModule, NgxChartsModule],
  template: `
    @let t = translationS();
    <table class="table-result table">
      <thead>
        <tr>
          <th colspan="2">
            <h2>{{ t?.headline_transport_creation_operation }}</h2>
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
                    <span class="text-xs"
                      >{{ model.value | number : '1.2-2' }} kgCo²</span
                    >
                  </div>
                </ng-template>
              </ngx-charts-pie-chart>
              <table class="table-legend absolute -bottom-[8px] -right-[5px] w-[150px] font-bold text-white">
                <tr
                  class="text-xs"
                  [ngStyle]="{
                    'background-color': this.color_scheme.domain[0]
                  }"
                >
                  <td>{{ t?.headline_transport }}</td>
                </tr>

                <tr></tr>
                <tr
                  class="text-xs"
                  [ngStyle]="{
                    'background-color': this.color_scheme.domain[1]
                  }"
                >
                  <td>{{ t?.headline_creation }}</td>
                </tr>

                <tr></tr>
                <tr
                  class="text-xs"
                  [ngStyle]="{
                    'background-color': this.color_scheme.domain[2]
                  }"
                >
                  <td>{{ t?.heating_system }}</td>
                </tr>

                <tr></tr>
              </table>
            </div>
          </td>
        </tr>
        @for( item of this.result_transport_creation_operation_pie_s(); track $index; let i = $index ) {
        <tr>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-right">
            {{ item.value | number : '1.2-2' }}
            <span class="unit">{{
            t?.kgCo2
            }}</span>
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactResultsPieChartTransportCreationOperationComponent {
  public data_s = input.required<REACT_VIEW_CALCULATION>();
  public material_s = input.required<KPPK_REACT_RESULTS_MATERIAL_SUMS>();
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    'headline_transport_creation_operation': 'calc',
    'headline_transport': 'calc',
    'heating_system': 'calc',
    'headline_creation': 'calc',
    'kgCo2': 'units',
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});
  protected $colors = inject(KppkReactCalcViewColorsService);
  public color_scheme: any = {
    domain: [
      this.$colors.transport,
      this.$colors.creation,
      this.$colors.operation,
    ],
  };

  protected result_transport_creation_operation_pie_s = computed(() => {
    // const trans_gwp = this.$translate.translate('calc.co2_transport')
    // const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
    // const trans_co2_transport = this.$translate.translate('calc.co2_transport')
    const data = this.data_s();
    const transport =
      this.material_s().co2_sum_transport.value +
      // + data.form_construction_site.value.results
      data.form_container_village.value.results.distance_co2.value +
      data.form_demolish_disposal.value.results.consumption_co2_sum.value +
      data.form_excavation_pit.value.results.excavation.co2_transport.value +
      data.form_excavation_pit.value.results.excavation_pit_security
        .co2_transport.value;
    // + data.form_heating_system
    const creation =
      this.material_s().co2_sum.value +
      data.form_construction_site.value.results.co2_supply.value +
      // + data.form_container_village.value.results
      // + data.form_demolish_disposal.value.results
      data.form_excavation_pit.value.results.excavation_pit_security
        .co2_creation.value;
    // + data.form_heating_system.value.results
    // t to kg
    const operation =
      data.form_heating_system.value.results.calc_usage_co2.value * 1000;

    const results_chart = [
      {
        name: 'Transport',
        value: transport,
      },
      {
        name: 'Erzeugung',
        value: creation,
      },
      {
        name: 'Gebäudebetrieb',
        value: operation,
      },
    ];
    return results_chart;
  });
}
