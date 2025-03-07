import { z } from "zod";
import { form_concrete_value_parser, form_material_value_parser, form_window_value_parser } from "../../types";;
import { unit_kilogram_co2_parser, unit_kilometer_parser, unit_number_parser, unit_percent_parser, unit_string_parser } from "../../types";
import { form_construction_site_parser, result_construction_site_parser } from "../../types";
import { container_village_result_parser, form_container_village_parser } from "../../types";
import { demolish_disposal_form_material_parser, demolish_disposal_form_result_parser } from "../../types";
import { form_excavation_pit_parser, result_excavation_pit_parser } from "../../types";
import { form_heating_system_data_parser, form_heating_system_result_parser, rose_file_data_parser } from "../../types";
import { form_step_selection_data } from "../../types";
import { react_calculation_materials_v1_output } from "./react-view-calculation-materials.service";
import { react_init_load_from_remote_data_parser } from "../react-init";
import { react_view_calculation_form_name_enum } from "../../enum";


  // export type REACT_VIEW_CALCULATION_FORM_NAME_ENUM =
  
  const react_view_calculation_form_name_enum_parser = z.nativeEnum(react_view_calculation_form_name_enum);
  type REACT_VIEW_CALCULATION_FORM_NAME_ENUM = z.infer<typeof react_view_calculation_form_name_enum_parser>;
  
  export const fg_form_context = z.object({
    name: react_view_calculation_form_name_enum_parser.optional().default(react_view_calculation_form_name_enum.unnamed),
    error: z.array(z.any()).optional().default([]),
    valid: z.boolean().optional().default(false),
  });
  
  export const form_material_context_results_parser = z.object({
    gwp_total: unit_kilogram_co2_parser.optional().default({}),
    gwp_transport: unit_kilogram_co2_parser.optional().default({}),
  });
  export type FG_FORM_MATERIAL_CONTEXT_RESULTS = z.infer<typeof form_material_context_results_parser>;
  
  export const form_material_context_parser = fg_form_context.extend({
    value: z.object({
      defaults: z.object({
        distance: unit_kilometer_parser.optional().default({ value: 100 }),
        truck_usage: unit_percent_parser.optional().default({ value: 80 }),
        round: unit_number_parser.optional().default({ value: 3 }),
      }).optional().default({}),
      rows: z.array(form_material_value_parser).optional().default([]),
      results: form_material_context_results_parser.optional().default({}),
    }).optional().default({})
  });
  export type FG_FORM_MATERIAL_CONTEXT = z.infer<typeof form_material_context_parser>;
  
  export const form_window_context_results_parser = z.object({
    gwp_total: unit_kilogram_co2_parser.optional().default({}),
    gwp_transport: unit_kilogram_co2_parser.optional().default({}),
  });
  export type FG_FORM_WINDOW_CONTEXT_RESULTS = z.infer<typeof form_window_context_results_parser>;
  
  export const form_window_context_parser = fg_form_context.extend({
    value: z.object({
      defaults: z.object({
        distance: unit_kilometer_parser.optional().default({ value: 100 }),
        truck_usage: unit_percent_parser.optional().default({ value: 80 }),
        round: unit_number_parser.optional().default({ value: 3 }),
      }).optional().default({}),
      rows: z.array(form_window_value_parser).optional().default([]),
      results: form_window_context_results_parser.optional().default({}),
    }).optional().default({})
  });
  export type FG_FORM_WINDOW_CONTEXT = z.infer<typeof form_window_context_parser>;
  
  export const form_concrete_context_results_parser = z.object({
    gwp_sum: unit_kilogram_co2_parser.optional().default({}),
    gwp_total: unit_kilogram_co2_parser.optional().default({}),
    gwp_sum_oeko: unit_kilogram_co2_parser.optional().default({}),
    gwp_total_oeko: unit_kilogram_co2_parser.optional().default({}),
    gwp_transport: unit_kilogram_co2_parser.optional().default({}),
  });
  export type FG_FORM_CONCRETE_CONTEXT_RESULTS = z.infer<typeof form_concrete_context_results_parser>;
  
  export const form_concrete_context_parser = fg_form_context.extend({
    value: z.object({
      defaults: z.object({
        distance: unit_kilometer_parser.optional().default({ value: 100 }),
        truck_usage: unit_percent_parser.optional().default({ value: 80 }),
        round: unit_number_parser.optional().default({ value: 3 }),
      }).optional().default({}),
      rows: z.array(form_concrete_value_parser).optional().default([]),
      results: form_concrete_context_results_parser.optional().default({}),
    }).optional().default({})
  });
  export type FG_FORM_CONCRETE_CONTEXT = z.infer<typeof form_concrete_context_parser>;
  
  export const form_common_value_parser = z.object({
    project_name: unit_string_parser.optional().default({}),
    project_number: unit_string_parser.optional().default({}),
    project_part: unit_string_parser.optional().default({}),
  });
  
  export const form_common_context_parser = fg_form_context.extend({
    value: form_common_value_parser.optional().default({}),
  });
  export type FG_FORM_COMMON_CONTEXT = z.infer<typeof form_common_context_parser>;
  
  export const form_construction_site_context_parser = fg_form_context.extend({
    value: form_construction_site_parser.optional().default({}),
  });
  export type FG_FORM_CONSTRUCTION_SITE_CONTEXT = z.infer<typeof form_construction_site_context_parser>;
  
  
  export const form_container_village_context_parser = fg_form_context.extend({
    value: form_container_village_parser.optional().default({})
  });
  export type FG_FORM_CONTAINER_VILLAGE_CONTEXT = z.infer<typeof form_container_village_context_parser>;
  
  export const form_demolish_disposal_context_parser = fg_form_context.extend({
    value: demolish_disposal_form_material_parser.optional().default({})
  });
  export type FG_FORM_DEMOLISH_DISPOSAL_CONTEXT = z.infer<typeof form_demolish_disposal_context_parser>;
  
  export const form_excavation_pit_context_parser = fg_form_context.extend({
    value: form_excavation_pit_parser.optional().default({})
  });
  export type FG_FORM_EXCAVATION_PIT_CONTEXT = z.infer<typeof form_excavation_pit_context_parser>;
  
  export const form_heating_system_context_parser = fg_form_context.extend({
    value: form_heating_system_data_parser.optional().default({})
  });
  export type FG_FORM_HEATING_SYSTEM_CONTEXT = z.infer<typeof form_heating_system_context_parser>;
  
  export const form_step_selection_context_parser = fg_form_context.extend({
    value: form_step_selection_data.optional().default({})
  });
  export type FG_FORM_STEP_SELECTION_SYSTEM_CONTEXT = z.infer<typeof form_excavation_pit_context_parser>;
  
  export const form_values_parser = z.object({
    form_material: form_material_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.material,
    }),
    form_window: form_window_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.window,
    }),
    form_concrete: form_concrete_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.concrete,
    }),
    form_construction_site: form_construction_site_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.construction_site,
    }),
    form_container_village: form_container_village_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.container_village
    }),
    form_demolish_disposal: form_demolish_disposal_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.demolish_disposal,
    }),
    form_excavation_pit: form_excavation_pit_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.excavation_pit,
    }),
    form_heating_system: form_heating_system_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.heating_system
    }),
    form_step_selection: form_step_selection_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.step_selection
    }),
    form_common: form_common_context_parser.optional().default({
      name: react_view_calculation_form_name_enum.common
    })
  });
  export type FORM_VALUES = z.infer<typeof form_values_parser>;
  
  export const react_view_calculation_parser = form_values_parser.extend({
    file_aufbauten:  z.object({ data: z.array(z.any())}),
    file_bauteilflaechen: z.object({ data: z.array(z.any()) }),
    file_oi3: z.any(),
    file_rose: rose_file_data_parser,
    actor_transform_file_inputs: react_calculation_materials_v1_output.optional(),
    actor_merge_bauteilflaechen_aufbauten: z.object({
      merged_bauteilflaechen_aufbauten:  z.array(z.any()).optional(),
    }).optional().default({}),
    actor_merge_arich_oi3: z.object({
      transformed_arich_plus_oi3_source_1: z.array(z.any()).optional(),
      transformed_arich_plus_oi3_source_2: z.array(z.any()).optional(),
      transformed_arich_plus_oi3_source_2_found: z.array(z.any()).optional(),
      transformed_arich_plus_oi3_source_2_not_found: z.array(z.any()).optional(),
      transformed_arich_plus_oi3_source_2_o1: z.array(z.any()).optional(),
      window_items: z.array(z.any()).optional(),
      concrete_items: z.array(z.any()).optional(),
      material_items: z.array(z.any()).optional(),
      material_type: z.array(z.any()).optional(),
    }).optional(),
    actor_prepare_material_types: z.object({
      window_items: z.array(form_window_value_parser).optional().default([]),
      concrete_items: z.array(form_concrete_value_parser).optional().default([]),
      material_items: z.array(form_material_value_parser).optional().default([]),
    }).optional(),
  });
  export type REACT_VIEW_CALCULATION = z.infer<typeof react_view_calculation_parser>;

  export const react_view_calculation_context_parser = z.object({
    form_defaults: form_values_parser, 
    calculation: react_view_calculation_parser,
    data: react_init_load_from_remote_data_parser,
  });
  
  export type REACT_VIEW_CALCULATION_CONTEXT =  z.infer<typeof react_view_calculation_context_parser>;
  

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
    co2_creation: unit_kilogram_co2_parser
  });

  export type REACT_VIEW_CALCULATION_RESULT = z.infer<typeof react_view_calculation_result_parser>;
  