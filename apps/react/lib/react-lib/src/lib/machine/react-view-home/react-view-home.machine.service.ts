import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { ReactViewHomeMachineMethodeService } from './react-view-home.machine.methode.service';
import { FgXstateService } from '../../service';
import { REACT_VIEW_HOME_CONTEXT } from './react-view-home.machine.types';

@Injectable({
  providedIn: 'root',
})
export class ReactViewHomeMachineService extends FgBaseService {
  protected $methode = inject(ReactViewHomeMachineMethodeService);
  protected $xstate = inject(FgXstateService);

  public get_machine( context?: any ) {
    return this.$xstate.setup({
      types: {
        context: {} as REACT_VIEW_HOME_CONTEXT,
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
        assign_from_files_bauteilflaeche_data: this.$xstate.assign( this.$methode.assign_from_files_bauteilflaeche_data ),
        assign_from_files_aufbauten_data: this.$xstate.assign( this.$methode.assign_from_files_aufbauten_data ),
        assign_from_files_oi3_data: this.$xstate.assign( this.$methode.assign_from_files_oi3_data ),
        assign_from_files_rose_data: this.$xstate.assign( this.$methode.assign_from_files_rose_data ),
        assign_from_files_output_data: this.$xstate.assign( this.$methode.assign_from_files_output_data ),
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
      output: 'react_view_home_output',
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
  }
}
