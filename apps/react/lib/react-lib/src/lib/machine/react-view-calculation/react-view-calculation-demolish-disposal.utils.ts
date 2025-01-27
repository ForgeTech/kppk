import { 
  DEMOLISH_DISPOSAL_FORM_INSULATION_SECTION,
  demolish_disposal_form_material_item_parser,
  DEMOLISH_DISPOSAL_FORM_MATERIAL_SECTION,
  DEMOLISH_DISPOSAL_FORM_RESULT_ITEM,
  demolish_disposal_form_result_item_parser,
  demolish_disposal_form_result_parser,
  DEMOLISH_DISPOSAL_FORM_SETTING 
} from "../../types/kppk-react-demolish-disposal.types";
import { add_number_units,
  UNIT_GCO2_KM,
  UNIT_KG,
  UNIT_KG_M3,
  UNIT_KGCO2,
  unit_kilogram_co2_parser,
  unit_kilogram_parser,
  unit_kilometer_parser, 
  UNIT_KM, 
  UNIT_LITER, 
  UNIT_LITER_100KM, 
  unit_liter_parser,
  UNIT_M3,
  unit_meter_cubic_parser,
  UNIT_PERCENT,
  unit_string_parser,
  UNIT_TRIPS,
  unit_trips_parser 
} from "../../types/kppk-react-unit.types";
import { MATERIAL_DENSITY_DATA, material_density_item_parser } from "../../types/kppk-react-material.types";
import { TRUCK_DATA, truck_data_item_parser, truck_data_parser } from "../../types/kppk-react-truck.types";
import { FG_FORM_DEMOLISH_DISPOSAL_CONTEXT } from "../../types/kppk-react-calculation.types";
import { REACT_INIT_LOAD_FROM_REMOTE_DATA } from "../../types";



export const calculate_weight_capacity_from_truck_usage = ( 
  capacity: UNIT_KG, 
  usage: UNIT_PERCENT
): UNIT_KG => {
  const factor =  (usage.value/100);
  const value = capacity.value * factor;
  return unit_kilogram_parser.parse({ value });
}

export const calculate_volume_capacity_from_truck_usage = ( 
  capacity: UNIT_M3, 
  usage: UNIT_PERCENT
): UNIT_M3 => {
  const factor =  (usage.value/100);
  const value = capacity.value * factor;
  return unit_meter_cubic_parser.parse({ value });
}

export const calculate_mass = ( 
  volume: UNIT_M3, 
  density: UNIT_KG_M3, 
): UNIT_KG => {
  const value = volume.value * density.value;
  return unit_kilogram_parser.parse({value});
}

export const calculate_trips_from_mass = ( 
  mass: UNIT_KG, 
  capacity: UNIT_KG 
):  UNIT_TRIPS => {
  const value = mass.value / capacity.value;
  return unit_trips_parser.parse({ value });
}

export const calculate_trips_from_volume = ( 
  volume: UNIT_M3, 
  capacity: UNIT_M3, 
):  UNIT_TRIPS => {
  const value = volume.value / capacity.value;
  return unit_trips_parser.parse({ value });
}

export const calculate_distance_from_trips = ( 
  distance: UNIT_KM, 
  trips: UNIT_TRIPS, 
):  UNIT_KM => {
  const value = distance.value * trips.value;
  return unit_kilometer_parser.parse({ value });
}

export const calculate_consumption_sum = ( 
  distance: UNIT_KM, 
  consumption: UNIT_LITER_100KM, 
):  UNIT_LITER => {
  const value = distance.value * ( consumption.value / 100 );
  return unit_liter_parser.parse({ value });
}

export const calculate_consumption_co2 = ( 
  consumption: UNIT_KM, 
  co2_consumption: UNIT_GCO2_KM, 
): UNIT_KGCO2 => {
  const g_co2 = consumption.value * co2_consumption.value;
  const value = g_co2 / 1000;
  return unit_kilogram_co2_parser.parse({ value })
}

export const get_section_result = ( 
  section: DEMOLISH_DISPOSAL_FORM_MATERIAL_SECTION | DEMOLISH_DISPOSAL_FORM_INSULATION_SECTION, 
  density_data: MATERIAL_DENSITY_DATA, 
  setting: DEMOLISH_DISPOSAL_FORM_SETTING, 
  truck_data: TRUCK_DATA
): Record<string, DEMOLISH_DISPOSAL_FORM_RESULT_ITEM> => { 
    const section_helper: any = section;
    const result: Record<string, DEMOLISH_DISPOSAL_FORM_RESULT_ITEM> = {};
    Object.keys( section ).forEach( key => {
      const material = demolish_disposal_form_material_item_parser.parse( section_helper[ key ]);
      const material_density = material_density_item_parser.parse( density_data.find( entry => entry.material.value === key ));
      const truck = truck_data_item_parser.parse(truck_data.find( truck => truck.category.includes( material.container.value )));
      let truck_capacity: UNIT_KG | UNIT_M3;
      let trips: UNIT_TRIPS;
      // calculate weight capacity
      if( truck.max_density.value < material_density.density.value ){
        const material_mass = calculate_mass( material.volume, material_density.density );
        truck_capacity = calculate_weight_capacity_from_truck_usage(truck.capacity_weight, setting.usage);
        trips = calculate_trips_from_mass(material_mass, truck_capacity);
      } 
      // calculate of volume capacity
      else {
        truck_capacity = calculate_volume_capacity_from_truck_usage(truck.capacity_volume, setting.usage);
        trips = calculate_trips_from_volume(material.volume, truck_capacity)
      }
      const distance_sum = calculate_distance_from_trips( material.distance, trips);
      const consumption_sum = calculate_consumption_sum( distance_sum, truck.consumption);
      // consumption_sum_wrong = this.calculatConsumptionSum( material.distance, truck.consumption);
      const consumption_co2 = calculate_consumption_co2( distance_sum, truck.co2_consumption);
      result[ key ] = demolish_disposal_form_result_item_parser.parse({
        key: unit_string_parser.parse({ value: key }),
        capacity: truck_capacity,
        trips,
        distance_sum,
        consumption_sum,
        consumption_co2,
      })
    });
    return result;
  }

export const calculate_demolish_disposal_results = ( 
  form_demolish_disposal: FG_FORM_DEMOLISH_DISPOSAL_CONTEXT,
  data: REACT_INIT_LOAD_FROM_REMOTE_DATA 
): any  => {
  const truck_data = truck_data_parser.parse( data.truck.filter( item => item.category.includes('demolish_disposal' )));
  const material_section_result = get_section_result( 
    form_demolish_disposal.value.material,
    data.material_density,
    form_demolish_disposal.value.setting,
    truck_data 
  );
  const insulation_section_result = get_section_result( 
    form_demolish_disposal.value.insulation,
    data.material_density,
    form_demolish_disposal.value.setting,
    truck_data 
  );
  const section_items: DEMOLISH_DISPOSAL_FORM_RESULT_ITEM[] = [];
  Object.keys( material_section_result ).forEach( key => {
    section_items.push( material_section_result[ key ] );
  }) 
  Object.keys( insulation_section_result ).forEach( key => {
    section_items.push( insulation_section_result[ key ] );
  });
  const consumption_co2_sum = section_items.map( value => value.consumption_co2).reduce( (sum, kg_co2) => {
    return add_number_units( sum, kg_co2 );
  }, unit_kilogram_co2_parser.parse({}))
  const result =  { 
    material_section_result, 
    insulation_section_result,
    consumption_co2_sum 
  }
  // console.log( '>>>>>>>>>>>>>>>>RESULT>>>>>>>>>>>>>' );
  // console.log( result );
  return demolish_disposal_form_result_parser.parse(result)
}
