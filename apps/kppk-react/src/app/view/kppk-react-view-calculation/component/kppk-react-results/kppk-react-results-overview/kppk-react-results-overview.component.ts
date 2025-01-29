import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgObjectPipesModule } from 'ngx-pipes';
import { KppkReactResultsConstructionSiteComponent } from '../kppk-react-results-construction-site/kppk-react-results-construction-site.component';
import { KppkReactResultsContainerVillageComponent } from '../kppk-react-results-container-village/kppk-react-results-container-village.component';
import { KppkReactResultsDemolishDisposalComponent } from '../kppk-react-results-demolish-disposal/kppk-react-results-demolish-disposal.component';
import { KppkReactResultsExcavationPitComponent } from '../kppk-react-results-excavation-pit/kppk-react-results-excavation-pit.component';
import { KppkReactResultsHeatingSystemComponent } from '../kppk-react-results-heating-system/kppk-react-results-heating-system.component';
import { REACT_VIEW_CALCULATION } from '@kppk/react-lib';
import { KppkReactResultsMaterialSumsComponent } from '../kppk-react-results-material-sums/kppk-react-results-material-sums.component';
import { KppkReactResultsMaterialTopGroupedBarChartComponent } from '../kppk-react-results-material-top-grouped-bar-chart/kppk-react-results-material-top-grouped-bar-chart.component';
import { form_materials_result_parser } from '@kppk/react-lib';
import { unit_kilogram_co2_parser } from '@kppk/react-lib';
import { KppkReactResultsPieChartAbsorbingEmittingComponent } from '../kppk-react-results-pie-chart-absorbing-emitting/kppk-react-results-pie-chart-absorbing-emitting.component';
import { z } from 'zod';
import { KppkReactResultsPieChartCo2PhasesComponent } from '../kppk-react-results-pie-chart-co2-phases/kppk-react-results-pie-chart-co2-phases.component';
import { KppkReactResultsPieChartTransportCreationOperationComponent } from '../kppk-react-results-pie-chart-transport-creation-operation/kppk-react-results-pie-chart-transport-creation-operation.component';

export const materials_top5_parser = z.object({
  absorbing: z.object({
    items: form_materials_result_parser,
    sum: unit_kilogram_co2_parser,
  }),
  emitting: z.object({
    items: form_materials_result_parser,
    sum: unit_kilogram_co2_parser,
  }),
});
export type RESULT_MATERIAL_TOP_5 = z.infer<typeof materials_top5_parser>;

@Component({
  selector: 'kppk-react-results-overview',

  imports: [
    CommonModule,
    NgObjectPipesModule,
    NgxChartsModule,
    TranslocoModule,
    // KppkReactResultsMaterialTableComponent,
    KppkReactResultsConstructionSiteComponent,
    KppkReactResultsContainerVillageComponent,
    KppkReactResultsDemolishDisposalComponent,
    KppkReactResultsExcavationPitComponent,
    KppkReactResultsHeatingSystemComponent,
    KppkReactResultsMaterialSumsComponent,
    KppkReactResultsMaterialTopGroupedBarChartComponent,
    KppkReactResultsPieChartAbsorbingEmittingComponent,
    KppkReactResultsPieChartCo2PhasesComponent,
    KppkReactResultsPieChartTransportCreationOperationComponent,
  ],
  templateUrl: './kppk-react-results-overview.component.html',
  styleUrl: './kppk-react-results-overview.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsOverviewComponent {
  public results_s = input.required<REACT_VIEW_CALCULATION>({
    alias: 'results',
  });

  public materials_s = computed(() => {
    const materials = form_materials_result_parser
      .parse([
        ...this.results_s().form_material.value.rows,
        ...this.results_s().form_window.value.rows,
        ...this.results_s().form_concrete.value.rows,
      ])
      .sort((a, b) => {
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

  public materials_sums_s = computed(() => {
    const materials = this.materials_s();
    const co2_transport = materials.reduce((sum, item) => {
      return (sum += item.co2_transport.value);
    }, 0);
    const co2_sum = materials.reduce((sum, item) => {
      return (sum += item.gwp.value);
    }, 0);
    const co2_sum_oeko = materials.reduce((sum, item) => {
      // console.log('>>>>>>>>>>>>>>>>>ITEM_GWP_OEKO>>>>>>>>>>>')
      // console.log('value:', item.gwp_oeko.value, ' unit:', item.gwp_oeko.unit)
      if (item.gwp_oeko.type === 'number') {
        sum += item.gwp_oeko.value;
      } else {
        sum += item.gwp.value;
      }
      // if(isNaN(result.gwp_sum_oeko.value)){
      //   console.log('IS_NAN!')
      // }
      return sum;
    }, 0);
    return {
      co2_sum_transport: unit_kilogram_co2_parser.parse({
        value: co2_transport,
      }),
      co2_sum: unit_kilogram_co2_parser.parse({ value: co2_sum }),
      co2_sum_oeko: unit_kilogram_co2_parser.parse({ value: co2_sum_oeko }),
    };
  });

  public materials_top5_s = computed(() => {
    const materials = this.materials_s();
    const absorbing = materials.filter((i, index) => index < 5);
    const reversed = materials.map((item) => item).reverse();
    const emitting = reversed.filter((i, index) => index < 5);
    const sum_absorbing = materials.reduce((sum, item) => {
      if (item.gwp.value < 0) {
        sum += Math.abs(item.gwp.value);
      }
      return sum;
    }, 0);
    const sum_emitting = materials.reduce((sum, item) => {
      if (item.gwp.value >= 0) {
        sum += item.gwp.value;
      }
      return sum;
    }, 0);

    return materials_top5_parser.parse({
      absorbing: {
        items: absorbing,
        sum: unit_kilogram_co2_parser.parse({ value: sum_absorbing }),
      },
      emitting: {
        items: emitting,
        sum: unit_kilogram_co2_parser.parse({ value: sum_emitting }),
      },
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

  // protected result_abso_emit_pie_s = computed( () => {
  //   // const trans_gwp = this.$translate.translate('calc.co2_transport')
  //   // const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
  //   // const trans_co2_transport = this.$translate.translate('calc.co2_transport')
  //   const results_chart = [
  //         {
  //           name: 'CO₂ Aufnehmend',
  //           value: this.results_s().pie_emit_abs.absorbing.value
  //         },
  //         {
  //           name: 'CO₂ Abgebend',
  //           value: this.results_s().pie_emit_abs.emitting.value
  //         },
  //       ];
  //   // });
  //   return results_chart //.slice(0, 1);
  // });
  // public axis_kgco2_formatting = ( value: any ) => {
  //   let result: any = '0';
  //   if( value !== 0 ) {
  //     result = value + ' kgCo²'
  //   }
  //   // console.log('>>>>>>>>>>>FARRRKKK>>>>>>>>>>', result);
  //   return result;
  // }
  // public label_formatting = ( value: any ) => {
  //   let result: any = '0';
  //   if( value !== 0 ) {
  //     result = value + ' kgCo²'
  //   }
  //   console.log('>>>>>>>>>>>LABEL_FORMATTING>>>>>>>>>>', value, ' : ', result);
  //   return result;
  // }
  // public tooltip_text = ( value: any ) => {

  //   return value;
  // }

  // protected result_building_excavation_pie_s = computed( () => {
  //   // const trans_gwp = this.$translate.translate('calc.co2_transport')
  //   // const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
  //   // const trans_co2_transport = this.$translate.translate('calc.co2_transport')
  //   const results_chart = [
  //         {
  //           name: 'Production und Anlieferung Gebäude',
  //           value: this.results_s().parts.building.value
  //         },
  //         {
  //           name: 'Production und Anlieferung Baugrube',
  //           value: this.results_s().parts.excavation_pit.value
  //         },
  //       ];
  //   // });
  //   console.log('RESULT_CHART')
  //   console.log(results_chart)
  //   return results_chart //.slice(0, 1);
  // })

  // protected result_phases_pie_s = computed( () => {
  //   // const trans_gwp = this.$translate.translate('calc.co2_transport')
  //   // const trans_gwp_oeko = this.$translate.translate('calc.co2_transport')
  //   // const trans_co2_transport = this.$translate.translate('calc.co2_transport')
  //   const results_chart = [
  //         {
  //           name: 'Production',
  //           value: this.results_s().sums.co2_creation.value
  //         },
  //         {
  //           name: 'Transport',
  //           value: this.results_s().sums.co2_transport.value
  //         },
  //         {
  //           name: 'Baustelle',
  //           value: this.results_s().sums.co2_construction_site.value
  //         },
  //         {
  //           name: 'Gebäude Betrieb',
  //           value: this.results_s().sums.co2_heating_system.value
  //         },
  //       ];
  //   // });
  //   console.log('RESULT_CHART')
  //   console.log(results_chart)
  //   return results_chart //.slice(0, 1);
  // })

  // protected showLabels: boolean = true;
  // protected isDoughnut: boolean = false;
}
