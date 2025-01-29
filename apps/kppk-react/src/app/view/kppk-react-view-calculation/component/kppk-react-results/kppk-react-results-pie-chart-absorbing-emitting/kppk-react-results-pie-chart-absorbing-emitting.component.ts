import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { RESULT_MATERIAL_TOP_5 } from '../kppk-react-results-overview/kppk-react-results-overview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KppkReactCalcViewColorsService } from '../../../service/kppk-react-calc-view-colors.service';

@Component({
  selector: 'kppk-react-results-pie-chart-absorbing-emitting',

  imports: [CommonModule, TranslocoModule, NgxChartsModule],
  template: `
    <table class="table-result table">
      <thead>
        <tr>
          <th colspan="2">
            <h2>Top5 Vergleich emittierende und aufnehmende Materialien</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">
            <div class="relative h-72 pb-[100px]">
              <ngx-charts-pie-chart
                [results]="result_abso_emit_pie_s()"
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
              <table class="table-legend absolute bottom-0 right-0 w-[150px]">
                <tr
                  class="text-xs"
                  [ngStyle]="{
                    'background-color': this.color_scheme.domain[0]
                  }"
                >
                  <td>Aufnahme</td>
                </tr>

                <tr></tr>
                <tr
                  class="text-xs"
                  [ngStyle]="{
                    'background-color': this.color_scheme.domain[1]
                  }"
                >
                  <td>Abgabe</td>
                </tr>

                <tr></tr>
              </table>
            </div>
          </td>
        </tr>
        @for( item of this.result_abso_emit_pie_s(); track $index; let i =
        $index ) {
        <tr>
          <td class="text-left">{{ item.name }}</td>
          <td class="text-right">
            {{ item.value | number : '1.2-2' }}
            <span class="unit inline-block w-[75px] text-left">{{
              'calc.kgCo2'
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
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsPieChartAbsorbingEmittingComponent {
  protected $colors = inject(KppkReactCalcViewColorsService);
  public data_s = input.required<RESULT_MATERIAL_TOP_5>();

  public color_scheme: any = {
    domain: [this.$colors.absorbing, this.$colors.emitting],
  };

  protected result_abso_emit_pie_s = computed(() => {
    // const trans_gwp = this.$translate.translate('calc.co2_transport')
    // const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
    // const trans_co2_transport = this.$translate.translate('calc.co2_transport')
    const results_chart = [
      {
        name: 'Aufnahme',
        value: this.data_s().absorbing.sum.value,
      },
      {
        name: 'Abgabe',
        value: this.data_s().emitting.sum.value,
      },
    ];
    // });
    return results_chart; //.slice(0, 1);
  });
}

// export type RESULT_MATERIAL_TOP_5 = z.infer<typeof materials_top5_parser>;
// <h2 class="col-span-6 text-center">Vergleich emittierende und aufnehmende Materialien (Top 5)</h2>
// <div class="col-span-6 h-[300px] flex-1" >

// </div>
