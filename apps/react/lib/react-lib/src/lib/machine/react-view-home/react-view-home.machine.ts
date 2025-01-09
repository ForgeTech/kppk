import { Actor, ActorRefFrom, EventFromLogic, SnapshotFrom, setup } from "xstate";

export type ReactViewHomeV1Snapshot = SnapshotFrom<typeof REACT_VIEW_HOME_MACHINE_V1>;
export type ReactViewHomeV1Event = EventFromLogic<typeof REACT_VIEW_HOME_MACHINE_V1>;
export type ReactViewHomeV1Ref = ActorRefFrom<typeof REACT_VIEW_HOME_MACHINE_V1>;
export type ReactViewHomeV1Machine = typeof REACT_VIEW_HOME_MACHINE_V1;
export type ReactViewHomeV1Actor = Actor<typeof REACT_VIEW_HOME_MACHINE_V1>;
export type ReactViewHomeV1Context = {
  file_bauteilflaechen: any
  file_aufbauten: any
  file_oi3: any
  file_rose: any
  output: any
};

// file_aufbauten:  z.array(z.any()),
// file_bauteilflaechen: z.array(z.any()),
// file_oi3: debug_calculation_oi3_import_parser,
// file_rose: z.object({}).passthrough().optional(),

export function react_view_home_output( { context, event }: { context: ReactViewHomeV1Context, event: any } ) {
  // console.log('>>>>>>>>>>>>>>>>OUTPUT>>>>>>>>>>>>>')
  // console.log( context );
  // console.log( event );
  return context.output;
}

export const REACT_VIEW_HOME_MACHINE_V1 =  setup({
    types: {
      context: {} as ReactViewHomeV1Context,
      events: {} as
        | { type: "react.view.home.event.modal.from_files" }
        | { type: "react.view.home.event.modal.from_stored" }
        | { type: "react.view.home.event.bauteilflaechen.ready", data: any }
        | { type: "react.view.home.event.aufbauten.ready", data: any }
        | { type: "react.view.home.event.oi3.ready", data: any }
        | { type: "react.view.home.event.rose.ready", data: any }
        | { type: "react.view.home.event.modal.start_calculation" }
        | { type: "react.view.home.event.from_file.ready", data: any }
        | { type: "react.view.home.event.from_local_storage.ready", data: any }
        | { type: "react.view.home.event.modal.close" }
        | { type: "react.view.home.event.modal.open" }
        | { type: "react.view.home.event.modal.back" },
    },
    actions: {
      assign_from_files_bauteilflaeche_data: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
      assign_from_files_aufbauten_data: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
      assign_from_files_oi3_data: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
      assign_from_files_rose_data: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
      assign_from_files_output_data: function ({ context, event }, params) {
        // Add your action code here
        // ...
      },
    },
  }).createMachine({
    context: {
      file_bauteilflaechen: undefined,
      file_aufbauten: undefined,
      file_oi3: undefined,
      file_rose: undefined,
      output: undefined
    },
    id: "REACT_VIEW_HOME_V2",
    type: "parallel",
    output: react_view_home_output,
    states: {
      MODAL: {
        initial: "HIDDEN",
        states: {
          HIDDEN: {
            on: {
              "react.view.home.event.modal.open": {
                target: "SHOWN",
              },
            },
          },
          SHOWN: {
            initial: "UNSELECTED",
            on: {
              "react.view.home.event.modal.close": {
                target: "HIDDEN",
              },
            },
            states: {
              UNSELECTED: {
                on: {
                  "react.view.home.event.modal.from_files": {
                    target: "#REACT_VIEW_HOME_V2.MODAL.SHOWN.SELECTED.FROM_FILES",
                  },
                  "react.view.home.event.modal.from_stored": {
                    target:
                      "#REACT_VIEW_HOME_V2.MODAL.SHOWN.SELECTED.FROM_STORED",
                  },
                },
              },
              SELECTED: {
                initial: "FROM_FILES",
                on: {
                  "react.view.home.event.modal.back": {
                    target: "UNSELECTED",
                  },
                },
                states: {
                  FROM_FILES: {
                    initial: "LOAD",
                    states: {
                      LOAD: {
                        type: "parallel",
                        onDone: {
                          target: "READY",
                        },
                        states: {
                          BAUTEILFLAECHEN: {
                            initial: "IDEL",
                            states: {
                              IDEL: {
                                on: {
                                  "react.view.home.event.bauteilflaechen.ready": {
                                    target: "DONE",
                                  },
                                },
                              },
                              DONE: {
                                type: "final",
                                entry: {
                                  type: "assign_from_files_bauteilflaeche_data",
                                },
                              },
                            },
                          },
                          AUFBAUTEN: {
                            initial: "IDEL",
                            states: {
                              IDEL: {
                                on: {
                                  "react.view.home.event.aufbauten.ready": {
                                    target: "DONE",
                                  },
                                },
                              },
                              DONE: {
                                type: "final",
                                entry: {
                                  type: "assign_from_files_aufbauten_data",
                                },
                              },
                            },
                          },
                          OI3: {
                            initial: "IDEL",
                            states: {
                              IDEL: {
                                on: {
                                  "react.view.home.event.oi3.ready": {
                                    target: "DONE",
                                  },
                                },
                              },
                              DONE: {
                                type: "final",
                                entry: {
                                  type: "assign_from_files_oi3_data",
                                },
                              },
                            },
                          },
                          ROSE: {
                            initial: "IDEL",
                            states: {
                              IDEL: {
                                on: {
                                  "react.view.home.event.rose.ready": {
                                    target: "DONE",
                                  },
                                },
                              },
                              DONE: {
                                type: "final",
                                entry: {
                                  type: "assign_from_files_rose_data",
                                },
                              },
                            },
                          },
                        },
                      },
                      READY: {
                        entry: {
                          type: "assign_from_files_output_data"
                        },
                        on: {
                          "react.view.home.event.modal.start_calculation": {
                            target: "#REACT_VIEW_HOME_V2.MODAL.DONE",
                          },
                        },
                      },
                    },
                  },
                  FROM_STORED: {
                    type: "parallel",
                    states: {
                      FROM_FILE: {
                        initial: "IDEL",
                        states: {
                          IDEL: {
                            on: {
                              "react.view.home.event.from_file.ready": {
                                target: "DONE",
                              },
                            },
                          },
                          DONE: {
                            type: "final",
                          },
                        },
                      },
                      FROM_LOCAL_STORAGE: {
                        initial: "IDEL",
                        states: {
                          IDEL: {
                            on: {
                              "react.view.home.event.from_local_storage.ready": {
                                target: "DONE",
                              },
                            },
                          },
                          DONE: {
                            type: "final",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          DONE: {
            type: "final",
          },
        },
      },
    },
  });