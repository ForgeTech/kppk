import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { provideTranslocoScope, TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ResizeHorizontalGraphDirective } from './kppk-graph-line-height.directive';
import { KppkReactResultsMaterialTableComponent } from '../kppk-react-results-materials-table/kppk-react-results-material-table.component';
import { REACT_VIEW_CALCULATION } from '@kppk/react-lib';
import { form_materials_result_parser } from '@kppk/react-lib';
import { KppkReactCalcViewColorsService } from '../../../service/kppk-react-calc-view-colors.service';

@Component({
  selector: 'kppk-react-results-materials',
  
  imports: [
    CommonModule,
    NgxChartsModule, 
    ResizeHorizontalGraphDirective,
    TranslocoModule,
    KppkReactResultsMaterialTableComponent,
  ],
  templateUrl: './kppk-react-results-materials.component.html',
  styleUrl: './kppk-react-results-materials.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('calc')
  ]
})
export class KppkReactResultsMaterialsComponent {
  public $translate = inject(TranslocoService);
  protected $colors = inject(KppkReactCalcViewColorsService);

  public custom_colors = [
    {
      name: 'GWP',
      value: this.$colors.concrete
    },
    {
      name: 'GWP Öko',
      value: this.$colors.concrete_oeko
    },
    {
      name: 'CO₂ Transport',
      value: this.$colors.transport
    }
  ]

  public results_s = input.required<REACT_VIEW_CALCULATION>({alias: 'results'});

  protected  materials_s = computed( () => {
    const materials = form_materials_result_parser.parse([
      ...this.results_s().form_material.value.rows,
      ...this.results_s().form_window.value.rows,
      ...this.results_s().form_concrete.value.rows,
    ])
    .sort( (a, b) => {
        if (a.gwp.value < b.gwp.value) {
          return -1;
        }
        if (a.gwp.value > b.gwp.value) {
          return 1;
        }
        return 0;
      });
    return materials;
  });

  protected result_chart_s = computed( () => {
    const trans_gwp = this.$translate.translate('calc.co2_transport')
    const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
    const trans_co2_transport = this.$translate.translate('calc.co2_transport')
    const results_chart = this.materials_s().map( item => {
      return {
        name: item.name.value,
        series: [
          {
            name: 'GWP',
            value: item.gwp.value
          },
          {
            name: 'GWP ÖKO',
            value: item.gwp_oeko.type === 'number' ? item.gwp_oeko.value : 0
          },
          {
            name: 'CO₂ Transport',
            value: item.co2_transport.value
          }
        ]
      }
    });
    // console.log('RESULT_CHART')
    // console.log(results_chart)
    return results_chart //.slice(0, 1);
  })

  // protected test = effect( () => {

  // });

  public axis_kgco2_formatting = ( value: any ) => {
    let result: any = '0';
    if( value !== 0 ) {
      result = value + ' kgCO₂'
    }
    // console.log('>>>>>>>>>>>FARRRKKK>>>>>>>>>>', result);
    return result;
  }


    // options
    // showXAxis: boolean = true;
    // showYAxis: boolean = true;
    // gradient: boolean = false;
    // showLegend: boolean = true;
    // legendPosition: string = 'below';
    // showXAxisLabel: boolean = true;
    // // yAxisLabel: string = 'Country';
    // showYAxisLabel: boolean = true;
    // public legendPosition = LegendPosition.Right
    // xAxisLabel = 'Population';
  
    // colorScheme = {
    //   domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    // };
    // schemeType: string = 'linear';
  
    // constructor() {
    //   Object.assign(this, { multi });
    // }
  
    // onSelect(data: any): void {
    //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    // }
  
    // onActivate(data: any): void {
    //   console.log('Activate', JSON.parse(JSON.stringify(data)));
    // }
  
    // onDeactivate(data: any): void {
    //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    // }
  
}


