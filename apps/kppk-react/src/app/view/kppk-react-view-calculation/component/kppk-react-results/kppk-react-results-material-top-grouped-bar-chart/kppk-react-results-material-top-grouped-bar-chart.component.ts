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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KppkReactResultsMaterialTableComponent } from '../kppk-react-results-materials-table/kppk-react-results-material-table.component';
import { FORM_MATERIALS_RESULT } from '@kppk/react-lib';
import { KppkReactCalcViewColorsService } from '../../../service/kppk-react-calc-view-colors.service';

@Component({
  selector: 'kppk-react-results-material-top-grouped-bar-chart',

  imports: [
    CommonModule,
    TranslocoModule,
    KppkReactResultsMaterialTableComponent,
    NgxChartsModule,
  ],
  template: `
    <div class="flex flex-col">
      <kppk-react-results-material-table class="w-full" [results]="data_s()">
        <ng-content></ng-content>
      </kppk-react-results-material-table>
      <div class="relative h-72">
        <ngx-charts-bar-horizontal-2d
          [results]="chart_data_s()"
          [customColors]="custom_colors"
          [xAxis]="showXAxis"
          [showXAxisLabel]="showXAxisLabel"
          [showYAxisLabel]="showYAxisLabel"
          [xAxis]="showXAxis"
          [xAxisTickFormatting]="axis_kgco2_formatting"
          [yAxis]="showYAxis"
          [legend]="false"
          [groupPadding]="4"
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
        </ngx-charts-bar-horizontal-2d>
        <table class="table-legend absolute bottom-[60px] right-[10px]">
          <tr
            class="text-xs"
            [ngStyle]="{ 'background-color': this.$colors.concrete }"
          >
            <td>GWP</td>
          </tr>

          <tr></tr>
          <tr
            class="text-xs"
            [ngStyle]="{ 'background-color': this.$colors.concrete_oeko }"
          >
            <td>GWP Öko</td>
          </tr>

          <tr></tr>
          <tr
            class="text-xs"
            [ngStyle]="{ 'background-color': this.$colors.transport }"
          >
            <td>CO₂ Transport</td>
          </tr>

          <tr></tr>
        </table>
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsMaterialTopGroupedBarChartComponent {
  protected $colors = inject(KppkReactCalcViewColorsService);
  public custom_colors = [
    {
      name: 'GWP',
      value: this.$colors.concrete,
    },
    {
      name: 'GWP Öko',
      value: this.$colors.concrete_oeko,
    },
    {
      name: 'CO₂ Transport',
      value: this.$colors.transport,
    },
  ];

  public data_s = input.required<FORM_MATERIALS_RESULT>({ alias: 'data' });

  public chart_data_s = computed(() => {
    return this.data_s().map((item: any) => {
      return {
        name: item.name.value,
        series: [
          {
            name: 'GWP',
            value: item.gwp.value,
          },
          {
            name: 'GWP Öko',
            value: item.gwp_oeko.type === 'number' ? item.gwp_oeko.value : 0,
          },
          {
            name: 'CO₂ Transport',
            value: item.co2_transport.value,
          },
        ],
      };
    });
  });

  protected showXAxis = true;
  protected showYAxis = true;
  protected gradient = false;
  protected showLegend = true;
  protected legendPosition = 'below';
  protected showXAxisLabel = true;
  protected yAxisLabel = 'Country';
  protected showYAxisLabel = true;
  protected xAxisLabel = 'Population';

  public axis_kgco2_formatting = (value: any) => {
    let result: any = '0';
    if (value !== 0) {
      result = value + ' kgCO₂';
    }
    // console.log('>>>>>>>>>>>FARRRKKK>>>>>>>>>>', result);
    return result;
  };
}
