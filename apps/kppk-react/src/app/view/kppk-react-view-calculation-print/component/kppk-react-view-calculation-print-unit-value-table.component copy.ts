import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UNIT_GENERAL } from '@kppk/react-lib';

@Component({
  selector: 'app-kppk-react-view-calculation-print-unit-value-table',
  imports: [CommonModule],
  template: `
   @let t = input_translationsS();
   @let row_keys = row_keysS();
    @if(input_dataS(); as data) {
      <table class="table">
        <thead>
          <tr>
            @for( key of row_keys; track $index) {
              <th class="{{ key }}">{{ t?.[ key ] ?? key }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for( row of data; track row ) {
            <tr>
            @for( key of row_keys; track $index ) {
              <td class="{{ key }}">{{ row[ key ].value ?? '-' }} <span class="unit">{{ t?.[row[ key ].unit] ?? row[ key ].unit }}</span></td>
            }
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintUnitValueTableComponent {
  public input_dataS = input<Record<string, UNIT_GENERAL>[]>([], {alias: 'data'});
  public input_keysS = input<string[]>([], {alias: 'keys'});
  public input_translationsS = input<Record<string, string> | undefined>(undefined, {alias: 'translations'});

  protected row_keysS = computed( () => {
    const data = this.input_dataS();
    let result: string[] = [];
    if(data?.[0]) {
      result = Object.keys(data[0]);
      console.log('>>>>>>>KEYS>>>>>>>')
      console.log(result);
    }
    return result;
  })

}
