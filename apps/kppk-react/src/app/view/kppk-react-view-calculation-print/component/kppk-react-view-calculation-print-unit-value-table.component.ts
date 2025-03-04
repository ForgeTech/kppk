import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UNIT_GENERAL, unit_id_parser, unit_kilogram_co2_parser, unit_kilogram_meter_cubic_parser, unit_kilogram_parser, unit_kilometer_parser, unit_meter_cubic_parser, unit_meter_square_parser, unit_number_parser, unit_string_parser } from '@kppk/react-lib';
import { z } from 'zod';

export const calculation_print_unit_value_table_row_parser = z.object({
    id: unit_id_parser,
    name: unit_string_parser.optional().default({}),
    density: unit_kilogram_meter_cubic_parser.optional().default({}),
    area: unit_meter_square_parser.optional().default({}),
    mass: unit_kilogram_parser.optional().default({}),
    volumn: unit_meter_cubic_parser.optional().default({}),
    shipments: unit_number_parser.optional().default({}),
    distance: unit_kilometer_parser.optional().default({ value: 100 }),
    gwp: unit_kilogram_co2_parser.optional().default({}),
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
})
export type CALCULATION_PRINT_UNIT_VALUE_TABLE_ROW = z.infer<typeof calculation_print_unit_value_table_row_parser>;

export const calculation_print_unit_value_table_rows_parser = z.array(
  calculation_print_unit_value_table_row_parser
);
export type CALCULATION_PRINT_UNIT_VALUE_TABLE_ROWS = z.infer<typeof calculation_print_unit_value_table_rows_parser>;

@Component({
  selector: 'app-kppk-react-view-calculation-print-unit-value-table',
  imports: [CommonModule],
  template: `
   @let t = input_translationsS();
    @if(input_dataS(); as data) {
      @if(data[0]; as header_row) {
        <table class="table">
          <thead>
            <tr>
                <th class="id hidden text-center">
                  {{ t?.[ 'id' ]}}
                </th>
                <th class="name text-center">
                  {{ t?.[ 'name' ]}}
                </th>
                <th class="mass text-center">
                  {{ t?.[ 'mass' ]}}
                  <span class="unit">({{ header_row['mass'].unit }})</span>
                </th>
                <th class="volumn text-center">
                  {{ t?.[ 'volumn' ]}}
                  <span class="unit">({{ header_row['volumn'].unit }})</span>
                </th>
                <th class="density text-center">
                  {{ t?.[ 'density' ]}}
                  <span class="unit">({{ header_row['density'].unit }})</span>
                </th>
                <th class="shipments text-center">
                  {{ t?.[ 'shipments' ]}}
                </th>
                <th class="distance text-center">
                  {{ t?.[ 'distance' ]}}
                  <span class="unit">({{ header_row['distance'].unit }})</span>
                </th>
                <th class="gwp text-center">
                  {{ t?.[ 'gwp' ]}}
                  <span class="unit">({{ header_row['gwp'].unit }})</span>
                </th>
                <th class="co2_transport text-center">
                  {{ t?.[ 'co2_transport' ]}}
                  <span class="unit">({{ header_row['co2_transport'].unit }})</span>
                </th>
            </tr>
          </thead>
          <tbody>
            @for( row of data; track row ) {
              <tr>
                <td class="id hidden text-center">
                  {{ row[ 'id' ].value }}
                </td>
                <td class="name w-[250px] text-left">
                  {{ row[ 'name' ].value }}
                </td>
                <td class="mass text-right">
                  {{ row[ 'mass' ].value }}
                  <span class="unit">{{ row['mass'].unit }}</span>
                </td>
                <td class="volumn text-right">
                  {{ row[ 'volumn' ].value }}
                  <span class="unit">{{ row['volumn'].unit }}</span>
                </td>
                <td class="density text-right">
                  {{ row[ 'density' ].value }}
                  <span class="unit">{{ row['density'].unit }}</span>
                </td>
                <td class="shipments text-right">
                  {{ row[ 'shipments' ].value }}
                  <span class="unit">{{ row['shipments'].unit }}</span>
                </td>
                <td class="distance w-[100px] text-right">
                  {{ row[ 'distance' ].value }}
                  <span class="unit">{{ row['distance'].unit }}</span>
                </td>
                <td class="gwp text-right">
                  {{ row[ 'gwp' ].value }}
                  <span class="unit">{{ row['gwp'].unit }}</span>
                </td>
                <td class="co2_transport text-right">
                  {{ row[ 'co2_transport' ].value }}
                  <span class="unit">{{ row['co2_transport'].unit }}</span>
                </td>
              </tr>
            }
            <tr class="table-row-sum">
              <td colspan="6"></td>
              <td class="text-right font-bold">
                {{ gwp_sumS() }}
                <span class="unit">{{ header_row['gwp'].unit }}</span>
              </td>
              <td class="text-right font-bold">
                {{ co2_transport_sumS() }}
                <span class="unit">{{ header_row['co2_transport'].unit }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      }
    }
  `,
  styles: `
    .table {
    .table-row-sum tr td {
      border-top-style: double;
    }
    .unit {
      display: inline-block;
      text-align: left;
      // background-color: red;
      width: 40px;
    }
  }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintUnitValueTableComponent {
  public input_dataS = input<CALCULATION_PRINT_UNIT_VALUE_TABLE_ROWS>([], {
    alias: 'data',
  });
  public input_translationsS = input<Record<string, string> | undefined>(undefined, {alias: 'translations'});

  public co2_transport_sumS = computed( () => {
    const data = this.input_dataS();
    const result = data.reduce( (sum, item ) => {
      sum += item.co2_transport.value;
      return sum;
    } , 0);
    return result;
  });

  public gwp_sumS = computed( () => {
    const data = this.input_dataS();
    const result = data.reduce( (sum, item ) => {
      sum += item.gwp.value;
      return sum;
    } , 0);
    return result;
  });

}
