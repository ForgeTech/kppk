
import { createMachine, setup } from 'xstate'

export const FG_UI_MACHINE_V2 = setup({
  "types": {
    "context": {} as {},
    "events": {} as {type: 'fg.ui.event.stop', } | {type: 'fg.ui.display_mode.event.*', } | {type: 'fg.ui.scheme_theme.event.*', }
  },
  "actions": {
    "forward_event_to_scheme_theme_service": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "forward_event_to_display_mode_service": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "escalate_ui_sheme_theme_error": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "escalate_ui_dispalay_mode_error": function({
  context, event
}, params) {
  // Add your action code here
  // ...
}
  },
  "actors": {
    "service_fg_ui_scheme_theme": createMachine({
  /* ... */
}),
    "service_fg_ui_display_mode": createMachine({
  /* ... */
})
  },
  "schemas": {
    "events": {
      "fg.ui.event.stop": {
        "type": "object",
        "properties": {}
      },
      "fg.ui.display_mode.event.*": {
        "type": "object",
        "properties": {}
      },
      "fg.ui.scheme_theme.event.*": {
        "type": "object",
        "properties": {}
      }
    }
  }
})
  .createMachine({
  "context": {},
  "id": "FG_UI_V2",
  "initial": "RUNNING",
  "on": {
    "fg.ui.event.stop": {
      "target": "#FG_UI_V2.DONE"
    }
  },
  "states": {
    "RUNNING": {
      "type": "parallel",
      "states": {
        "SCHEME_THEME": {
          "on": {
            "fg.ui.scheme_theme.event.*": {
              "target": "SCHEME_THEME",
              "actions": {
                "type": "forward_event_to_scheme_theme_service"
              }
            }
          },
          "invoke": {
            "id": "scheme_theme",
            "input": {},
            "onError": {
              "target": "SCHEME_THEME",
              "actions": {
                "type": "escalate_ui_sheme_theme_error"
              }
            },
            "src": "service_fg_ui_scheme_theme"
          }
        },
        "DISPLAY_MODE": {
          "on": {
            "fg.ui.display_mode.event.*": {
              "target": "DISPLAY_MODE",
              "actions": {
                "type": "forward_event_to_display_mode_service"
              }
            }
          },
          "invoke": {
            "id": "display_mode",
            "input": {},
            "onError": {
              "target": "DISPLAY_MODE",
              "actions": {
                "type": "escalate_ui_dispalay_mode_error"
              }
            },
            "src": "service_fg_ui_display_mode"
          }
        }
      }
    },
    "DONE": {
      "type": "final"
    }
  }
});