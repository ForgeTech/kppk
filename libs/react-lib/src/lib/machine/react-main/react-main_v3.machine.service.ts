import { ApplicationRef, Injectable, inject } from '@angular/core';
import { FgXstateService } from '../../service';
import { ReactMainV3MachineMethodeService } from './react-main_v3.machine.methode.service';

import { FgBaseService } from '@kppk/fg-lib-new';
import { REACT_MAIN_CONTEXT, react_main_context_parser } from './react-main_v3.machine.types';
import { forwardTo, fromPromise } from 'xstate';

import { FgMachineUtilsMethodeService } from '../fg-machine-utils';
import { REACT_ACTOR_ENUM } from '../../enum';
import { ReactRunningV7MachineService } from '../react-running_v7';
import { FG_SPINNER_EVENT_HIDE, FG_SPINNER_EVENT_SHOW, FgSpinnerMachineService } from '../fg-spinner';
import { FgAuthLocalMachineMethodeService, FgAuthLocalMachineService } from '../fg-auth-local';
import { parent_context_event_input } from '../machine.utils';


@Injectable({
  providedIn: 'root',
})
export class ReactMainV3MachineService extends FgBaseService {
  protected $common = inject(FgMachineUtilsMethodeService);
  protected $methode = inject(ReactMainV3MachineMethodeService);
  protected $xstate = inject(FgXstateService);
  protected $machine_running = inject(ReactRunningV7MachineService);
  protected $machine_spinner = inject(FgSpinnerMachineService);
  protected $machine_auth = inject(FgAuthLocalMachineService);
  protected $methodes_auth = inject(FgAuthLocalMachineMethodeService);
  protected $app_ref = inject(ApplicationRef);

  public get_machine(context?: Partial<REACT_MAIN_CONTEXT>) {

    return this.$xstate.setup({
      types: {
        context: {} as REACT_MAIN_CONTEXT,
        events: {} as
          | { type: "fg.app.ready" }
          | { type: "fg.auth.event.*" }
          | { type: "fg.ui.emitted.*" }
          | { type: "react.event.stop" }
          | { type: "fg.auth.emitted.*" }
          | { type: "fg.spinner.event.*" }
          | FG_SPINNER_EVENT_SHOW
          | FG_SPINNER_EVENT_HIDE
      },
      actions: {
        assign_auth_emitted: this.$xstate.assign(this.$methode.assign_auth_emitted),
        log_error: this.$common.log_error,
        log_info: this.$common.log_info,
        log_warn: this.$common.log_warn,
        raise_spinner_hide: this.$xstate.raise(this.$common.raise_spinner_event_hide),
        raise_spinner_show: this.$xstate.raise(this.$common.raise_spinner_event_show),
        send_to_auth: forwardTo(REACT_ACTOR_ENUM.FG_AUTH),
        send_to_running: forwardTo(REACT_ACTOR_ENUM.REACT_RUNNING),
        sent_to_spinner: forwardTo(REACT_ACTOR_ENUM.FG_SPINNER),
      },
      actors: {
        actor_react_running: this.$machine_running.get_machine(),
        actor_fg_ui: this.$xstate.createMachine({}),
        actor_fg_auth_local: this.$machine_auth.get_machine().provide({
          actions: {
            send_authorized_event_to: this.$xstate.sendParent(this.$methodes_auth.emit_authorized_event),
            send_unauthorized_event_to: this.$xstate.sendParent(this.$methodes_auth.emit_unauthorized_event),
          }
        }),
        actor_fg_spinner: this.$machine_spinner.get_machine(),
        actor_app_ready: fromPromise( ()=>this.$app_ref.whenStable() ),
      },
    }).createMachine({
      context: react_main_context_parser.parse( context ?? {}),
      id: "REACT_MAIN_V3",
      initial: "RUNNING",
      on: {
        "react.event.stop": {
          target: "#REACT_MAIN_V3.DONE",
        },
      },
      states: {
        RUNNING: {
          type: "parallel",
          onDone: {
            target: "DONE",
          },
          entry: [
            {
              type: "log_info",
              params: {
                message: 'ACTOR_REACT_MAIN_RUNNING_STARTED'
              }
            },
          ],
          states: {
            APP: {
              initial: "STARTUP",
              states: {
                STARTUP: {
                  type: "parallel",
                  entry: [
                    {
                      type: "raise_spinner_show",
                      params: {
                        force: true
                      }
                    }
                  ],
                  exit: [
                    {
                      type: "raise_spinner_hide",
                    }
                  ],
                  onDone: {
                    target: "RUNNING",
                  },
                  states: {
                    APP_READY: {
                      initial: "PENDING",
                      states: {
                        PENDING: {
                          invoke: {
                            id: "actor_app_ready",
                            input: parent_context_event_input,
                            onDone: {
                              target: "DONE",
                            },
                            src: "actor_app_ready",
                          },
                        },
                        DONE: {
                          type: "final",
                        },
                      },
                    },
                    AUTH: {
                      initial: "PENDING",
                      states: {
                        PENDING: {
                          on: {
                            "fg.auth.emitted.*": {
                              target: "DONE",
                              actions: [
                                { type: 'assign_auth_emitted' }
                              ]
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
                RUNNING: {
                  on: {
                    "fg.auth.emitted.*": {
                      actions: [
                      {
                        type: "send_to_running",
                      },
                      {
                        type: "log_error",
                        params: {
                          message: "FORWARD_TO_RUNNING"
                        }
                      }
                    ],
                    },
                    "fg.ui.emitted.*": {
                      actions: {
                        type: "send_to_running",
                      },
                    },
                  },
                  invoke: {
                    id: REACT_ACTOR_ENUM.REACT_RUNNING,
                    systemId: REACT_ACTOR_ENUM.REACT_RUNNING,
                    input: ({ context }) => {
                      return context;
                    },
                    onDone: {
                      target: "DONE",
                      actions: {
                        type: "log_info",
                        params: {
                          message: 'ACTOR_REACT_RUNNING_ERROR'
                        }
                      },
                    },
                    onError: {
                      target: "#REACT_MAIN_V3.ERROR",
                      actions: {
                        type: "log_error",
                        params: {
                          message: 'ACTOR_REACT_RUNNING_ERROR'
                        }
                      },
                    },
                    src: "actor_react_running",
                  },
                },
                DONE: {
                  type: "final",
                  entry: {
                    type: "log_info",
                    params: {
                      message: 'ACTOR_REACT_MAIN_STOPPED'
                    }
                  },
                },
              },
            },
            UI: {
              on: {
                "fg.ui.emitted.*": {
                  actions: {
                    type: "send_to_running",
                  },
                },
              },
              invoke: {
                id: REACT_ACTOR_ENUM.FG_UI,
                systemId: REACT_ACTOR_ENUM.FG_UI,
                input: parent_context_event_input,
                onDone: {
                  actions: {
                    type: "log_info",
                    params: {
                      message: 'ACTOR_FG_UI_DONE'
                    }
                  },
                },
                onError: {
                  target: "#REACT_MAIN_V3.ERROR",
                  actions: {
                    type: "log_error",
                    params: {
                      message: 'ACTOR_FG_UI_ERROR'
                    }
                  },
                },
                src: "actor_fg_ui",
              },
            },
            AUTH: {
              on: {
                "fg.auth.event.*": {
                  actions: {
                    type: "send_to_auth",
                  },
                },
              },
              invoke: {
                id: REACT_ACTOR_ENUM.FG_AUTH,
                systemId: REACT_ACTOR_ENUM.FG_AUTH,
                input: undefined,
                onDone: {
                  actions: {
                    type: "log_info",
                    params: {
                      message: 'ACTOR_FG_AUTH_DONE'
                    }
                  },
                },
                onError: {
                  target: "#REACT_MAIN_V3.ERROR",
                  actions: {
                    type: "log_error",
                    params: {
                      message: 'ACTOR_FG_UI_ERROR'
                    }
                  },
                },
                src: "actor_fg_auth_local",
              },
            },
            SPINNER: {
              on: {
                "fg.spinner.event.*": {
                  actions: [
                    {
                      type: "sent_to_spinner",
                    },
                    {
                      type: "log_warn",
                      params: {
                        message: 'RECEIVED_SPINNER_EVENT',
                        log_event: true,
                      }
                    },
                  ],
                },
              },
              invoke: {
                id: REACT_ACTOR_ENUM.FG_SPINNER,
                systemId: REACT_ACTOR_ENUM.FG_SPINNER,
                input: undefined,
                onDone: {
                  actions: {
                    type: "log_info",
                    params: {
                      message: 'ACTOR_FG_SPINNER_DONE'
                    }
                  },
                },
                onError: {
                  target: "#REACT_MAIN_V3.ERROR",
                  actions: {
                    type: "log_error",
                    params: {
                      message: 'ACTOR_FG_SPINNER_ERROR'
                    }
                  },
                },
                src: "actor_fg_spinner",
              },
              description:
                "Provides a global loading/progress spinner machine for the application",
            },
          },
        },
        DONE: {
          type: "final",
          entry: {
            type: "log_info",
            params: {
              message: 'ACTOR_REACT_MAIN_DONE'
            }
          },
        },
        ERROR: {
          type: "final",
          entry: {
            type: "log_error",
            params: {
              message: 'ACTOR_REACT_MAIN_ERROR',
              log_event: true,
              log_context: true,
            }
          },
        },
      },
    });
  }
}
