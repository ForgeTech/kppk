import { z } from 'zod';

import { unit_kilogram_co2_parser } from './kppk-react-unit.types';
import {
  form_concrete_value_parser,
  form_material_value_parser,
  form_window_value_parser,
} from './kppk-react-material.types';
import { result_construction_site_parser } from './kppk-react-construction-site.types';
import { container_village_result_parser } from './kppk-react-container-village.types';
import { demolish_disposal_form_result_parser } from './kppk-react-demolish-disposal.types';
import { result_excavation_pit_parser } from './kppk-react-excavation-pit.types';
import {
  form_heating_system_result_parser,
  rose_file_data_parser,
} from './kppk-react-heating-system.types';
import { form_step_selection_data } from './kppk-react-step-selection.types';
import { react_calculation_materials_output } from './kppk-react-calculation-materials.types';
import {
  form_common_value_parser,
  form_values_parser,
} from './kppk-react-form.types';
import { react_calculation_data_parser } from './kppk-react-init.machine.types';

export const react_view_calculation_parser = form_values_parser.extend({
  file_aufbauten: z.object({ data: z.array(z.any()) }),
  file_bauteilflaechen: z.object({ data: z.array(z.any()) }),
  file_oi3: z.any(),
  file_rose: rose_file_data_parser,
  actor_transform_file_inputs: react_calculation_materials_output.optional(),
  actor_merge_bauteilflaechen_aufbauten: z
    .object({
      merged_bauteilflaechen_aufbauten: z.array(z.any()).optional(),
    })
    .optional()
    .default({}),
  actor_merge_arich_oi3: z
    .object({
      transformed_arich_plus_oi3_source_1: z.array(z.any()).optional(),
      transformed_arich_plus_oi3_source_2: z.array(z.any()).optional(),
      transformed_arich_plus_oi3_source_2_found: z.array(z.any()).optional(),
      transformed_arich_plus_oi3_source_2_not_found: z
        .array(z.any())
        .optional(),
      transformed_arich_plus_oi3_source_2_o1: z.array(z.any()).optional(),
      window_items: z.array(z.any()).optional(),
      concrete_items: z.array(z.any()).optional(),
      material_items: z.array(z.any()).optional(),
      material_type: z.array(z.any()).optional(),
    })
    .optional(),
  actor_prepare_material_types: z
    .object({
      window_items: z.array(form_window_value_parser).optional().default([]),
      concrete_items: z
        .array(form_concrete_value_parser)
        .optional()
        .default([]),
      material_items: z
        .array(form_material_value_parser)
        .optional()
        .default([]),
    })
    .optional(),
});
export type REACT_VIEW_CALCULATION = z.infer<typeof react_view_calculation_parser>;

export const react_view_calculation_context_parser = z.object({
  calculation: react_view_calculation_parser,
  data: react_calculation_data_parser,
  form_defaults: form_values_parser,
});

export type REACT_VIEW_CALCULATION_CONTEXT = z.infer<typeof react_view_calculation_context_parser>;

export const react_view_calculation_input_parser = z.object({
  context: react_view_calculation_context_parser,
  event: z.any(),
});
export type REACT_VIEW_CALCULATION_INPUT = z.infer<typeof react_view_calculation_input_parser>;

export const react_view_calculation_result_parser = z.object({
  common: form_common_value_parser,
  step: form_step_selection_data,
  // material: form_material_context_results_parser,
  // window: form_material_context_results_parser,
  // concrete: form_concrete_context_results_parser,
  // material_emit: z.any(),
  // material_absorbe: z.any(),
  construction_site: result_construction_site_parser,
  container_village: container_village_result_parser,
  demolish_disposal: demolish_disposal_form_result_parser,
  excavation_pit: result_excavation_pit_parser,
  heating_system: form_heating_system_result_parser,
  co2_creation: unit_kilogram_co2_parser,
});

export type REACT_VIEW_CALCULATION_RESULT = z.infer<typeof react_view_calculation_result_parser>;
