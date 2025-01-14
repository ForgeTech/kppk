import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { KppkReactResultsOverviewComponent } from '../kppk-react-calc-view/kppk-react-results/kppk-react-results-overview/kppk-react-results-overview.component';
import { KppkReactResultsMaterialsComponent } from '../kppk-react-calc-view/kppk-react-results/kppk-react-results-materials/kppk-react-results-materials.component';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';

@Component({
  selector: 'fg-react-demo-kppk-react-calc-print-view',
  
  imports: [
    KppkReactResultsMaterialsComponent,
    KppkReactResultsOverviewComponent
  ],
  templateUrl: './kppk-react-calc-print-view.component.html',
  styleUrl: './kppk-react-calc-print-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactCalcPrintViewComponent  {

  protected results_s = computed(() => {
    let result = this.state_react_view_calculation_s()?.context?.calculation;
    return result;
  });
}
