import { z } from 'zod';
import { 
  unit_kilogram_co2_parser,
  unit_kilowatthours_month_parser,
  unit_kilowatthours_parser,
  unit_kilowatthours_week_parser,
  unit_kilometer_parser,
  unit_month_parser,
  unit_pieces_parser,
  unit_string_parser, 
} from './kppk-react-unit.types';
import { construction_energy_usage_site_power_type_enum_parser } from './kppk-react-construction-site.types';

export const container_village_form_energy_value_parser = z.object({
  amount: unit_pieces_parser.optional().default({}),
  usage: unit_month_parser.optional().default({}),
});
export type CONTAINER_VILLAGE_FORM_ENERGY_VALUE = z.infer<typeof container_village_form_energy_value_parser>;



export const container_village_form_settings_parser = z.object({
  distance: unit_kilometer_parser.optional().default({}),
  energy_usage_power_type: construction_energy_usage_site_power_type_enum_parser.optional().default({})
});
export type CONTAINER_VILLAGE_FORM_SETTINGS = z.infer<typeof container_village_form_settings_parser>;

export const container_village_form_energy_parser = z.object({
  office: container_village_form_energy_value_parser.optional().default({}),
  meeting: container_village_form_energy_value_parser.optional().default({}),
  sanitary: container_village_form_energy_value_parser.optional().default({}),
  residency: container_village_form_energy_value_parser.optional().default({}),
  repository: container_village_form_energy_value_parser.optional().default({}),
  first_aid: container_village_form_energy_value_parser.optional().default({}),
});
export type CONTAINER_VILLAGE_FORM_ENERGY = z.infer<typeof container_village_form_energy_parser>;



export const container_village_energy_week_category_value_parser = z.object({
  lighting: unit_kilowatthours_week_parser,
  heating: unit_kilowatthours_week_parser,
  electronics: unit_kilowatthours_week_parser,
  warm_water: unit_kilowatthours_week_parser,
  cooling: unit_kilowatthours_week_parser,
});
export type CONTAINER_VILLAGE_ENERGY_WEEK_CATEGORY_VALUES = z.infer<typeof container_village_energy_week_category_value_parser>;

export const container_village_energy_data_parser = z.object({
  office: container_village_energy_week_category_value_parser,
  meeting: container_village_energy_week_category_value_parser,
  sanitary: container_village_energy_week_category_value_parser,
  residency: container_village_energy_week_category_value_parser,
  repository: container_village_energy_week_category_value_parser,
  first_aid: container_village_energy_week_category_value_parser,
});
export type CONTAINER_VILLAGE_ENERGY_DATA = z.infer<typeof container_village_energy_data_parser>;

export const container_village_energy_week_category_with_sum_week_and_month_value_parser = container_village_energy_week_category_value_parser.extend({
  key: z.string(),
  energy_week: unit_kilowatthours_week_parser,
  energy_month: unit_kilowatthours_month_parser,
});
export type CONTAINER_VILLAGE_ENERGY_WEEK_CATEGORY_WITH_SUM_WEEK_MONTH_VALUE = z.infer<typeof container_village_energy_week_category_with_sum_week_and_month_value_parser>;

export const container_village_energy_info_parser = z.array(container_village_energy_week_category_with_sum_week_and_month_value_parser); 
export type CONTAINER_VILLAGE_ENERGY_INFO = z.infer<typeof container_village_energy_info_parser>;

export const container_village_form_transport_parser = z.object({
  transport: unit_kilometer_parser
});

export const container_village_energy_result_item = z.object({
  key: unit_string_parser,
  energy: unit_kilowatthours_parser,
  co2: unit_kilogram_co2_parser
});
export type CONTAINER_VILLAGE_ENERGY_RESULT_ITEM = z.infer<typeof container_village_energy_result_item>;

export const container_village_energy_result_parser = z.array(container_village_energy_result_item)
export type CONTAINER_VILLAGE_ENERGY_RESULT = z.infer<typeof container_village_energy_result_parser>;


// export const form_transport_extended_with_units_parser = z.object({
//   transport: z.object({
//     distance: unit_km_parser,
//   })
// });
// export type FORM_TRANSPORT_EXTENDET_WITH_UNITS = z.infer<typeof form_transport_extended_with_units_parser>;

export const container_village_transport_result_item_container_sum_parser = z.object({
  container_sum: unit_pieces_parser,
});
export type CONTAINER_VILLAGE_TRANSPORT_RESULT_ITEM_CONTAINER_SUM = z.infer<typeof container_village_transport_result_item_container_sum_parser>;

export const container_village_transport_result_item_distance_parser = z.object({
  distance: unit_kilometer_parser
});
export type CONTAINER_VILLAGE_TRANSPORT_RESULT_ITEM_DISTANCE = z.infer<typeof container_village_transport_result_item_distance_parser>;

export const container_village_transport_result_item_distance_sum_parser = z.object({
  distance_sum: unit_kilometer_parser
});
export type CONTAINER_VILLAGE_TRANSPORT_RESULT_ITEM_CONTAINER_DISTANCE_SUM = z.infer<typeof container_village_transport_result_item_distance_sum_parser>;

export const container_village_transport_result_item_distance_co2 = z.object({
  distance_co2: unit_kilogram_co2_parser
});
export type CONTAINER_VILLAGE_TRANSPORT_RESULT_ITEM_DISTANCE_CO2 = z.infer<typeof container_village_transport_result_item_distance_co2>;

export const container_village_transport_result_parser = z.tuple([ 
  container_village_transport_result_item_container_sum_parser,
  container_village_transport_result_item_distance_parser,
  container_village_transport_result_item_distance_sum_parser,
  container_village_transport_result_item_distance_co2
]);
export type CONTAINER_VILLAGE_TRANSPORT_RESULT = z.infer<typeof container_village_transport_result_parser>;

export const container_village_result_parser = z.object({ 
  distance_co2: unit_kilogram_co2_parser.optional().default({}),
  container_co2: unit_kilogram_co2_parser.optional().default({}),
  sum_co2: unit_kilogram_co2_parser.optional().default({}),
});
export type CONTAINER_VILLAGE_RESULT = z.infer<typeof container_village_result_parser>;


export const form_container_village_parser = z.object({
  setting: container_village_form_settings_parser.optional().default({}),
  container: container_village_form_energy_parser.optional().default({}),
  results: container_village_result_parser.optional().default({})
});
export type FORM_CONTAINER_VILLAGE = z.infer<typeof form_container_village_parser>;
