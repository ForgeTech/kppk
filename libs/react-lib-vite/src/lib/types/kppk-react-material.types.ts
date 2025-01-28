import { z } from 'zod';
import {
  unit_id_parser,
  unit_kilogram_co2_parser,
  unit_kilogram_meter_cubic_parser,
  unit_kilogram_parser,
  unit_kilometer_parser,
  unit_meter_cubic_parser,
  unit_meter_square_parser,
  unit_number_parser,
  unit_string_parser,
} from './kppk-react-unit.types';

export const unit_kilogramco2_kg_l_kwh = z.object({
  value: z.number().default(0),
  unit: z
    .literal('kgCo2/kg')
    .or(z.literal('kgCo2/l'))
    .or(z.literal('kgCo2/kWh')),
});

export const material_co2_equ_item_parser = z.object({
  material: unit_string_parser,
  co2_equ: unit_kilogramco2_kg_l_kwh,
});
export type MATERIAL_CO2_EQU_ITEM = z.infer<
  typeof material_co2_equ_item_parser
>;

export const material_co2_equ_parser = z.array(material_co2_equ_item_parser);
export type MATERIAL_CO2_EQU_DATA = z.infer<typeof material_co2_equ_parser>;

export const material_category_parser = z.array(
  z
    .literal('concrete')
    .or(z.literal('steel'))
    .or(z.literal('brick'))
    .or(z.literal('gypsum'))
    .or(z.literal('glass'))
    .or(z.literal('wood'))
    .or(z.literal('other'))
    .or(z.literal('insulation'))
);
export type MATERIAL_CATEGORY = z.infer<typeof material_category_parser>;

export const material_density_item_parser = z.object({
  material: unit_string_parser,
  density: unit_kilogram_meter_cubic_parser,
  category: material_category_parser,
});
export type MATERIAL_DENSITY_DATA_ITEM = z.infer<
  typeof material_density_item_parser
>;

export const material_density_data_parser = z.array(
  material_density_item_parser
);
export type MATERIAL_DENSITY_DATA = z.infer<
  typeof material_density_data_parser
>;

export const form_material_value_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser.optional().default({}),
  mass: unit_kilogram_parser.optional().default({}),
  volumn: unit_meter_cubic_parser.optional().default({}),
  density: unit_kilogram_meter_cubic_parser.optional().default({}),
  gwp: unit_kilogram_co2_parser.optional().default({}),
  area: unit_meter_square_parser.optional().default({}),
  shipments: unit_number_parser.optional().default({}),
  distance: unit_kilometer_parser.optional().default({ value: 100 }),
  co2_transport: unit_kilogram_co2_parser.optional().default({}),
});
export type FORM_MATERIAL_VALUE = z.infer<typeof form_material_value_parser>;

export const form_window_value_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser.optional().default({}),
  gwp: unit_kilogram_co2_parser.optional().default({}),
  window_part_type: unit_string_parser.optional().default({}),
  window_part_type_glass_id: z
    .undefined()
    .or(unit_id_parser.optional().default(0)),
  window_part_type_glass: z.undefined().or(z.any().optional().default({})),
  window_part_type_frame_id: z
    .undefined()
    .or(unit_id_parser.optional().default(0)),
  window_part_type_frame: z.undefined().or(z.any().optional().default({})),
  density: unit_kilogram_meter_cubic_parser.optional().default({}),
  area: unit_meter_square_parser.optional().default({}),
  mass: unit_kilogram_parser.optional().default({}),
  volumn: unit_meter_cubic_parser.optional().default({}),
  shipments: unit_number_parser.optional().default({}),
  distance: unit_kilometer_parser.optional().default({ value: 100 }),
  co2_transport: unit_kilogram_co2_parser.optional().default({}),
});
export type FORM_WINDOW_VALUE = z.infer<typeof form_window_value_parser>;

export const form_concrete_value_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser.optional().default({}),
  mass: unit_kilogram_parser.optional().default({}),
  volumn: unit_meter_cubic_parser.optional().default({}),
  density: unit_kilogram_meter_cubic_parser.optional().default({}),
  gwp: unit_kilogram_co2_parser.optional().default({}),
  gwp_oeko_id: unit_id_parser.optional().default(0),
  gwp_oeko: unit_kilogram_co2_parser.optional().default({}),
  shipments: unit_number_parser.optional().default({}),
  distance: unit_kilometer_parser.optional().default({ value: 100 }),
  co2_transport: unit_kilogram_co2_parser.optional().default({}),
});
export type FORM_CONCRETE_VALUE = z.infer<typeof form_concrete_value_parser>;

export const form_materials_result_item_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser.optional().default({}),
  // mass: unit_kilogram_parser.optional().default({}),
  // volumn: unit_meter_cubic_parser.optional().default({}),
  // density: unit_kilogram_meter_cubic_parser.optional().default({}),
  gwp: unit_kilogram_co2_parser.optional().default({}),
  // gwp_oeko_id: unit_id_parser.optional().default(0),
  gwp_oeko: unit_string_parser
    .or(unit_kilogram_co2_parser)
    .optional()
    .default({ value: '-' }),
  // shipments: unit_number_parser.optional().default({}),
  // distance: unit_kilometer_parser.optional().default({ value: 100 }),
  co2_transport: unit_kilogram_co2_parser.optional().default({}),
});
export type FORM_MATERIALS_RESULT_ITEM = z.infer<
  typeof form_materials_result_item_parser
>;

export const form_materials_result_parser = z.array(
  form_materials_result_item_parser
);
export type FORM_MATERIALS_RESULT = z.infer<
  typeof form_materials_result_parser
>;
