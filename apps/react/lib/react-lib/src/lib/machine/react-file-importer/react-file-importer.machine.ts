import { createMachine, fromPromise, setup } from "xstate";

export const REACT_FILE_IMPORTER_V1 = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "react.file_importer.event.send_file" }
      | { type: "react.file_importer.event.reset_file" },
  },
  actions: {
    assign_reset_context: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_file_info: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_parse_result: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_parse_error: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
  },
  actors: {
    // actor_parse_file: fromPromise(
    //   /* ... */
    // }),
  },
}).createMachine({
  context: {},
  id: "REACT_FILE_IMPORTER",
  initial: "IDEL",
  states: {
    IDEL: {
      on: {
        "react.file_importer.event.send_file": {
          target: "PARSE_FILE",
          actions: {
            type: "assign_file_info",
          },
        },
      },
      entry: {
        type: "assign_reset_context",
      },
    },
    PARSE_FILE: {
      invoke: {
        input: {},
        onDone: {
          target: "Done",
          actions: {
            type: "assign_parse_result",
          },
        },
        onError: {
          target: "ERROR",
          actions: {
            type: "assign_parse_error",
          },
        },
        src: "actor_parse_file",
      },
    },
    Done: {
      type: "final",
    },
    ERROR: {
      on: {
        "react.file_importer.event.reset_file": {
          target: "IDEL",
        },
      },
    },
  },
});