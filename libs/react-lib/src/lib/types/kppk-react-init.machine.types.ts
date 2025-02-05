import { z } from 'zod';
import {
  unit_id_parser,
  unit_kilogram_meter_cubic_parser,
  unit_kilogram_meter_square_parser,
  unit_kilogramco2_kilogram_parser,
  unit_meter_parser,
  unit_string_parser,
} from './kppk-react-unit.types';
import { rose_file_data_parser } from './kppk-react-heating-system.types';
import { form_values_parser } from './kppk-react-form.types';
import { container_disposal_parser } from './kppk-react-demolish-disposal.types';
import { container_village_energy_data_parser } from './kppk-react-container-village.types';
import {
  material_co2_equ_parser,
  material_density_data_parser,
} from './kppk-react-material.types';
import { truck_data_parser } from './kppk-react-truck.types';

export const window_frames_item_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser,
  area_based_mass: unit_kilogram_meter_square_parser,
  depth: unit_meter_parser,
  density: unit_kilogram_meter_cubic_parser,
});
export type WINDOW_FRAMES_ITEM = z.infer<typeof window_frames_item_parser>;
export const window_frames_data_parser = z.array(window_frames_item_parser);
export type WINDOW_FRAMES_DATA_PARSER = z.infer<
  typeof window_frames_data_parser
>;

export const window_glass_item_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser,
  area_based_mass: unit_kilogram_meter_square_parser,
  depth: unit_meter_parser,
  density: unit_kilogram_meter_cubic_parser,
});
export type WINDOW_GLASS_ITEM = z.infer<typeof window_glass_item_parser>;
export const window_glass_data_parser = z.array(window_glass_item_parser);
export type WINDOW_GLASS_DATA = z.infer<typeof window_glass_data_parser>;

export const concrete_item_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser,
  gwp: unit_kilogramco2_kilogram_parser,
});
export type CONCRETE_ITEM = z.infer<typeof concrete_item_parser>;

export const concrete_data_parser = z.array(concrete_item_parser);
export type CONCRETE_DATA = z.infer<typeof concrete_data_parser>;

export const oi3_file_data_parser = z.object({
  area: z.number(),
  data: z.array(z.any()).min(0),
});
export type OI3_FILE_DATA = z.infer<typeof oi3_file_data_parser>;

export const calculation_files_parser = z.object({
  file_aufbauten: z.object({ data: z.array(z.any()) }),
  file_bauteilflaechen: z.object({ data: z.array(z.any()) }),
  file_oi3: oi3_file_data_parser,
  file_rose: rose_file_data_parser,
});
export type CALCULATION_FILES = z.infer<typeof calculation_files_parser>;

export const calculation_parser = z.object({
  ...calculation_files_parser.shape,
  ...form_values_parser.shape,
});
export type CALCULATION = z.infer<typeof calculation_parser>;

export const react_init_load_from_remote_data_parser = z.object({
  concrete_types: concrete_data_parser,
  container_disposal: container_disposal_parser,
  container_village: container_village_energy_data_parser,
  material_co2_equ: material_co2_equ_parser,
  material_density: material_density_data_parser,
  truck: truck_data_parser,
  window_frames: window_frames_data_parser,
  window_glass: window_glass_data_parser,
});

export type REACT_INIT_LOAD_FROM_REMOTE_DATA = z.infer<
  typeof react_init_load_from_remote_data_parser
>;

export const react_init_load_from_remote_parser = z.object({
  common: react_init_load_from_remote_data_parser,
  form_defaults: form_values_parser,
});
export type REACT_INIT_LOAD_FROM_REMOTE = z.infer<typeof react_init_load_from_remote_parser>;

// export const react_init_output_parser = z.object({
//   app: react_init_load_from_remote_data_parser,
//   debug_calculation_v1: react_view_calculation_context_parser,
//   form_defaults: form_values_parser,
// });

// export type REACT_INIT_OUTPUT_DATA = z.infer<typeof react_init_output_parser>;

export const react_init_context_parser = z.object({
  // environment: z.object({}).passthrough().optional(),
  load_from_local: z.any(),
  load_from_remote: z.any(),
  output: z.any(),
});
export type REACT_INIT_CONTEXT = z.infer<typeof react_init_context_parser>;

// export const react_running_input_parser = z.object({
//   environment: z.object({}).passthrough().optional(),
//   common: react_init_load_from_remote_data_parser,
//   debug_calculation_v1: react_view_calculation_context_parser
// });
// export type REACT_RUNNING_INPUT = z.infer<typeof react_init_context_parser>;
