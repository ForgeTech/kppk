import { FgBaseService, FgEnvironmentConfigInterface } from '@kppk/fg-lib';
import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ReactViewHomeService } from '../react-view-home/react-view-home.service';
import { ReactViewCalculationService } from '../react-view-calculation/react-view-calculation.service';
import { ReactAdminToolbarService } from '../react-admin-toolbar/react-admin-toolbar.service';
import { ROUTES_ENUM } from '../../app.routes';
import { REACT_VIEW_CALCULATION_CONTEXT } from '../../types/kppk-react-calculation.types';
import { REACT_INIT_OUTPUT_DATA } from '../react-init/react-init.types';
import { AuthCookieFgAuthLocal, EventFgAuthLocalAuthorizedParser, EventFgAuthLocalUnauthorizedParser } from '../fg-auth-local/fg-auth-local.machine.types';
import { AppConfigInterface } from '../../interface/app.config.interface';
import { react_view_calculation_v1_context_parser } from '../react-view-calculation/react-view-calculation.machine';
import { ReactAdminToolbarV1Context } from '../react-admin-toolbar/react-admin-toolbar.machine';
import { EventFgSpinnerHide, EventFgSpinnerShow } from '../fg-spinner/fg-spinner.machine.types';
import { assign, createMachine, forwardTo, fromEventObservable, raise, sendParent, setup } from 'xstate';
import { REACT_ACTOR_ENUM } from '../react-main/react-mainv2.service';

export type ReactRunningV5Context = {
  environment: FgEnvironmentConfigInterface<AppConfigInterface> | undefined,
  auth_cookie: AuthCookieFgAuthLocal | undefined;
  init_output: REACT_INIT_OUTPUT_DATA | undefined;
  // debug_calculation_v1: REACT_INIT_LOAD_FROM_REMOTE_DEBUG_CALCULATION_V1 | undefined,
  calculation: REACT_VIEW_CALCULATION_CONTEXT | undefined,
  current_url: undefined | string;
  target_url: undefined | string;
};

@Injectable({
  providedIn: 'root',
})
export class ReactRunningV5Service extends FgBaseService {
  public machine;
  // public machineV1;

  protected $immer = inject(FgImmutableService);
  protected $home = inject(ReactViewHomeService);
  protected $calculation = inject(ReactViewCalculationService);
  protected $admin_toolbar = inject(ReactAdminToolbarService);
  protected $router = inject(Router);

  constructor() {
    super();
    this.machine = this.get_machine();
  }

  public actor_react_view_home = () => {
    this.$log.info('REACT_RUNNING_ACTOR: actor_react_view_home');
    return this.$home.machine;
  };

  public actor_calculation = () => {
    this.$log.info('REACT_RUNNING_ACTOR: actor_react_view_calculation');
    return this.$calculation.machine;
  };

  public actor_admin_toolbar = () => {
    this.$log.info('REACT_RUNNING_ACTOR: actor_admin_toolbar');
    return this.$admin_toolbar.machine;
  };

  public actor_route_navigation = () => {
    return this.$router.events.pipe(
      filter( event => event instanceof NavigationStart || event instanceof NavigationEnd ), 
      map( event => {
        if( event instanceof NavigationStart ) {
          return { type: 'fg.navigation.event.start', payload: event };
        } else {
          return { type: 'fg.navigation.event.end', payload: event };
        }
      }),
    );
  }

  public context_react_running_machine = ({ input }: { input: any }) => {
    console.log('>>>>>>>>>>>>>>>>>>>REACT_VIEW_CALCULATION_INPUT>>>>>>>>>>>>>>>>')
    console.log( input );
    const context: ReactRunningV5Context = {
      auth_cookie: undefined,
      init_output: undefined,
      // debug_calculation_v1: undefined,
      calculation: undefined,
      environment: undefined,
      current_url: undefined,
      target_url: undefined,
    }
    const result = Object.assign( context, input);
    return result as ReactRunningV5Context;
  }

  public input_actor_calculation = ({ context, event }: { context: ReactRunningV5Context, event: any}) => {
    // console.log('>>>>>>>>>>>>>>>>>>>react_view_calculation_input>>>>>>>>>>>>>>>>');
    const input = {
      calculation_defaults: event.payload || event.output,
      calculation: event.payload || event.output,
      data: context.init_output?.data
    };
    return  react_view_calculation_v1_context_parser.partial().parse(input);
  }

  public input_actor_home = ({ context, event }: { context: ReactRunningV5Context, event: any}) => {
    // console.log('>>>>>>>>>>>>>>>>>>>react_view_home_input>>>>>>>>>>>>>>>>');
    // console.log( context )
    // console.log( event )
    return { context, event }
  }

  public input_actor_admin_toolbar = ({ context, event }: { context: ReactRunningV5Context, event: any}) => {
    // console.log('>>>>>>>>>>>>>>>>>>>react_admin_toolbar_input>>>>>>>>>>>>>>>>');
    const input: Partial<ReactAdminToolbarV1Context> = {
      auth_cookie: undefined,
      environment: context.environment
    }
    return input as any;
  }

  public assign_auth_cookie_set = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    // console.log(event);
    const authorized_event = EventFgAuthLocalAuthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
      draft.auth_cookie = authorized_event.payload.auth_cookie;
    });
    return result;
  }

  public assign_auth_cookie_unset = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    EventFgAuthLocalUnauthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
      draft.auth_cookie = undefined;
    });
    return result;
  }

  public assign_calculation_set_data = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    // EventFgAuthLocalUnauthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
      draft.calculation = event.payload || event.output;
    });
    return result;
  }

  public assign_calculation_unset_data = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    // EventFgAuthLocalUnauthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
        draft.calculation = undefined;
    });
    return result;
  }

  public assign_navigation_current_url = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.current_url = event?.payload?.urlAfterRedirects;
      // draft.current_url = event?.payload?.url || event?.payload?.urlAfterRedirects;
    });
    return result;
  }

  public assign_target_url_login = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.LOGIN;
    });
    return result;
  }

  public assign_target_url_home = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.HOME;
    });
    return result;
  }
  public assign_target_url_data_protection = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.DATA_PROTECTION;
    });
    return result;
  }
  public assign_target_url_demo = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.DEMO;
    });
    return result;
  }

  public assign_target_url_imprint = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.IMPRINT;
    });
    return result;
  }

  public assign_target_url_calculation = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.CALC;
    });
    return result;
  }

  public assign_target_url_calculation_print = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + [ROUTES_ENUM.CALC, ROUTES_ENUM.CALC_PRINT].join('/');
    });
    return result;
  }

  // public action_router_navigate_to = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
  //   // console.log('>>>>>>>>>>>>>>>>>>>>>>ROUTER_NAVIGATE_TO>>>>>>>>>>>>>>>>>>>>>>>>>')
  //   // console.log( event );
  //   return false;
  // }

  public raise_navigation_internal_end = ({ context, event }: { context: ReactRunningV5Context, event: any }) => {
    return { type: "react.running.navigation.internal.end" } as const;
  }

  public send_to_spinner_hide_event = () => {
    const event: EventFgSpinnerHide = {
      type: 'fg.spinner.event.hide',
      payload: {
        force: false
      }
    };
    return event;
  }

  public send_to_spinner_show_event = () => {
    const event: EventFgSpinnerShow = {
      type: 'fg.spinner.event.show',
      payload: {
        force: false
      }
    };
    return event;
  }

  public guard_is_authorized = ({ context }: { context: ReactRunningV5Context }) => {
    const result = context.auth_cookie ? true : false;
    return result;
  }

  public guard_is_unauthorized = ({ context }: { context: ReactRunningV5Context }) => {
    const result = context.auth_cookie ? false : true;
    return result;
  }

  public guard_current_url_is_login = ({ context }: { context: ReactRunningV5Context }) => {
    const result = context.current_url?.startsWith('/' + ROUTES_ENUM.LOGIN) ? true : false;
    return result;
  }

  public guard_current_url_is_imprint = ({ context }: { context: ReactRunningV5Context }) => {
    const result = context.current_url?.startsWith('/' + ROUTES_ENUM.IMPRINT) ? true : false;
    return result;
  }

  public guard_current_url_is_data_protection = ({ context }: { context: ReactRunningV5Context }) => {
    const result = context.current_url?.startsWith('/' + ROUTES_ENUM.DATA_PROTECTION) ? true : false;
    return result;
  }

  public guard_current_url_is_demo = ({ context }: { context: ReactRunningV5Context }) => {
    const result = context.current_url?.startsWith('/' + ROUTES_ENUM.DEMO) ? true : false;
    return result;
  }
  public guard_has_calculation = ({ context }: { context: ReactRunningV5Context }) => {
    const result = context.calculation ? true : false;
    return result;
  }

  public get_machine = () => {
    return setup({
      types: {
        context: {} as ReactRunningV5Context,
        events: {} as
          | { type: "fg.auth.local.emitted.*" }
          | { type: "fg.auth.local.emitted.authorized" }
          | { type: "fg.auth.local.emitted.unauthorized" }
          | { type: "fg.navigation.event.end" }
          | { type: "fg.navigation.event.start"}
          | { type: "guard_current_url_is print" }
          | { type: "react.running.event.calculation.cancel" }
          | { type: "react.running.event.calculation.save.cancel" }
          | { type: "react.running.event.calculation.save" }
          | { type: "react.running.event.calculation.start",  payload: REACT_VIEW_CALCULATION_CONTEXT }
          | { type: "react.running.navigation.disable" }
          | { type: "react.running.navigation.enable" }
          | { type: "react.running.navigation.internal.end" }
          | { type: "react.running.sidebar.internal.hide" }
          | { type: "react.running.sidebar.internal.show" }
          | { type: "react.sidebar.event.hide" }
          | { type: "react.sidebar.event.show" }
      },
      actions: {
        assign_calculation_set_data: assign(this.assign_calculation_set_data),
        assign_calculation_unset_data: assign(this.assign_calculation_unset_data),
        assign_navigation_current_url: assign(this.assign_navigation_current_url),
        assign_target_url_calculation_print: assign(this.assign_target_url_calculation_print),
        assign_target_url_calculation: assign(this.assign_target_url_calculation),
        assign_target_url_data_protection: assign(this.assign_target_url_data_protection),
        assign_target_url_demo: assign(this.assign_target_url_demo),
        assign_target_url_home: assign(this.assign_target_url_home),
        assign_target_url_imprint: assign(this.assign_target_url_imprint),
        assign_target_url_login: assign(this.assign_target_url_login),
        raise_navigation_internal_end: raise(this.raise_navigation_internal_end),
        send_to_admin_toolbar: forwardTo( REACT_ACTOR_ENUM.REACT_RUNNING_ADMIN_TOOLBAR ),
        send_to_spinner_hide_event: sendParent(this.send_to_spinner_hide_event),
        send_to_spinner_show_event: sendParent(this.send_to_spinner_show_event),
      },
      actors: {
        actor_home: this.actor_react_view_home(),
        actor_calculation: this.actor_calculation(),
        actor_navigation: fromEventObservable(this.actor_route_navigation),
        actor_admin_toolbar: this.actor_admin_toolbar(),
        actor_calculation_print: createMachine({
          /* ... */
        }),
        actor_calculation_save: createMachine({
          /* ... */
        }),
        actor_navigation_enabled: createMachine({
          /* ... */
        }),
      },
      guards: {
        guard_current_url_is_imprint: this.guard_current_url_is_imprint,
        guard_current_url_is_data_protection: this.guard_current_url_is_data_protection,
        guard_has_calculation: this.guard_has_calculation,
        guard_current_url_is_demo: this.guard_current_url_is_demo,
        guard_is_authorized: this.guard_is_authorized,
        guard_current_url_is_login: this.guard_current_url_is_login,
      },
    }).createMachine({
      context: this.context_react_running_machine,
      id: "REACT_RUNNING_V5",
      type: "parallel",
      states: {
        SCREEN: {
          initial: "PENDING",
          on: {
            "fg.auth.local.emitted.authorized": {
              target: "#REACT_RUNNING_V5.SCREEN.PENDING",
            },
            "fg.auth.local.emitted.unauthorized": {
              target: "#REACT_RUNNING_V5.SCREEN.PENDING",
              actions: {
                type: "assign_calculation_unset_data",
              },
            },
            "react.running.event.calculation.start": {
              target: "#REACT_RUNNING_V5.SCREEN.AUTHORIZED.CALCULATION",
              actions: {
                type: "assign_calculation_set_data",
              },
            },
          },
          states: {
            PENDING: {
              always: [
                {
                  target: "#REACT_RUNNING_V5.SCREEN.UNAUTHORIZED.IMPRINT",
                  guard: {
                    type: "guard_current_url_is_imprint",
                  },
                },
                {
                  target: "#REACT_RUNNING_V5.SCREEN.UNAUTHORIZED.DATA_PROTECTION",
                  guard: {
                    type: "guard_current_url_is_data_protection",
                  },
                },
                {
                  target: "#REACT_RUNNING_V5.SCREEN.AUTHORIZED.CALCULATION",
                  guard: {
                    type: "guard_has_calculation",
                  },
                },
                {
                  target: "#REACT_RUNNING_V5.SCREEN.UNAUTHORIZED.DEMO",
                  guard: {
                    type: "guard_current_url_is_demo",
                  },
                },
                {
                  target: "AUTHORIZED",
                  guard: {
                    type: "guard_is_authorized",
                  },
                },
                {
                  target: "#REACT_RUNNING_V5.SCREEN.UNAUTHORIZED.LOGIN",
                  guard: {
                    type: "guard_current_url_is_login",
                  },
                },
              ],
            },
            AUTHORIZED: {
              initial: "HOME",
              states: {
                HOME: {
                  on: {
                    "react.running.navigation.internal.end": {
                      target: "#REACT_RUNNING_V5.SCREEN.PENDING",
                    },
                  },
                  entry: {
                    type: "assign_target_url_home",
                  },
                  invoke: {
                    id: "actor_home",
                    input: this.input_actor_home,
                    onDone: {
                      target: "CALCULATION",
                      actions: {
                        type: "assign_calculation_set_data",
                      },
                    },
                    onError: {
                      target: "ERROR",
                    },
                    src: "actor_home",
                  },
                },
                CALCULATION: {
                  initial: "VIEW",
                  on: {
                    "react.running.event.calculation.cancel": {
                      target: "HOME",
                      actions: {
                        type: "assign_calculation_unset_data",
                      },
                    },
                  },
                  entry: {
                    type: "assign_target_url_calculation",
                  },
                  invoke: {
                    id: "actor_calculation",
                    input: this.input_actor_calculation,
                    onError: {
                      target: "ERROR",
                    },
                    src: "actor_calculation",
                  },
                  states: {
                    VIEW: {
                      on: {
                        "guard_current_url_is print": {
                          target: "PRINT",
                        },
                        "react.running.event.calculation.cancel": {
                          target: "PRINT",
                        },
                        "react.running.event.calculation.save": {
                          target: "SAVE",
                        },
                      },
                      entry: {
                        type: "assign_target_url_calculation",
                      },
                    },
                    PRINT: {
                      entry: {
                        type: "assign_target_url_calculation_print",
                      },
                      invoke: {
                        id: "actor_calculation_print",
                        input: {},
                        onDone: {
                          target: "VIEW",
                        },
                        onError: {
                          target: "ERROR",
                        },
                        src: "actor_calculation_print",
                      },
                    },
                    SAVE: {
                      on: {
                        "react.running.event.calculation.save.cancel": {
                          target: "VIEW",
                        },
                      },
                      invoke: {
                        id: "actor_calculation_save",
                        input: {},
                        onDone: {
                          target: "VIEW",
                        },
                        onError: {
                          target: "ERROR",
                        },
                        src: "actor_calculation_save",
                      },
                    },
                    ERROR: {},
                  },
                },
                ERROR: {},
              },
            },
            UNAUTHORIZED: {
              initial: "LOGIN",
              on: {
                "react.running.navigation.internal.end": {
                  target: "PENDING",
                },
              },
              states: {
                LOGIN: {
                  entry: {
                    type: "assign_target_url_login",
                  },
                },
                IMPRINT: {
                  entry: {
                    type: "assign_target_url_imprint",
                  },
                },
                DATA_PROTECTION: {
                  entry: {
                    type: "assign_target_url_data_protection",
                  },
                },
                DEMO: {
                  entry: {
                    type: "assign_target_url_demo",
                  },
                },
              },
            },
          },
        },
        NAVIGATION: {
          initial: "ENABLED",
          states: {
            ENABLED: {
              on: {
                "fg.navigation.event.end": {
                  actions: [
                    {
                      type: "assign_navigation_current_url",
                    },
                    {
                      type: "raise_navigation_internal_end",
                    },
                    {
                      type: "send_to_spinner_hide_event",
                    },
                  ],
                },
                "fg.navigation.event.start": {
                  actions: {
                    type: "send_to_spinner_show_event",
                  },
                },
                "react.running.navigation.disable": {
                  target: "DISABLED",
                },
              },
              invoke: {
                id: "actor_navigation_enabled",
                input: {},
                src: "actor_navigation_enabled",
              },
            },
            DISABLED: {
              on: {
                "react.running.navigation.enable": {
                  target: "ENABLED",
                },
              },
            },
          },
        },
        ADMIN_TOOLBAR: {
          // on: {
          //   "fg.auth.local.emitted.*": {
          //     actions: {
          //       type: "send_to_admin_toolbar",
          //     },
          //   },
          // },
          invoke: {
            id: "actor_admin_toolbar",
            input: this.input_actor_admin_toolbar,
            src: "actor_admin_toolbar",
          },
        },
        SIDEBAR: {
          initial: "SHOWN",
          states: {
            SHOWN: {
              on: {
                "react.sidebar.event.hide": {
                  target: "HIDDEN",
                },
                "react.running.sidebar.internal.show": {
                  target: "HIDDEN",
                },
              },
            },
            HIDDEN: {
              on: {
                "react.sidebar.event.show": {
                  target: "SHOWN",
                },
                "react.running.sidebar.internal.hide": {
                  target: "SHOWN",
                },
              },
            },
          },
        },
      },
    });
  }
  
}
