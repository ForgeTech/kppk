import { z } from "zod";

import { REACT_VIEW_CALCULATION_FORM_NAME_ENUM } from "../enum";
import { unit_kilogram_co2_parser, unit_kilometer_parser, unit_number_parser, unit_percent_parser, unit_string_parser } from "./kppk-react-unit.types";
import { form_concrete_value_parser, form_material_value_parser, form_window_value_parser } from "./kppk-react-material.types";
import { form_construction_site_parser } from "./kppk-react-construction-site.types";
import { form_container_village_parser } from "./kppk-react-container-village.types";
import { demolish_disposal_form_material_parser } from "./kppk-react-demolish-disposal.types";
import { form_excavation_pit_parser } from "./kppk-react-excavation-pit.types";
import { form_heating_system_data_parser } from "./kppk-react-heating-system.types";
import { form_step_selection_data } from "./kppk-react-step-selection.types";

  
  export const react_view_calculation_form_name_enum_parser = z.nativeEnum(REACT_VIEW_CALCULATION_FORM_NAME_ENUM);
  
  export const fg_form_context = z.object({
    name: react_view_calculation_form_name_enum_parser.optional().default(REACT_VIEW_CALCULATION_FORM_NAME_ENUM.unnamed),
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
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.material,
    }),
    form_window: form_window_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.window,
    }),
    form_concrete: form_concrete_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.concrete,
    }),
    form_construction_site: form_construction_site_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.construction_site,
    }),
    form_container_village: form_container_village_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.container_village
    }),
    form_demolish_disposal: form_demolish_disposal_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.demolish_disposal,
    }),
    form_excavation_pit: form_excavation_pit_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.excavation_pit,
    }),
    form_heating_system: form_heating_system_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.heating_system
    }),
    form_step_selection: form_step_selection_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.step_selection
    }),
    form_common: form_common_context_parser.optional().default({
      name: REACT_VIEW_CALCULATION_FORM_NAME_ENUM.common
    })
  });
  export type FORM_VALUES = z.infer<typeof form_values_parser>;
 