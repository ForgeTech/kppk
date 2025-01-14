import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkReactResultsConstructionSiteComponent } from './kppk-react-results-construction-site/kppk-react-results-construction-site.component';
import { KppkReactResultsContainerVillageComponent } from './kppk-react-results-container-village/kppk-react-results-container-village.component';
import { KppkReactResultsDemolishDisposalComponent } from './kppk-react-results-demolish-disposal/kppk-react-results-demolish-disposal.component';
import { KppkReactResultsExcavationPitComponent } from './kppk-react-results-excavation-pit/kppk-react-results-excavation-pit.component';
import { KppkReactResultsHeatingSystemComponent } from './kppk-react-results-heating-system/kppk-react-results-heating-system.component';
import { KppkReactResultsMaterialsComponent } from './kppk-react-results-materials/kppk-react-results-materials.component';
import { KppkReactResultsOverviewComponent } from './kppk-react-results-overview/kppk-react-results-overview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { REACT_VIEW_CALCULATION_CONTEXT } from '../../../types/kppk-react-calculation.types';

@Component({
  selector: 'fg-react-demo-kppk-react-results',
  
  imports: [
    CommonModule,
    TranslocoModule,
    MatTabsModule,
    KppkReactResultsConstructionSiteComponent,
    KppkReactResultsContainerVillageComponent,
    KppkReactResultsDemolishDisposalComponent,
    KppkReactResultsExcavationPitComponent,
    KppkReactResultsHeatingSystemComponent,
    KppkReactResultsMaterialsComponent,
    KppkReactResultsOverviewComponent,
  ],
  templateUrl: './kppk-react-results.component.html',
  styleUrl: './kppk-react-results.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('calc')
  ]
})
export class KppkReactResultsComponent {

  public results_s = input.required<REACT_VIEW_CALCULATION_CONTEXT>({alias: 'results'});
}


