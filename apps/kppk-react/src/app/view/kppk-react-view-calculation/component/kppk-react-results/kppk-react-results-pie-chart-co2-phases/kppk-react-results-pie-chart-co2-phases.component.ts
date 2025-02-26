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
import { KPPK_REACT_RESULTS_MATERIAL_SUMS } from '../kppk-react-results-material-sums/kppk-react-results-material-sums.component';
import { KppkReactCalcViewColorsService } from '../../../service/kppk-react-calc-view-colors.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  selector: 'kppk-react-results-pie-chart-co2-phases',
  imports: [CommonModule, NgxChartsModule],
  template: `
    @let t = translationS();
    <table class="table-result table">
      <thead>
        <tr>
          <th colspan="2">
            <h2>{{ t?.headline_co2_phase}}</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">
            <div class="relative h-72 pb-[100px]">
              <ngx-charts-pie-chart
                [results]="graph_data_s().data"
                [scheme]="graph_data_s().color_scheme"
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
              <table class="table-legend absolute -bottom-[32px] right-0 w-[150px]">
              @for( item of this.graph_data_s().data; track $index; let i = $index ) {
                  <tr
                    class="text-xs"
                    [ngStyle]="{
                      'background-color': graph_data_s().color_scheme.domain[i]
                    }"
                  >
                  <td>{{ item.name }}</td>
                  <!-- <td>{{ item.value | number:'1.2-2' }}  kgCO₂</td> -->
                </tr>
              }
              </table>
            </div>
          </td>
        </tr>
        @for( item of this.graph_data_s().data; track $index; let i = $index ) {
        <tr>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-right">
            {{ item.value | number : '1.2-2' }}
            <span class="unit inline-block w-[75px] text-left">{{
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
export class KppkReactResultsPieChartCo2PhasesComponent {
  protected $colors = inject(KppkReactCalcViewColorsService);
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "construction_site": "calc",
    "container_village": "calc",
    "demolish_disposal": "calc",
    "excavation_pit": "calc",
    "headline_co2_phase": "calc",
    "heating_system": "calc",
    "kgCo2": "units",
    "material": "calc",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});  

  public data_s = input.required<REACT_VIEW_CALCULATION>();
  public material_s = input.required<KPPK_REACT_RESULTS_MATERIAL_SUMS>();

  protected graph_data_s = computed(() => {
    const t = this.translationS();
    const color_scheme: any = {
      domain: [],
    };
    // const trans_gwp = this.$translate.translate('calc.co2_transport')
    // const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
    // const trans_co2_transport = this.$translate.translate('calc.co2_transport')
    const results_chart = [];
    if (
      this.material_s().co2_sum.value +
      this.material_s().co2_sum_transport.value
    ) {
      results_chart.push({
        name: t?.material,
        value:
          this.material_s().co2_sum.value +
          this.material_s().co2_sum_transport.value, //this.data_s().absorbing.sum.value
      });
      color_scheme.domain.push(this.$colors.materials);
    }
    if (this.data_s().form_construction_site.value.results.co2_supply.value) {
      results_chart.push({
        name: t?.construction_site,
        value:
          this.data_s().form_construction_site.value.results.co2_supply.value,
      });
      color_scheme.domain.push(this.$colors.construction_site);
    }
    if (this.data_s().form_container_village.value.results.sum_co2.value) {
      results_chart.push({
        name: t?.container_village,
        value: this.data_s().form_container_village.value.results.sum_co2.value,
      });
      color_scheme.domain.push(this.$colors.container_village);
    }
    if (
      this.data_s().form_demolish_disposal.value.results.consumption_co2_sum
        .value
    ) {
      results_chart.push({
        name: t?.demolish_disposal,
        value:
          this.data_s().form_demolish_disposal.value.results.consumption_co2_sum
            .value,
      });
      color_scheme.domain.push(this.$colors.demolish_disposal);
    }
    const form_excavation_pit_value =
      this.data_s().form_excavation_pit.value.results.excavation.co2_transport
        .value +
      this.data_s().form_excavation_pit.value.results.excavation_pit_security
        .co2_creation.value +
      this.data_s().form_excavation_pit.value.results.excavation_pit_security
        .co2_transport.value;
    if (form_excavation_pit_value) {
      results_chart.push({
        name: t?.excavation_pit,
        value: form_excavation_pit_value,
      });
      color_scheme.domain.push(this.$colors.excavation_pit);
    }
    if (this.data_s().form_heating_system.value.results.calc_usage_co2.value) {
      results_chart.push({
        name: t?.heating_system,
        value:
          this.data_s().form_heating_system.value.results.calc_usage_co2.value *
          1000,
      });
      color_scheme.domain.push(this.$colors.heating_system);
    }
    return {
      data: results_chart,
      color_scheme,
    }; //.slice(0, 1);
  });
}
