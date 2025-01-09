import { Actor, ActorRefFrom, EventFromLogic, SnapshotFrom, setup } from "xstate";
import { AuthCookieFgAuthLocal } from "../fg-auth-local/fg-auth-local.machine.types";
import { CONFIG_ENVIRONMENT } from "../react-main/react-mainv2.service";

export type ReactAdminToolbarV1Snapshot = SnapshotFrom<typeof REACT_ADMIN_TOOLBOX_V1>;
export type ReactAdminToolbarV1Event = EventFromLogic<typeof REACT_ADMIN_TOOLBOX_V1>;
export type ReactAdminToolbarV1Ref = ActorRefFrom<typeof REACT_ADMIN_TOOLBOX_V1>;
export type ReactAdminToolbarV1Machine = typeof REACT_ADMIN_TOOLBOX_V1;
export type ReactAdminToolbarV1Actor = Actor<typeof REACT_ADMIN_TOOLBOX_V1>;

export type ReactAdminToolbarV1Context = {
  auth_cookie: AuthCookieFgAuthLocal | undefined,
  environment: CONFIG_ENVIRONMENT | undefined
};

export const react_admin_toolbar_machine_context = ({ input }: { input: any}) => {
  // console.log('>>>>>>>>>>>>>>>>>>>REACT_VIEW_CALCULATION_INPUT>>>>>>>>>>>>>>>>')
  const context: ReactAdminToolbarV1Context = {
    auth_cookie: undefined,
    environment: undefined
  }
  const result = Object.assign( context, input );
  return result as ReactAdminToolbarV1Context;
}

export const REACT_ADMIN_TOOLBOX_V1 = setup({
    types: {
      context: {} as ReactAdminToolbarV1Context,
      events: {} as
        | { type: "fg.auth.local.emitted.*" }
        | { type: "react.admin_toolbox.internal.update" }
        | { type: "react.admin_toolbox.event.x_state.toggle" }
        | { type: "react.admin_toolbox.event.test_calculation.toggle" }
        | { type: "react.admin_toolbox.event.authorization.user.selected" }
        | { type: "react.admin_toolbox.event.authorization.user.unselect" },
    },
    actions: {
      assign_context_from_system: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
      assign_context_from_input: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
      assign_update_context_from_main_auth_actor: function (
        { context, event },
        params,
      ) {
        // Add your action code here
        // ...
      },
      raise_internal_update: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
      send_fg_auth_local_authorized_with_env_credentials: function (
        { context, event },
        params,
      ) {
        // Add your action code here
        // ...
      },
      send_fg_auth_local_login_with_user_credentials: function (
        { context, event },
        params,
      ) {
        // Add your action code here
        // ...
      },
      send_fg_auth_local_logout: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
    },
    guards: {
      guard_env_is_dev_enabled: function ({ context, event }) {
        // Add your guard condition here
        return true;
      },
      guard_user_is_admin: function ({ context, event }) {
        // Add your guard condition here
        return true;
      },
    },
  }).createMachine({
    context: react_admin_toolbar_machine_context,
    id: "REACT_ADMIN_TOOLBOX_V2",
    type: "parallel",
    // entry: [
    //   {
    //     type: "assign_context_from_system",
    //   },
    //   {
    //     type: "assign_context_from_input",
    //   },
    // ],
    states: {
      DISPLAY: {
        initial: "HIDDEN",
        states: {
          HIDDEN: {
            on: {
              "react.admin_toolbox.internal.update": {
                target: "SHOW",
                guard: {
                  type: "guard_user_is_admin",
                },
              },
            },
            always: {
              target: "SHOW",
              guard: {
                type: "guard_env_is_dev_enabled",
              },
            },
          },
          SHOW: {},
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
            // always: {
            //   target: "ON",
            //   guard: {
            //     type: "guard_env_is_dev_enabled",
            //   },
            // },
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
      TRIGGERS: {
        initial: "RECEIVING",
        states: {
          RECEIVING: {
            on: {
              "fg.auth.local.emitted.*": {
                actions: [
                  {
                    type: "assign_update_context_from_main_auth_actor",
                  },
                  {
                    type: "raise_internal_update",
                  },
                ],
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
            },
            always: {
              target: "ON",
              guard: {
                type: "guard_env_is_dev_enabled",
              },
            },
          },
          ON: {
            on: {
              "react.admin_toolbox.event.test_calculation.toggle": {
                target: "OFF",
              },
              "fg.auth.local.emitted.unauthorized": {
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
              "react.admin_toolbox.event.authorization.user.selected": {
                target: "ON",
                actions: {
                  type: "send_fg_auth_local_login_with_user_credentials",
                },
              },
            },
            // always: {
            //   target: "ON",
            //   actions: {
            //     type: "send_fg_auth_local_authorized_with_env_credentials",
            //   },
            //   guard: {
            //     type: "guard_env_is_dev_enabled",
            //   },
            // },
          },
          ON: {
            on: {
              "react.admin_toolbox.event.authorization.user.unselect": {
                target: "OFF",
                actions: {
                  type: "send_fg_auth_local_logout",
                },
              },
            },
          },
        },
      },
    },
  });