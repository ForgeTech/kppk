import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgObjectPipesModule } from 'ngx-pipes';
import { KppkReactResultsConstructionSiteComponent } from '../kppk-react-results-construction-site/kppk-react-results-construction-site.component';
import { KppkReactResultsContainerVillageComponent } from '../kppk-react-results-container-village/kppk-react-results-container-village.component';
import { KppkReactResultsDemolishDisposalComponent } from '../kppk-react-results-demolish-disposal/kppk-react-results-demolish-disposal.component';
import { KppkReactResultsExcavationPitComponent } from '../kppk-react-results-excavation-pit/kppk-react-results-excavation-pit.component';
import { KppkReactResultsHeatingSystemComponent } from '../kppk-react-results-heating-system/kppk-react-results-heating-system.component';
import { KppkReactResultsMaterialSumsComponent } from '../kppk-react-results-material-sums/kppk-react-results-material-sums.component';
import { KppkReactResultsMaterialTopGroupedBarChartComponent } from '../kppk-react-results-material-top-grouped-bar-chart/kppk-react-results-material-top-grouped-bar-chart.component';
import { form_materials_result_parser } from '@kppk/react-lib';
import { unit_kilogram_co2_parser } from '@kppk/react-lib';
import { KppkReactResultsPieChartAbsorbingEmittingComponent } from '../kppk-react-results-pie-chart-absorbing-emitting/kppk-react-results-pie-chart-absorbing-emitting.component';
import { z } from 'zod';
import { KppkReactResultsPieChartCo2PhasesComponent } from '../kppk-react-results-pie-chart-co2-phases/kppk-react-results-pie-chart-co2-phases.component';
import { KppkReactResultsPieChartTransportCreationOperationComponent } from '../kppk-react-results-pie-chart-transport-creation-operation/kppk-react-results-pie-chart-transport-creation-operation.component';
import { KppkReactResultsService } from '../kppk-react-results.service';

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
})
export class KppkReactResultsOverviewComponent {
  protected $results = inject(KppkReactResultsService);

  protected showXAxis = true;
  protected showYAxis = true;
  protected gradient = false;
  protected showLegend = true;
  protected legendPosition = 'below';
  protected showXAxisLabel = true;
  protected yAxisLabel = 'Country';
  protected showYAxisLabel = true;
  protected xAxisLabel = 'Population';

}
