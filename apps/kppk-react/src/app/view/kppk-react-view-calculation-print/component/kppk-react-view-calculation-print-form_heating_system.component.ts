import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FG_FORM_HEATING_SYSTEM_CONTEXT } from '@kppk/react-lib';

@Component({
  selector: 'kppk-react-view-calculation-print-form_heating_system',
  imports: [CommonModule],
  template: `
    @let t = input_translationsS();
    @let data = input_dataS();
    @if(data) {
      <table class="table"></table>
    }
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormHeatingSystemComponent {
  public input_dataS = input<FG_FORM_HEATING_SYSTEM_CONTEXT | undefined>(undefined, {alias: 'data'});
  public input_translationsS = input<Record<string, string> | undefined>(undefined, {alias: 'translations'});
}
