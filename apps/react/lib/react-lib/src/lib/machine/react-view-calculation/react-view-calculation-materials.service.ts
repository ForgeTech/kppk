import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { assign, fromPromise, setup } from 'xstate';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { transform_oi3, transform_bauteilflaechen, transform_aufbauten} from './react-view-calculation-materials.utils';
import { z } from 'zod';
import { debug_calculation_oi3_import_parser } from '../react-init';

export const react_calculation_materials_v1_input = z.object({
  file_aufbauten: z.array(z.any()),
  file_bauteilflaechen: z.array(z.any()),
  file_oi3: debug_calculation_oi3_import_parser,
});
export type ReactCalculationMaterialsV1Input = z.infer<typeof react_calculation_materials_v1_input>;

export const react_calculation_materials_v1_output = z.object({
  transformed_aufbauten:  z.array(z.any()),
  transformed_bauteilflaechen: z.array(z.any()),
  transformed_oi3: z.array(z.any()),
});
export type ReactCalculationMaterialsV1Output= z.infer<typeof react_calculation_materials_v1_output>;

export const react_calculation_materials_v1_context = z.object({
  input: react_calculation_materials_v1_input,
  output: react_calculation_materials_v1_output
});

export type ReactCalculationMaterialsV1Context = z.infer<typeof react_calculation_materials_v1_context>;

@Injectable({
  providedIn: 'root',
})
export class ReactCalculationMaterialsService extends FgBaseService {
  public machine;
  protected $immer = inject(FgImmutableService);

  constructor() {
    super();
    this.machine = this.getMachine();
  }

  public assign_oi3_transform_result = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
        draft.output.transformed_oi3 = event.output;
    });
    return result;
  }
  public assign_bauteilflaechen_transform_result = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_bauteilflaechen = event.output;
    });
    return result;
  }
  public assign_aufbauten_transform_result = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }
  public assign_change_aufbauten = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }
  public assign_change_bauteilflaechen = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }
  public assign_change_oi3 = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }
  public assign_merge_arich_oi3 = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }
  public assign_material_type = ({ context, event }: { context: ReactCalculationMaterialsV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }

  public actor_tranform_oi3_file_inputs = async ({ input }: { input: ReactCalculationMaterialsV1Context }) => {
    if( input.input.file_oi3?.data && input.input.file_oi3?.area) {
      return transform_oi3( input.input.file_oi3.data, input.input.file_oi3.area );
    } else {
      return [];
    }
  }
  public actor_tranform_bauteilflaechen_file_inputs = async ({ input }: { input: ReactCalculationMaterialsV1Context }) => {
    if(input.input.file_bauteilflaechen) {
      return transform_bauteilflaechen( input.input.file_bauteilflaechen );
    } else {
      return [];
    }
  }
  public actor_tranform_aufbauten_file_inputs = async ({ input }: { input: ReactCalculationMaterialsV1Context }) => {
    if(input.input.file_aufbauten) {
      const result = transform_aufbauten( input.input.file_aufbauten );
      return result;
    } else {
      return [];
    }
  }

  protected actor_input = ({ context }: { context: ReactCalculationMaterialsV1Context, event: any}) => {
    return context;
  };

  protected react_calculation_materials_v1_input = ({ input }: { input: Partial<ReactCalculationMaterialsV1Input>}) => {
    console.log('>>>>>>>>>>>>>>>>>>>REACT_CALCULATION_MATERIALS_INPUT>>>>>>>>>>>>>>>>')
    const context = react_calculation_materials_v1_context.parse({
      input,
      output: {
        transformed_aufbauten: [],
        transformed_bauteilflaechen: [],
        transformed_oi3: [],
      }
    });
    return context;
  }

  public getMachine = () => {
    return setup({
      types: {
        context: {} as any,
        output: {} as any,
      },
      actions: {
        assign_oi3_transform_result: assign(this.assign_oi3_transform_result),
        assign_bauteilflaechen_transform_result: assign(this.assign_bauteilflaechen_transform_result),
        assign_aufbauten_transform_result: assign(this.assign_aufbauten_transform_result),
        assign_change_aufbauten:  assign(this.assign_change_aufbauten),
        assign_change_bauteilflaechen:  assign(this.assign_change_bauteilflaechen),
        assign_change_oi3:  assign(this.assign_change_oi3),
        assign_merge_arich_oi3:  assign(this.assign_merge_arich_oi3),
        assign_material_type:  assign(this.assign_material_type),
      },
      actors: {
        actor_tranform_oi3_file_inputs: fromPromise(this.actor_tranform_oi3_file_inputs),
        actor_tranform_bauteilflaechen_file_inputs: fromPromise(this.actor_tranform_bauteilflaechen_file_inputs),
        actor_tranform_aufbauten_file_inputs: fromPromise(this.actor_tranform_aufbauten_file_inputs)
      },
    }).createMachine({
      context: this.react_calculation_materials_v1_input,
      output: ({ context }: { context: ReactCalculationMaterialsV1Context }) => {
        const result = react_calculation_materials_v1_output.parse(context?.output);
        return result;
      },
      id: "REACT_VIEW_CALCULATION_MATERIALS",
      initial: "TRANSFORM_FILE_INPUT_DATA",
      states: {
        TRANSFORM_FILE_INPUT_DATA: {
          type: "parallel",
          onDone: {
            target: "CALCULATE",
          },
          states: {
            OI3: {
              initial: "TRANSFORM",
              states: {
                TRANSFORM: {
                  invoke: {
                    id: "actor_tranform_oi3_file_inputs",
                    input: this.actor_input,
                    onDone: {
                      target: "DONE",
                      actions: {
                        type: "assign_oi3_transform_result",
                      },
                    },
                    src: "actor_tranform_oi3_file_inputs",
                  },
                },
                DONE: {
                  type: "final",
                },
              },
            },
            BAUTEILFLAECHEN: {
              initial: "TRANSFORM",
              states: {
                TRANSFORM: {
                  invoke: {
                    id: "actor_tranform_bauteilflaechen_file_inputs",
                    input: this.actor_input,
                    onDone: {
                      target: "DONE",
                      actions: {
                        type: "assign_bauteilflaechen_transform_result",
                      },
                    },
                    src: "actor_tranform_bauteilflaechen_file_inputs",
                  },
                },
                DONE: {
                  type: "final",
                },
              },
            },
            AUFBAUTEN: {
              initial: "TRANSFORM",
              states: {
                TRANSFORM: {
                  invoke: {
                    id: "actor_tranform_aufbauten_file_inputs",
                    input: this.actor_input,
                    onDone: {
                      target: "DONE",
                      actions: {
                        type: "assign_aufbauten_transform_result",
                      },
                    },
                    src: "actor_tranform_aufbauten_file_inputs",
                  },
                },
                DONE: {
                  type: "final",
                },
              },
            },
          },
        },
        CALCULATE: {
          type: "final",
        },
      },
    });
  }
}
