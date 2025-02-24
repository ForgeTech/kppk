import { Injectable, inject } from '@angular/core';
import { FgXstateService } from '../../service';
import { FgNavigationMachineMethodeService } from './fg-navigation.machine.methode.service';
import { 
  FG_NAVIGATION_CONTEXT,
  fg_navigation_context_parser,
  FG_NAVIGATION_EVENT_BLOCK,
  FG_NAVIGATION_EVENT_DISABLE,
  FG_NAVIGATION_EVENT_ENABLE,
  FG_NAVIGATION_EVENT_NAVIGATE,
  FG_NAVIGATION_EVENT_PERMISSION_REQUEST_ACCEPT,
  FG_NAVIGATION_EVENT_PERMISSION_REQUEST_DECLINE,
  FG_NAVIGATION_INTERNAL_CHECK,
  FG_NAVIGATION_INTERNAL_END,
  FG_NAVIGATION_INTERNAL_REDIRECT,
  FG_NAVIGATION_INTERNAL_START,
} from './fg-navigation.machine.types';
import { FgBaseService } from '@kppk/fg-lib-new';
import { FgMachineUtilsMethodeService } from '../fg-machine-utils';

@Injectable({
  providedIn: 'root',
})
export class FgNavigationMachineService extends FgBaseService {
  protected $methode = inject(FgNavigationMachineMethodeService);
  protected $common = inject(FgMachineUtilsMethodeService);
  protected $xstate = inject(FgXstateService);

  public get_machine(context?: Partial<FG_NAVIGATION_CONTEXT>) {

    return this.$xstate.setup({
      types: {
        context: {} as FG_NAVIGATION_CONTEXT,
        events: {} as
          | FG_NAVIGATION_EVENT_BLOCK
          | FG_NAVIGATION_EVENT_DISABLE
          | FG_NAVIGATION_EVENT_ENABLE
          | FG_NAVIGATION_EVENT_NAVIGATE
          | FG_NAVIGATION_EVENT_PERMISSION_REQUEST_ACCEPT
          | FG_NAVIGATION_EVENT_PERMISSION_REQUEST_DECLINE
          | FG_NAVIGATION_INTERNAL_CHECK
          | FG_NAVIGATION_INTERNAL_END
          | FG_NAVIGATION_INTERNAL_REDIRECT
          | FG_NAVIGATION_INTERNAL_START
      },
      actions: {
        action_navigation_redirect_to_target_url: this.$methode.action_navigation_redirect_to_target_url,
        // assign_current_url: this.$xstate.assign(this.$methode.assign_current_url),
        assign_active_url: this.$xstate.assign(this.$methode.assign_active_url),
        assign_target_url: this.$xstate.assign(this.$methode.assign_target_url),
        send_navigation_emitted_ended: this.$xstate.emit(this.$methode.send_navigation_emitted_ended),
        send_navigation_emitted_started: this.$xstate.emit(this.$methode.send_navigation_emitted_started),
        log_error: this.$common.log_error,
        raise_navigation_internal_check: this.$xstate.raise(this.$methode.raise_navigation_internal_check),
        raise_navigation_internal_end: this.$xstate.raise(this.$methode.raise_navigation_internal_end),
        raise_navigation_internal_redirect: this.$xstate.raise(this.$methode.raise_navigation_internal_redirect),
        raise_navigation_internal_start: this.$xstate.raise(this.$methode.raise_navigation_internal_start),
      },
      guards: {
        guard_target_url_not_matching_active_url: this.$xstate.not(this.$methode.guard_target_url_matching_active_url),
        guard_navigation_is_idel: this.$xstate.stateIn({'NAVIGATION': 'IDEL'}),
        guard_navigation_is_waiting: this.$xstate.stateIn({'NAVIGATION': { 'RUNNING': 'WAITING' }})
      },
    }).createMachine({
      context: fg_navigation_context_parser.parse( context ?? {}),
      id: "FG_NAVIGATION",
      type: "parallel",
      states: {
        SETTINGS: {
          initial: "ENABLED",
          on: {
            "fg.navigation.event.block": {
              target: "#FG_NAVIGATION.SETTINGS.BLOCKED",
            },
            "fg.navigation.event.navigate": [
              {
                actions: [
                  // {
                  //   type: "assign_current_url",
                  // },
                  {
                    type: "assign_target_url",
                  },
                  {
                    type: "raise_navigation_internal_check",
                  },
                  {
                    type: "log_error",
                    params: {
                      message: 'NAVIGATION_START',
                      log_context: true,
                      log_event: true
                    }
                  }
                ],
                guard: {
                  type: "guard_navigation_is_idel",
                },
              },
              {
                actions: [
                  {
                    type: "assign_active_url",
                  },
                  {
                    type: "raise_navigation_internal_redirect",
                  },
                  {
                    type: "log_error",
                    params: {
                      message: 'NAVIGATION_REDIRECT',
                      log_context: true,
                      log_event: true
                    }
                  }
                ],
                guard: {
                  type: "guard_navigation_is_waiting",
                },
              },
              {
                actions: [{
                  type: "log_error",
                  params: {
                    message: 'NAVIGATION_ERROR',
                    log_context: true,
                    log_event: true
                  }
                }],
              },
            ],
            "fg.navigation.event.disable": {
              target: "#FG_NAVIGATION.SETTINGS.DISABLED",
            },
            "fg.navigation.event.enable": {
              target: "#FG_NAVIGATION.SETTINGS.ENABLED",
            },
          },
          states: {
            ENABLED: {
              on: {
                "fg.navigation.internal.check": {
                  actions: [{
                    type: "raise_navigation_internal_start",
                  }]
                },
              },
            },
            BLOCKED: {
              initial: "IDEL",
              states: {
                IDEL: {
                  on: {
                    "fg.navigation.internal.check": {
                      target: "REQUEST_PERMISSION",
                      guard: {
                        type: "guard_target_url_not_matching_active_url",
                      },
                    },
                  },
                },
                REQUEST_PERMISSION: {
                  on: {
                    "fg.navigation.event.permission_request.accept": {
                      target: "ACCEPTED",
                    },
                    "fg.navigation.event.permission_request.decline": {
                      target: "DECLINED",
                    },
                  },
                },
                ACCEPTED: {
                  on: {
                    "fg.navigation.internal.end": {
                      target: "IDEL",
                    },
                  },
                  entry: {
                    type: "raise_navigation_internal_start",
                  },
                },
                DECLINED: {
                  always: {
                    target: "IDEL",
                  },
                },
              },
            },
            DISABLED: {},
          },
        },
        NAVIGATION: {
          initial: "IDEL",
          states: {
            IDEL: {
              on: {
                "fg.navigation.internal.start": {
                  target: "RUNNING",
                },
              },
            },
            RUNNING: {
              initial: "START",
              states: {
                START: {
                  always: {
                    target: "MATCHING",
                  },
                  entry: {
                    type: "send_navigation_emitted_started",
                  },
                },
                MATCHING: {
                  always: [
                    {
                      target: "REDIRECT",
                      guard: {
                        type: "guard_target_url_not_matching_active_url",
                      },
                    },
                    {
                      target: "ENDED",
                    },
                  ],
                },
                REDIRECT: {
                  always: {
                    target: "WAITING",
                  },
                  entry: {
                    type: "action_navigation_redirect_to_target_url",
                  },
                },
                ENDED: {
                  on: {
                    "fg.navigation.internal.end": {
                      target: "#FG_NAVIGATION.NAVIGATION.IDEL",
                    },
                  },
                  entry: [
                    {
                      type: "raise_navigation_internal_end",
                    },
                    {
                      type: "send_navigation_emitted_ended",
                    },
                  ],
                },
                WAITING: {
                  on: {
                    "fg.navigation.internal.redirect": {
                      target: "MATCHING",
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

}
