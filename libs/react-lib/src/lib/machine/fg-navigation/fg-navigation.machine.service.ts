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

@Injectable({
  providedIn: 'root',
})
export class ReactNavigationMachineService extends FgBaseService {
  protected $methode = inject(FgNavigationMachineMethodeService);
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
        // action_navigation_redirect_to_target_url: this.$methode.action_navigation_redirect_to_target_url,
        assign_active_url: this.$xstate.assign(this.$methode.assign_active_url),
        assign_target_url: this.$xstate.assign(this.$methode.assign_target_url),
        send_navigation_emitted_ended: this.$xstate.emit(this.$methode.send_navigation_emitted_ended),
        send_navigation_emitted_started: this.$xstate.emit(this.$methode.send_navigation_emitted_started),
        log_error: this.$methode.log_error,
        raise_navigation_internal_check: this.$methode.raise_navigation_internal_check,
        raise_navigation_internal_end: this.$methode.raise_navigation_internal_end,
        raise_navigation_internal_redirect: this.$methode.raise_navigation_internal_redirect,
        raise_navigation_internal_start: this.$methode.raise_navigation_internal_start,
      },
      guards: {
        guard_target_url_not_matching_active_url: this.$xstate.not(this.$methode.guard_target_url_matching_active_url),
        guard_navigation_is_idel: this.$xstate.stateIn({'NAVIGATION': 'IDEL'}),
        guard_navigation_is_waiting: this.$xstate.stateIn({'NAVIGATION': 'WAITING'})
      },
    }).createMachine({
      context: fg_navigation_context_parser.parse( context ?? {}),
      id: "FG_NAVIGATION",
      type: "parallel",
      // entry: {
      //   type: "assign_current_url_to_active_url",
      // },
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
                  {
                    type: "assign_target_url",
                  },
                  {
                    type: "raise_navigation_internal_check",
                  },
                ],
                guard: {
                  type: "guard_navigation_is_idel",
                },
                description:
                  "Receiving a 'navigate' event while in 'idel' state should start the navigation process according to the current settings",
              },
              {
                actions: [
                  {
                    type: "assign_active_url",
                  },
                  {
                    type: "raise_navigation_internal_redirect",
                  },
                ],
                guard: {
                  type: "guard_navigation_is_waiting",
                },
              },
              {
                // actions: {
                //   type: "log_error",
                // },
                description:
                  "This is an unexpected navigation event and shouldn't appear. Inspect what is trying to interrupt navigation before it is finished",
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
                  target: "ENABLED",
                },
              },
              entry: {
                type: "raise_navigation_internal_start",
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
                  // entry: {
                  //   type: "action_navigation_redirect_to_target_url",
                  // },
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
