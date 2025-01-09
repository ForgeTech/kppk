import { z } from 'zod';
import {
  unit_gramco2_kilometer_parser,
  unit_kilogram_co2_parser,
  unit_kilogram_meter_cubic_parser,
  unit_kilogram_parser,
  unit_kilometer_parser,
  unit_liter_parser,
  unit_meter_cubic_parser, 
  unit_milimeter_parser, 
  unit_percent_parser, 
  unit_string_parser,
  unit_trips_parser
} from './kppk-react-unit.types';
import { truck_container_10cubic_or_roll_off_parser } from './kppk-react-truck.types';

export const container_disposal_item_parser = z.object({
  name: unit_string_parser,
  capacity_volume: unit_meter_cubic_parser,
  length: unit_milimeter_parser,
  width: unit_milimeter_parser,
  heigth: unit_milimeter_parser,
  massD: unit_milimeter_parser,
  weight: unit_kilogram_parser,
  capacity_weight: unit_kilogram_parser,
});
export type CONTAINER_DISPOSAL_DATA_ITEM = z.infer<typeof container_disposal_item_parser>;

export const container_disposal_parser = z.array(container_disposal_item_parser);
export type CONTAINER_DISPOSAL_DATA = z.infer<typeof container_disposal_parser>;


export const demolish_disposal_form_material_item_parser = z.object({
  volume: unit_meter_cubic_parser.optional().default({}),
  container: truck_container_10cubic_or_roll_off_parser.optional().default({}), 
  distance: unit_kilometer_parser.optional().default({ value: 100 }),
});
export type FORM_MATERIAL_ITEM = z.infer<typeof demolish_disposal_form_material_item_parser>;

export const demolish_disposal_form_material_section_parser = z.object({
  concrete: demolish_disposal_form_material_item_parser.optional().default({}),
  steel: demolish_disposal_form_material_item_parser.optional().default({}),
  brick: demolish_disposal_form_material_item_parser.optional().default({}),
  plasterboard: demolish_disposal_form_material_item_parser.optional().default({}),
  glass: demolish_disposal_form_material_item_parser.optional().default({}),
  rubble: demolish_disposal_form_material_item_parser.optional().default({}),
  wood: demolish_disposal_form_material_item_parser.optional().default({}),
  wood_massive: demolish_disposal_form_material_item_parser.optional().default({}),
  wood_material: demolish_disposal_form_material_item_parser.optional().default({}),
  wood_latch: demolish_disposal_form_material_item_parser.optional().default({}),
}).optional().default({});
export type DEMOLISH_DISPOSAL_FORM_MATERIAL_SECTION = z.infer<typeof demolish_disposal_form_material_section_parser>;

export const demolish_disposal_form_insulation_section_parser = z.object({
  eps: demolish_disposal_form_material_item_parser.optional().default({}),
  glass_wool: demolish_disposal_form_material_item_parser.optional().default({}),
  rock_wool: demolish_disposal_form_material_item_parser.optional().default({}),
  wood_fibre:  demolish_disposal_form_material_item_parser.optional().default({}),
  xps:  demolish_disposal_form_material_item_parser.optional().default({}),
}).optional().default({});
export type DEMOLISH_DISPOSAL_FORM_INSULATION_SECTION = z.infer<typeof demolish_disposal_form_insulation_section_parser>;

export const demolish_disposal_form_setting_parser =  z.object({
  distance: unit_kilometer_parser.optional().default({ value: 100 }),
  usage: unit_percent_parser.optional().default({ value: 80}),
}).optional().default({});
export type DEMOLISH_DISPOSAL_FORM_SETTING = z.infer<typeof demolish_disposal_form_setting_parser>;

export const demolish_disposal_form_result_item_parser = z.object({
  key: unit_string_parser.optional().default({}),
  // density: unit_kilogram_meter_cubic_parser.optional().default({}),
  // volume: unit_meter_cubic_parser.optional().default({}),
  // mass: unit_kilogram_parser.optional().default({}),
  //           truck: material.container.value,
  // max_density: unit_kilogram_meter_cubic_parser.optional().default({}),
  capacity: unit_meter_cubic_parser.optional().default({}).or(unit_kilogram_parser).optional().default({}),
  trips: unit_trips_parser.optional().default({}),
  // distance: unit_kilometer_parser.optional().default({}),
  distance_sum: unit_kilometer_parser.optional().default({}),
  // consumption: unit_gramco2_kilometer_parser.optional().default({}),
  consumption_sum: unit_liter_parser.optional().default({}),
  consumption_co2: unit_kilogram_co2_parser.default({}),
});
export type DEMOLISH_DISPOSAL_FORM_RESULT_ITEM = z.infer<typeof demolish_disposal_form_result_item_parser>;

export const demolish_disposal_form_material_section_result_parser = z.object({
  concrete: demolish_disposal_form_result_item_parser.optional().default({}),
  steel: demolish_disposal_form_result_item_parser.optional().default({}),
  brick: demolish_disposal_form_result_item_parser.optional().default({}),
  plasterboard: demolish_disposal_form_result_item_parser.optional().default({}),
  glass: demolish_disposal_form_result_item_parser.optional().default({}),
  rubble: demolish_disposal_form_result_item_parser.optional().default({}),
  wood: demolish_disposal_form_result_item_parser.optional().default({}),
  wood_massive: demolish_disposal_form_result_item_parser.optional().default({}),
  wood_material: demolish_disposal_form_result_item_parser.optional().default({}),
  wood_latch: demolish_disposal_form_result_item_parser.optional().default({}),
}).optional().default({});
export type DEMOLISH_DISPOSAL_FORM_MATERIAL_SECTION_RESULT = z.infer<typeof demolish_disposal_form_material_section_result_parser>;

export const demolish_disposal_form_insulation_section_result_parser = z.object({
  eps: demolish_disposal_form_result_item_parser.optional().default({}),
  glass_wool: demolish_disposal_form_result_item_parser.optional().default({}),
  rock_wool: demolish_disposal_form_result_item_parser.optional().default({}),
  wood_fibre:  demolish_disposal_form_result_item_parser.optional().default({}),
  xps:  demolish_disposal_form_result_item_parser.optional().default({}),
}).optional().default({});
export type DEMOLISH_DISPOSAL_FORM_INSULATION_SECTION_RESULT = z.infer<typeof demolish_disposal_form_insulation_section_result_parser>;


export const demolish_disposal_form_result_parser = z.object({
  material_section_result: demolish_disposal_form_material_section_result_parser.optional().default({}),
  insulation_section_result: demolish_disposal_form_material_section_result_parser.optional().default({}),
  consumption_co2_sum: unit_kilogram_co2_parser.optional().default({})
  // container: truck_container_10cubic_or_roll_off_parser.optional().default({}), 
  // distance: unit_kilometer_parser.optional().default({ value: 100 }),
});
export type DEMOLISH_DISPOSAL_FORM_RESULT = z.infer<typeof demolish_disposal_form_result_parser>;

export const demolish_disposal_form_material_parser = z.object({
  setting: demolish_disposal_form_setting_parser.optional().default({}),
  material: demolish_disposal_form_material_section_parser.optional().default({}),
  insulation: demolish_disposal_form_insulation_section_parser.optional().default({}),
  results: demolish_disposal_form_result_parser.optional().default({})
})

export type DEMOLISH_DISPOSAL_FORM_MATERIAL = z.infer<typeof demolish_disposal_form_material_parser>;
