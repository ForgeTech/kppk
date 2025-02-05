import { Injectable, inject } from '@angular/core';
import { FgXstateService } from '../../service';
import { ReactRunningV7MachineMethodeService } from './react-running_v7.machine.methode.service';
import { 
  FG_NAVIGATION_EVENT_BLOCK,
  FG_NAVIGATION_EVENT_DISABLE,
  FG_NAVIGATION_EVENT_ENABLE,
  FG_NAVIGATION_EVENT_PERMISSION_REQUEST_ACCEPT,
  FG_NAVIGATION_EVENT_PERMISSION_REQUEST_DECLINE,
  FG_NAVIGATION_EVENT_UNBLOCK,
  FG_NAVIGATION_INTERNAL_END,
  FG_NAVIGATION_INTERNAL_READY,
  FG_NAVIGATION_INTERNAL_START, 
  REACT_RUNNING_CONTEXT, 
  react_running_context_parser, 
  REACT_RUNNING_EVENT_CALCULATION_START
} from './react-running_v7.machine.types';
import { FgBaseService } from '@kppk/fg-lib-new';
import { parent_context_event_input } from '../machine.utils';
import { Router } from '@angular/router';
import { 
  FG_NAVIGATION_EVENT_CANCEL,
  FG_NAVIGATION_EVENT_END, 
  FG_NAVIGATION_EVENT_START, 
  FgRouterMachineService
} from '../fg-router/fg-router.machine.service';
import { HOST_ROUTES } from '../../enum';
import { log } from 'xstate';
import { FG_AUTH_LOCAL_EVENT_AUTHORIZED, FG_AUTH_LOCAL_EVENT_UNAUTHORIZED } from '../fg-auth-local';

@Injectable({
  providedIn: 'root',
})
export class ReactRunningV7MachineService extends FgBaseService {
  protected $methode = inject(ReactRunningV7MachineMethodeService);
  protected $router = inject(Router);
  protected $xstate = inject(FgXstateService);
  protected $router_machine = inject(FgRouterMachineService);

  // protected assign_context_from_system = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
  //   const result = this.$immer.produce( context, draft => {
  public get_machine(context?: Partial<REACT_RUNNING_CONTEXT>) {
   return this.$xstate.setup({
      types: {
        context: react_running_context_parser.parse( context ?? {}),
        events: {} as 
          | REACT_RUNNING_EVENT_CALCULATION_START
          | FG_NAVIGATION_EVENT_START
          | FG_NAVIGATION_EVENT_END
          | FG_NAVIGATION_EVENT_CANCEL
          | FG_NAVIGATION_INTERNAL_START
          | FG_NAVIGATION_INTERNAL_END
          | FG_NAVIGATION_INTERNAL_READY
          | FG_NAVIGATION_EVENT_BLOCK
          | FG_NAVIGATION_EVENT_UNBLOCK
          | FG_NAVIGATION_EVENT_PERMISSION_REQUEST_ACCEPT
          | FG_NAVIGATION_EVENT_PERMISSION_REQUEST_DECLINE
          | FG_NAVIGATION_EVENT_ENABLE
          | FG_NAVIGATION_EVENT_DISABLE
          | FG_AUTH_LOCAL_EVENT_AUTHORIZED
          | FG_AUTH_LOCAL_EVENT_UNAUTHORIZED
      },
      actions: {
        action_navigation_redirect: this.$methode.action_navigation_redirect,
        assign_active_url: this.$xstate.assign(this.$methode.assign_active_url),
        assign_auth_cookie_set: this.$xstate.assign(this.$methode.assign_auth_cookie_set),
        assign_auth_cookie_unset: this.$xstate.assign(this.$methode.assign_auth_cookie_unset),
        assign_calculation_set: this.$xstate.assign(this.$methode.assign_calculation_set),
        assign_calculation_unset: this.$xstate.assign(this.$methode.assign_calculation_unset),
        assign_target_url: this.$xstate.assign(this.$methode.assign_target_url),
        raise_navigation_block: this.$xstate.raise(this.$methode.raise_navigation_block),
        raise_navigation_internal_end: this.$xstate.raise(this.$methode.raise_navigation_internal_end),
        raise_navigation_internal_ready: this.$xstate.raise(this.$methode.raise_navigation_internal_ready),
        raise_navigation_internal_start: this.$xstate.raise(this.$methode.raise_navigation_internal_start),
        raise_navigation_unblock: this.$xstate.raise(this.$methode.raise_navigation_unblock),
        send_to_spinner_hide_event: this.$xstate.emit(this.$methode.send_to_spinner_hide_event),
        send_to_spinner_show_event: this.$xstate.emit(this.$methode.send_to_spinner_show_event),
        assign_active_url_to_target_url: this.$xstate.assign(this.$methode.assign_active_url_to_target_url),
      },
      actors: {
        actor_home: this.$xstate.createMachine({}),
        actor_calculation: this.$xstate.createMachine({}),
        actor_navigation_router: this.$router_machine.getMachine()
      },
      guards: {
        guard_has_calculation: this.$methode.guard_has_calculation,
        guard_target_url_matches:  this.$methode.guard_target_url_matches,
        guard_is_authorized:  this.$methode.guard_is_authorized,
        guard_target_matches_active_url:  this.$methode.guard_target_matches_active_url,
      },
    }).createMachine({
      context: react_running_context_parser.parse( context ?? {}),
      id: "REACT_RUNNING_V7",
      type: "parallel",
      on: {
        "fg.auth.local.event.authorized": {
          target: "#REACT_RUNNING_V7.ACTIVE_VIEW.PENDING",
          actions: [{
            type: "assign_auth_cookie_set",
          },
          {
            type: 'raise_navigation_internal_start'
          }
        ]
        },
        "fg.auth.local.event.unauthorized": {
          target: "#REACT_RUNNING_V7.ACTIVE_VIEW.PENDING",
          actions: [{
            type: "assign_auth_cookie_unset",
          },
          {
            type: 'raise_navigation_internal_start'
          }
        ]
        },
      },
      states: {
        ACTIVE_VIEW: {
          initial: "PENDING",
          on: {
            "react.running.event.calculation.start": {
              actions: [
                {
                  type: "assign_calculation_set",
                },
                {
                  type: "raise_navigation_internal_start",
                },
              ],
            },
            "fg.navigation.internal.start": {
              target: "#REACT_RUNNING_V7.ACTIVE_VIEW.PENDING",
            },
          },
          states: {
            PENDING: {
              always: [
                {
                  target: "#REACT_RUNNING_V7.ACTIVE_VIEW.AUTHORIZED.CALCULATION",
                  guard: {
                    type: "guard_has_calculation",
                  },
                },
                {
                  target: "#REACT_RUNNING_V7.ACTIVE_VIEW.AUTHORIZED.LOGOUT",
                  guard: {
                    type: "guard_target_url_matches",
                    params: {
                      url: '/'.concat(HOST_ROUTES.LOGOUT)
                    }
                  },
                },
                {
                  target: "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED.IMPRINT",
                  guard: {
                    type: "guard_target_url_matches",
                    params: {
                      url: '/'.concat(HOST_ROUTES.IMPRINT)
                    }
                  },
                },
                {
                  target:
                    "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED.DATA_PROTECTION",
                  guard: {
                    type: "guard_target_url_matches",
                    params: {
                      url: '/'.concat(HOST_ROUTES.DATA_PROTECTION)
                    }
                  },
                },
                {
                  target: "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED.DEMO",
                  guard: {
                    type: "guard_target_url_matches",
                    params: {
                      url: '/'.concat(HOST_ROUTES.DEMO)
                    }
                  },
                },
                {
                  target: "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED.LOGIN",
                  guard: {
                    type: "guard_target_url_matches",
                    params: {
                      url: '/'.concat(HOST_ROUTES.LOGIN)
                    }
                  },
                },
                {
                  target: "AUTHORIZED",
                  guard: {
                    type: "guard_is_authorized",
                  },
                },
                {
                  target: "UNAUTHORIZED",
                },
              ],
            },
            AUTHORIZED: {
              initial: "HOME",
              // entry: {
              //   type: "raise_navigation_internal_ready",
              // },
              states: {
                HOME: {
                  entry: [{
                    type: "assign_active_url",
                    params: {
                      url: '/'.concat(HOST_ROUTES.HOME)
                    },
                  },
                  { type: "raise_navigation_internal_ready" }],
                  invoke: {
                    id: "actor_home",
                    input: parent_context_event_input,
                    onDone: {
                      actions: [
                        {
                          type: "assign_calculation_set",
                        },
                        {
                          type: "raise_navigation_internal_start",
                        },
                      ],
                    },
                    onError: {
                      target: "#REACT_RUNNING_V7.ACTIVE_VIEW.ERROR",
                    },
                    src: "actor_home",
                  },
                },
                CALCULATION: {
                  entry: [
                    {
                      type: "assign_active_url",
                      params: {
                        url: '/'.concat(HOST_ROUTES.CALC)
                      },
                    },
                    {
                      type: "raise_navigation_block",
                    },
                    { type: "raise_navigation_internal_ready" },
                  ],
                  exit: [
                    {
                      type: "assign_calculation_unset",
                    },
                    {
                      type: "raise_navigation_unblock",
                    },
                  ],
                  invoke: {
                    id: "actor_calculation",
                    input: parent_context_event_input,
                    onDone: {
                      actions: {
                        type: "raise_navigation_internal_start",
                      },
                    },
                    onError: {
                      target: "#REACT_RUNNING_V7.ACTIVE_VIEW.ERROR",
                    },
                    src: "actor_calculation",
                  },
                },
                LOGOUT: {
                  entry: [{
                    type: "assign_active_url",
                    params: {
                      url: '/'.concat(HOST_ROUTES.LOGOUT)
                    },
                  },
                  { type: "raise_navigation_internal_ready" }]
                },
              },
            },
            UNAUTHORIZED: {
              initial: "LOGIN",
              // entry: {
              //   type: "raise_navigation_internal_ready",
              // },
              states: {
                LOGIN: {
                  entry: [{
                    type: "assign_active_url",
                    params: {
                      url: '/'.concat(HOST_ROUTES.LOGIN)
                    },
                  },
                  { type: "raise_navigation_internal_ready" }
                ],
                },
                IMPRINT: {
                  entry: [{
                    type: "assign_active_url",
                    params: {
                      url: '/'.concat(HOST_ROUTES.IMPRINT)
                    },
                  },
                  { type: "raise_navigation_internal_ready" }]
                },
                DATA_PROTECTION: {
                  entry: [{
                    type: "assign_active_url",
                    params: {
                      url: '/'.concat(HOST_ROUTES.DATA_PROTECTION,)
                    },
                  },
                  { type: "raise_navigation_internal_ready" }]
                },
                DEMO: {
                  entry: [{
                    type: "assign_active_url",
                    params: {
                      url: '/'.concat(HOST_ROUTES.DEMO,)
                    },
                  },
                  { type: "raise_navigation_internal_ready" }]
                },
              },
            },
            ERROR: {},
          },
        },
        ROUTER: {
          initial: "ENABLED",
          on: {
            "fg.navigation.event.end": {
              actions: [
                {
                  type: "raise_navigation_internal_end",
                },
              ],
            },
            // "fg.navigation.event.cancel": {
            //   actions: [
            //     {
            //       type: "raise_navigation_internal_end",
            //     },
            //   ],
            // },
          },
          invoke: {
            id: "actor_navigation_router",
            input: parent_context_event_input,
            src: "actor_navigation_router",
          },
          states: {
            ENABLED: {
              on: {
                "fg.navigation.event.start": {
                  actions: [
                    {
                      type: "assign_target_url",
                    },
                    {
                      type: "raise_navigation_internal_start",
                    },
                  ],
                },
                "fg.navigation.event.block": {
                  target: "BLOCKED",
                },
                "fg.navigation.event.disable": {
                  target: "DISABLED",
                },
              },
            },
            BLOCKED: {
              initial: "IDEL",
              on: {
                "fg.navigation.event.unblock": {
                  target: "ENABLED",
                },
              },
              states: {
                IDEL: {
                  on: {
                    "fg.navigation.event.start": {
                      target: "REQUEST_PERMISSION",
                      actions: {
                        type: "assign_target_url",
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
                  entry: {
                    type: "raise_navigation_internal_start",
                  },
                },
                DECLINED: {},
              },
            },
            DISABLED: {
              on: {
                "fg.navigation.event.enable": {
                  target: "ENABLED",
                },
              },
            },
          },
        },
        NAVIGATION: {
          initial: "IDEL",
          entry: [
            log('>>>>>>>>>>>>NAVIGATION>>>>>>>>>>>>>>')
          ],
          on: {
            "fg.navigation.event.cancel": {
              target: "#REACT_RUNNING_V7.NAVIGATION.CANCELED",
            },
          },
          states: {
            IDEL: {
              entry: [
                log('IDEL')
              ],
              on: {
                "fg.navigation.internal.start": {
                  target: "CHECKING",
                },
              },
              exit: {
                type: "send_to_spinner_show_event",
              },
            },
            CHECKING: {
              entry: [
                log('CHECKING')
              ],
              on: {
                "fg.navigation.internal.ready": [
                  {
                    target: "ALLOW",
                    guard: {
                      type: "guard_target_matches_active_url",
                    },
                  },
                  {
                    target: "REDIRECT",
                  },
                ],
              },
            },
            ALLOW: {
              entry: [
                log('ALLOW')
              ],
              on: {
                "fg.navigation.internal.end": {
                  target: "ENDED",
                },
              },
            },
            REDIRECT: {

              always: {
                target: "REDIRECT",
                actions: {
                  type: "assign_active_url_to_target_url",
                },
              },
              entry: [
                log('NAVIGATION'),
                {
                  type: "action_navigation_redirect",
                },
              ]
            },
            ENDED: {
              always: {
                target: "IDEL",
              },
              entry: [
                log('ENDED'),
                {
                  type: "send_to_spinner_hide_event",
                }]
            },
            CANCELED: {
              always: {
                target: "IDEL",
              },
              entry: {
                type: "send_to_spinner_hide_event",
              },
            },
          },
        },
      },
    });
  }
}
