import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_MATERIALS_RESULT } from '@kppk/react-lib';

@Component({
  selector: 'kppk-react-results-material-table',

  imports: [CommonModule, TranslocoModule],
  templateUrl: './kppk-react-results-material-table.component.html',
  styleUrl: './kppk-react-results-material-table.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsMaterialTableComponent {
  public rows_s = input.required<FORM_MATERIALS_RESULT>({ alias: 'results' });
}
