import { filter, map, of, throttleTime } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import {
  createActor,
  createMachine,
  forwardTo,
  fromEventObservable,
  setup,
} from 'xstate';
import { AppConfigInterface } from './../../interface/app.config.interface';

import { FgXstateService } from '../../service/fg-xstate.service';
import { FG_SPINNER_EVENT_HIDE, FG_SPINNER_EVENT_SHOW, FgSpinnerMachineService } from '../fg-spinner';
import { FG_AUTH_LOCAL_EVENT_LOGIN, FG_AUTH_LOCAL_EVENT_LOGOUT, FgAuthLocalMachineService } from '../fg-auth-local';
import { ReactInitMachineService } from '../react-init';
import { FgImmutableService } from '../../service';
import { FgEnvironmentConfigInterface } from '@kppk/fg-lib-new';
import { FgBaseService, FgEnvironmentService } from '@kppk/fg-lib-new';
import { REACT_INIT_CONTEXT, react_init_context_parser } from '../../types';
import { ReactRunningV7MachineService } from '../react-running_v7';

export enum REACT_ACTOR_ENUM {
  FG_AUTH_LOCAL = 'fg_auth_local',
  FG_SPINNER = 'fg_spinner',
  FG_TICK = 'fg_tick',
  FG_UI_DISPLAY_MODE = 'fg_ui_display_mode',
  FG_UI_SCHEME_THEME = 'fg_ui_scheme_theme',
  FG_UI = 'fg_ui',
  REACT_INIT = 'react_init',
  REACT_MAIN = 'react_main',
  REACT_RECOVERY = 'react_recovery',
  REACT_RUNNING = 'react_running',
  REACT_RUNNING_ADMIN_TOOLBAR = 'react_running_admin_toolbar',
  REACT_RUNNING_NAVIGATION = 'react_running_navigation',
  REACT_VIEW_HOME = 'react_view_home',
  REACT_VIEW_CALCULATION = 'react_view_calculation',
}

export type EVENT_REACT_MAIN =
  | { type: 'fg.ui.*' }
  | { type: 'react.event.stop' }
  | { type: 'fg.auth.local.event.logout' }
  | { type: 'fg.auth.local.event.*' }
  | {
      type: 'fg.tick.emitted.tick';
      payload: {
        date: string;
      };
    }
  | { type: 'fg.ui.emitted.*' }
  | { type: 'fg.spinner.event.*' }
  | FG_SPINNER_EVENT_HIDE
  | FG_SPINNER_EVENT_SHOW
  | { type: 'fg.auth.local.emitted.*' }
  | FG_AUTH_LOCAL_EVENT_LOGIN
  | FG_AUTH_LOCAL_EVENT_LOGOUT

export type CONFIG_ENVIRONMENT =
  FgEnvironmentConfigInterface<AppConfigInterface>;

export type CONTEXT_ERROR = {
  error?: string;
};
export type CONTEXT_REACT_MAIN_V2 = {
  environment: CONFIG_ENVIRONMENT;
  error?: string;
};

@Injectable({
  providedIn: 'root',
})
export class ReactMainV2Service extends FgBaseService {
  protected $env = inject(FgEnvironmentService);
  protected $spinner = inject(FgSpinnerMachineService);
  protected $auth = inject(FgAuthLocalMachineService);
  protected $react_init = inject(ReactInitMachineService);
  protected $react_running = inject(ReactRunningV7MachineService);
  protected $xstate = inject(FgXstateService);
  protected $immutable = inject(FgImmutableService);
  // protected $appRef = inject(ApplicationRef);

  public machine;
  public actor;

  constructor() {
    super();
    this.machine = this.get_machine();
    // this.$appRef.isStable.subscribe( value => {
    //   if( value ) {
    //     console.log('>>>>>APP_REF is_stable >>>>>>>:', value)
    //   }
    // })
    this.actor = createActor(this.machine, {
      systemId: REACT_ACTOR_ENUM.REACT_MAIN,
      inspect: this.$xstate.inspect,
      input: {
        version: this.$env.version,
        production: this.$env.production,
        serviceWorker: this.$env.serviceWorker,
        request: this.$env.request,
        logger: this.$env.logger,
        i18n: this.$env.i18n,
        development: this.$env.development,
        storage: this.$env.storage,
        test: this.$env.test,
        app: this.$env.app,
      },
    });
    // this.actor.start();
  }

  public override ngOnDestroy() {
    this.actor.stop();
    super.ngOnDestroy();
  }

  public context_react_main = ({ input }: { input: CONFIG_ENVIRONMENT }) => {
    const context: CONTEXT_REACT_MAIN_V2 = {
      environment: input,
    };
    this.$log?.warn(
      'TODO: Add parser for ENVIRONMENT_CONFIG/CONTEXT_REACT_MAIN_V2 input'
    );
    return context;
  };

  public input_react_init_actor = ({
    context,
  }: {
    context: CONTEXT_REACT_MAIN_V2;
  }) => {
    const input: Partial<REACT_INIT_CONTEXT> = {
      // environment: context.environment,
    };
    this.$log?.error('>>>>>>>>>>INPUT>>>>>>>>>>>');
    console.log(input);
    const result = react_init_context_parser.partial().parse(input);
    this.$log?.error('>>>>>>>>>>INPUT>>>>>>>>>>>');
    console.log(result);
    return result as Partial<REACT_INIT_CONTEXT>;
  };

  public log_react_running = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_react_running');
  };

  public log_react_app_done = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_react_app_done');
  };

  public log_react_done = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_react_done');
  };

  public log_fg_auth_done = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_fg_auth_done');
  };

  public log_fg_ui_done = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_fg_ui_done');
  };

  public log_fg_spinner_done = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_fg_spinner_done');
  };

  public log_fg_tick_done = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_fg_tickr_done');
  };

  public log_fatal = ({ context, event }: { context: any; event: any }) => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_fatal');
    this.$log?.fatal('FATAL_ERROR:');
    if (context.error) {
      this.$log?.fatal(context.error);
    }
    if (event) {
      console.log(event.input);
    }
  };

  public log_error = ({ context, event }: { context: any; event: any }) => {
    this.$log?.info('FG_REACT_PWA_MAIN: log_error');
    this.$log?.error('>>>>>>>>>>>>ERROR>>>>>>>>>>>>');
    console.log('context');
    console.log(context);
    console.log('event');
    console.log(event);
    if (context.error) {
      this.$log?.fatal(context.error);
    }
    if (event) {
      console.log(event);
    }
  };

  public send_to_spinner = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: send_to_spinner');
    return forwardTo(REACT_ACTOR_ENUM.FG_SPINNER);
  };

  public send_to_auth = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: send_to_aut');
    return forwardTo(REACT_ACTOR_ENUM.FG_AUTH_LOCAL);
  };

  public send_to_running = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: send_to_running');
    return forwardTo(REACT_ACTOR_ENUM.REACT_RUNNING);
  };

  public actor_fg_spinner = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: actor_fg_spinner');
    return this.$spinner.get_machine();
  };

  public actor_react_initialize = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: actor_react_initialize');
    return this.$react_init.get_machine();
  };

  public actor_react_running = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: actor_react_running');
    return this.$react_running.get_machine();
  };

  public actor_react_recovery = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: actor_react_recovery');
    return createMachine({});
  };

  public actor_fg_ui = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: actor_fg_ui');
    return createMachine({});
  };

  public actor_fg_auth_local = () => {
    this.$log?.info('FG_REACT_PWA_MAIN: actor_fg_auth_local');
    // console.log( input );
    return this.$auth.get_machine();
  };

  // public actor_fg_tick = () => {
  //   return this.$appRef.isStable.pipe(
  //     filter( isStable => false ),
  //     throttleTime(1000),
  //     map( event => {
  //         return { type: 'fg.tick.emitted.tick', payload: {
  //           date: new Date().toUTCString()
  //         } };
  //     }),
  //   );
  // }
  public actor_fg_tick = () => {
    return of(true).pipe(
      filter((isStable) => false),
      throttleTime(1000),
      map((event) => {
        this.$log?.warn('>>>THROW_EVENT');
        return {
          type: 'fg.tick.emitted.tick',
          payload: {
            date: new Date().toUTCString(),
          },
        };
      })
    );
  };

  public get_machine() {
    return setup({
      types: {
        input: {} as CONFIG_ENVIRONMENT,
        context: {} as CONTEXT_REACT_MAIN_V2,
        events: {} as EVENT_REACT_MAIN,
      },
      actions: {
        log_react_running: this.log_react_running,
        log_react_app_done: this.log_react_app_done,
        log_react_done: this.log_react_done,
        log_fg_auth_done: this.log_fg_auth_done,
        log_fg_ui_done: this.log_fg_ui_done,
        log_fg_spinner_done: this.log_fg_spinner_done,
        log_fg_tick_done: this.log_fg_tick_done,
        log_fatal: this.log_fatal,
        log_error: this.log_error,
        send_to_spinner: this.send_to_spinner,
        send_to_auth: this.send_to_auth,
        send_to_running: this.send_to_running,
      },
      actors: {
        actor_fg_spinner: this.actor_fg_spinner(),
        actor_react_initialize: this.actor_react_initialize(),
        actor_react_running: this.actor_react_running(),
        actor_react_recovery: this.actor_react_recovery(),
        actor_fg_ui: this.actor_fg_ui(),
        actor_fg_auth_local: this.actor_fg_auth_local(),
        actor_fg_tick: fromEventObservable(this.actor_fg_tick),
      },
    }).createMachine({
      id: 'REACT_MAIN_V2',
      initial: 'RUNNING',
      context: this.context_react_main,
      on: {
        'react.event.stop': {
          target: '#REACT_MAIN_V2.DONE',
        },
      },
      description:
        'R.E.A.C.T.® is an online tool developed by KPPK Civil Techiker GmbH.',
      states: {
        RUNNING: {
          type: 'parallel',
          onDone: {
            target: 'DONE',
          },
          entry: {
            type: 'log_react_running',
          },
          states: {
            APP: {
              initial: 'INITIALIZE',
              states: {
                INITIALIZE: {
                  invoke: {
                    id: REACT_ACTOR_ENUM.REACT_INIT,
                    input: this.input_react_init_actor,
                    onDone: {
                      target: 'RUNNING',
                    },
                    // onError: {
                    //   target: "#REACT_MAIN_V2.RUNNING.ERROR",
                    // },
                    src: 'actor_react_initialize',
                  },
                  description:
                    'Loads, collects, prepares, validates all resources require for application in running state',
                },
                RUNNING: {
                  // entry: [
                  //   { type: 'log_error'}
                  // ],
                  on: {
                    'fg.auth.local.emitted.*': {
                      actions: {
                        type: 'send_to_running',
                      },
                    },
                    'fg.ui.emitted.*': {
                      actions: {
                        type: 'send_to_running',
                      },
                    },
                  },
                  invoke: {
                    id: REACT_ACTOR_ENUM.REACT_RUNNING,
                    input: undefined,
                    onDone: {
                      target: 'DONE',
                      actions: [{ type: 'log_error' }],
                    },
                    onError: {
                      target: '#REACT_MAIN_V2.RUNNING.ERROR',
                      actions: [{ type: 'log_error' }],
                    },
                    src: 'actor_react_running',
                  },
                  description:
                    'Represents successfully initialized running application',
                },
                DONE: {
                  type: 'final',
                  entry: {
                    type: 'log_react_app_done',
                  },
                  description:
                    'Application was stopped - this should usually only happen in case of **unrecoverable error** or explicitly triggered by **event_fg_app_react_stop** and lead to a **full purge of application resources**',
                },
              },
            },
            UI: {
              on: {
                'fg.ui.*': {
                  actions: {
                    type: 'send_to_running',
                  },
                },
              },
              invoke: {
                id: REACT_ACTOR_ENUM.FG_UI,
                input: {},
                onDone: {
                  actions: {
                    type: 'log_fg_ui_done',
                  },
                },
                // onError: {
                //   target: "ERROR",
                // },
                src: 'actor_fg_ui',
              },
              description:
                'Controlls common app user-interface funtionallity like online/offline status, color- scheme/theme selection, language settings etc. that are mostly app independent',
            },
            AUTH: {
              on: {
                'fg.auth.local.event.*': {
                  actions: {
                    type: 'send_to_auth',
                  },
                },
              },
              invoke: {
                id: REACT_ACTOR_ENUM.FG_AUTH_LOCAL,
                input: {},
                onDone: {
                  actions: {
                    type: 'log_fg_auth_done',
                  },
                },
                // onError: {
                //   target: "ERROR",
                // },
                src: 'actor_fg_auth_local',
              },
              description:
                'Controlls and manages authentification and related tasks for the application.',
            },
            SPINNER: {
              on: {
                'fg.spinner.event.*': {
                  actions: {
                    type: 'send_to_spinner',
                  },
                },
              },
              invoke: {
                id: REACT_ACTOR_ENUM.FG_SPINNER,
                input: {},
                onDone: {
                  actions: {
                    type: 'log_fg_spinner_done',
                  },
                },
                // onError: {
                //   target: "ERROR",
                // },
                src: 'actor_fg_spinner',
              },
              description:
                'Provides a global loading/progress spinner machine for the application',
            },
            TICK: {
              on: {
                'fg.tick.emitted.*': {
                  actions: {
                    type: 'send_to_running',
                  },
                },
              },
              invoke: {
                id: REACT_ACTOR_ENUM.FG_TICK,
                input: {},
                onDone: {
                  actions: {
                    type: 'log_fg_tick_done',
                  },
                },
                // onError: {
                //   target: "ERROR",
                // },
                src: 'actor_fg_tick',
              },
              description:
                'Provides a tick when angular application isStable equals true',
            },
            ERROR: {
              type: 'final',
              entry: ['log_fatal'],
            },
          },
        },
        DONE: {
          type: 'final',
          entry: {
            type: 'log_react_done',
          },
        },
      },
    });
  }
}
