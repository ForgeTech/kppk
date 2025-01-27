import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_CONSTRUCTION_SITE } from '@kppk/react-lib';

@Component({
  selector: 'kppk-react-results-construction-site',
  
  imports: [
    CommonModule,
    TranslocoModule,

  ],
  templateUrl: './kppk-react-results-construction-site.component.html',
  styleUrl: './kppk-react-results-construction-site.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('calc')
  ]
})
export class KppkReactResultsConstructionSiteComponent {
  public form = input.required<FORM_CONSTRUCTION_SITE>();
}


