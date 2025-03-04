import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KppkReactResultsMaterialTableComponent } from '../kppk-react-results-materials-table/kppk-react-results-material-table.component';
import { KppkReactResultsService } from '../kppk-react-results.service';

@Component({
  selector: 'kppk-react-results-materials-graph',
  imports: [
    CommonModule,
    NgxChartsModule,
    // ResizeHorizontalGraphDirective,
    KppkReactResultsMaterialTableComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [``],
  template: `
  @let r = $results;
  @let t = r.translationS();
  @let colors = r.$colors;
  @let result_chart = r.result_chartS();
  @let data = input_dataS();
  @let custom_colors = r.custom_colorsS();
  @let axis_kgco2_formatting = r.axis_kgco2_formattingS();
  @let is_printing = input_is_printingS();
  <!-- <pre>{{ results() | json }}</pre> -->
  @if(result_chart && custom_colors ) {
    <div 
      class="graph-materials relative col-span-6 h-full w-full lg:col-span-3"
      [ngStyle]="{'height.px': input_heightS()}"
    >
      <ngx-charts-bar-horizontal-2d
        
        [results]="result_chart"
        [customColors]="custom_colors"
        [xAxis]="true"
        [showXAxisLabel]="true"
        [showYAxisLabel]="true"
        [xAxisTickFormatting]="axis_kgco2_formatting"
        [xAxis]="true"
        [yAxis]="true"
        [legend]="false"
        [groupPadding]="4"
      >
        <ng-template #tooltipTemplate let-model="model">
          <!-- <pre>{{ model | json }}</pre> -->
          <div class="flex flex-col items-center justify-center p-4">
            <span class="text-base">{{ model.series }}</span>
            <span class="text-sm">{{ model.name }}</span>
            <span class="text-xs"
              >{{ model.value | number : '1.2-2' }} kgCO₂</span
            >
          </div>
        </ng-template>
      </ngx-charts-bar-horizontal-2d>
      <table class="table-legend absolute right-[18px] top-[10px] w-[150px] font-bold text-white">
        <tr
          class="text-xs"
          [ngStyle]="{
            'background-color': is_printing ? 'transperant' : colors.concrete,
            'color': is_printing ? colors.concrete : 'inherit',
          }"
        >
          <td>{{t?.gwp}}</td>
        </tr>

        <tr></tr>
        <tr
          class="text-xs"
          [ngStyle]="{
            'background-color': is_printing ? 'transperant' : colors.concrete_oeko,
            'color': is_printing ? colors.concrete_oeko : 'inherit',
          }"
        >
          <td>{{t?.gwp_oeko}}</td>
        </tr>
        <tr></tr>
        <tr
          class="text-xs"
          [ngStyle]="{
            'background-color': is_printing ? 'transperant' : colors.transport,
            'color': is_printing ? colors.transport : 'inherit',
          }"
        >
          <td>{{t?.co2_transport}}</td>
        </tr>
        <tr></tr>
      </table>
    </div>
  }
  `,
})
export class KppkReactResultsMaterialsGraphComponent {
  protected $results = inject(KppkReactResultsService);
  public input_heightS = input<number>(500, {alias: 'height'});
  public input_is_printingS = input<boolean>(false, {alias: 'is_printing'});
  public input_dataS = input<any>([], {alias: 'data'});

}