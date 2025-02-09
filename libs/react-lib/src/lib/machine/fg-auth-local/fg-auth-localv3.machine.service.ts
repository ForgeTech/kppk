import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { assign, emit, fromPromise, sendParent, setup } from 'xstate';
import {
  fg_auth_local_context_parser,
  FG_AUTH_LOCAL_CONTEXT,
  FG_AUTH_EVENT_LOGIN,
  FG_AUTH_LOCAL_EVENT_LOGOUT,
  FG_AUTH_LOCAL_EMITTED_UNAUTHORIZED,
  FG_AUTH_LOCAL_EMITTED_AUTHORIZED,
  FG_AUTH_LOCAL_EVENT_STOP,
} from './fg-auth-local.machine.types';
import { FgAuthLocalMachineMethodeService } from './fg-auth-local.machine.methode.service';
import { parent_context_event_input } from '../machine.utils';

@Injectable({
  providedIn: 'root',
})
export class FgAuthLocalV3MachineService extends FgBaseService {
  protected $methode = inject(FgAuthLocalMachineMethodeService);

  public get_machine() {
    return setup({
      types: {
        input: {} as Partial<FG_AUTH_LOCAL_CONTEXT>,
        context: {} as FG_AUTH_LOCAL_CONTEXT,
        events: {} as
          | FG_AUTH_EVENT_LOGIN
          | FG_AUTH_LOCAL_EVENT_LOGOUT
          | FG_AUTH_LOCAL_EMITTED_AUTHORIZED
          | FG_AUTH_LOCAL_EMITTED_UNAUTHORIZED
          | FG_AUTH_LOCAL_EVENT_STOP
          | { type: 'fg.auth.local.event.initialize' },
      },
      actions: {
        send_authorized_event_to: sendParent(
          this.$methode.send_authorized_event_to
        ),
        send_unauthorized_event_to: sendParent(
          this.$methode.send_unauthorized_event_to
        ),
        escalate_auth_local_key_error:
          this.$methode.escalate_auth_load_cookie_error,
        assign_auth_cookie: assign(this.$methode.assign_auth_cookie),
        assign_auth_key: assign(this.$methode.assign_auth_key),
        assign_authorization_error: assign(
          this.$methode.assign_authorization_error
        ),
        assign_clear_authorization_error: assign(
          this.$methode.assign_clear_authorization_error
        ),
        assign_clear_auth_cookie: assign(
          this.$methode.assign_clear_auth_cookie
        ),
        assign_revoke_authorization_error: assign(
          this.$methode.assign_revoke_authorization_error
        ),
        escalate_auth_load_cookie_error:
          this.$methode.escalate_auth_load_cookie_error,
        assign_error: assign(this.$methode.assign_error),
        log_error: this.$methode.log_error,
        emit_error: emit(this.$methode.emit_error),
        emit_unauthorized_event: emit(this.$methode.emit_unauthorized_event),
        emit_authorized_event: emit(this.$methode.emit_authorized_event),
      },
      guards: {
        guard_has_auth_cookie: this.$methode.guard_has_auth_cookie,
      },
      actors: {
        actor_load_auth_local_key: fromPromise(
          this.$methode.actor_load_auth_local_key
        ),
        actor_load_auth_cookie: fromPromise(
          this.$methode.actor_load_auth_cookie
        ),
        actor_revoke_authorization: fromPromise(
          this.$methode.actor_revoke_authorization
        ),
        actor_authorization: fromPromise(this.$methode.actor_authorization),
      },
    }).createMachine({
      context: fg_auth_local_context_parser.parse({}),
      id: 'FG_AUTH_LOCAL_V3',
      type: 'parallel',
      states: {
        STATE: {
          initial: 'INITIALIZE',
          on: {
            'fg.auth.local.event.initialize': {
              target: '#FG_AUTH_LOCAL_V3.STATE.INITIALIZE',
            },
          },
          states: {
            INITIALIZE: {
              type: 'parallel',
              onDone: [
                {
                  target: 'AUTHORIZED',
                  actions: {
                    type: 'emit_authorized_event',
                  },
                  guard: {
                    type: 'guard_has_auth_cookie',
                  },
                },
                {
                  target: 'UNAUTHORIZED',
                  actions: {
                    type: 'emit_unauthorized_event',
                  },
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
                          target: 'ERROR',
                        },
                        src: 'actor_load_auth_local_key',
                      },
                    },
                    SUCCESS: {
                      type: 'final',
                    },
                    ERROR: {
                      entry: [
                        {
                          type: 'assign_error',
                        },
                        {
                          type: 'log_error',
                        },
                        {
                          type: 'emit_error',
                        },
                      ],
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
                        onDone: {
                          target: 'SUCCESS',
                          actions: {
                            type: 'assign_auth_cookie',
                          },
                        },
                        onError: {
                          target: 'SUCCESS',
                          description:
                            'Treat error while loading cookie like no cookie available',
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
                actions: {
                  type: 'emit_unauthorized_event',
                },
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
                  entry: [
                    {
                      type: 'assign_error',
                    },
                    {
                      type: 'log_error',
                    },
                    {
                      type: 'emit_error',
                    },
                  ],
                },
              },
            },
            UNAUTHORIZED: {
              initial: 'PENDING',
              onDone: {
                target: 'AUTHORIZED',
                actions: {
                  type: 'emit_authorized_event',
                },
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
                  entry: [
                    {
                      type: 'assign_error',
                    },
                    {
                      type: 'log_error',
                    },
                    {
                      type: 'emit_error',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    });
  }
}
