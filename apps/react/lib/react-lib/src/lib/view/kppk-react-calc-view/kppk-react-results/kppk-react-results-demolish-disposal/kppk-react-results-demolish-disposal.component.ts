import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { DEMOLISH_DISPOSAL_FORM_MATERIAL } from 'apps/fg-react-demo/src/app/types/kppk-react-demolish-disposal.types';

@Component({
  selector: 'kppk-react-results-demolish-disposal',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './kppk-react-results-demolish-disposal.component.html',
  styleUrl: './kppk-react-results-demolish-disposal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('calc')
  ]
})
export class KppkReactResultsDemolishDisposalComponent {

  public form = input.required<DEMOLISH_DISPOSAL_FORM_MATERIAL>();
}


