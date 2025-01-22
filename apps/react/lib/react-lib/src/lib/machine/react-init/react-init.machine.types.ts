import { z } from 'zod';
import { 
  unit_id_parser,
  unit_kilogram_meter_cubic_parser,
  unit_kilogram_meter_square_parser,
  unit_kilogramco2_kilogram_parser,
  unit_meter_parser,
  unit_string_parser
} from '../../types/kppk-react-unit.types';
import { container_village_energy_data_parser } from '../../types/kppk-react-container-village.types';
import { container_disposal_parser } from '../../types/kppk-react-demolish-disposal.types';
import { truck_data_parser } from '../../types/kppk-react-truck.types';
import { material_co2_equ_parser, material_density_data_parser } from '../../types/kppk-react-material.types';
import { react_view_calculation_context_parser } from '../../types/kppk-react-calculation.types';

export const window_frames_item_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser,
  area_based_mass: unit_kilogram_meter_square_parser,
  depth: unit_meter_parser,
  density: unit_kilogram_meter_cubic_parser
});
export type WINDOW_FRAMES_ITEM = z.infer<typeof window_frames_item_parser>;
export const window_frames_data_parser = z.array(window_frames_item_parser);
export type WINDOW_FRAMES_DATA_PARSER = z.infer<typeof window_frames_data_parser>;

export const window_glass_item_parser = z.object({
    id: unit_id_parser,
    name: unit_string_parser,
    area_based_mass: unit_kilogram_meter_square_parser,
    depth: unit_meter_parser,
    density: unit_kilogram_meter_cubic_parser
});
export type WINDOW_GLASS_ITEM = z.infer<typeof window_glass_item_parser>;
export const window_glass_data_parser = z.array(window_glass_item_parser);
export type WINDOW_GLASS_DATA = z.infer<typeof window_glass_data_parser>;

export const concrete_item_parser = z.object({
  id: unit_id_parser,
  name: unit_string_parser,
  gwp: unit_kilogramco2_kilogram_parser
});
export type CONCRETE_ITEM = z.infer<typeof concrete_item_parser>;
export const concrete_data_parser = z.array(concrete_item_parser);
export type CONCRETE_DATA = z.infer<typeof concrete_data_parser>;

export const debug_calculation_common_import_parser = z.object({
  data: z.array( z.any() ),
})
export const debug_calculation_oi3_import_parser = z.object({
  area: z.number(),
  data: z.array( z.any() ).min(0),
})
export const object_passthrough_parser = z.object({}).passthrough();

export const react_init_load_from_remote_common_parser = z.object({
  concrete_types: concrete_data_parser,
  container_disposal: container_disposal_parser,       
  container_village: container_village_energy_data_parser,
  material_co2_equ: material_co2_equ_parser,
  material_density: material_density_data_parser,
  truck: truck_data_parser,
  window_frame: window_frames_data_parser,
  window_glass: window_glass_data_parser,
})

export type REACT_INIT_LOAD_FROM_REMOTE_COMMON = z.infer<typeof react_init_load_from_remote_common_parser>;

export const react_init_load_from_remote_parser = z.object({
  common: react_init_load_from_remote_common_parser,
  // debug_calculation_v1: react_view_calculation_context_parser,
  debug_calculation_v1: z.any(),
  // formDefaults: react_view_calculation_context_parser
  formDefaults: z.any()
});
export type REACT_INIT_LOAD_FROM_REMOTE = z.infer<typeof react_init_load_from_remote_parser>;

export const react_init_output_parser = z.object({
  common: react_init_load_from_remote_common_parser, 
  debug_calculation_v1: react_view_calculation_context_parser,
  formDefaults: z.any()
});

export type REACT_INIT_OUTPUT_DATA = z.infer<typeof react_init_output_parser>;

export const react_init_context_parser = z.object({
  environment: z.object({}).passthrough().optional(),
  load_from_remote: z.any(),
  output: z.any()
});
export type REACT_INIT_CONTEXT = z.infer<typeof react_init_context_parser>;


export const react_running_input_parser = z.object({
  environment: z.object({}).passthrough().optional(),
  common: react_init_load_from_remote_common_parser, 
  debug_calculation_v1: react_view_calculation_context_parser
});
export type REACT_RUNNING_INPUT = z.infer<typeof react_init_context_parser>;

