import { 
  Actor,
  ActorRefFrom,
  EventFromLogic,
  SnapshotFrom,
  setup 
} from "xstate";
import { react_init_load_from_remote_data_parser } from "../react-init/react-init.types";
import { z } from "zod";
import { 
  react_calculation_materials_v1_input,
  ReactCalculationMaterialsV1Input 
} from "./react-view-calculation-materials.service";
import {  unit_string_parser } from "../../types/kppk-react-unit.types";

import { ROSE_FILE_DATA } from "../../types/kppk-react-heating-system.types";
// import { calculate_excavation_pit_dynamic_values } from "./react-view-calculation-excavation-pit.utils";
import { form_heating_system_calculate_dynamic_model_values } from "./react-view-calculation-heating-system.utils";
import { react_view_calculation_context_parser } from "../../types/kppk-react-calculation.types";

export type ReactViewCalculationV1Snapshot = SnapshotFrom<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;
export type ReactViewCalculationV1Event = EventFromLogic<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;
export type ReactViewCalculationV1Ref = ActorRefFrom<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;
export type ReactViewCalculationV1Machine = typeof REACT_VIEW_CALCULATION_MACHINE_V4;
export type ReactViewCalculationV1Actor = Actor<typeof REACT_VIEW_CALCULATION_MACHINE_V4>;

export const react_view_calculation_v1_context_parser = z.object({
  calculation_defaults: react_view_calculation_context_parser, 
  calculation: react_view_calculation_context_parser,
  data: react_init_load_from_remote_data_parser,
});

export type ReactViewCalculationV1Context =  z.infer<typeof react_view_calculation_v1_context_parser>;

export const form_heating_system_get_intial_select_key = ( rose_file_data: ROSE_FILE_DATA ) => {
  const value = Object.keys(rose_file_data).find( key => {
    const item = rose_file_data[ key as keyof typeof rose_file_data];
    return item.value !== 0;
  });
  const result = unit_string_parser.parse({ value })
  return result;
}

export const react_view_calculation_machine_context = ({ input }: { input: Partial<ReactViewCalculationV1Context>}) => {
    const context: ReactViewCalculationV1Context = {
      calculation: react_view_calculation_context_parser.parse(input.calculation),
      calculation_defaults: react_view_calculation_context_parser.parse(input.calculation_defaults),
      data: react_init_load_from_remote_data_parser.parse(input.data),
    }
    const form_heating_system_system_select_initial_key = form_heating_system_get_intial_select_key(context.calculation.file_rose);
    context.calculation.form_heating_system.value.system_select = form_heating_system_system_select_initial_key;
    
    context.calculation.form_heating_system.value = form_heating_system_calculate_dynamic_model_values( 
      context.calculation.form_heating_system.value, context.calculation.file_rose 
    );
    
    // context.calculation.form_excavation_pit.value = calculate_excavation_pit_dynamic_values( context.calculation.form_excavation_pit.value, context.data )
  return react_view_calculation_v1_context_parser.parse(context);
}

export const react_calculation_materials_input = ({ context, event }: { context: ReactViewCalculationV1Context, event: any}) => {
  const input: ReactCalculationMaterialsV1Input = react_calculation_materials_v1_input.parse({
    file_aufbauten: context.calculation?.file_aufbauten,
    file_bauteilflaechen: context.calculation?.file_bauteilflaechen,
    file_oi3: context.calculation?.file_oi3,
  });
  return input;
}

export const react_view_calculation_context_input = ({ context, event }: { context: ReactViewCalculationV1Context, event: any}) => {
  return context;
}

export const REACT_VIEW_CALCULATION_MACHINE_V4 = setup({
    types: {
      input: {} as Partial<ReactViewCalculationV1Context>,
      context: {} as ReactViewCalculationV1Context,
      events: {} as 
      | { type: 'fg.form.construction_site.event.update', payload: any }
      | { type: 'fg.form.container_village.event.update', payload: any }
      | { type: 'fg.form.demolish_disposal.event.update', payload: any }
      | { type: 'fg.form.excavation_pit.event.update', payload: any }
      | { type: 'fg.form.heating_system.event.update', payload: any }
      | { type: 'fg.form.step_selection.event.update', payload: any }
      | { type: 'fg.form.common.event.update', payload: any }
      | { type: 'fg.form.container_village.event.update'}
      | { type: 'fg.form.construction_site.event.update'}
      | { type: 'fg.form.demolish_disposal.event.update'}
      | { type: 'fg.form.excavation_pit.event.update'}
      | { type: 'fg.form.heating_system.event.update'}
      | { type: "react.view.calculation_materials.event.change_oi3" }
      | { type: "react.view.calculation_materials.event.change_aufbauten" }
      | { type: "react.view.calculation_materials.event.change_material_type" }
      | { type: "react.view.calculation_materials.event.change_bauteilflaechen" }
      | { type: "react.view.calculation_materials.event.change_window_calculation" }
      | { type: "react.view.calculation_materials.event.change_concrete_calculation" }
      | { type: "react.view.calculation_materials.event.change_material_calculation" }
      | { type: "fg.form.internal.update" }
    },

    actions: {
      assign_merged_bauteilflaechen_aufbauten: function (
        { context, event },
        params,
      ) {
        throw 'assign_merged_bauteilflaechen_aufbauten'
      },
      assign_change_aufbauten: function ({ context, event }, params) {
        throw 'assign_change_aufbauten'
      },
      assign_change_bauteilflaechen: function ({ context, event }, params) {
        throw 'assign_change_bauteilflaechen'
      },
      assign_change_oi3: function ({ context, event }, params) {
        throw 'assign_change_oi3'
      },
      assign_merge_arich_oi3: function ({ context, event }, params) {
        throw 'assign_merge_arich_oi3'
      },
      assign_change_material_type: function ({ context, event }, params) {
        throw 'assign_change_material_type'
      },
      assign_prepare_material_types: function ({ context, event }, params) {
        throw 'assign_prepare_material_types'
      },
      assign_material_calculation_result: function ({ context, event }, params) {
        throw 'assign_material_calculation_result'
      },
      assign_concrete_calculation_result: function ({ context, event }, params) {
        throw 'assign_concrete_calculation_result'
      },
      assign_window_calculation_result: function ({ context, event }, params) {
        throw 'assign_window_calculation_result'
      },
      assign_change_material_calculation: function ({ context, event }, params) {
        throw 'assign_change_material_calculation'
      },
      assign_change_concrete_calculation: function ({ context, event }, params) {
        throw 'assign_change_concrete_calculation'
      },
      assign_change_window_calculation: function ({ context, event }, params) {
        throw 'assign_change_window_calculation'
      },
      assign_container_village_form_data: function({ context, event }, params ) {
        throw 'assign_container_village_form_data'
      },
      assign_construciton_form_data: function({ context, event }, params ) {
        throw 'assign_construciton_form_data'
      },
      assign_demolish_disposal_form_data: function({ context, event }, params ) {
        throw 'assign_demolish_disposal_form_data'
      },
      assign_excavation_pit_form_data: function({ context, event }, params ) {
        throw 'assign_excavation_pit_form_data'
      },
      assign_heating_system_form_data: function({ context, event }, params ) {
        throw 'assign_heating_system_form_data'
      },
      assign_common_form_data: function({ context, event }, params ) {
        throw 'assign_common_form_data'
      },
      assign_result_calculation_result: function({ context, event }, params ) {
        throw 'assign_common_form_data'
      },
      raise_form_internal_update: function({ context, event }, params ) {
        throw 'raise_form_internal_update'
      },
    },
    guards: {
      guard_is_calculation_config_form_event: function ({ context, event }) {
        throw 'guard_is_calculation_config_form_event';
      },
      guard_merge_bauteilflaechen_aufbauten_data_exists: function ({
        context,
        event,
      }) {
        throw 'guard_merge_bauteilflaechen_aufbauten_data_exists';
      },
      guard_merge_arich_oi3_data_exists: function ({ context, event }) {
        throw 'guard_merge_arich_oi3_data_exists';
      },
      guard_materials_with_type_data_exists: function ({ context, event }) {
        throw 'guard_materials_with_type_data_exists';
      },
      guard_material_calculation_data_exist: function ({ context, event }) {
        throw 'guard_material_calculation_data_exist';
      },
      guard_concrete_calculation_data_exist: function ({ context, event }) {
        throw 'guard_concrete_calculation_data_exist';
      },
      guard_window_calculation_data_exist: function ({ context, event }) {
        throw 'guard_window_calculation_data_exist';
      },
      guard_is_excavation_pit_form_event: function ({ context, event }) {
        throw 'guard_is_excavation_pit_form_event';
      },
      guard_is_rose_form_event: function ({ context, event }) {
        throw 'guard_is_rose_form_event';
      },
      guard_is_demolish_disposal_form_event: function ({ context, event }) {
        throw 'guard_is_demolish_disposal_form_event';
      },
      guard_is_construction_site_form_event: function ({ context, event }) {
        throw 'guard_is_construction_site_form_event';
      },
      guard_is_container_village_form_event: function ({ context, event }) {
        throw 'guard_is_container_village_form_event';
      },
      guard_is_common_form_event: function ({ context, event }) {
        throw 'guard_is_common_form_event';
      },
      guard_container_village_selected: function({ context, event }) {
        throw 'guard_container_village_selected';
      },
      guard_construction_site_selected: function({ context, event }) {
        throw 'guard_construction_site_selected';
      },
      guard_demolish_disposal_selected: function({ context, event }) {
        throw 'guard_demolish_disposal_selected';
      },
      guard_excavation_pit_selected: function({ context, event }) {
        throw 'guard_excavation_pit_selected';
      },
      guard_heating_system_selected: function({ context, event }) {
        throw 'guard_heating_system_selected';
      },
    },
  }).createMachine({
    context: react_view_calculation_machine_context,
    id: "REACT_VIEW_CALCULATION",
    type: "parallel",
    states: {
      CALCULATION_MATERIALS: {
        initial: "TRANSFORM_FILE_INPUTS",
        on: {
          "react.view.calculation_materials.event.change_aufbauten": {
            target:
              "#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MERGE_BAUTEILFLAECHEN_AUFBAUTEN",
            actions: {
              type: "assign_change_aufbauten",
            },
          },
          "react.view.calculation_materials.event.change_bauteilflaechen": {
            target:
              "#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MERGE_BAUTEILFLAECHEN_AUFBAUTEN",
            actions: {
              type: "assign_change_bauteilflaechen",
            },
          },
          "react.view.calculation_materials.event.change_oi3": {
            target:
              "#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MERGE_ARICH_OI3",
            actions: {
              type: "assign_change_oi3",
            },
          },
          "react.view.calculation_materials.event.change_material_type": {
            target:
              "#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIALS_WITH_TYPE",
            actions: {
              type: "assign_change_material_type",
            },
          },
          "react.view.calculation_materials.event.change_material_calculation": {
            target:
              "#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIAL_CALCULATIONS.MATERIAL_CALCULATION.CALCULATE",
            actions: {
              type: "assign_change_material_calculation",
            },
          },
          "react.view.calculation_materials.event.change_concrete_calculation": {
            target:
              "#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIAL_CALCULATIONS.CONCRETE_CALCULATION.CALCULATE",
            actions: {
              type: "assign_change_concrete_calculation",
            },
          },
          "react.view.calculation_materials.event.change_window_calculation": {
            target:
              "#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIAL_CALCULATIONS.WINDOW_CALCULATION.CALCULATE",
            actions: {
              type: "assign_change_window_calculation",
            },
          },
        },
        states: {
          TRANSFORM_FILE_INPUTS: {
            invoke: {
              id: "actor_transform_file_inputs",
              input: react_calculation_materials_input,
              onDone: {
                target: "MERGE_BAUTEILFLAECHEN_AUFBAUTEN",
                actions: {
                  type: "assign_transformed_file_inputs",
                },
              },
              src: "actor_transform_file_inputs",
            },
          },
          MERGE_BAUTEILFLAECHEN_AUFBAUTEN: {
            invoke: {
              id: "actor_merge_bauteilflaechen_aufbauten",
              input: react_view_calculation_context_input,
              onDone: {
                target: "MERGE_ARICH_OI3",
                actions: {
                  type: "assign_merged_bauteilflaechen_aufbauten",
                },
              },
              src: "actor_merge_bauteilflaechen_aufbauten",
            },
          },
          MERGE_ARICH_OI3: {
            invoke: {
              id: "actor_merge_arich_oi3",
              input: react_view_calculation_context_input,
              onDone: {
                target: "MATERIALS_WITH_TYPE",
                actions: {
                  type: "assign_merge_arich_oi3",
                },
              },
              src: "actor_merge_arich_oi3",
            },
          },
          MATERIALS_WITH_TYPE: {
            invoke: {
              id: "actor_prepare_material_types",
              input: react_view_calculation_context_input,
              onDone: {
                target: "MATERIAL_CALCULATIONS",
                actions: {
                  type: "assign_prepare_material_types",
                },
              },
              src: "actor_prepare_material_types",
            },
          },

          MATERIAL_CALCULATIONS: {
            type: "parallel",
            states: {
              MATERIAL_CALCULATION: {
                initial: "CALCULATE",
                states: {
                  CALCULATE: {
                    invoke: {
                      id: "actor_material_calculation",
                      input: react_view_calculation_context_input,
                      onDone: {
                        target: "DONE",
                        actions: {
                          type: "assign_material_calculation_result",
                        },
                      },
                      src: "actor_material_calculation",
                    },
                  },
                  DONE: {},
                },
              },
              CONCRETE_CALCULATION: {
                initial: "CALCULATE",
                states: {
                  CALCULATE: {
                    invoke: {
                      id: "actor_concrete_calculation",
                      input: react_view_calculation_context_input,
                      onDone: {
                        target: "DONE",
                        actions: {
                          type: "assign_concrete_calculation_result",
                        },
                      },
                      src: "actor_concrete_calculation",
                    },
                  },
                  DONE: {},
                },
              },
              WINDOW_CALCULATION: {
                initial: "CALCULATE",
                states: {
                  CALCULATE: {
                    invoke: {
                      id: "actor_window_calculation",
                      input: react_view_calculation_context_input,
                      onDone: {
                        target: "DONE",
                        actions: {
                          type: "assign_window_calculation_result",
                        },
                      },
                      src: "actor_window_calculation",
                    },
                  },
                  DONE: {},
                },
              },
            },
          },
        },
      },
      STEP_SELECTION_FORM: {
        type: "parallel",
        on: {
          "fg.form.step_selection.event.update": {
            actions: [
              {
                type: "assign_step_selection_form_data",
              },
              {
                type: "raise_form_internal_update",
              },
            ],
          },
        },
      },
      CONTAINER_VILLAGE_FORM: {
        initial: "CALCULATE",
        on: {
          "fg.form.container_village.event.update": {
            target: "CONTAINER_VILLAGE_FORM",
            actions: {
              type: "assign_container_village_form_data",
            },
            guard: {
              type: "guard_container_village_selected",
            },
          },
        },
        states: {
          CALCULATE: {
            invoke: {
              id: "actor_container_village_calculation",
              input: react_view_calculation_context_input,
              onDone: {
                target: "DONE",
                actions: {
                  type: "assign_container_village_calculation_result",
                },
              },
              src: "actor_container_village_calculation",
            },
          },
          DONE: {
            entry: {
              type: "raise_form_internal_update",
            },
          },
        },
      },
      CONSTRUCTION_SITE_FORM: {
        initial: "CALCULATE",
        on: {
          "fg.form.construction_site.event.update": {
            target: "CONSTRUCTION_SITE_FORM",
            actions: {
              type: "assign_construciton_form_data",
            },
            guard: {
              type: "guard_construction_site_selected",
            },
          },
        },
        states: {
          CALCULATE: {
            invoke: {
              id: "actor_construction_site_calculation",
              input: react_view_calculation_context_input,
              onDone: {
                target: "DONE",
                actions: {
                  type: "assign_construction_site_calculation_result",
                },
              },
              src: "actor_construction_site_calculation",
            },
          },
          DONE: {
            entry: {
              type: "raise_form_internal_update",
            },
          },
        },
      },
      DEMOLISH_DISPOSAL_FORM: {
        initial: "CALCULATE",
        on: {
          "fg.form.demolish_disposal.event.update": {
            target: "DEMOLISH_DISPOSAL_FORM",
            actions: {
              type: "assign_demolish_disposal_form_data",
            },
            guard: {
              type: "guard_demolish_disposal_selected",
            },
          },
        },
        states: {
          CALCULATE: {
            invoke: {
              id: "actor_demolish_disposal_calculation",
              input: react_view_calculation_context_input,
              onDone: {
                target: "DONE",
                actions: {
                  type: "assign_demolish_disposal_calculation_result",
                },
              },
              src: "actor_demolish_disposal_calculation",
            },
          },
          DONE: {
            entry: {
              type: "raise_form_internal_update",
            },
          },
        },
      },
      EXCAVATION_PIT_FORM: {
        initial: "CALCULATE",
        on: {
          "fg.form.excavation_pit.event.update": {
            target: "EXCAVATION_PIT_FORM",
            actions: {
              type: "assign_excavation_pit_form_data",
            },
            guard: {
              type: "guard_excavation_pit_selected",
            },
          },
        },
        states: {
          CALCULATE: {
            invoke: {
              id: "actor_excavation_pit_calculation",
              input: react_view_calculation_context_input,
              onDone: {
                target: "DONE",
                actions: {
                  type: "assign_excavation_pit_calculation_result",
                },
              },
              src: "actor_excavation_pit_calculation",
            },
          },
          DONE: {
            entry: {
              type: "raise_form_internal_update",
            },
          },
        },
      },
      HEATING_SYSTEM_FORM: {
        initial: "CALCULATE",
        on: {
          "fg.form.heating_system.event.update": {
            target: "HEATING_SYSTEM_FORM",
            actions: {
              type: "assign_heating_system_form_data",
            },
            guard: {
              type: "guard_heating_system_selected",
            },
          },
        },
        states: {
          CALCULATE: {
            invoke: {
              id: "actor_heating_system_calculation",
              input: react_view_calculation_context_input,
              onDone: {
                target: "DONE",
                actions: {
                  type: "assign_heating_system_calculation_result",
                },
              },
              src: "actor_heating_system_calculation",
            },
          },
          DONE: {
            entry: [
              {
                type: "raise_form_internal_update",
              },
            ]
          },
        },
      },
      RESULT: {
        initial: "CALCULATE",
        on: {
          "fg.form.internal.update": {
            target: "RESULT",
          },
        },
        states: {
          CALCULATE: {
            invoke: {
              id: "actor_result_calculation",
              input: react_view_calculation_context_input,
              onDone: {
                target: "DONE",
                actions: {
                  type: "assign_result_calculation_result",
                },
              },
              src: "actor_result_calculation",
            },
          },
          DONE: {},
        },
      },
      COMMON_FORM: {
        on: {
          "fg.form.common.event.update": {
            actions: [
              {
                type: "assign_common_form_data",
              },
            ],
          },
        },
      },
      NAVIGATION: {},
    },
  });