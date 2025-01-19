import { inject, Injectable } from '@angular/core';
import { FgBaseService } from '../../../../../../../../libs/fg-lib-new/src';
import { assign, fromPromise, setup } from 'xstate';
import { ReactInitMethodeService  } from './react-init.machine.methode.service';
import { CONTEXT_REACT_INIT } from './react-init.machine.types';

@Injectable({
  providedIn: 'root',
})
export class ReactInitService extends FgBaseService {
  protected $methode = inject(ReactInitMethodeService);

   public get_machine( context?: CONTEXT_REACT_INIT ) {
    return setup({
      types: {
        input: {} as Partial<CONTEXT_REACT_INIT>,
        output: {} as CONTEXT_REACT_INIT,
        context: {} as CONTEXT_REACT_INIT,
      },
      actions: {
        assign_react_init_input: assign( this.$methode.assign_react_init_input ),
        assign_load_from_local_result: assign( this.$methode.assign_load_from_local_result ),
        assign_load_from_remote_result: assign( this.$methode.assign_load_from_remote_result ),
        assign_load_from_url_from_route_result: assign( this.$methode.assign_load_from_url_from_route_result ),
        assign_load_url_from_params_result: assign( this.$methode.assign_load_url_from_params_result ),
        assign_result_data: assign( this.$methode.assign_result_data ),
      },
      actors: {
        actor_load_from_local: fromPromise( this.$methode.actor_load_from_local ),
        actor_validate_load_from_local: fromPromise( this.$methode.actor_validate_load_from_local ),
        actor_load_from_remote: fromPromise( this.$methode.actor_load_from_remote ),
        actor_validate_load_from_remote: fromPromise( this.$methode.actor_validate_load_from_remote ),
        actor_merge_result: fromPromise( this.$methode.actor_merge_result ),
        actor_validate_result: fromPromise( this.$methode.actor_validate_result ),
      },
    }).createMachine({
      context: this.$methode.react_init_input_context,
      id: "REACT_INIT_V2",
      entry: {
        type: 'assign_react_init_input'
      },
      output: ({ context }: { context: CONTEXT_REACT_INIT }) => {
        console.log('FIND OUT WHY NOT PARSING ANYMORE')
        // try {
        //   // result = react_init_output_parser.parse(context?.output);
        // } catch( error ) {
        //   console.log( error );
        // }
        return context;
      },
      initial: "LOAD",
      states: {
        LOAD: {
          type: "parallel",
          onDone: {
            target: "RESULTS",
          },
          states: {
            FROM_LOCAL: {
              initial: "PENDING",
              states: {
                PENDING: {
                  invoke: {
                    id: "load_from_local",
                    input: ({ event, context}) => {
                      console.log('>>>>>>>>>>>>>>LOAD_FROM_LOCAL>>>>>>>>>>>>>>>>>>>');
                      console.log( event );
                      console.log( context )
                      return {} as never;
                    },
                    onDone: {
                      target: "VALIDATE",
                    },
                    onError: {
                      target: "ERROR",
                    },
                    src: "actor_load_from_local",
                  },
                },
                VALIDATE: {
                  invoke: {
                    id: "validate_load_from_local",
                    input: ({ event, context}) => {
                      console.log('>>>>>>>>>>>>>>VALIDATE_LOAD_FROM_LOCAL>>>>>>>>>>>>>>>>>>>');
                      console.log( event );
                      console.log( context )
                      return event['output'] as never;
                    },
                    onDone: {
                      target: "DONE",
                    },
                    onError: {
                      target: "ERROR",
                    },
                    src: "actor_validate_load_from_local",
                  },
                },
                ERROR: {
                  entry: {
                    type: "escalate_load_from_local_error",
                  },
                },
                DONE: {
                  type: "final",
                  entry: {
                    type: "assign_load_from_local_result",
                  },
                },
              },
            },
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

   }


}
