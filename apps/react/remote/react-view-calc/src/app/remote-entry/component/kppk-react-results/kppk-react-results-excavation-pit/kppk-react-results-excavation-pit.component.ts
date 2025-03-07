import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_EXCAVATION_PIT_DATA } from '@kppk/react-lib';

@Component({
  selector: 'kppk-react-results-excavation-pit',
  
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './kppk-react-results-excavation-pit.component.html',
  styleUrl: './kppk-react-results-excavation-pit.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('calc')
  ]
})
export class KppkReactResultsExcavationPitComponent {

  public form = input.required<FORM_EXCAVATION_PIT_DATA>();
}


