import { Injectable, inject } from '@angular/core';
// import { ReactAdminToolbarV1Context } from "./react-admin-toolbar.machine";
import { FgXstateService } from '../../service';
import { ReactAdminToolbarMachineMethodeService } from './react-admin-toolbar.machine.methode.service';
import {
  REACT_ADMIN_TOOLBAR_CONTEXT,
  react_admin_toolbar_context_parser,
  REACT_ADMIN_TOOLBAR_EVENT_AUTH_TOGGLE,
  REACT_ADMIN_TOOLBAR_EVENT_REFRESH,
  REACT_ADMIN_TOOLBAR_EVENT_STOPPED,
  REACT_ADMIN_TOOLBAR_EVENT_TEST_CALCULATION_TOGGLE,
  REACT_ADMIN_TOOLBAR_EVENT_X_STATE_TOGGLE,
} from './react-admin-toolbar.machine.types';
import { FgBaseService } from '@kppk/fg-lib-new';
import { parent_context_event_input } from '../machine.utils';
import { FG_AUTH_EMITTED_AUTHORIZED, FG_AUTH_EMITTED_UNAUTHORIZED } from '../fg-auth-local';

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
          | FG_AUTH_EMITTED_AUTHORIZED
          | FG_AUTH_EMITTED_UNAUTHORIZED
          | REACT_ADMIN_TOOLBAR_EVENT_STOPPED
          | REACT_ADMIN_TOOLBAR_EVENT_X_STATE_TOGGLE
          | REACT_ADMIN_TOOLBAR_EVENT_AUTH_TOGGLE
          | REACT_ADMIN_TOOLBAR_EVENT_TEST_CALCULATION_TOGGLE
          | REACT_ADMIN_TOOLBAR_EVENT_REFRESH
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
            AUTHORIZATION: {
              initial: "OFF",
              states: {
                OFF: {
                  on: {
                    "react.admin_toolbox.event.auth.toggle": {
                      target: "ON",
                    },
                    "fg.auth.emitted.authorized": {
                      target: "ON",
                    },
                  },
                },
                ON: {
                  on: {
                    "react.admin_toolbox.event.auth.toggle": {
                      target: "OFF",
                    },
                    "fg.auth.emitted.unauthorized": {
                      target: "OFF",
                    },
                  },
                },
              },
            },
            TEST_CALCULATION: {
              initial: "OFF",
              states: {
                OFF: {
                  on: {
                    "react.admin_toolbox.event.test_calculation.toggle": {
                      target: "ON",
                    },
                    "fg.auth.emitted.authorized": {
                      target: "ON",
                    },
                  },
                },
                ON: {
                  on: {
                    "react.admin_toolbox.event.test_calculation.toggle": {
                      target: "OFF",
                    },
                    "fg.auth.emitted.unauthorized": {
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
