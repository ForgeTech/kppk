import { z } from "zod";
import { 
  component_composition_step_1_parser,
  component_composition_step_2_parser,
  component_composition_step_3_parser,
  component_surface_area_transform_step_1_parser,
  component_surface_area_transform_step_2_parser,
  material_oi3_step_1_parser,
  material_oi3_step_2_parser 
} from "../../types";

const transform_comma_seperated_numberstring_to_number = ( stringNumberToParse: string ) => {
    // console.log('stringNumberToParse')
    if(stringNumberToParse === '' || stringNumberToParse === null || stringNumberToParse === undefined) {
      return NaN;
    }
    const transformed = stringNumberToParse.replaceAll('.', '').replace(',','.');
    const result = parseFloat( transformed );

    return result;
  }

const calculate_area_coefficient = (
    lathing_value1: {
      value: number | null;
      unit: string;
    },
    lathing_value2: {
      value: number | null;
      unit: string;
    },
  ): {
    value: number;
    unit: string;
  } => {
    const value1 = z.object({
      value: z.number(),
      unit: z.string()
    }).parse(lathing_value1);
    const value2 = z.object({
      value: z.number(),
      unit: z.string()
    }).parse(lathing_value2);
    const result = {
      value:  value1.value / ( value1.value + value2.value),
      unit: "" as const
    }
    return result;
}

export const transform_aufbauten = ( aufbauten_data: any[] ) => {
    let part_name_helper = 'NONE';
    let part_lathing_thickness_fill_down_helper = 0;
    let part_lathing_spacing_fill_down_helper = 0;
    //  Table.RemoveColumns(Quelle,{"Column5", "Column1", "Column9"})
    const result = aufbauten_data.map( row => {
      const transformedRow: string[] = [];
      if( row.length === 9) {
        // transformedRow.push(row[0]);
        transformedRow.push(row[1]);
        transformedRow.push(row[2]);
        transformedRow.push(row[3]);
        // transformedRow.push(row[4]);
        transformedRow.push(row[5]);
        transformedRow.push(row[6]);
        transformedRow.push(row[7]);
        // transformedRow.push(row[8]);
        return transformedRow;
      } else {
        return row;
      }
    })
    // remove empty rows
    // = Table.SelectRows(#"Umbenannte Spalten", each not List.ContainsAny({[Column2]},{"","xxxx",null}))
    .filter( row => row.findIndex( (col: any) => col === '' || col === 'xxxx' || col === null ) === -1 ? true : false) 
    // Hinzugefuegte Benutzredefinierte Spalte
    // = Table.AddColumn(#"Entfernt leere Zeilen", "Bauteil", each 
    // if [Dicke] = "U-Wert vorh.:" then [Column2] 
    // else null, type text )
    .map( row => {
      if ( row[2] === "U-Wert vorh.:" ) {
        row.push( row[0] )
      } else {
        row.push( '' )
      }
      return row;
    })
    // Nach unten gefuellt
    .map( row => {
      if( row[ row.length-1] !== '') {
        part_name_helper = row[ row.length-1 ];
      } else {
        row[ row.length-1] = part_name_helper;
      }
      return row;
    })
    // Entfernt Bauteil
    // = Table.SelectRows(#"Nach unten gefüllt" , each not (_[Dicke] = "U-Wert vorh.:"))
    .filter( row => row[2] === "U-Wert vorh.:" ? false : true )
    // Spalte nach Trennzeichen teilen
    // = Table.SplitColumn(#"Entfernt Bauteilzeilen", 
    // "Column2", Splitter.SplitTextByDelimiter(".", QuoteStyle.Csv), 
    //{"Column2.1", "Column2.2"})
    .map( row => {
      let transformedRow: string[] = [];
      const splitRow = row[0].split('.')
      transformedRow.push( splitRow[0] );
      transformedRow.push( splitRow[1] ? splitRow[1] : '' );
      transformedRow.push( row[1] );
      transformedRow.push( row[2] );
      transformedRow.push( row[3] );
      transformedRow.push( row[4] );
      transformedRow.push( row[5] );
      transformedRow.push( row[6] );
      return transformedRow;
    })
    // Geaenderter Typ3
    // = Table.TransformColumnTypes(#"Spalte nach Trennzeichen teilen",
    // {{"Column2.1", Int64.Type}, 
    // {"Column2.2", Int64.Type}, 
    //{"Dicke", type number}, 
    // {"Flächenbezogen Masse", type number}, 
    // {"Abstand Lattung", type number},
    // {"Breite Lattung", type number}})
    .map( (row, index) => {
      const item = component_composition_step_1_parser.parse({
        id: 'aufbauten-' + index,
        column_2_1: { 
          value: transform_comma_seperated_numberstring_to_number( row[0] ),
          unit: '' },
        column_2_2: { 
          value: isNaN(transform_comma_seperated_numberstring_to_number( row[1] )) ? null : transform_comma_seperated_numberstring_to_number( row[1] ),
          unit: '' },
        name: { 
          value: row[2].trim(),
          unit: '' },
        thickness: { 
          value: transform_comma_seperated_numberstring_to_number( row[3] ),
          unit: '' },
        surface_related_mass: { 
          value: transform_comma_seperated_numberstring_to_number( row[4] ),
          unit: '' },
        lathing_spacing: { 
          value: transform_comma_seperated_numberstring_to_number( row[5] ),
          unit: '' },
        lathing_thickness: { 
          value: transform_comma_seperated_numberstring_to_number( row[6] ),
          unit: '' },
        short_id: { 
          value: row[7].trim(),
          unit: '',
        },
      })
      return item;
    })
    // = Table.ReplaceValue(#"Geänderter Typ3",0,null,
    // Replacer.ReplaceValue,{"Abstand Lattung", "Breite Lattung"})
    .map( row => {
      return component_composition_step_2_parser.parse(row);
    })
    // Nach unten gefuellt 1
    // = Table.FillDown(#"Ersetzter Wert",{"Abstand Lattung", "Breite Lattung"})
    .map( row => {
      if( row.lathing_spacing.value === null) {
        row.lathing_spacing.value = part_lathing_spacing_fill_down_helper; 
      } else {
        part_lathing_spacing_fill_down_helper = row.lathing_spacing.value;
      }
      if( row.lathing_thickness.value === null) {
        row.lathing_thickness.value = part_lathing_thickness_fill_down_helper; 
      } else {
        part_lathing_thickness_fill_down_helper = row.lathing_thickness.value;
      }
      return component_composition_step_2_parser.parse(row);
    })
    // = Table.AddColumn(#"Nach unten gefüllt1", "Fläche Koeffizient",
    // each if [Column2.2] = null then 1 
    // else if [Column2.2] = 0 then [Breite Lattung]/([Breite Lattung]+[Abstand Lattung])
    // else [Abstand Lattung]/([Breite Lattung]+[Abstand Lattung]),type number)
    .map( row => {
      const area_coefficient_object = {
        area_coefficient: {
          value: NaN,
          unit: '',
        }
      }
      if( row.column_2_2.value === null ) {
        area_coefficient_object.area_coefficient.value = 1;
      } else if ( row.column_2_2.value === 0 ) {
        // console.log( 'row.column_2_2.value === 0' )
        // console.log( row )
        area_coefficient_object.area_coefficient = calculate_area_coefficient( row.lathing_thickness, row.lathing_spacing );
      } 
      else {
        // console.log( 'else' )
        // console.log( row )
        area_coefficient_object.area_coefficient = calculate_area_coefficient( row.lathing_spacing, row.lathing_thickness );
      }
      return Object.assign( row, area_coefficient_object);
    })
    //= Table.RemoveColumns(#"Flächenkoeffizient Spalte hinzugefuegt",{"Column2.1", "Column2.2", "Abstand Lattung", "Breite Lattung"})
    
    .map( row => component_composition_step_3_parser.parse( row ));
  return result;
}

export const transform_oi3 = ( oi3_data: any[], bgf: number ) => {
    return oi3_data.map( (row, index) => {
        const item = material_oi3_step_1_parser.parse({
            id: 'oi3-' + index,
            name: {
            value: row[0].trim(),
            unit: ''
            },
            area: {
            value: transform_comma_seperated_numberstring_to_number(row[1]),
            unit: 'm2' 
            },
            oi3: {
            value: transform_comma_seperated_numberstring_to_number(row[2]),
            unit: 'oi3/m2'
            },
            penrt: {
            value: transform_comma_seperated_numberstring_to_number(row[3]),
            unit: 'MJ/m2'
            },
            gwp: {
            value: transform_comma_seperated_numberstring_to_number(row[4]),
            unit: 'kgCo2/m2'
            },
            gwp_biogenic: {
            value: transform_comma_seperated_numberstring_to_number(row[5]),
            unit: 'kgCo2/m2'
            },
            ap: {
            value: transform_comma_seperated_numberstring_to_number(row[6]),
            unit: 'kgCo2/m2'
            },
        });
        return item;
        }).map( row_oi3 => {
        const gwp_total_object = {
            gwp_total: {
            value: row_oi3.gwp.value * bgf,
            unit: '',
            }
        } 
        return material_oi3_step_2_parser.parse(Object.assign( row_oi3, gwp_total_object));
    });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> transformed_bauteilflaechen >>>>>>>>>>>>>>>>>>
// CAUTION! While these operations could be optimized map/filter/etc-method calls and their changes
// follow the same sequenze and apply the same changes as the appear in the original xlsx(Excel-File)'s
// query to allow comparing the applied steps
export const transform_bauteilflaechen = ( bauteilflaechen_data: any[] ) => {
  // console.log('>>>>>>>>>>>>>>>>bauteilflaechen_data>>>>>>>>>>>>>>>>>>');
  // console.log( bauteilflaechen_data );
    // Map csv data to attributes and transform string encoded numbers to real float-values
    const result =  bauteilflaechen_data
    .filter( row => row.length === 10)
    .map( (row, index) => {
        // console.log('>>>>>>>>>>>>>>>>ROW>>>>>>>>>>>>>>>>>>');
        // console.log( row );
        const item = component_surface_area_transform_step_1_parser.parse({
        id: 'bauteilflaechen-' + index,
        lfd_nr: {
            value: row[0].trim(),
            unit: ''
        },
        type: {
            value: row[1].trim(),
            unit: '' 
        },
        short_id: {
            value: row[2].trim(),
            unit: ''
        },
        name: {
            value: row[3].trim(),
            unit: ''
        },
        description: {
            value: row[4].trim(),
            unit: ''
        },
        status: {
            value: row[5].trim(),
            unit: ''
        },
        u_value: {
            value: transform_comma_seperated_numberstring_to_number(row[6]),
            unit: 'W/m2K'
        },
        area_single: {
            value: transform_comma_seperated_numberstring_to_number(row[7]),
            unit: 'm2'
        },
        area_sum: {
            value: transform_comma_seperated_numberstring_to_number(row[8]),
            unit: 'm2'
        },
        amount: {
            value: transform_comma_seperated_numberstring_to_number(row[9]),
            unit: 'pieces'
        },
        });
        return item;
    })
    // Remove all uneeded attributes
    .map( row => {
        const item = component_surface_area_transform_step_2_parser.parse(row);
        return item;
    })
    // Drop all rows with area_sum attribute equal (or smaller - which shouldn't exist) 0
    .filter( item => item.area_sum.value > 0);

  return result;
}

