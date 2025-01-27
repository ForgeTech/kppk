import { Injectable, inject } from '@angular/core';
// import { ReactAdminToolbarV1Context } from "./react-admin-toolbar.machine";
import { FgXstateService } from '../../service';
import { ReactAdminToolbarMachineMethodeService } from './react-admin-toolbar.machine.methode.service';
import {
  REACT_ADMIN_TOOLBAR_CONTEXT,
  react_admin_toolbar_context_parser,
} from './react-admin-toolbar.machine.types';
import { FgBaseService } from '@kppk/fg-lib-new';

@Injectable({
  providedIn: 'root',
})
export class ReactAdminToolbarService extends FgBaseService {
  protected $methode = inject(ReactAdminToolbarMachineMethodeService);
  protected $xstate = inject(FgXstateService);

  // protected assign_context_from_system = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
  //   const result = this.$immer.produce( context, draft => {
  public get_machine(context?: any) {
    return this.$xstate
      .setup({
        types: {
          context: {} as REACT_ADMIN_TOOLBAR_CONTEXT,
          events: {} as
            | { type: 'fg.auth.local.emitted.*' }
            | { type: 'react.admin_toolbox.internal.update' }
            | { type: 'react.admin_toolbox.event.x_state.toggle' }
            | { type: 'react.admin_toolbox.event.test_calculation.toggle' }
            | { type: 'react.admin_toolbox.event.authorization.user.selected' }
            | { type: 'react.admin_toolbox.event.authorization.user.unselect' },
        },
        actions: {
          // assign_context_from_system: this.$xstate.assign( this.$methode.assign_context_from_system ),
          // assign_context_from_input: this.$xstate.assign( this.$methode.assign_context_from_input ),
          assign_update_context_from_main_auth_actor: this.$xstate.assign(
            this.$methode.assign_update_context_from_main_auth_actor
          ),
          raise_internal_update: this.$xstate.raise(
            this.$methode.raise_internal_update
          ),
        },
        guards: {
          guard_env_is_dev_enabled: this.$methode.guard_env_is_dev_enabled,
          guard_user_is_admin: this.$methode.guard_user_is_admin,
        },
      })
      .createMachine({
        context: react_admin_toolbar_context_parser.parse(context ?? {}),
        id: 'REACT_ADMIN_TOOLBOX_V2',
        type: 'parallel',
        states: {
          DISPLAY: {
            initial: 'HIDDEN',
            states: {
              HIDDEN: {
                on: {
                  'react.admin_toolbox.internal.update': {
                    target: 'SHOW',
                    guard: {
                      type: 'guard_user_is_admin',
                    },
                  },
                },
                always: {
                  target: 'SHOW',
                  guard: {
                    type: 'guard_env_is_dev_enabled',
                  },
                },
              },
              SHOW: {},
            },
          },
          X_STATE: {
            initial: 'OFF',
            states: {
              OFF: {
                on: {
                  'react.admin_toolbox.event.x_state.toggle': {
                    target: 'ON',
                  },
                },
                // always: {
                //   target: "ON",
                //   guard: {
                //     type: "guard_env_is_dev_enabled",
                //   },
                // },
              },
              ON: {
                on: {
                  'react.admin_toolbox.event.x_state.toggle': {
                    target: 'OFF',
                  },
                },
              },
            },
          },
          TRIGGERS: {
            initial: 'RECEIVING',
            states: {
              RECEIVING: {
                on: {
                  'fg.auth.local.emitted.*': {
                    actions: [
                      {
                        type: 'assign_update_context_from_main_auth_actor',
                      },
                      {
                        type: 'raise_internal_update',
                      },
                    ],
                  },
                },
              },
            },
          },
          TEST_CALCULATION: {
            initial: 'OFF',
            states: {
              OFF: {
                on: {
                  'react.admin_toolbox.event.test_calculation.toggle': {
                    target: 'ON',
                  },
                },
                always: {
                  target: 'ON',
                  guard: {
                    type: 'guard_env_is_dev_enabled',
                  },
                },
              },
              ON: {
                on: {
                  'react.admin_toolbox.event.test_calculation.toggle': {
                    target: 'OFF',
                  },
                },
              },
            },
          },
          // AUTHORIZATION: {
          //   initial: "OFF",
          //   states: {
          //     OFF: {
          //       on: {
          //         "react.admin_toolbox.event.authorization.user.selected": {
          //           target: "ON",
          //           actions: {
          //             type: "send_fg_auth_local_login_with_user_credentials",
          //           },
          //         },
          //       },
          //       always: {
          //         target: "ON",
          //         actions: {
          //           type: "send_fg_auth_local_authorized_with_env_credentials",
          //         },
          //         guard: {
          //           type: "guard_env_is_dev_enabled",
          //         },
          //       },
          //     },
          //     ON: {
          //       on: {
          //         "react.admin_toolbox.event.authorization.user.unselect": {
          //           target: "OFF",
          //           actions: {
          //             type: "send_fg_auth_local_logout",
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
        },
      });
  }
}
