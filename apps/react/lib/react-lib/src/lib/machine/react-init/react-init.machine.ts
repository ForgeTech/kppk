import { Actor, ActorRefFrom, EventFromLogic, SnapshotFrom, setup } from "xstate";
import { REACT_INIT_LOAD_FROM_REMOTE, REACT_INIT_OUTPUT_DATA, react_init_context_parser, react_init_output_parser } from "./react-init.types";
import { AppConfigInterface } from "../../interface/app.config.interface";
import { FgEnvironmentConfigInterface } from "@fg-kppk/fg-base";

export type ReactAppInitV1Snapshot = SnapshotFrom<typeof PWA_REACT_APP_INIT_V1>;
export type ReactAppInitV1Event = EventFromLogic<typeof PWA_REACT_APP_INIT_V1>;
export type ReactAppInitV1Ref = ActorRefFrom<typeof PWA_REACT_APP_INIT_V1>;
export type ReactAppInitV1Machine = typeof PWA_REACT_APP_INIT_V1;
export type ReactAppInitV1Actor = Actor<typeof PWA_REACT_APP_INIT_V1>;
export type ReactAppInitV1Context = {
  environment: FgEnvironmentConfigInterface<AppConfigInterface> | undefined,
  load_from_remote: REACT_INIT_LOAD_FROM_REMOTE | undefined,
  output: REACT_INIT_OUTPUT_DATA | undefined,
};

export const react_init_input_context = ({ input }: { input: Partial<ReactAppInitV1Context> }) => {
  const context: ReactAppInitV1Context = {
    environment: undefined,
    load_from_remote: undefined,
    output: undefined,
  }
  const result = react_init_context_parser.parse( Object.assign( context, input) ) as ReactAppInitV1Context;
  return result;
}

export const PWA_REACT_APP_INIT_V1 = setup({
  types: {
    input: {} as Partial<ReactAppInitV1Context>,
    output: {} as REACT_INIT_OUTPUT_DATA,
    context: {} as ReactAppInitV1Context,
  },
  actions: {
    escalate_load_from_local_error: function ({ context, event }, params) {
      throw new Error('load_from_local_error');
    },

    escalate_load_from_remote_error: function ({ context, event }, params) {
      throw new Error('load_from_remote_error')
    },

    escalate_result_validate_error: function ({ context, event }, params) {
      throw new Error('result_validate_error');
    },

  },
  // actors: {
  //   actor_load_from_local: createMachine({}),
  //   actor_validate_load_from_local: createMachine({}),
  //   actor_load_from_remote: createMachine({}),
  //   actor_validate_load_from_remote: createMachine({}),
  //   actor_merge_result:  createMachine({}),
  //   actor_validate_result:  createMachine({}),
  // },
}).createMachine({
  context: react_init_input_context,
  id: "APP_INITIALIZE_V2",
  entry: {
    type: 'assign_react_init_input'
  },
  output: ({ context }: { context: ReactAppInitV1Context }) => {
    let result = {} as REACT_INIT_OUTPUT_DATA
    console.log('FIND OUT WHY NOT PARSING ANYMORE')
    // try {
    //   // result = react_init_output_parser.parse(context?.output);
    // } catch( error ) {
    //   console.log( error );
    // }
    return context?.output as REACT_INIT_OUTPUT_DATA;
  },
  initial: "LOAD",
  states: {
    LOAD: {
      type: "parallel",
      onDone: {
        target: "RESULTS",
      },
      states: {
        // FROM_LOCAL: {
        //   initial: "PENDING",
        //   states: {
        //     PENDING: {
        //       invoke: {
        //         id: "load_from_local",
        //         input: ({ event, context}) => {
        //           console.log('>>>>>>>>>>>>>>LOAD_FROM_LOCAL>>>>>>>>>>>>>>>>>>>');
        //           console.log( event );
        //           console.log( context )
        //           return {} as never;
        //         },
        //         onDone: {
        //           target: "VALIDATE",
        //         },
        //         onError: {
        //           target: "ERROR",
        //         },
        //         src: "actor_load_from_local",
        //       },
        //     },
        //     VALIDATE: {
        //       invoke: {
        //         id: "validate_load_from_local",
        //         input: ({ event, context}) => {
        //           console.log('>>>>>>>>>>>>>>VALIDATE_LOAD_FROM_LOCAL>>>>>>>>>>>>>>>>>>>');
        //           console.log( event );
        //           console.log( context )
        //           return event['output'] as never;
        //         },
        //         onDone: {
        //           target: "DONE",
        //         },
        //         onError: {
        //           target: "ERROR",
        //         },
        //         src: "actor_validate_load_from_local",
        //       },
        //     },
        //     ERROR: {
        //       entry: {
        //         type: "escalate_load_from_local_error",
        //       },
        //     },
        //     DONE: {
        //       type: "final",
        //       entry: {
        //         type: "assign_load_from_local_result",
        //       },
        //     },
        //   },
        // },
        FROM_REMOTE: {
          initial: "PENDING",
          states: {
            PENDING: {
              invoke: {
                id: "load_from_remote",
                input: ({ event, context}) => {
                  // console.log('>>>>>>>>>>>>>>LOAD_FROM_REMOTE>>>>>>>>>>>>>>>>>>>');
                  // // assertEvent( event, 'test')
                  // console.log( event );
                  // console.log( context )
                  return {};
                },
                onDone: {
                  target: "VALIDATE",
                },
                onError: {
                  target: "ERROR",
                },
                src: "actor_load_from_remote",
              },
            },
            VALIDATE: {
              invoke: {
                id: "validate_load_from_remote",
                input: ({ context, event }: { context: ReactAppInitV1Context, event: { output: ReactAppInitV1Context } }) => {
                  console.log('>>>>>>>>>>>>INPUT>>>>>>>>>>>')
                  console.log(event.output)
                  return event.output;
                },
                onDone: {
                  target: "DONE",
                },
                onError: {
                  target: "ERROR",
                },
                src: "actor_validate_load_from_remote",
              },
            },
            ERROR: {
              entry: {
                type: "escalate_load_from_remote_error",
              },
            },
            DONE: {
              type: "final",
              entry: {
                type: "assign_load_from_remote_result",
              },
            },
          },
        },
      },
    },
    RESULTS: {
      initial: "MERGE",
      onDone: {
        target: "DONE",
      },
      states: {
        MERGE: {
          invoke: {
            id: "merge_result",
            input: ( {context } ) => {
              return context;
            },
            onDone: {
              target: "VALIDATE",
            },
            onError: {
              target: "ERROR",
            },
            src: "actor_merge_result",
          },
        },
        VALIDATE: {
          invoke: {
            id: "validate_result",
            input: ({ context}) => {
              return context;
            },
            onDone: {
              target: "DONE",
            },
            onError: {
              target: "ERROR",
            },
            src: "actor_validate_result",
          },
        },
        ERROR: {
          entry: {
            type: "escalate_result_validate_error",
          },
        },
        DONE: {
          type: "final",
          entry: {
            type: "assign_result_data",
          },
        },
      },
    },
    DONE: {
      type: "final",
    },
  },
});