import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkReactResultsMaterialsComponent } from './kppk-react-results-materials/kppk-react-results-materials.component';
import { KppkReactResultsOverviewComponent } from './kppk-react-results-overview/kppk-react-results-overview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { REACT_VIEW_CALCULATION } from '@kppk/react-lib';

@Component({
  selector: 'fg-react-demo-kppk-react-results',
  
  imports: [
    CommonModule,
    TranslocoModule,
    MatTabsModule,
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

  public results_s = input.required<REACT_VIEW_CALCULATION>({alias: 'results'});
}


