import { Injectable, inject } from '@angular/core';
import { FgXstateService } from '../../service';
import { ReactRunningV7MachineMethodeService } from './react-running_v7.machine.methode.service';

import { FgBaseService } from '@kppk/fg-lib-new';
import { parent_context_event_input } from '../machine.utils';
import { Router } from '@angular/router';
import { 
  FG_ROUTER_EMITTED_CANCEL,
  FG_ROUTER_EMITTED_END, 
  FG_ROUTER_EMITTED_START, 
  FgRouterMachineService
} from '../fg-router/fg-router.machine.service';
import { FG_AUTH_LOCAL_EMITTED_AUTHORIZED, FG_AUTH_LOCAL_EMITTED_UNAUTHORIZED } from '../fg-auth-local';
import { FG_NAVIGATION_EMITTED_ENDED, FG_NAVIGATION_EMITTED_STARTED, FG_NAVIGATION_EVENT_BLOCK, FG_NAVIGATION_EVENT_ENABLE, FG_NAVIGATION_EVENT_NAVIGATE, FgNavigationMachineMethodeService, FgNavigationMachineService } from '../fg-navigation';
import { REACT_RUNNING_CONTEXT, react_running_context_parser, REACT_RUNNING_EVENT_CALCULATION_START, REACT_RUNNING_EVENT_SELECT_ACTIVE_VIEW } from './react-running_v7.machine.types';
import { forwardTo } from 'xstate';
import { HOST_ROUTES } from '../../enum';
import { ReactViewCalculationMachineService } from '../react-view-calculation';
import { ReactViewHomeMachineService } from '../react-view-home';
import { FgMachineUtilsMethodeService } from '../fg-machine-utils';

@Injectable({
  providedIn: 'root',
})
export class ReactRunningV7MachineService extends FgBaseService {
  protected $common = inject(FgMachineUtilsMethodeService);
  protected $methode = inject(ReactRunningV7MachineMethodeService);
  protected $router = inject(Router);
  protected $xstate = inject(FgXstateService);
  protected $router_machine = inject(FgRouterMachineService);
  protected $machine_navigation = inject(FgNavigationMachineService);
  protected $machine_router = inject(FgRouterMachineService);
  protected $machine_home = inject(ReactViewHomeMachineService);
  protected $machine_calc = inject(ReactViewCalculationMachineService);
  protected HOST_ROUTES = HOST_ROUTES;

  // protected assign_context_from_system = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
  //   const result = this.$immer.produce( context, draft => {
  public get_machine(context?: Partial<REACT_RUNNING_CONTEXT>) {

      return this.$xstate.setup({
      types: {
        context: {} as REACT_RUNNING_CONTEXT,
        events: {} as
          | FG_ROUTER_EMITTED_CANCEL
          | FG_ROUTER_EMITTED_END
          | FG_ROUTER_EMITTED_START
          | REACT_RUNNING_EVENT_CALCULATION_START
          | REACT_RUNNING_EVENT_SELECT_ACTIVE_VIEW
          | FG_AUTH_LOCAL_EMITTED_AUTHORIZED
          | FG_AUTH_LOCAL_EMITTED_UNAUTHORIZED
          | { type: "fg.navigation.event.*" }
          | FG_NAVIGATION_EMITTED_ENDED
          | FG_NAVIGATION_EMITTED_STARTED
          | FG_NAVIGATION_EVENT_NAVIGATE
          | FG_NAVIGATION_EVENT_ENABLE
          | FG_NAVIGATION_EVENT_BLOCK
      },
      actions: {
        assign_auth_cookie_set: this.$xstate.assign(this.$methode.assign_auth_cookie_set),
        assign_auth_cookie_unset: this.$xstate.assign(this.$methode.assign_auth_cookie_unset),
        assign_calculation_set: this.$xstate.assign(this.$methode.assign_calculation_set),
        assign_calculation_unset: this.$xstate.assign(this.$methode.assign_calculation_unset),
        log_info: this.$common.log_info,
        // raise_initial_navigation: this.$xstate.raise(this.$methode.raise_initial_navigation),
        raise_navigation_block: this.$xstate.raise(this.$methode.raise_navigation_block),
        raise_navigation_enable: this.$xstate.raise(this.$methode.raise_navigation_enable),
        raise_navigation_navigate: this.$xstate.raise(this.$methode.raise_navigation_navigate),
        raise_react_running_select_active_view: this.$xstate.raise(this.$methode.raise_react_running_select_active_view),
        send_to_navigation: forwardTo('actor_navigation')
      },
      actors: {
        // actor_calculation: this.$machine_calc.get_machine(),
        actor_calculation: this.$xstate.createMachine({}),
        actor_home: this.$machine_home.get_machine(),
        actor_navigation: this.$machine_navigation.get_machine(),
        actor_router:  this.$machine_router.getMachine(),
      },
      guards: {
        guard_view_calculation: this.$methode.guard_view_calculation,
        guard_view_data_protection: this.$methode.guard_view_data_protection,
        guard_view_imprint: this.$methode.guard_view_imprint,
        guard_is_authorized: this.$methode.guard_is_authorized,
        guard_view_login: this.$methode.guard_view_login,
        guard_view_logout: this.$methode.guard_view_logout,
      },
    }).createMachine({
      context: react_running_context_parser.parse(context ?? {}),
      id: "REACT_RUNNING_V7",
      type: "parallel",
      states: {
        ACTIVE_VIEW: {
          initial: "UNAUTHORIZED",
          // entry: [{
          //   type: 'raise_initial_navigation'
          // }],
          on: {
            "react.running.event.calculation.start": {
              actions: [
                {
                  type: "assign_calculation_set",
                },
                {
                  type: "raise_react_running_select_active_view",
                },
              ],
            },
            "fg.auth.emitted.authorized": {
              actions: [
                {
                  type: "assign_auth_cookie_set",
                },
                {
                  type: "raise_react_running_select_active_view",
                  params: {
                    url: '/' + [HOST_ROUTES.HOME].join('/')
                  }
                },
              ],
            },
            "fg.auth.emitted.unauthorized": {
              actions: [
                {
                  type: "assign_auth_cookie_unset",
                },
                {
                  type: "raise_react_running_select_active_view",
                  params: {
                    url: '/' + [HOST_ROUTES.AUTH, HOST_ROUTES.AUTH_LOGIN ].join('/')
                  }
                },
              ],
            },
            "react.running.select_active_view": [
              {
                target: "#REACT_RUNNING_V7.ACTIVE_VIEW.AUTHORIZED.CALCULATION",
                guard: {
                  type: "guard_view_calculation",
                  params: {
                    url: '/' + [HOST_ROUTES.CALC].join('/')
                  }
                },
              },
              {
                target: "#REACT_RUNNING_V7.ACTIVE_VIEW.AUTHORIZED.LOGOUT",
                guard: {
                  type: "guard_view_logout",
                  params: {
                    url: '/' + [HOST_ROUTES.AUTH, HOST_ROUTES.AUTH_LOGOUT].join('/')
                  }
                },
              },
              {
                target: "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED.IMPRINT",
                guard: {
                  type: "guard_view_imprint",
                  params: {
                    url: '/' + [HOST_ROUTES.IMPRINT].join('/')
                  }
                },
                meta: {
                  url: "imprint",
                },
              },
              {
                target:
                  "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED.DATA_PROTECTION",
                guard: {
                  type: "guard_view_data_protection",
                  params: {
                    url: '/' + [HOST_ROUTES.DATA_PROTECTION].join('/')
                  }
                },
              },
              {
                target: "#REACT_RUNNING_V7.ACTIVE_VIEW.AUTHORIZED",
                guard: {
                  type: "guard_is_authorized",
                },
              },
              {
                target: "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED.LOGIN",
                guard: {
                  type: "guard_view_login",
                  params: {
                    url: '/' + [HOST_ROUTES.AUTH, HOST_ROUTES.AUTH_LOGIN].join('/')
                  }
                },
              },
              {
                target: "#REACT_RUNNING_V7.ACTIVE_VIEW.UNAUTHORIZED",
              },
            ],
          },
          states: {
            UNAUTHORIZED: {
              initial: "LOGIN",
              states: {
                LOGIN: {
                  entry: [
                    {
                      type: "raise_navigation_navigate",
                      params: {
                        url: '/' + [HOST_ROUTES.AUTH, HOST_ROUTES.AUTH_LOGIN].join('/')
                      }
                    }
                  ]
                },
                IMPRINT: {
                  entry: [
                    {
                      type: "raise_navigation_navigate",
                      params: {
                        url: '/' + [HOST_ROUTES.IMPRINT].join('/')
                      }
                    }
                  ]
                },
                DATA_PROTECTION: {
                  entry: [
                    {
                      type: "raise_navigation_navigate",
                      params: {
                        url: '/' + [HOST_ROUTES.DATA_PROTECTION].join('/')
                      }
                    }
                  ]
                },
              },
            },
            AUTHORIZED: {
              initial: "HOME",
              states: {
                HOME: {
                  entry: [
                    {
                      type: "raise_navigation_navigate",
                      params: {
                        url: '/' + [HOST_ROUTES.HOME].join('/')
                      }
                    }
                  ],
                  invoke: {
                    id: "actor_home",
                    systemId: "actor_home",
                    input: {},
                    onDone: {
                      actions: [
                        {
                          type: "assign_calculation_set",
                        },
                        {
                          type: "raise_react_running_select_active_view",
                        },
                      ],
                    },
                    src: "actor_home",
                  },
                },
                CALCULATION: {
                  entry: [
                    {
                      type: "raise_navigation_navigate",
                      params: {
                        url: '/' + [HOST_ROUTES.CALC].join('/')
                      }
                    },
                    {
                      type: "raise_navigation_block",
                    }
                  ],
                  exit: [
                    {
                      type: "assign_calculation_unset",
                    },
                    {
                      type: "raise_navigation_enable",
                    },
                  ],
                  invoke: {
                    id: "actor_calculation",
                    systemId: "actor_calculation",
                    input: {},
                    src: "actor_calculation",
                  },
                },
                LOGOUT: {
                  entry: [
                    {
                      type: "raise_navigation_navigate",
                      params: {
                        url: '/' + [HOST_ROUTES.AUTH, HOST_ROUTES.AUTH_LOGOUT].join('/')
                      }
                    }
                  ]
                },
              },
            },
          },
        },
        ROUTER: {
          on: {
            "fg.router.emitted.start": {
              actions: [
                {
                  type: "raise_react_running_select_active_view",
                },
                // {
                //   type: "log_info",
                //   params: {
                    
                //   }
                // },
              ],
            },
            "fg.router.emitted.end": {
              // actions: {
              //   type: "log_info",
              // },
            },
            "fg.router.emitted.cancel": {
              // actions: {
              //   type: "log_info",
              // },
            },
          },
          invoke: {
            id: "actor_router",
            systemId: "actor_router",
            input: {},
            src: "actor_router",
          },
        },
        NAVIGATION: {
          on: {
            "fg.navigation.emitted.started": {
              // actions: {
              //   type: "log_info",
              // },
            },
            "fg.navigation.emitted.ended": {
              // actions: {
              //   type: "log_info",
              // },
            },
            "fg.navigation.event.*": {
              actions: [
                {
                  type: "send_to_navigation",
                },
                // {
                //   type: "log_info",
                // }
              ],
            },
          },
          invoke: {
            id: "actor_navigation",
            systemId: "actor_navigation",
            input: {},
            src: "actor_navigation",
          },
        },
      },
    });  
  }
}
