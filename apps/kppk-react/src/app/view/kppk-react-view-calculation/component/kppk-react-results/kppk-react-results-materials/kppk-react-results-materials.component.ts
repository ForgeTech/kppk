import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ResizeHorizontalGraphDirective } from './kppk-graph-line-height.directive';
import { KppkReactResultsMaterialTableComponent } from '../kppk-react-results-materials-table/kppk-react-results-material-table.component';
import { KppkReactCalcViewColorsService } from '../../../service/kppk-react-calc-view-colors.service';
import { KppkReactResultsService } from '../kppk-react-results.service';
import { KppkReactResultsMaterialsGraphComponent } from '../kppk-react-results-materials-graph/kppk-react-results-materials-graph.component';

@Component({
  selector: 'kppk-react-results-materials',

  imports: [
    CommonModule,
    NgxChartsModule,
    // ResizeHorizontalGraphDirective,
    KppkReactResultsMaterialTableComponent,
    KppkReactResultsMaterialsGraphComponent
  ],
  templateUrl: './kppk-react-results-materials.component.html',
  styleUrl: './kppk-react-results-materials.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactResultsMaterialsComponent {
  protected $results = inject(KppkReactResultsService);
}
