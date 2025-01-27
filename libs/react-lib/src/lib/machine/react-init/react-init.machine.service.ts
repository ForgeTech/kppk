import { inject, Injectable } from '@angular/core';
import { ReactInitMachineMethodeService } from './react-init.machine.methode.service';
import { FgXstateService } from '../../service';
import { parent_context_event_input } from '../machine.utils';
import { FgBaseService } from '@kppk/fg-lib-new';
import { REACT_INIT_CONTEXT } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ReactInitMachineService extends FgBaseService {
  protected $methode = inject(ReactInitMachineMethodeService);
  protected $xstate = inject(FgXstateService);

  public get_machine(context?: REACT_INIT_CONTEXT) {
    return this.$xstate
      .setup({
        types: {
          input: {} as Partial<REACT_INIT_CONTEXT>,
          output: {} as REACT_INIT_CONTEXT,
          context: {} as REACT_INIT_CONTEXT,
        },
        actions: {
          assign_load_from_local_result: this.$xstate.assign(
            this.$methode.assign_load_from_local_result
          ),
          assign_load_from_remote_result: this.$xstate.assign(
            this.$methode.assign_load_from_remote_result
          ),
          assign_load_from_url_from_route_result: this.$xstate.assign(
            this.$methode.assign_load_from_url_from_route_result
          ),
          assign_load_url_from_params_result: this.$xstate.assign(
            this.$methode.assign_load_url_from_params_result
          ),
          assign_react_init_input: this.$xstate.assign(
            this.$methode.assign_react_init_input
          ),
          assign_result_data: this.$xstate.assign(
            this.$methode.assign_result_data
          ),
          escalate_load_from_local_error:
            this.$methode.escalate_load_from_local_error,
          escalate_load_from_remote_error:
            this.$methode.escalate_load_from_remote_error,
          escalate_result_validate_error:
            this.$methode.escalate_result_validate_error,
        },
        actors: {
          actor_load_from_local: this.$xstate.fromPromise(
            this.$methode.actor_load_from_local
          ),
          actor_load_from_remote: this.$xstate.fromPromise(
            this.$methode.actor_load_from_remote
          ),
          actor_merge_result: this.$xstate.fromPromise(
            this.$methode.actor_merge_result
          ),
          actor_validate_load_from_local: this.$xstate.fromPromise(
            this.$methode.actor_validate_load_from_local
          ),
          actor_validate_load_from_remote: this.$xstate.fromPromise(
            this.$methode.actor_validate_load_from_remote
          ),
          actor_validate_result: this.$xstate.fromPromise(
            this.$methode.actor_validate_result
          ),
        },
      })
      .createMachine({
        // context: this.$methode.react_init_input_context,
        id: 'REACT_INIT_V2',
        entry: {
          type: 'assign_react_init_input',
        },
        output: ({ context }: { context: REACT_INIT_CONTEXT }) => {
          console.log('FIND OUT WHY NOT PARSING ANYMORE');
          // try {
          //   // result = react_init_output_parser.parse(context?.output);
          // } catch( error ) {
          //   console.log( error );
          // }
          return context;
        },
        initial: 'LOAD',
        states: {
          LOAD: {
            type: 'parallel',
            onDone: {
              target: 'RESULTS',
            },
            states: {
              FROM_LOCAL: {
                initial: 'PENDING',
                states: {
                  PENDING: {
                    invoke: {
                      id: 'load_from_local',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'VALIDATE',
                      },
                      onError: {
                        target: 'ERROR',
                      },
                      src: 'actor_load_from_local',
                    },
                  },
                  VALIDATE: {
                    invoke: {
                      id: 'validate_load_from_local',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'DONE',
                      },
                      onError: {
                        target: 'ERROR',
                      },
                      src: 'actor_validate_load_from_local',
                    },
                  },
                  ERROR: {
                    entry: {
                      type: 'escalate_load_from_local_error',
                    },
                  },
                  DONE: {
                    type: 'final',
                    entry: {
                      type: 'assign_load_from_local_result',
                    },
                  },
                },
              },
              FROM_REMOTE: {
                initial: 'PENDING',
                states: {
                  PENDING: {
                    invoke: {
                      id: 'load_from_remote',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'VALIDATE',
                      },
                      onError: {
                        target: 'ERROR',
                      },
                      src: 'actor_load_from_remote',
                    },
                  },
                  VALIDATE: {
                    invoke: {
                      id: 'validate_load_from_remote',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'DONE',
                      },
                      onError: {
                        target: 'ERROR',
                      },
                      src: 'actor_validate_load_from_remote',
                    },
                  },
                  ERROR: {
                    entry: {
                      type: 'escalate_load_from_remote_error',
                    },
                  },
                  DONE: {
                    type: 'final',
                    entry: {
                      type: 'assign_load_from_remote_result',
                    },
                  },
                },
              },
            },
          },
          RESULTS: {
            initial: 'MERGE',
            onDone: {
              target: 'DONE',
            },
            states: {
              MERGE: {
                invoke: {
                  id: 'merge_result',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'VALIDATE',
                  },
                  onError: {
                    target: 'ERROR',
                  },
                  src: 'actor_merge_result',
                },
              },
              VALIDATE: {
                invoke: {
                  id: 'validate_result',
                  input: parent_context_event_input,
                  onDone: {
                    target: 'DONE',
                  },
                  onError: {
                    target: 'ERROR',
                  },
                  src: 'actor_validate_result',
                },
              },
              ERROR: {
                entry: {
                  type: 'escalate_result_validate_error',
                },
              },
              DONE: {
                type: 'final',
                entry: {
                  type: 'assign_result_data',
                },
              },
            },
          },
          DONE: {
            type: 'final',
          },
        },
      });
  }
}
