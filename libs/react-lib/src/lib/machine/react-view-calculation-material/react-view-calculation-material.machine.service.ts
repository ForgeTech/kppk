import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import {
  react_calculation_materials_context,
  REACT_CALCULATION_MATERIALS_CONTEXT,
  REACT_CALCULATION_MATERIALS_FILE_DATA,
  react_calculation_materials_output,
  REACT_CALCULATION_MATERIALS_OUTPUT,
} from '../../types';
import { FgXstateService } from '../../service';
import { ReactCalculationMaterialMachineMethodeService } from './react-view-calculation-material.machine.methode.service';
import { parent_context_event_input } from '../machine.utils';

@Injectable({
  providedIn: 'root',
})
export class ReactCalculationMaterialService extends FgBaseService {
  protected $methode = inject(ReactCalculationMaterialMachineMethodeService);
  protected $xstate = inject(FgXstateService);

  public get_machine() {
    return this.$xstate
      .setup({
        types: {
          input: {} as REACT_CALCULATION_MATERIALS_FILE_DATA,
          context: {} as REACT_CALCULATION_MATERIALS_CONTEXT,
          output: {} as REACT_CALCULATION_MATERIALS_OUTPUT,
        },
        actions: {
          assign_oi3_transform_result: this.$xstate.assign( this.$methode.assign_oi3_transform_result ),
          assign_bauteilflaechen_transform_result: this.$xstate.assign( this.$methode.assign_bauteilflaechen_transform_result ),
          assign_aufbauten_transform_result: this.$xstate.assign( this.$methode.assign_aufbauten_transform_result ),
          assign_change_aufbauten: this.$xstate.assign( this.$methode.assign_change_aufbauten ),
          assign_change_bauteilflaechen: this.$xstate.assign( this.$methode.assign_change_bauteilflaechen ),
          assign_change_oi3: this.$xstate.assign( this.$methode.assign_change_oi3 ),
          assign_merge_arich_oi3: this.$xstate.assign( this.$methode.assign_merge_arich_oi3 ),
          assign_material_type: this.$xstate.assign( this.$methode.assign_material_type ),
        },
        actors: {
          actor_tranform_oi3_file_inputs: this.$xstate.fromPromise( this.$methode.actor_tranform_oi3_file_inputs ),
          actor_tranform_bauteilflaechen_file_inputs: this.$xstate.fromPromise( this.$methode.actor_tranform_bauteilflaechen_file_inputs ),
          actor_tranform_aufbauten_file_inputs: this.$xstate.fromPromise( this.$methode.actor_tranform_aufbauten_file_inputs ),
        },
      })
      .createMachine({
        context: ({input }) => {
          const context = {
            input,
            output: {}
          } 
          return react_calculation_materials_context.parse( context );
        },
        output: ({
          context,
        }: {
          context: REACT_CALCULATION_MATERIALS_CONTEXT;
        }) => {
          const result = react_calculation_materials_output.parse(
            context?.output
          );
          return result;
        },
        id: 'REACT_VIEW_CALCULATION_MATERIALS',
        initial: 'TRANSFORM_FILE_INPUT_DATA',
        states: {
          TRANSFORM_FILE_INPUT_DATA: {
            type: 'parallel',
            onDone: {
              target: 'CALCULATE',
            },
            states: {
              OI3: {
                initial: 'TRANSFORM',
                states: {
                  TRANSFORM: {
                    invoke: {
                      id: 'actor_tranform_oi3_file_inputs',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'DONE',
                        actions: {
                          type: 'assign_oi3_transform_result',
                        },
                      },
                      src: 'actor_tranform_oi3_file_inputs',
                    },
                  },
                  DONE: {
                    type: 'final',
                  },
                },
              },
              BAUTEILFLAECHEN: {
                initial: 'TRANSFORM',
                states: {
                  TRANSFORM: {
                    invoke: {
                      id: 'actor_tranform_bauteilflaechen_file_inputs',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'DONE',
                        actions: {
                          type: 'assign_bauteilflaechen_transform_result',
                        },
                      },
                      src: 'actor_tranform_bauteilflaechen_file_inputs',
                    },
                  },
                  DONE: {
                    type: 'final',
                  },
                },
              },
              AUFBAUTEN: {
                initial: 'TRANSFORM',
                states: {
                  TRANSFORM: {
                    invoke: {
                      id: 'actor_tranform_aufbauten_file_inputs',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'DONE',
                        actions: {
                          type: 'assign_aufbauten_transform_result',
                        },
                      },
                      src: 'actor_tranform_aufbauten_file_inputs',
                    },
                  },
                  DONE: {
                    type: 'final',
                  },
                },
              },
            },
          },
          CALCULATE: {
            type: 'final',
          },
        },
      });
  }
}
