import { Injectable, inject } from '@angular/core';
// import { ReactAdminToolbarV1Context } from "./react-admin-toolbar.machine";
import { FgXstateService } from '../../service';
import { ReactAdminToolbarMachineMethodeService } from './react-admin-toolbar.machine.methode.service';
import {
  REACT_ADMIN_TOOLBAR_CONTEXT,
  react_admin_toolbar_context_parser,
} from './react-admin-toolbar.machine.types';
import { FgBaseService } from '@kppk/fg-lib-new';
import { parent_context_event_input } from '../machine.utils';

@Injectable({
  providedIn: 'root',
})
export class ReactAdminToolbarService extends FgBaseService {
  protected $methode = inject(ReactAdminToolbarMachineMethodeService);
  protected $xstate = inject(FgXstateService);

  // protected assign_context_from_system = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
  //   const result = this.$immer.produce( context, draft => {
  public get_machine(context?: Partial<REACT_ADMIN_TOOLBAR_CONTEXT>) {
    return this.$xstate.setup({
      types: {
        context: {} as REACT_ADMIN_TOOLBAR_CONTEXT,
        events: {} as
          | { type: "fg.auth.local.event.logout" }
          | { type: "react.admin_toolbox.event.stopped" }
          | { type: "react.admin_toolbox.event.x_state.toggle" }
          | { type: "react.admin_toolbox.event.test_calculation.toggle" }
          | { type: "react.admin_toolbox.event.refresh" },
      },
      actions: {
        assign_admin_data: this.$xstate.assign(this.$methode.assign_admin_data)
      },
      actors: {
        actor_load_admin_data: this.$xstate.fromPromise(this.$methode.actor_load_admin_data),
      },
    }).createMachine({
      context: react_admin_toolbar_context_parser.parse( context ?? {}),
      id: "REACT_ADMIN_TOOLBOX_V3",
      initial: "IDEL",
      on: {
        "react.admin_toolbox.event.stopped": {
          target: "#REACT_ADMIN_TOOLBOX_V3.STOPPED",
        },
      },
      states: {
        IDEL: {
          always: {
            target: "LOADING",
          },
        },
        LOADING: {
          invoke: {
            id: 'load_from_local',
            input: parent_context_event_input,
            onDone: {
              target: "RUNNING",
              actions: {
                type: "assign_admin_data",
              },
            },
            onError: {
              target: "ERROR",
            },
            src: "actor_load_admin_data",
          },
        },
        RUNNING: {
          type: "parallel",
          initial: "TEST_CALCULATION",
          states: {
            TEST_CALCULATION: {
              initial: "OFF",
              states: {
                OFF: {
                  on: {
                    "react.admin_toolbox.event.test_calculation.toggle": {
                      target: "ON",
                    },
                  },
                },
                ON: {
                  on: {
                    "react.admin_toolbox.event.test_calculation.toggle": {
                      target: "OFF",
                    },
                    "fg.auth.local.event.logout": {
                      target: "OFF",
                    },
                  },
                },
              },
            },
            X_STATE: {
              initial: "OFF",
              states: {
                OFF: {
                  on: {
                    "react.admin_toolbox.event.x_state.toggle": {
                      target: "ON",
                    },
                  },
                },
                ON: {
                  on: {
                    "react.admin_toolbox.event.x_state.toggle": {
                      target: "OFF",
                    },
                  },
                },
              },
            },
            AUTHORIZATION: {
              initial: "OFF",
              states: {
                OFF: {
                  on: {
                    "react.admin_toolbox.event.test_calculation.toggle": {
                      target: "ON",
                    },
                  },
                },
                ON: {
                  on: {
                    "react.admin_toolbox.event.test_calculation.toggle": {
                      target: "OFF",
                    },
                    "fg.auth.local.event.logout": {
                      target: "OFF",
                    },
                  },
                },
              },
            },
          },
        },
        ERROR: {
          on: {
            "react.admin_toolbox.event.refresh": {
              target: "IDEL",
            },
          },
        },
        STOPPED: {
          type: "final",
        },
      },
    });
  }
}
