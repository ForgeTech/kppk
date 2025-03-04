import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FG_FORM_CONTAINER_VILLAGE_CONTEXT, UNIT_GENERAL } from '@kppk/react-lib';

@Component({
  selector: 'kppk-react-view-calculation-print-form_container_village',
  imports: [CommonModule],
  template: `
    @let t = input_translationsS();
    @let data = input_dataS();
    @if(data) {

    }
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormContainerVillageComponent {
  public input_dataS = input<FG_FORM_CONTAINER_VILLAGE_CONTEXT | undefined>(undefined, {alias: 'data'});
  public input_translationsS = input<Record<string, string> | undefined>(undefined, {alias: 'translations'});
}
