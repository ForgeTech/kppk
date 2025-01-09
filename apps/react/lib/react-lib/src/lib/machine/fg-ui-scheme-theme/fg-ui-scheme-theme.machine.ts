import { createMachine, setup } from "xstate";

export const FG_UI_SCHEME_THEME_V1 = setup({
  types: {
    context: {} as {
      // id: string;
      // color_scheme: string;
      // use_os_theme: boolean;
      // os_auto_theme: boolean;
      // os_auto_scheme: boolean;
      // selected_theme: string;
      // available_theme: string;
      // selected_scheme: string;
      // available_themes: unknown[];
      // available_schemes: string;
      // selected_color_scheme: string;
    },
    events: {} as
      | { type: "event_set_sheme"; scheme_to_set: string }
      | {
          type: "event_set_theme";
          theme_to_set: string;
          containing_sheme: string;
        }
      | { type: "fg.ui.scheme_theme.event.stop" }
      | { type: "fg.ui.sheme_theme.event.toggle" }
      | { type: "fg.ui.sheme_theme.event.set_sheme" }
      | { type: "fg.ui.scheme_theme.event.set_theme" }
      | { type: "fg.ui.scheme_theme.event.toggle_theme" }
      | { type: "fg.ui.scheme_theme.event.detect_os_scheme" }
      | { type: "fg.ui.scheme_theme.event.enable_os_autodetection" }
      | { type: "fg.ui.scheme_theme.event.disable_os_autodetection" },
  },
  actions: {
    action_reset_service_detect_os_scheme_preference_error: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    assign_os_scheme: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_detect_os_scheme_preference_error: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    action_set_os_scheme_autodetection_to_true: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    action_dispatch_event_detect_os_scheme: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    action_set_os_scheme_autodetection_to_false: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    assign_toggle_theme: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_disable_os_auto_scheme: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    action_theme: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_scheme: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_toggle_scheme: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
  },
  actors: {
    service_detect_os_scheme: createMachine({
      /* ... */
    }),
  },
  guards: {
    guard_os_scheme_autodetection_is_true: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
  schemas: {
    events: {
      event_set_sheme: {
        type: "object",
        properties: {
          scheme_to_set: {
            type: "string",
          },
        },
      },
      event_set_theme: {
        type: "object",
        properties: {
          theme_to_set: {
            type: "string",
          },
          containing_sheme: {
            type: "string",
          },
        },
      },
      "fg.ui.scheme_theme.event.stop": {
        type: "object",
        properties: {},
      },
      "fg.ui.sheme_theme.event.toggle": {
        type: "object",
        properties: {},
      },
      "fg.ui.sheme_theme.event.set_sheme": {
        type: "object",
        properties: {},
      },
      "fg.ui.scheme_theme.event.set_theme": {
        type: "object",
        properties: {},
      },
      "fg.ui.scheme_theme.event.toggle_theme": {
        type: "object",
        properties: {},
      },
      "fg.ui.scheme_theme.event.detect_os_scheme": {
        type: "object",
        properties: {},
      },
      "fg.ui.scheme_theme.event.enable_os_autodetection": {
        type: "object",
        properties: {},
      },
      "fg.ui.scheme_theme.event.disable_os_autodetection": {
        type: "object",
        properties: {},
      },
    },
    context: {
      id: {
        type: "string",
      },
      color_scheme: {
        type: "string",
      },
      use_os_theme: {
        type: "boolean",
        description: "",
      },
      os_auto_theme: {
        type: "boolean",
      },
      os_auto_scheme: {
        type: "boolean",
      },
      selected_theme: {
        type: "string",
      },
      available_theme: {
        type: "string",
      },
      selected_scheme: {
        type: "string",
      },
      available_themes: {
        type: "array",
        description:
          "Array of strings identifing the available themes, like 'light', 'dark'. First theme in array will be initially selected",
      },
      available_schemes: {
        type: "string",
      },
      selected_color_scheme: {
        type: "string",
      },
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDEDiB9AqgSXQZQGEAJAUQFkT0AVUi9ANQEYBiAMygDoBXASw9gDGACzABbMOgAuI8RzAA3MADtJ-SQHsADgG0ADAF1EoTetg9JPdUqMgAHogAsAJgA0IAJ6JGAdgCsujgAObwA2AGZQgE5vRl1fcIBfBLc0LFxCWkoackomDgAlTAA5Iuwi1A4AeTx8Yhz0ABESKhICKmxKorZOXn5hMQlpAblFFTklAEMAIwAbCVN0Ca4NCDBJMAELKz1DJBATMy3rPfsEX0ZfDkinBwunXSd-XUiwt08EKI4HMOjz+NvfE4nEkUhgcLVMtRIXlCiUyhVqhD6k0Wm0Ol12Nw+IIZINcSNlKoIDxYNM5ugFksVmsNkcdjYDuZLMdQKdzg4OIxnJFdH5GNdfGEHG9ECFnBwQpFAiEYoxAkK4mEQSBUuCMvVsnQYcVSuUqjV1XQUa12p0OMa2swIFYwBweEp5OoANa22BgABO8h4Agkq3WmwpsHQOIG9L2jKONlOIS5HF08bigXOQvCvhFCFijCcXyc-Kc3l0gSzYuByRVYPSdTomtyjAKOvh+qRRuaJvR5tblo97vU7o4mhmE0krF7on4Hq9PvQftpgeD-XEYeMpiZVijotjCcTyYcqfTjFiHJCISckUikockV830iytVlchNYYddhuoRBqrlAtpqKHGwDQAGRIbosT6XEpHxBRCQ4GcAwWENFwMBkV0jE5EECfMOFzb5L2CfMfn3fkQiuXQHF0Y8i28DCwhCO8K2bLJoRfBs9URQ0v07H8-0A4DbFgSQh1tCZWHWd0AApVkHdw5wQiQqXUWCjnQe1RPkCYZgASmYe8GKheptThViP0hb923-ICl32FDmXXBAYw5LdfCTRgUzCNMPEQc9LkvMIhQwjCHAcXxvDotJdKfAy3w4GsQN6WSIOGKCxg0KAoHJIZEN2ZdDhstCzm+IIs0FS9r18JzvH3QLLh+ZwZSvfwyJCssdPYvStWYwyKhizE4oXPFEtGVQ3UkBLMuQnK1zy+JiOcaUXN8+UwkCQJ91POtIizZ4fMLXRfNCtVPza2t606jh2Ni7FwIy20kqGtZg1xSyI1y1lEHiSIOGC3wXlwrkInc94wicMJOSCh5eXlMVpV8faHw1JiTqi86esugZRpuwaOBStKwCe6zJte-KQaLR4hSvILyv3fxORPaUfJowLSzLJQFLgGwWsOiLGHG1cWTsRAAFoInTAXgauQIt0l+M-Fh8KEdfeEedQwmD3TcI4w274bgooFCwcWXWq5xHGzYw7TM6JWXv5s5InTYJAhzOVrh2paDwNzn5ZY99dPN39v0tgnrdiCqPIzeNs0CMiQmCMIXPjW53cfT3TtNkzOLMniA7504s3FIjBXlWI3Iwwj5U+6OaIwk8nDFRhE-h-SOqimss9s+4AicJNvCFduT12kP3kYY9swicJAkiIKQmCl56+rZOkc-Vu8u8AfHCLCV835JaIelUtQTCw2EYaToSCXwngvTe4DyCUirylQv4yVJIEiAA */
  context: {
    // id: "",
    // os_auto_scheme: true,
    // // selected_theme: false,
    // selected_scheme: "'light'",
    // // available_themes: "{light: [], dark: [] }",
    // available_schemes: "['light', 'dark']",
  },
  id: "FG_UI_SCHEME_THEME_V1",
  initial: "RUNNING",
  on: {
    "fg.ui.scheme_theme.event.stop": {
      target: "#FG_UI_SCHEME_THEME_V1.DONE",
    },
  },
  states: {
    RUNNING: {
      type: "parallel",
      states: {
        OS_SCHEME_DETECTION: {
          initial: "DETECT",
          on: {
            "fg.ui.scheme_theme.event.enable_os_autodetection": {
              target: "OS_SCHEME_DETECTION",
              actions: [
                {
                  type: "action_set_os_scheme_autodetection_to_true",
                },
                {
                  type: "action_dispatch_event_detect_os_scheme",
                },
              ],
              reenter: true,
            },
            "fg.ui.scheme_theme.event.disable_os_autodetection": {
              target: "OS_SCHEME_DETECTION",
              actions: {
                type: "action_set_os_scheme_autodetection_to_false",
              },
              description: "Methode to disable the os scheme auto detection",
              reenter: true,
            },
          },
          states: {
            DETECT: {
              entry: {
                type: "action_reset_service_detect_os_scheme_preference_error",
              },
              invoke: {
                id: "service_detect_os_scheme",
                input: {},
                onDone: {
                  target: "IDLE",
                  actions: {
                    type: "assign_os_scheme",
                  },
                },
                onError: {
                  target: "IDLE",
                  actions: {
                    type: "assign_detect_os_scheme_preference_error",
                  },
                },
                src: "service_detect_os_scheme",
              },
              description:
                "Detecting changes to the os theme by checking @media (prefers-color-scheme: dark) and @media (prefers-color-scheme: light) and mapping the result to **event_os_theme_change** <https://caniuse.com/?search=prefers-color-scheme>",
            },
            IDLE: {
              on: {
                "fg.ui.scheme_theme.event.detect_os_scheme": {
                  target: "DETECT",
                },
              },
              after: {
                delay_os_scheme_autodetection_interval: {
                  target: "DETECT",
                  guard: {
                    type: "guard_os_scheme_autodetection_is_true",
                  },
                },
              },
            },
          },
        },
        THEME: {
          on: {
            "fg.ui.scheme_theme.event.toggle_theme": {
              target: "THEME",
              actions: [
                {
                  type: "assign_toggle_theme",
                },
                {
                  type: "assign_disable_os_auto_scheme",
                },
              ],
              description:
                "Methode to switch through all available themes for the selected color sheme starting after the currently selected - then moving on too and switching the color scheme",
              reenter: false,
            },
            "fg.ui.scheme_theme.event.set_theme": {
              target: "THEME",
              actions: [
                {
                  type: "action_theme",
                },
                {
                  type: "assign_disable_os_auto_scheme",
                },
              ],
              description: "Methode to set a theme explicitly",
              reenter: false,
            },
          },
        },
        SCHEME: {
          on: {
            "fg.ui.sheme_theme.event.set_sheme": {
              target: "SCHEME",
              actions: [
                {
                  type: "assign_scheme",
                },
                {
                  type: "assign_disable_os_auto_scheme",
                },
              ],
              description: "Methode to go to light/dark explicitly",
              reenter: false,
            },
            "fg.ui.sheme_theme.event.toggle": {
              target: "SCHEME",
              actions: [
                {
                  type: "assign_toggle_scheme",
                },
                {
                  type: "assign_disable_os_auto_scheme",
                },
              ],
              description:
                "Methode to switch between light<->dark continuously",
              reenter: false,
            },
          },
          description:
            "The scheme describes the overall color-mode preference divided up in light and dark. This can be used as 'theme' alone - but refined by the additional theme property to allow the definition of multiple light- and/or dark-schemes ",
        },
      },
    },
    DONE: {
      type: "final",
    },
  },
});