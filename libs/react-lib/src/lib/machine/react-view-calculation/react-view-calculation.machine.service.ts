import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { FgXstateService } from '../../service';
import { ReactViewCalculationMachineMethodeService } from './react-view-calculation.machine.methode.service';
import {
  REACT_VIEW_CALCULATION_CONTEXT,
  react_view_calculation_context_parser,
} from '../../types';
import { parent_context_event_input } from '../machine.utils';
import { ReactCalculationMaterialService } from '../react-view-calculation-material/react-view-calculation-material.machine.service';

@Injectable({
  providedIn: 'root',
})
export class ReactViewCalculationMachineService extends FgBaseService {
  public $methode = inject(ReactViewCalculationMachineMethodeService);
  public $calculation_material = inject(ReactCalculationMaterialService);
  public $xstate = inject(FgXstateService);

  public get_machine(context?: REACT_VIEW_CALCULATION_CONTEXT) {
    return this.$xstate
      .setup({
        types: {
          input: {} as Partial<REACT_VIEW_CALCULATION_CONTEXT>,
          context: {} as REACT_VIEW_CALCULATION_CONTEXT,
          events: {} as
            | { type: 'fg.form.construction_site.event.update'; payload: any }
            | { type: 'fg.form.container_village.event.update'; payload: any }
            | { type: 'fg.form.demolish_disposal.event.update'; payload: any }
            | { type: 'fg.form.excavation_pit.event.update'; payload: any }
            | { type: 'fg.form.heating_system.event.update'; payload: any }
            | { type: 'fg.form.step_selection.event.update'; payload: any }
            | { type: 'fg.form.common.event.update'; payload: any }
            | { type: 'fg.form.container_village.event.update' }
            | { type: 'fg.form.construction_site.event.update' }
            | { type: 'fg.form.demolish_disposal.event.update' }
            | { type: 'fg.form.excavation_pit.event.update' }
            | { type: 'fg.form.heating_system.event.update' }
            | { type: 'react.view.calculation_materials.event.change_oi3' }
            | {
                type: 'react.view.calculation_materials.event.change_aufbauten';
              }
            | {
                type: 'react.view.calculation_materials.event.change_material_type';
              }
            | {
                type: 'react.view.calculation_materials.event.change_bauteilflaechen';
              }
            | {
                type: 'react.view.calculation_materials.event.change_window_calculation';
              }
            | {
                type: 'react.view.calculation_materials.event.change_concrete_calculation';
              }
            | {
                type: 'react.view.calculation_materials.event.change_material_calculation';
              }
            | { type: 'fg.form.internal.update' },
        },

        actors: {
          actor_transform_file_inputs: this.$calculation_material.get_machine(),
          actor_merge_bauteilflaechen_aufbauten: this.$xstate.fromPromise(
            this.$methode.actor_merge_bauteilflaechen_aufbauten
          ),
          actor_merge_arich_oi3: this.$xstate.fromPromise(
            this.$methode.actor_merge_arich_oi3
          ),
          actor_prepare_material_types: this.$xstate.fromPromise(
            this.$methode.actor_prepare_material_types
          ),
          actor_material_calculation: this.$xstate.fromPromise(
            this.$methode.actor_material_calculation
          ),
          actor_concrete_calculation: this.$xstate.fromPromise(
            this.$methode.actor_concrete_calculation
          ),
          actor_window_calculation: this.$xstate.fromPromise(
            this.$methode.actor_window_calculation
          ),
          actor_container_village_calculation: this.$xstate.fromPromise(
            this.$methode.actor_container_village_calculation
          ),
          actor_construction_site_calculation: this.$xstate.fromPromise(
            this.$methode.actor_construction_site_calculation
          ),
          actor_demolish_disposal_calculation: this.$xstate.fromPromise(
            this.$methode.actor_demolish_disposal_calculation
          ),
          actor_excavation_pit_calculation: this.$xstate.fromPromise(
            this.$methode.actor_excavation_pit_calculation
          ),
          actor_heating_system_calculation: this.$xstate.fromPromise(
            this.$methode.actor_heating_system_calculation
          ),
          actor_result_calculation: this.$xstate.fromPromise(
            this.$methode.actor_result_calculation
          ),
        },
        actions: {
          // assign_form_data: this.$xstate.assign(this.assign_form_data),
          assign_transformed_file_inputs: this.$xstate.assign(
            this.$methode.assign_transformed_file_inputs
          ),
          assign_change_aufbauten: this.$xstate.assign(
            this.$methode.assign_change_aufbauten
          ),
          assign_change_bauteilflaechen: this.$xstate.assign(
            this.$methode.assign_change_bauteilflaechen
          ),
          assign_change_oi3: this.$xstate.assign(
            this.$methode.assign_change_oi3
          ),
          assign_change_material_type: this.$xstate.assign(
            this.$methode.assign_change_material_type
          ),
          assign_merged_bauteilflaechen_aufbauten: this.$xstate.assign(
            this.$methode.assign_merged_bauteilflaechen_aufbauten
          ),
          assign_prepare_material_types: this.$xstate.assign(
            this.$methode.assign_prepare_material_types
          ),
          assign_merge_arich_oi3: this.$xstate.assign(
            this.$methode.assign_merge_arich_oi3
          ),
          assign_material_calculation_result: this.$xstate.assign(
            this.$methode.assign_material_calculation_result
          ),
          assign_concrete_calculation_result: this.$xstate.assign(
            this.$methode.assign_concrete_calculation_result
          ),
          assign_window_calculation_result: this.$xstate.assign(
            this.$methode.assign_window_calculation_result
          ),
          assign_change_material_calculation: this.$xstate.assign(
            this.$methode.assign_change_material_calculation
          ),
          assign_change_window_calculation: this.$xstate.assign(
            this.$methode.assign_change_window_calculation
          ),
          assign_change_concrete_calculation: this.$xstate.assign(
            this.$methode.assign_change_concrete_calculation
          ),
          assign_container_village_calculation_result: this.$xstate.assign(
            this.$methode.assign_container_village_calculation_result
          ),
          assign_construction_site_calculation_result: this.$xstate.assign(
            this.$methode.assign_construction_site_calculation_result
          ),
          assign_demolish_disposal_calculation_result: this.$xstate.assign(
            this.$methode.assign_demolish_disposal_calculation_result
          ),
          assign_excavation_pit_calculation_result: this.$xstate.assign(
            this.$methode.assign_excavation_pit_calculation_result
          ),
          assign_heating_system_calculation_result: this.$xstate.assign(
            this.$methode.assign_heating_system_calculation_result
          ),
          // raise_form_internal_update: raise(this.raise_form_internal_update),
          assign_step_selection_form_data: this.$xstate.assign(
            this.$methode.assign_step_selection_form_data
          ),
          assign_container_village_form_data: this.$xstate.assign(
            this.$methode.assign_container_village_form_data
          ),
          assign_construciton_form_data: this.$xstate.assign(
            this.$methode.assign_construciton_form_data
          ),
          assign_demolish_disposal_form_data: this.$xstate.assign(
            this.$methode.assign_demolish_disposal_form_data
          ),
          assign_excavation_pit_form_data: this.$xstate.assign(
            this.$methode.assign_excavation_pit_form_data
          ),
          assign_heating_system_form_data: this.$xstate.assign(
            this.$methode.assign_heating_system_form_data
          ),
          assign_common_form_data: this.$xstate.assign(
            this.$methode.assign_common_form_data
          ),
          assign_result_calculation_result: this.$xstate.assign(
            this.$methode.assign_result_calculation_result
          ),
          raise_form_internal_update: this.$xstate.raise(
            this.$methode.raise_form_internal_update
          ),
        },
        guards: {
          guard_merge_bauteilflaechen_aufbauten_data_exists:
            this.$methode.guard_merge_bauteilflaechen_aufbauten_data_exists,
          guard_merge_arich_oi3_data_exists:
            this.$methode.guard_merge_arich_oi3_data_exists,
          guard_materials_with_type_data_exists:
            this.$methode.guard_materials_with_type_data_exists,
          guard_material_calculation_data_exist:
            this.$methode.guard_material_calculation_data_exist,
          guard_concrete_calculation_data_exist:
            this.$methode.guard_concrete_calculation_data_exist,
          guard_window_calculation_data_exist:
            this.$methode.guard_window_calculation_data_exist,
          guard_container_village_selected:
            this.$methode.guard_container_village_selected,
          guard_construction_site_selected:
            this.$methode.guard_construction_site_selected,
          guard_demolish_disposal_selected:
            this.$methode.guard_demolish_disposal_selected,
          guard_excavation_pit_selected:
            this.$methode.guard_excavation_pit_selected,
          guard_heating_system_selected:
            this.$methode.guard_heating_system_selected,
        },
      })
      .createMachine({
        context: react_view_calculation_context_parser.parse(context ?? {}),
        id: 'REACT_VIEW_CALCULATION',
        type: 'parallel',
        states: {
          CALCULATION_MATERIALS: {
            initial: 'TRANSFORM_FILE_INPUTS',
            on: {
              'react.view.calculation_materials.event.change_aufbauten': {
                target:
                  '#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MERGE_BAUTEILFLAECHEN_AUFBAUTEN',
                actions: {
                  type: 'assign_change_aufbauten',
                },
              },
              'react.view.calculation_materials.event.change_bauteilflaechen': {
                target:
                  '#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MERGE_BAUTEILFLAECHEN_AUFBAUTEN',
                actions: {
                  type: 'assign_change_bauteilflaechen',
                },
              },
              'react.view.calculation_materials.event.change_oi3': {
                target:
                  '#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MERGE_ARICH_OI3',
                actions: {
                  type: 'assign_change_oi3',
                },
              },
              'react.view.calculation_materials.event.change_material_type': {
                target:
                  '#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIALS_WITH_TYPE',
                actions: {
                  type: 'assign_change_material_type',
                },
              },
              'react.view.calculation_materials.event.change_material_calculation':
                {
                  target:
                    '#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIAL_CALCULATIONS.MATERIAL_CALCULATION.CALCULATE',
                  actions: {
                    type: 'assign_change_material_calculation',
                  },
                },
              'react.view.calculation_materials.event.change_concrete_calculation':
                {
                  target:
                    '#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIAL_CALCULATIONS.CONCRETE_CALCULATION.CALCULATE',
                  actions: {
                    type: 'assign_change_concrete_calculation',
                  },
                },
              'react.view.calculation_materials.event.change_window_calculation':
                {
                  target:
                    '#REACT_VIEW_CALCULATION.CALCULATION_MATERIALS.MATERIAL_CALCULATIONS.WINDOW_CALCULATION.CALCULATE',
                  actions: {
                    type: 'assign_change_window_calculation',
                  },
                },
            },
            states: {
              TRANSFORM_FILE_INPUTS: {
                invoke: {
                  id: 'actor_transform_file_inputs',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'MERGE_BAUTEILFLAECHEN_AUFBAUTEN',
                    actions: {
                      type: 'assign_transformed_file_inputs',
                    },
                  },
                  src: 'actor_transform_file_inputs',
                },
              },
              MERGE_BAUTEILFLAECHEN_AUFBAUTEN: {
                invoke: {
                  id: 'actor_merge_bauteilflaechen_aufbauten',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'MERGE_ARICH_OI3',
                    actions: {
                      type: 'assign_merged_bauteilflaechen_aufbauten',
                    },
                  },
                  src: 'actor_merge_bauteilflaechen_aufbauten',
                },
              },
              MERGE_ARICH_OI3: {
                invoke: {
                  id: 'actor_merge_arich_oi3',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'MATERIALS_WITH_TYPE',
                    actions: {
                      type: 'assign_merge_arich_oi3',
                    },
                  },
                  src: 'actor_merge_arich_oi3',
                },
              },
              MATERIALS_WITH_TYPE: {
                invoke: {
                  id: 'actor_prepare_material_types',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'MATERIAL_CALCULATIONS',
                    actions: {
                      type: 'assign_prepare_material_types',
                    },
                  },
                  src: 'actor_prepare_material_types',
                },
              },

              MATERIAL_CALCULATIONS: {
                type: 'parallel',
                states: {
                  MATERIAL_CALCULATION: {
                    initial: 'CALCULATE',
                    states: {
                      CALCULATE: {
                        invoke: {
                          id: 'actor_material_calculation',
                          input: parent_context_event_input,
                          onDone: {
                            target: 'DONE',
                            actions: {
                              type: 'assign_material_calculation_result',
                            },
                          },
                          src: 'actor_material_calculation',
                        },
                      },
                      DONE: {},
                    },
                  },
                  CONCRETE_CALCULATION: {
                    initial: 'CALCULATE',
                    states: {
                      CALCULATE: {
                        invoke: {
                          id: 'actor_concrete_calculation',
                          input: parent_context_event_input,
                          onDone: {
                            target: 'DONE',
                            actions: {
                              type: 'assign_concrete_calculation_result',
                            },
                          },
                          src: 'actor_concrete_calculation',
                        },
                      },
                      DONE: {},
                    },
                  },
                  WINDOW_CALCULATION: {
                    initial: 'CALCULATE',
                    states: {
                      CALCULATE: {
                        invoke: {
                          id: 'actor_window_calculation',
                          input: parent_context_event_input,
                          onDone: {
                            target: 'DONE',
                            actions: {
                              type: 'assign_window_calculation_result',
                            },
                          },
                          src: 'actor_window_calculation',
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
            type: 'parallel',
            on: {
              'fg.form.step_selection.event.update': {
                actions: [
                  {
                    type: 'assign_step_selection_form_data',
                  },
                  {
                    type: 'raise_form_internal_update',
                  },
                ],
              },
            },
          },
          CONTAINER_VILLAGE_FORM: {
            initial: 'CALCULATE',
            on: {
              'fg.form.container_village.event.update': {
                target: 'CONTAINER_VILLAGE_FORM',
                actions: {
                  type: 'assign_container_village_form_data',
                },
                guard: {
                  type: 'guard_container_village_selected',
                },
              },
            },
            states: {
              CALCULATE: {
                invoke: {
                  id: 'actor_container_village_calculation',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'DONE',
                    actions: {
                      type: 'assign_container_village_calculation_result',
                    },
                  },
                  src: 'actor_container_village_calculation',
                },
              },
              DONE: {
                entry: {
                  type: 'raise_form_internal_update',
                },
              },
            },
          },
          CONSTRUCTION_SITE_FORM: {
            initial: 'CALCULATE',
            on: {
              'fg.form.construction_site.event.update': {
                target: 'CONSTRUCTION_SITE_FORM',
                actions: {
                  type: 'assign_construciton_form_data',
                },
                guard: {
                  type: 'guard_construction_site_selected',
                },
              },
            },
            states: {
              CALCULATE: {
                invoke: {
                  id: 'actor_construction_site_calculation',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'DONE',
                    actions: {
                      type: 'assign_construction_site_calculation_result',
                    },
                  },
                  src: 'actor_construction_site_calculation',
                },
              },
              DONE: {
                entry: {
                  type: 'raise_form_internal_update',
                },
              },
            },
          },
          DEMOLISH_DISPOSAL_FORM: {
            initial: 'CALCULATE',
            on: {
              'fg.form.demolish_disposal.event.update': {
                target: 'DEMOLISH_DISPOSAL_FORM',
                actions: {
                  type: 'assign_demolish_disposal_form_data',
                },
                guard: {
                  type: 'guard_demolish_disposal_selected',
                },
              },
            },
            states: {
              CALCULATE: {
                invoke: {
                  id: 'actor_demolish_disposal_calculation',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'DONE',
                    actions: {
                      type: 'assign_demolish_disposal_calculation_result',
                    },
                  },
                  src: 'actor_demolish_disposal_calculation',
                },
              },
              DONE: {
                entry: {
                  type: 'raise_form_internal_update',
                },
              },
            },
          },
          EXCAVATION_PIT_FORM: {
            initial: 'CALCULATE',
            on: {
              'fg.form.excavation_pit.event.update': {
                target: 'EXCAVATION_PIT_FORM',
                actions: {
                  type: 'assign_excavation_pit_form_data',
                },
                guard: {
                  type: 'guard_excavation_pit_selected',
                },
              },
            },
            states: {
              CALCULATE: {
                invoke: {
                  id: 'actor_excavation_pit_calculation',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'DONE',
                    actions: {
                      type: 'assign_excavation_pit_calculation_result',
                    },
                  },
                  src: 'actor_excavation_pit_calculation',
                },
              },
              DONE: {
                entry: {
                  type: 'raise_form_internal_update',
                },
              },
            },
          },
          HEATING_SYSTEM_FORM: {
            initial: 'CALCULATE',
            on: {
              'fg.form.heating_system.event.update': {
                target: 'HEATING_SYSTEM_FORM',
                actions: {
                  type: 'assign_heating_system_form_data',
                },
                guard: {
                  type: 'guard_heating_system_selected',
                },
              },
            },
            states: {
              CALCULATE: {
                invoke: {
                  id: 'actor_heating_system_calculation',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'DONE',
                    actions: {
                      type: 'assign_heating_system_calculation_result',
                    },
                  },
                  src: 'actor_heating_system_calculation',
                },
              },
              DONE: {
                entry: [
                  {
                    type: 'raise_form_internal_update',
                  },
                ],
              },
            },
          },
          RESULT: {
            initial: 'CALCULATE',
            on: {
              'fg.form.internal.update': {
                target: 'RESULT',
              },
            },
            states: {
              CALCULATE: {
                invoke: {
                  id: 'actor_result_calculation',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'DONE',
                    actions: {
                      type: 'assign_result_calculation_result',
                    },
                  },
                  src: 'actor_result_calculation',
                },
              },
              DONE: {},
            },
          },
          COMMON_FORM: {
            on: {
              'fg.form.common.event.update': {
                actions: [
                  {
                    type: 'assign_common_form_data',
                  },
                ],
              },
            },
          },
          NAVIGATION: {},
        },
      });
  }
}
