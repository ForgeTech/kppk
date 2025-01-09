import { createMachine, setup } from "xstate";

// export const REACT_PROCESSING_DATA_MACHINE

export const REACT_DATA_IMPORTER_MACHINE = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: "react.data_importer.event.stop" }
      | { type: "react.data_importer.event.send_file" }
      | { type: "react.data_importer.internal.reset_state" }
      | { type: "react.data_importer.internal.process_file" }
      | { type: "react.data_importer.internal.confirm_data" },
  },
  actions: {
    raise_internal_reset_state: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    raise_internal_process_file: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
  },
  actors: {
    actor_processing_data: createMachine({
      /* ... */
    }),
  },
  guards: {
    guard_matching_target: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
}).createMachine({
  context: {},
  id: "REACT_DATA_IMPORTER",
  type: "parallel",
  states: {
    STATE: {
      initial: "PENDING",
      on: {
        "react.data_importer.internal.reset_state": {
          target: "#REACT_DATA_IMPORTER.STATE.PENDING",
        },
      },
      states: {
        PENDING: {
          on: {
            "react.data_importer.internal.process_file": {
              target: "PROCESSING_DATA",
            },
          },
        },
        PROCESSING_DATA: {
          invoke: {
            id: "processing_data",
            input: {},
            onDone: {
              target: "EDIT_DATA",
            },
            onError: {
              target: "ERROR",
            },
            src: "actor_processing_data",
          },
        },
        EDIT_DATA: {
          on: {
            "react.data_importer.internal.confirm_data": {
              target: "New state 1",
            },
          },
        },
        ERROR: {},
        "New state 1": {},
      },
    },
    TRIGGERS: {
      initial: "RECEIVING",
      states: {
        RECEIVING: {
          on: {
            "react.data_importer.event.stop": {
              target: "DONE",
            },
            "react.data_importer.event.send_file": {
              target: "RECEIVING",
              actions: [
                {
                  type: "raise_internal_reset_state",
                },
                {
                  type: "raise_internal_process_file",
                },
              ],
              guard: {
                type: "guard_matching_target",
              },
            },
          },
        },
        DONE: {
          type: "final",
        },
      },
    },
    SPINNER: {},
  },
});
