
import { nestedLoopLeftAntiJoin } from "lodash-joins";
import { COMPONENT_SURFACE_AREA_TRANSFORM_STEP_1, MATERIAL_OI3_STEP_2 } from "../../types";

const transform_comma_seperated_numberstring_to_number = ( stringNumberToParse: string ): number => {
  // console.log('stringNumberToParse')
  if(stringNumberToParse === '' || stringNumberToParse === null || stringNumberToParse === undefined) {
    return NaN;
  }
  const transformed = stringNumberToParse.replaceAll('.', '').replace(',','.');
  const result = parseFloat( transformed );

  return result;
}

export const merge_bauteilflaechen_aufbauten = ( transformed_aufbauten: any[], transformed_bauteilflaechen: any[] ) => {
    const join_bauteilflaechen_plus_aufbauten_helper:  { [key: string]: COMPONENT_SURFACE_AREA_TRANSFORM_STEP_1 | undefined; } = {};

    // = Table.NestedJoin(Aufbauten, {"Bauteil"}, Bauteilflächen, {"Bauteilkürzel"}, "Bauteilflächen", JoinKind.RightOuter)
    const result: any[] = transformed_aufbauten
      .filter( row_aufbauten => {
            const found_bauteilflaechen_row = transformed_bauteilflaechen.find( row_bauteilflaechen => row_aufbauten.short_id.value === row_bauteilflaechen.short_id.value);
          if( found_bauteilflaechen_row ) {
            join_bauteilflaechen_plus_aufbauten_helper[row_aufbauten.short_id.value] = found_bauteilflaechen_row;
            return true;
          } else {
            return false;
          }
      })
      // = Table.AddColumn(Quelle, "Fläche", each ([Bauteilflächen]{0}[FlächeBauteilGesamt])*[Fläche Koeffizient], type number)
      // = Table.RemoveColumns(#"Hinzugefügte benutzerdefinierte Spalte",{"Bauteilflächen"}) <= Field wasn't added
      .map( row_aufbauten => {
        const row_bauteilflaechen = join_bauteilflaechen_plus_aufbauten_helper[row_aufbauten.short_id.value];
        if(row_bauteilflaechen) {
          const area_object = { area: {
            value: row_bauteilflaechen.area_sum.value * row_aufbauten.area_coefficient.value,
            unit: 'm²'
          }};
          return Object.assign( row_aufbauten, area_object);
        } else {
          throw 'ERROR: According row not found!'
        }
      })
    // = Table.AddColumn(#"Entfernte Spalten", "Masse", each [Flächenbezogen Masse]*[Fläche], type number)
    .map( row_aufbauten => {
        const mass = { mass: {
          value: row_aufbauten.surface_related_mass.value * row_aufbauten.area.value,
          unit: ''
        }};
        return Object.assign( row_aufbauten, mass );
    })
    // = Table.AddColumn(#"Hinzugefügte benutzerdefinierte Spalte1", "Volumen ", each [Dicke]*[Fläche], type number)
    .map( row_aufbauten => {
      const volumn = { volumn: {
        value: row_aufbauten.thickness.value * row_aufbauten.area.value,
        unit: ''
      }};
      return Object.assign( row_aufbauten, volumn );
    })
    // = Table.Group(#"Hinzugefügte benutzerdefinierte Spalte2", {"Schicht"}, 
    // {{"Summe Masse [kg]", each Number.Round(List.Sum([Masse]),2), type nullable number}, 
    // {"Summe Volumen [m3]", each Number.Round(List.Sum([#"Volumen "]),3), type nullable number}})
    .reduce( (sum, row_aufbauten) => {
        const mass =  {
          value: row_aufbauten.mass.value,
          unit: 'kg' as const
        };
        const volumn = {
          value: row_aufbauten.volumn.value,
          unit: 'm3' as const
        };
        if( sum[0][ row_aufbauten.name.value ] ) {
          sum[0][ row_aufbauten.name.value ].mass.value += mass.value;
          sum[0][ row_aufbauten.name.value ].volumn.value += volumn.value;
        } else {
          sum[0][ row_aufbauten.name.value ] = {
            mass,
            volumn
          }
        }
        return sum;
      }, [{}] as { [key: string]: { mass: { value: number, unit: 'kg'}, volumn: { value: number, unit: 'm3'} } }[]
    )
    .map( (reduced: any) => {
      return Object.keys( reduced ).map( key => {
        return {
          name: { 
            value: key,
            unit: '' as const
          },
          ...reduced[ key ]
        }
      })
    })
    .flat()
    // = Table.SelectRows(#"Gruppierte Zeilen", each not List.ContainsAny({[#"Summe Masse [kg]"]},{"","xxxx",null,0}))
    .filter( (row_aufbauten: any) => {
      return row_aufbauten.mass.value === 0 ? false : true;
    } )
    // = Table.AddColumn(#"Entfernt leere Zeilen", "Dichte", each Number.Round([#"Summe Masse [kg]"]/[#"Summe Volumen [m3]"]), type number)
    .map( (row_aufbauten: any, index: number) => {
      const id_and_density_object = { 
        id: 'merge_bauteilflaechen_aufbauten-' + index,
        density: {
          value: row_aufbauten.mass.value / row_aufbauten.volumn.value,
          unit: 'kg/m3' as const
        }
      };
      return Object.assign( row_aufbauten, id_and_density_object );
    })
  return result;
};

export const transformed_arich_plus_oi3_source_1 = ( transformed_oi3: any[] ) => {
  // Quelle1 = #"Bauteilflächen+Aufbauten"
  // Quelle2 = #"Materialien OI3"
  const result: any[] = transformed_oi3
    // = Table.Group(Quelle2, {"Material"}, 
    // {"Fläche", each List.Sum([Fläche]), type nullable number}})
    .reduce( (sum, arich_plus_oi3) => {
      const gwp_total =  {
        value: arich_plus_oi3.gwp_total.value,
        unit: '' as const
      };
      const area = {
        value: arich_plus_oi3.area.value,
        unit: 'm2' as const
      };
      if( sum[0][ arich_plus_oi3.name.value ] ) {
        sum[0][ arich_plus_oi3.name.value ].gwp_total.value += gwp_total.value;
        sum[0][ arich_plus_oi3.name.value ].area.value += area.value;
      } else {
        sum[0][ arich_plus_oi3.name.value ] = {
          gwp_total,
          area
        }
      }
      return sum;
    }, [{}] as { [key: string]: { gwp_total: { value: number, unit: ''}, area: { value: number, unit: 'm2'} } }[]
    )
    .map( (reduced: any) => {
      return Object.keys( reduced ).map( key => {
        return {
          name: { 
            value: key,
            unit: '' as const
          },
          ...reduced[ key ]
        }
      })
    })
    .flat()
    .map( (material_row: any) => {
      return material_row;
    })
    .sort( ( a: any, b: any ) => {
      if (a.name.value < b.name.value) {
        return -1;
      }
      if (a.name.value > b.name.value) {
        return 1;
      }
      return 0;
    });
    return result;
  }

export const transformed_arich_plus_oi3_source_2 = ( merged_bauteilflaechen_plus_aufbauten: any[], transformed_oi3: any[] ) => {
  const join_arich_plus_oi3_helper:  { [key: string]: MATERIAL_OI3_STEP_2 | undefined; } = {};
  const result = merged_bauteilflaechen_plus_aufbauten
  .filter( row_arich_plus_oi3_source_2 => {
    // const join_arich_plus_oi3_row = this.transformed_oi3.find( row_oi3 => row_arich_plus_oi3_source_2.layer.value.toLowerCase().trim() === row_oi3.name.value.toLowerCase().trim());
    // const test = this.transformed_oi3.map( row_oi3 => this.similarity.similarity(row_arich_plus_oi3_source_2.layer.value.trim(), row_oi3.name.value.trim()) );
    // const test2 = test.reduce( (sum, current, index) => {
    //   if (sum.value === null || current > sum.value) {
    //     return { index: index, value: current };
    //   } else {
    //     return sum;
    //   }
    // }, { index: -1, value: null } as { index: number, value: number | null});
    // console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SIMILARITY > 99%' );
    // console.log( test2.value );
    // console.log( row_arich_plus_oi3_source_2.layer );
    // console.log( this.transformed_oi3[ test2.index ].name );
    const found = transformed_oi3.find( item => row_arich_plus_oi3_source_2.name.value === item.name.value);
    if( found ) {
      join_arich_plus_oi3_helper[row_arich_plus_oi3_source_2.name.value] = found;
      return true;
    } else {
      return false;
    }
  })
  .map( row_arich_plus_oi3_source_2 => {
    const row_oi3 = join_arich_plus_oi3_helper[row_arich_plus_oi3_source_2.name.value];
    if(row_oi3) {
      const joing_object = { table_oi3: {
        value: row_oi3,
        unit: ''
      }};
      return Object.assign( row_arich_plus_oi3_source_2, joing_object);
    } 
    else {
      // console.log(row_arich_plus_oi3_source_2)
    //   throw 'ERROR: According row not found!'
      const joing_object = { table_oi3: {
        value: null,
        unit: '',
      }};
      return  Object.assign( row_arich_plus_oi3_source_2, joing_object);
    }
  });
  return result;
}

export const transformed_arich_plus_oi3_source_2_found = (transformed_arich_plus_oi3_source_1: any[], transformed_arich_plus_oi3_source_2: any[] ) => {
const result = transformed_arich_plus_oi3_source_2
// FEHLER! Vollholzgurt: Nutzholz (475 kg/m³ - zB Fichte/Tanne) - rauh, technisch getrockne vorhanden
.filter( row => {
  return row.table_oi3.value !== null;
})
.map( row => {
  const io3 = row.table_oi3;
  const test = transformed_arich_plus_oi3_source_1.find( row_source_1 => row.name.value === row_source_1.name.value);
  let gwp = io3.value?.gwp_total.value;
  if( test && io3.value?.gwp_total.value  ) {

    const changed = Math.abs(test.gwp_total.value) > Math.abs(io3.value.gwp_total.value);
    if( changed ) {
      // console.log('CHANGED');
      // console.log( test.name.value );
      // console.log( test.gwp_total.value, ' : ', io3.value?.gwp_total.value );
      gwp = test.gwp_total.value;
    }
  }
  const merge_object = {
    gwp: {
      value: gwp,
      unit: io3.value?.gwp_total.unit
    },
    area: {
      value: null,
      unit: io3.value?.area.unit
    }
  }
  return Object.assign( row, merge_object)
})
.sort( ( a, b ) => {
  if (a.name.value < b.name.value) {
    return -1;
  }
  if (a.name.value > b.name.value) {
    return 1;
  }
  return 0;
});
  return result;
}

export const transformed_arich_plus_oi3_source_2_not_found = (transformed_arich_plus_oi3_source_2: any[] ) => {
  const join_arich_plus_oi3_not_found_helper:  { [key: string]: MATERIAL_OI3_STEP_2 | undefined; } = {};
  const result = transformed_arich_plus_oi3_source_2
  // FEHLER! Vollholzgurt: Nutzholz (475 kg/m³ - zB Fichte/Tanne) - rauh, technisch getrockne vorhanden
  .filter( row_arich_plus_oi3_source_2 => {
    return row_arich_plus_oi3_source_2.table_oi3.value === null;
  })
  // .filter( row_arich_plus_oi3_source_2 => {
    
  //   const test = this.transformed_oi3.map( row_oi3 => this.similarity.similarity(row_arich_plus_oi3_source_2.name.value, row_oi3.name.value) );
  //   const test2 = test.reduce( (sum, current, index) => {
  //     if (sum.value === null || current > sum.value) {
  //       return { index: index, value: current };
  //     } else {
  //       return sum;
  //     }
  //   }, { index: -1, value: null } as { index: number, value: number | null});
  //   // console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SIMILARITY > 70%' );
  //   // console.log( test2.value );
  //   // console.log( row_arich_plus_oi3_source_2.name );
  //   // console.log( this.transformed_oi3[ test2.index ].name );
  // if( test2.value !== null && test2.value >= 0.7 ) {
  //   join_arich_plus_oi3_not_found_helper[row_arich_plus_oi3_source_2.name.value] = this.transformed_oi3[ test2.index ];
  //   return true;
  // } else {
  //   return true;
  // }
  // })
  .map( row_arich_plus_oi3_source_2 => {
    const row_oi3 = join_arich_plus_oi3_not_found_helper[row_arich_plus_oi3_source_2.name.value];
    if(row_oi3) {
      const joing_object = { 
        table_oi3: {
          value: row_oi3,
          unit: ''
        },
        // oi3_gwp: {
        //   value: row_oi3.gwp,
        //   unit: ''
        // },
        // oi3_gwp_total: {
        //   value: row_oi3.gwp_total,
        //   unit: ''
        // }
      };
      return Object.assign( row_arich_plus_oi3_source_2, joing_object);
    } 
    else {
      // console.log(row_arich_plus_oi3_source_2)
      //   throw 'ERROR: According row not found!'
      const joing_object = { table_oi3: {
        value: null,
        unit: '',
      }};
      return  Object.assign( row_arich_plus_oi3_source_2, joing_object);
    }
  }).sort( ( a, b ) => {
    if (a.name.value < b.name.value) {
      return -1;
    }
    if (a.name.value > b.name.value) {
      return 1;
    }
    return 0;
  });
  return result;
}

export const transformed_arich_plus_oi3_source_2_o1 = ( transformed_oi3: any[], transformed_bauteilflaechen_plus_aufbauten: any[] ) => {
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> transformed_arich_plus_oi3 >>>>>>>>>>>>>>>>>>
  const result = nestedLoopLeftAntiJoin( 
    transformed_oi3, obj => { return obj.name.value }, 
    transformed_bauteilflaechen_plus_aufbauten, obj => { return obj.name.value }
  ).filter( item => item.gwp.value > 0);
  return result;
}

export const window_items = ( transformed_oi3: any[], transformed_bauteilflaechen_plus_aufbauten: any[] ) => {
  const result = nestedLoopLeftAntiJoin( 
    transformed_oi3, obj => { return obj.name.value }, 
    transformed_bauteilflaechen_plus_aufbauten, obj => { return obj.name.value },
  ).filter( item => item.gwp.value !== 0).map( item => {
    const type_object = {
      type: {
        value: 'window',
        unit: ''
      },
      type_edited: {
        value: false,
        unit: ''
      } 
    }
    return Object.assign( item, type_object );
  });
  return result;
}
  // console.log('>>>>>>>>>>>>>>CORRECTION>>>>>>>>>>>>>')
  // console.log('nestedLoopRightAntiJoin', this.windows);
  // // console.log('nestedLoopLeftAntiJoin', this.transformed_arich_plus_oi3_source_2_o1.length);
  // // console.log(this.transformed_arich_plus_oi3_source_2_o1);
  // // console.log( io3_not_in_aufbauten );
  // this.windows.forEach( item => {
  //     console.log( item.name.value,' GWP: ', item.gwp.value)
  // })
  export const concrete_items = ( transformed_arich_plus_oi3_source_2_found: any[], transformed_arich_plus_oi3_source_2_not_found: any[] ) => {
    const result = [
      ...transformed_arich_plus_oi3_source_2_found, 
      ...transformed_arich_plus_oi3_source_2_not_found
    ].filter( item => {
      // console.log('>>>>>>>>>CONCRETE>>>>>>>>')
      // console.log( item.name.value );
      const name = item.name.value.toLowerCase();
      let result = false;
      if( name.indexOf('beton') !== -1 || name.indexOf('stb-') !== -1 ) {
        result = true;
      }
      // console.log( result );
      return result;
    }).map( item => {
      const type_object = {
        type: {
          value: 'concrete',
          unit: ''
        },
        type_edited: {
          value: false,
          unit: ''
        } 
      }
      return Object.assign( item, type_object);
    });
    return result;
  }


  export const material_items = ( transformed_arich_plus_oi3_source_2_found: any[], transformed_arich_plus_oi3_source_2_not_found: any[] ) => {
    const result = [
      ...transformed_arich_plus_oi3_source_2_found, 
      ...transformed_arich_plus_oi3_source_2_not_found
    ]
    .filter( item => {
      return item.name.value.toLowerCase().indexOf('beton') === -1 && item.name.value.toLowerCase().indexOf('stb-') === -1
    }).map( item => {
      const type_object = {
        type: {
          value: 'material',
          unit: ''
        },
        type_edited: {
          value: false,
          unit: ''
        } 
      }
      return Object.assign( item, type_object);
    });
    return result;
  }
