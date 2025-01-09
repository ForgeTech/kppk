import { Actor, ActorRefFrom, EventFromLogic, SnapshotFrom, createMachine, fromEventObservable, fromObservable, setup } from "xstate";
import { AuthCookieFgAuthLocal } from "../fg-auth-local/fg-auth-local.machine.types";
import { REACT_INIT_OUTPUT_DATA } from "../react-init/react-init.types";
import { of } from "rxjs";
import { REACT_VIEW_HOME_MACHINE_V1 } from "../react-view-home/react-view-home.machine";
import { REACT_VIEW_CALCULATION_MACHINE_V4, react_view_calculation_v1_context_parser, ReactViewCalculationV1Context } from "../react-view-calculation/react-view-calculation.machine";

import { REACT_ADMIN_TOOLBOX_V1, ReactAdminToolbarV1Context } from "../react-admin-toolbar/react-admin-toolbar.machine";
import { AppConfigInterface } from "../../interface/app.config.interface";
import { FgEnvironmentConfigInterface } from "@fg-kppk/fg-base";
import { REACT_VIEW_CALCULATION_CONTEXT } from "../../types/kppk-react-calculation.types";

export type ReactAppRunningV2Snapshot = SnapshotFrom<typeof FG_REACT_RUNNING_V2>;
export type ReactAppRunningV2Event = EventFromLogic<typeof FG_REACT_RUNNING_V2>;
export type ReactAppRunningV2Ref = ActorRefFrom<typeof FG_REACT_RUNNING_V2>;
export type ReactAppRunningV2Machine = typeof FG_REACT_RUNNING_V2;
export type ReactAppRunningV2Actor = Actor<typeof FG_REACT_RUNNING_V2>;

export type ReactAppRunningV2Context = {
  environment: FgEnvironmentConfigInterface<AppConfigInterface> | undefined,
  auth_cookie: AuthCookieFgAuthLocal | undefined;
  init_output: REACT_INIT_OUTPUT_DATA | undefined;
  // debug_calculation_v1: REACT_INIT_LOAD_FROM_REMOTE_DEBUG_CALCULATION_V1 | undefined,
  calculation: REACT_VIEW_CALCULATION_CONTEXT | undefined,
  current_url: undefined | string;
  target_url: undefined | string;
};


export const react_running_machine_context = ({ input }: { input: Partial<ReactAppRunningV2Context>}) => {
  // console.log('>>>>>>>>>>>>>>>>>>>REACT_VIEW_CALCULATION_INPUT>>>>>>>>>>>>>>>>')
  const context: ReactAppRunningV2Context = {
    auth_cookie: undefined,
    init_output: undefined,
    // debug_calculation_v1: undefined,
    calculation: undefined,
    environment: undefined,
    current_url: undefined,
    target_url: undefined,
  }
  const result = Object.assign( context, input);
  return result;
}

export const react_view_calculation_input = ({ context, event }: { context: ReactAppRunningV2Context, event: any}) => {
  // console.log('>>>>>>>>>>>>>>>>>>>react_view_calculation_input>>>>>>>>>>>>>>>>');
  const input = {
    calculation_defaults: event.payload || event.output,
    calculation: event.payload || event.output,
    data: context.init_output?.data
  };
  return  react_view_calculation_v1_context_parser.partial().parse(input);
}

export const react_view_home_input = ({ context, event }: { context: ReactAppRunningV2Context, event: any}) => {
  // console.log('>>>>>>>>>>>>>>>>>>>react_view_home_input>>>>>>>>>>>>>>>>');
  // console.log( context )
  // console.log( event )
  return { context, event }
}

export const react_admin_toolbar_input = ({ context, event }: { context: ReactAppRunningV2Context, event: any}) => {
  // console.log('>>>>>>>>>>>>>>>>>>>react_admin_toolbar_input>>>>>>>>>>>>>>>>');
  const input: Partial<ReactAdminToolbarV1Context> = {
    auth_cookie: undefined,
    environment: context.environment
  }
  return input as any;
}

export const FG_REACT_RUNNING_V2 = setup({
  types: {
    input: {} as Partial<ReactAppRunningV2Context>,
    context: {} as ReactAppRunningV2Context,
    events: {} as
      | { type: "fg.navigation.event.end" }
      | { type: "fg.navigation.event.start" }
      | { type: "fg.auth.local.emitted.authorized" }
      | { type: "fg.auth.local.emitted.unauthorized" }
      | { type: "react.running.navigation.internal.end" }
      | { type: "react.running.event.calculation.cancel" }
      | { type: "react.running.event.calculation.start", payload: REACT_VIEW_CALCULATION_CONTEXT},
  },
  actions: {
    assign_react_running_input: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_target_url_home: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_calculation_set: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_target_url_calculation: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_target_url_login: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_target_url_imprint: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_target_url_data_protection: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_target_url_demo: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_auth_cookie_set: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_auth_cookie_unset: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_calculation_unset: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_navigation_current_url: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    raise_navigation_internal_end: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    send_to_spinner_hide_event: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    send_to_spinner_show_event: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    send_to_admin_toolbar: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
  },
  actors: {
    actor_react_view_home: REACT_VIEW_HOME_MACHINE_V1,
    actor_react_view_calculation: REACT_VIEW_CALCULATION_MACHINE_V4,
    actor_navigation: fromEventObservable( ()=>of('test' as any)),
    actor_admin_toolbar: REACT_ADMIN_TOOLBOX_V1
  },
  guards: {
    guard_current_url_is_imprint: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    guard_current_url_is_data_protection: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    guard_current_url_is_demo: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    guard_is_authorized: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    guard_current_is_login: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    guard_is_unauthorized: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
    guard_has_calculation: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
}).createMachine({
  context: react_running_machine_context,
  id: "REACT_RUNNING_V4",
  type: "parallel",
  entry: {
    type: "assign_react_running_input",
  },
  states: {
    SCREEN: {
      initial: "PENDING",
      on: {
        "fg.auth.local.emitted.authorized": {
          target: "#REACT_RUNNING_V4.SCREEN.PENDING",
          actions: {
            type: "assign_auth_cookie_set",
          },
          guard: {
            type: "guard_is_unauthorized",
          },
        },
        "fg.auth.local.emitted.unauthorized": {
          target: "#REACT_RUNNING_V4.SCREEN.PENDING",
          actions: [
            {
              type: "assign_auth_cookie_unset",
            },
            {
              type: "assign_calculation_unset",
            },
          ],
          guard: {
            type: "guard_is_authorized",
          },
        },
        "react.running.event.calculation.start": {
          target: "#REACT_RUNNING_V4.SCREEN.AUTHORIZED.CALCULATION",
          actions: {
            type: "assign_calculation_set",
          },
        },
      },
      states: {
        PENDING: {
          always: [
            {
              target: "#REACT_RUNNING_V4.SCREEN.UNAUTHORIZED.IMPRINT",
              guard: {
                type: "guard_current_url_is_imprint",
              },
            },
            {
              target: "#REACT_RUNNING_V4.SCREEN.UNAUTHORIZED.DATA_PROTECTION",
              guard: {
                type: "guard_current_url_is_data_protection",
              },
            },
            {
              target: "#REACT_RUNNING_V4.SCREEN.UNAUTHORIZED.DEMO",
              guard: {
                type: "guard_current_url_is_demo",
              },
            },
            {
              target: "#REACT_RUNNING_V4.SCREEN.AUTHORIZED.CALCULATION",
              guard: {
                type: "guard_has_calculation",
              },
            },
            {
              target: "AUTHORIZED",
              guard: {
                type: "guard_is_authorized",
              },
            },
            {
              target: "#REACT_RUNNING_V4.SCREEN.UNAUTHORIZED.LOGIN",
              guard: {
                type: "guard_current_is_login",
              },
            },
          ],
        },
        AUTHORIZED: {
          initial: "HOME",
          states: {
            HOME: {
              on: {
                "react.running.navigation.internal.end": {
                  target: "#REACT_RUNNING_V4.SCREEN.PENDING",
                },
              },
              entry: {
                type: "assign_target_url_home",
              },
              invoke: {
                systemId: "react_view_home",
                id: "react_view_home",
                input: react_view_home_input,
                onDone: {
                  target: "CALCULATION",
                  actions: {
                    type: "assign_calculation_set",
                  },
                },
                src: "actor_react_view_home",
              },
            },
            CALCULATION: {
              entry: {
                type: 'assign_target_url_calculation'
              },
              on: {
                "react.running.event.calculation.cancel": {
                  target: "HOME",
                  actions: {
                    type: "assign_calculation_unset",
                  },
                },
              },
              invoke: {
                systemId: "react_view_calculation",
                id: "react_view_calculation",
                input: react_view_calculation_input,
                src: "actor_react_view_calculation",
              },
            },
          },
        },
        UNAUTHORIZED: {
          initial: "LOGIN",
          on: {
            "react.running.navigation.internal.end": {
              target: "PENDING",
            },
          },
          states: {
            LOGIN: {
              entry: {
                type: "assign_target_url_login",
              },
            },
            IMPRINT: {
              entry: {
                type: "assign_target_url_imprint",
              },
            },
            DATA_PROTECTION: {
              entry: {
                type: "assign_target_url_data_protection",
              },
            },
            DEMO: {
              entry: {
                type: "assign_target_url_demo",
              },
            },
          },
        },
      },
    },
    NAVIGATION: {
      on: {
        "fg.navigation.event.end": {
          actions: [
            {
              type: "assign_navigation_current_url",
            },
            {
              type: "raise_navigation_internal_end",
            },
            {
              type: "send_to_spinner_hide_event",
            },
          ],
        },
        "fg.navigation.event.start": {
          actions: [
            {
              type: "send_to_spinner_show_event",
            },
            // {
            //   type: "assign_navigation_current_url",
            // },
            // {
            //   type: "raise_navigation_internal_end",
            // },
          ],
        },
      },
      invoke: {
        systemId: "react_running_navigation",
        id: "react_running_navigation",
        input: {} as never,
        src: "actor_navigation",
      },
    },
    ADMIN_TOOLBAR: {
      invoke: {
        systemId: "react_running_admin_toolbar",
        id: "react_running_admin_toolbar",
        input: react_admin_toolbar_input,
        src: "actor_admin_toolbar",
      },
      on: {
        'fg.auth.local.emitted.*': {
          actions: [
            {
              type: "send_to_admin_toolbar"
            }
          ]
        }
      }
    },
  },
});