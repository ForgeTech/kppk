import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_HEATING_SYSTEM_DATA } from '@kppk/react-lib';

@Component({
  selector: 'kppk-react-results-heating-system',

  imports: [CommonModule, TranslocoModule],
  templateUrl: './kppk-react-results-heating-system.component.html',
  styleUrl: './kppk-react-results-heating-system.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsHeatingSystemComponent {
  public form = input.required<FORM_HEATING_SYSTEM_DATA>();
}
