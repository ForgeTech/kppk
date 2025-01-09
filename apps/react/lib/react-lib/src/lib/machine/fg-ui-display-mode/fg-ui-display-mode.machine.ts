import { createMachine } from 'xstate';

import { setup } from 'xstate'

export const FG_UI_DISPLAY_MODE_V1 = setup({
  "types": {
    "context": {} as {},
    "events": {} as {type: 'event_set_sheme', 'scheme_to_set': string} | {type: 'event_set_theme', 'theme_to_set': string, 'containing_sheme': string} | {type: 'fg.ui.display_mode.event.stop', } | {type: 'fg.ui.display_mode.event.detect', } | {type: 'fg.ui.display_mode.event.get_context', } | {type: 'fg.ui.display_mode.event.set_context', } | {type: 'fg.ui.display_mode.event.enable_autodetection', } | {type: 'fg.ui.event.display_mode.disable_autodetection', }
  },
  "actions": {
    "assign_display_mode_autodetection_to_false": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "assign_display_mode_autodetection_to_true": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "raise_event_detect_display_mode": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "assign_set_context": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "respond_display_mode_event_context": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "assign_detect_display_mode_result": function({
  context, event
}, params) {
  // Add your action code here
  // ...
},
    "escalate_detect_display_mode_error": function({
  context, event
}, params) {
  // Add your action code here
  // ...
}
  },
  "actors": {
    "service_detect_display_mode": createMachine({
  /* ... */
})
  },
  "guards": {
    "guard_single_detection_is_true": function ({
  context, event
}) {
  // Add your guard condition here
  return true;
},
    "guard_display_mode_autodetection_is_enabled": function ({
  context, event
}) {
  // Add your guard condition here
  return true;
}
  }
})
  .createMachine({
  "context": {},
  "id": "FG_UI_DISPLAY_MODE_V1",
  "initial": "RUNNING",
  "on": {
    "fg.ui.display_mode.event.stop": {
      "target": "#FG_UI_DISPLAY_MODE_V1.DONE"
    }
  },
  "states": {
    "RUNNING": {
      "initial": "IDLE",
      "on": {
        "fg.ui.event.display_mode.disable_autodetection": {
          "target": "RUNNING",
          "actions": {
            "type": "assign_display_mode_autodetection_to_false"
          },
          "reenter": true
        },
        "fg.ui.display_mode.event.enable_autodetection": {
          "target": "RUNNING",
          "actions": [
            {
              "type": "assign_display_mode_autodetection_to_true"
            },
            {
              "type": "raise_event_detect_display_mode"
            }
          ],
          "reenter": true
        },
        "fg.ui.display_mode.event.set_context": {
          "target": "RUNNING",
          "actions": {
            "type": "assign_set_context"
          }
        },
        "fg.ui.display_mode.event.get_context": {
          "target": "RUNNING",
          "actions": {
            "type": "respond_display_mode_event_context"
          }
        }
      },
      "states": {
        "IDLE": {
          "on": {
            "fg.ui.display_mode.event.detect": {
              "target": "DETECT"
            }
          },
          "after": {
            "delay_detect_display_mode_interval": {
              "target": "DETECT",
              "guard": {
                "type": "guard_display_mode_autodetection_is_enabled"
              }
            }
          },
          "always": {
            "target": "#FG_UI_DISPLAY_MODE_V1.DONE",
            "guard": {
              "type": "guard_single_detection_is_true"
            }
          }
        },
        "DETECT": {
          "invoke": {
            "id": "detect_display_mode",
            "input": {},
            "onDone": {
              "target": "IDLE",
              "actions": {
                "type": "assign_detect_display_mode_result"
              }
            },
            "onError": {
              "target": "IDLE",
              "actions": {
                "type": "escalate_detect_display_mode_error"
              }
            },
            "src": "service_detect_display_mode"
          },
          "description": "Detecting the applications display_mode, like fullscreen, standalone, minimal-ui, and browser. See:\n\n<https://caniuse.com/?search=display-mode>\n\n<https://javascript.plainenglish.io/mastering-fullscreen-mode-detection-a-web-developers-guide-fe97de436284>"
        }
      }
    },
    "DONE": {
      "type": "final"
    }
  }
})
  