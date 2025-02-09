import {
  FG_AUTH_LOCAL_CONTEXT,
  fg_auth_local_context_parser,
  FG_AUTH_LOCAL_EMITTED_AUTHORIZED,
  FG_AUTH_EVENT_LOGIN,
  FG_AUTH_LOCAL_EVENT_LOGOUT,
  FG_AUTH_LOCAL_EVENT_STOP,
  FG_AUTH_LOCAL_EMITTED_UNAUTHORIZED,
} from './fg-auth-local.machine.types';
import { Injectable, inject } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';
import { FgAuthLocalMachineMethodeService } from './fg-auth-local.machine.methode.service';
import { parent_context_event_input } from '../machine.utils';
import { FgXstateService } from '../../service';

@Injectable({
  providedIn: 'root',
})
export class FgAuthLocalMachineService extends FgBaseService {
  protected $xstate = inject(FgXstateService);
  protected $methode = inject(FgAuthLocalMachineMethodeService);

  public get_machine(context?: FG_AUTH_LOCAL_CONTEXT) {
    return this.$xstate
      .setup({
        types: {
          input: {} as Partial<FG_AUTH_LOCAL_CONTEXT>,
          context: {} as FG_AUTH_LOCAL_CONTEXT,
          events: {} as
            | FG_AUTH_EVENT_LOGIN
            | FG_AUTH_LOCAL_EVENT_LOGOUT
            | FG_AUTH_LOCAL_EMITTED_AUTHORIZED
            | FG_AUTH_LOCAL_EMITTED_UNAUTHORIZED
            | FG_AUTH_LOCAL_EVENT_STOP
        },
        actions: {
          assign_auth_cookie: this.$xstate.assign(this.$methode.assign_auth_cookie),
          assign_auth_key: this.$xstate.assign(this.$methode.assign_auth_key),
          assign_authorization_error: this.$xstate.assign(this.$methode.assign_authorization_error),
          assign_clear_auth_cookie: this.$xstate.assign(this.$methode.assign_clear_auth_cookie),
          assign_clear_authorization_error: this.$xstate.assign(this.$methode.assign_clear_authorization_error),
          assign_revoke_authorization_error: this.$xstate.assign(this.$methode.assign_revoke_authorization_error),
          escalate_auth_load_cookie_error: this.$methode.escalate_auth_load_cookie_error,
          escalate_auth_local_key_error: this.$methode.escalate_auth_load_cookie_error,
          send_authorized_event_to: this.$xstate.emit(this.$methode.send_authorized_event_to),
          send_unauthorized_event_to: this.$xstate.emit(this.$methode.send_unauthorized_event_to),
        },
        guards: {
          guard_has_auth_cookie: this.$methode.guard_has_auth_cookie,
        },
        actors: {
          actor_load_auth_local_key: this.$xstate.fromPromise(this.$methode.actor_load_auth_local_key),
          actor_load_auth_cookie: this.$xstate.fromPromise(this.$methode.actor_load_auth_cookie),
          actor_revoke_authorization: this.$xstate.fromPromise(this.$methode.actor_revoke_authorization),
          actor_authorization: this.$xstate.fromPromise(this.$methode.actor_authorization),
        },
      })
      .createMachine({
        context: ({ input }) => {
            return fg_auth_local_context_parser.parse(context || {});
        },
        id: 'FG_AUTH_LOCAL_V1',
        type: 'parallel',
        states: {
          STATE: {
            initial: 'INITIALIZE',
            on: {
              'fg.auth.event.stop': {
                target: '#FG_AUTH_LOCAL_V1.STATE.DONE',
              },
            },
            states: {
              INITIALIZE: {
                type: 'parallel',
                onDone: [
                  {
                    target: 'AUTHORIZED',
                    guard: {
                      type: 'guard_has_auth_cookie',
                    },
                  },
                  {
                    target: 'UNAUTHORIZED',
                  },
                ],
                states: {
                  AUTH_LOCAL_KEY: {
                    initial: 'LOAD_AUTH_KEY',
                    states: {
                      LOAD_AUTH_KEY: {
                        invoke: {
                          id: 'actor_load_auth_key',
                          input: parent_context_event_input,
                          onDone: {
                            target: 'SUCCESS',
                            actions: {
                              type: 'assign_auth_key',
                            },
                          },
                          onError: {
                            target: '#FG_AUTH_LOCAL_V1.STATE.FAILURE',
                          },
                          src: 'actor_load_auth_local_key',
                        },
                      },
                      SUCCESS: {
                        type: 'final',
                      },
                    },
                  },
                  AUTH_COOKIE: {
                    initial: 'LOAD_AUTH_COOKIE',
                    states: {
                      LOAD_AUTH_COOKIE: {
                        invoke: {
                          id: 'actor_load_auth_cookie',
                          input: parent_context_event_input,
                          onDone: [
                            {
                              target: 'SUCCESS',
                              actions: {
                                type: 'assign_auth_cookie',
                              },
                            },
                          ],
                          onError: {
                            target: 'SUCCESS',
                            actions: {
                              type: 'escalate_auth_load_cookie_error',
                            },
                          },
                          src: 'actor_load_auth_cookie',
                        },
                      },
                      SUCCESS: {
                        type: 'final',
                      },
                    },
                  },
                },
              },
              AUTHORIZED: {
                initial: 'PENDING',
                onDone: {
                  target: 'UNAUTHORIZED',
                },
                entry: {
                  type: 'send_authorized_event_to',
                },
                states: {
                  PENDING: {
                    on: {
                      'fg.auth.event.logout': {
                        target: 'REVOKE_AUTHORIZATION',
                      },
                    },
                  },
                  REVOKE_AUTHORIZATION: {
                    invoke: {
                      id: 'actor_revoke_authorization',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'SUCCESS',
                        actions: {
                          type: 'assign_clear_auth_cookie',
                        },
                      },
                      onError: {
                        target: 'ERROR',
                        actions: {
                          type: 'assign_revoke_authorization_error',
                        },
                      },
                      src: 'actor_revoke_authorization',
                    },
                  },
                  SUCCESS: {
                    type: 'final',
                  },
                  ERROR: {
                    on: {
                      'fg.auth.event.logout': {
                        target: 'REVOKE_AUTHORIZATION',
                        actions: {
                          type: 'assign_clear_authorization_error',
                        },
                      },
                    },
                  },
                },
              },
              UNAUTHORIZED: {
                initial: 'PENDING',
                onDone: {
                  target: 'AUTHORIZED',
                },
                entry: {
                  type: 'send_unauthorized_event_to',
                },
                states: {
                  PENDING: {
                    on: {
                      'fg.auth.event.login': {
                        target: 'AUTHORIZATION',
                      },
                    },
                  },
                  AUTHORIZATION: {
                    invoke: {
                      id: 'actor_authorization',
                      input: parent_context_event_input,
                      onDone: {
                        target: 'SUCCESS',
                        actions: {
                          type: 'assign_auth_cookie',
                        },
                      },
                      onError: {
                        target: 'ERROR',
                        actions: {
                          type: 'assign_authorization_error',
                        },
                      },
                      src: 'actor_authorization',
                    },
                  },
                  SUCCESS: {
                    type: 'final',
                  },
                  ERROR: {
                    on: {
                      'fg.auth.event.login': {
                        target: 'AUTHORIZATION',
                        actions: {
                          type: 'assign_clear_authorization_error',
                        },
                      },
                    },
                  },
                },
              },
              DONE: {
                type: 'final',
              },
              FAILURE: {
                type: 'final',
                entry: {
                  type: 'escalate_auth_local_key_error',
                },
              },
            },
          },
        },
      });
  }
}
