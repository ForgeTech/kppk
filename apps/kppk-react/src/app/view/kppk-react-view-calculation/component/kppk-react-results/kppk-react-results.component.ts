import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkReactResultsMaterialsComponent } from './kppk-react-results-materials/kppk-react-results-materials.component';
import { KppkReactResultsOverviewComponent } from './kppk-react-results-overview/kppk-react-results-overview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { REACT_VIEW_CALCULATION } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

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
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsComponent {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "overview": "calc",
    "material": "calc",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});
  public results_s = input.required<REACT_VIEW_CALCULATION>({
    alias: 'results',
  });
}
