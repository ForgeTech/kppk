import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { KppkPrintLayoutComponent } from '../../layout/kppk-print-layout/kppk-print-layout.component';
import { KppkPrintLayoutImagesService } from '../../layout/kppk-print-layout/kppk-print-layout-images.service';
import { KppkReactResultsMaterialsComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-materials/kppk-react-results-materials.component';
import { ReactViewCalculationMachineActorService } from '@kppk/react-lib';
import { KppkReactResultsConstructionSiteComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-construction-site/kppk-react-results-construction-site.component';
import { KppkReactResultsContainerVillageComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-container-village/kppk-react-results-container-village.component';
import { KppkReactResultsDemolishDisposalComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-demolish-disposal/kppk-react-results-demolish-disposal.component';
import { KppkReactResultsExcavationPitComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-excavation-pit/kppk-react-results-excavation-pit.component';
import { KppkReactResultsHeatingSystemComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-heating-system/kppk-react-results-heating-system.component';
import { KppkReactResultsMaterialSumsComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-material-sums/kppk-react-results-material-sums.component';
import { KppkReactResultsMaterialTopGroupedBarChartComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-material-top-grouped-bar-chart/kppk-react-results-material-top-grouped-bar-chart.component';
import { KppkReactResultsPieChartAbsorbingEmittingComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-pie-chart-absorbing-emitting/kppk-react-results-pie-chart-absorbing-emitting.component';
import { KppkReactResultsPieChartCo2PhasesComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-pie-chart-co2-phases/kppk-react-results-pie-chart-co2-phases.component';
import { KppkReactResultsPieChartTransportCreationOperationComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-pie-chart-transport-creation-operation/kppk-react-results-pie-chart-transport-creation-operation.component';
import { KppkReactResultsOverviewComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-overview/kppk-react-results-overview.component';
import { KppkReactResultsMaterialTableComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-materials-table/kppk-react-results-material-table.component';
import { KppkReactResultsMaterialsGraphComponent } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results-materials-graph/kppk-react-results-materials-graph.component';
import { KppkReactViewCalculationPrintUnitValueTableComponent } from './component/kppk-react-view-calculation-print-unit-value-table.component';
import { KppkReactResultsService } from '../kppk-react-view-calculation/component/kppk-react-results/kppk-react-results.service';
import { KppkReactViewCalculationPrintFormConstructionSiteComponent } from './component/kppk-react-view-calculation-print-form_construction_site.component';
import { KppkReactViewCalculationPrintFormHeatingSystemComponent } from './component/kppk-react-view-calculation-print-form_heating_system.component';
import { KppkReactViewCalculationPrintFormContainerVillageComponent } from './component/kppk-react-view-calculation-print-form_container_village.component';
import { KppkReactViewCalculationPrintFormDemolishDisposalComponent } from './component/kppk-react-view-calculation-print-form_demolish_disposal.component';
import { KppkReactViewCalculationPrintFormExcavationPitComponent } from './component/kppk-react-view-calculation-print-form_excavation_pit.component';

@Component({
  selector: 'kppk-react-view-calculation-print',
  imports: [
    CommonModule, 
    KppkPrintLayoutComponent,
    KppkReactResultsMaterialsComponent,
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
    KppkReactResultsMaterialTableComponent,
    KppkReactResultsMaterialsGraphComponent,
    KppkReactViewCalculationPrintUnitValueTableComponent,
    KppkReactViewCalculationPrintFormConstructionSiteComponent,
    KppkReactViewCalculationPrintFormContainerVillageComponent,
    KppkReactViewCalculationPrintFormDemolishDisposalComponent,
    KppkReactViewCalculationPrintFormExcavationPitComponent,
    KppkReactViewCalculationPrintFormHeatingSystemComponent,
    KppkReactViewCalculationPrintFormHeatingSystemComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kppk-react-view-calculation-print.component.html',
  styleUrls: ['./kppk-react-view-calculation-print.component.scss']
})
export class KppkReactViewCalculationPrintComponent {
  protected $results = inject(KppkReactResultsService);
  protected $images = inject(KppkPrintLayoutImagesService);
  protected $actor_view_calculation = inject(ReactViewCalculationMachineActorService);
  // public dataIsReady: boolean = false;
  // public printData: RoseCalculationDataInterface 
  protected print_cover = this.$images.print_cover;

  // public systemsPages$: Observable<any>
  /** CONSTRUCTOR */
  constructor(
    // protected $activeRoute: ActivatedRoute,
    // public $calc: RoseCalcService,
    // public $component: FgComponentBaseService,
    // protected $printImg: RosePrintImagesService
  ) {
  // super()
  //   this.imgROSECover = this.$printImg.printImageRoseCoverPagePpt;
  //   const app: RoseApplicationInterface = this.$component.$data.app as RoseApplicationInterface;
  //   if( app.user.calculation !== undefined )
  //   this.printData = app.user.calculation;
  //   this.systemsPages$ = this.$calc.calcResult$
  //   .pipe(
  //     map( results => {
  //       let systemPages: CalcResultInterface[][] = [];
  //       let page: CalcResultInterface[] = [];
  //       Object.keys( results ).forEach( ( key, index, items ) => {
  //         const system: CalcResultInterface | false = results[ key ];
  //         if( system !== false ) {
  //           page.push( system )
  //         }
  //         if( page.length === 2 || index === items.length - 1) {
  //           systemPages.push( page );
  //           page = [];
  //         }
  //       });
  //       return systemPages;
  //     })
  //   );
  }
}