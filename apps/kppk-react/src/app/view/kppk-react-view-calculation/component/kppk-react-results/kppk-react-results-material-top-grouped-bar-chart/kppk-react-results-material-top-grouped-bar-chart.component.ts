import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KppkReactResultsMaterialTableComponent } from '../kppk-react-results-materials-table/kppk-react-results-material-table.component';
import { FORM_MATERIALS_RESULT } from '@kppk/react-lib';
import { KppkReactCalcViewColorsService } from '../../../service/kppk-react-calc-view-colors.service';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-results-material-top-grouped-bar-chart',
  imports: [
    CommonModule,
    TranslocoModule,
    KppkReactResultsMaterialTableComponent,
    NgxChartsModule,
  ],
  template: `
    @let t = translationS();
    <div class="flex flex-col">
      <kppk-react-results-material-table 
        class="w-full" 
        [results]="data_s()"
      >
        <ng-content></ng-content>
      </kppk-react-results-material-table>
      <div class="relative h-72">
        <ngx-charts-bar-horizontal-2d
          [results]="chart_data_s()"
          [customColors]="custom_colorsS()"
          [xAxis]="showXAxis"
          [showXAxisLabel]="showXAxisLabel"
          [showYAxisLabel]="showYAxisLabel"
          [xAxis]="showXAxis"
          [xAxisTickFormatting]="axis_kgco2_formattingS()"
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
        <table class="table-legend absolute bottom-[30px] right-[10px] w-[150px] font-bold text-white">
          <tr
            class="text-xs"
            [ngStyle]="{ 'background-color': this.$colors.concrete }"
          >
            <td>{{ t?.gwp }}</td>
          </tr>

          <tr></tr>
          <tr
            class="text-xs"
            [ngStyle]="{ 'background-color': this.$colors.concrete_oeko }"
          >
            <td>{{ t?.gwp_oeko }}</td>
          </tr>

          <tr></tr>
          <tr
            class="text-xs"
            [ngStyle]="{ 'background-color': this.$colors.transport }"
          >
            <td>{{ t?.co2_transport }}</td>
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
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    'kgCo2':'units',
    'gwp':'calc',
    'gwp_oeko':'calc',
    'co2_transport':'calc',
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});
  
  protected $colors = inject(KppkReactCalcViewColorsService);
  public custom_colorsS = computed( () => {
    const t = this.translationS();
    return [
    {
      name: t?.gwp,
      value: this.$colors.concrete,
    },
    {
      name: t?.gwp_oeko,
      value: this.$colors.concrete_oeko,
    },
    {
      name: t?.co2_transport,
      value: this.$colors.transport,
    },
  ]});

  public data_s = input.required<FORM_MATERIALS_RESULT>({ alias: 'data' });

  public chart_data_s = computed(() => {
    const t = this.translationS();
    return this.data_s().map((item: any) => {
      return {
        name: item.name.value,
        series: [
          {
            name: t?.gwp,
            value: item.gwp.value,
          },
          {
            name: t?.gwp_oeko,
            value: item.gwp_oeko.type === 'number' ? item.gwp_oeko.value : 0,
          },
          {
            name: t?.co2_transport,
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
  protected showYAxisLabel = true;

  public axis_kgco2_formattingS = computed( () => {
    const t = this.translationS();
    return (value: any) => {
      let result: any = '0';
      if (t && value !== 0) {
        result = value + ' ' + t.kgCo2;
      }
      return result;
    }
  });
}
