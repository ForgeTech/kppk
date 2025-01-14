import { 
  ContextFgAuthLocal,
  ContextFgAuthLocalParser,
  EventFgAuthLocalAuthorized,
  EventFgAuthLocalLogin,
  EventFgAuthLocalLogout,
  EventFgAuthLocalStop,
  EventFgAuthLocalUnauthorized,
} from './fg-auth-local.machine.types';
import { Injectable, inject } from '@angular/core';
import {
  assign,
  fromPromise,
  sendParent,
  setup 
} from 'xstate';
import { FgBaseService } from '@kppk/fg-lib-new';
import { FgAuthLocalMethodeService } from './fg-auth-local-methode.service';
import { parent_context_event_input } from "../machine.utils";

@Injectable({
  providedIn: 'root',
})
export class FgAuthLocalService extends FgBaseService {
  
  protected $methode = inject(FgAuthLocalMethodeService);
  public machine = this.get_machine();
  protected get_machine() {
    return setup({
      types: {
        input: {} as Partial<ContextFgAuthLocal>,
        context: {} as ContextFgAuthLocal,
        events: {} as EventFgAuthLocalLogin
          | EventFgAuthLocalLogout
          | EventFgAuthLocalAuthorized
          | EventFgAuthLocalUnauthorized
          | EventFgAuthLocalStop
      },
      actions: {
        send_authorized_event_to: sendParent(this.$methode.send_authorized_event_to),
        send_unauthorized_event_to: sendParent(this.$methode.send_unauthorized_event_to),
        escalate_auth_local_key_error: this.$methode.escalate_auth_load_cookie_error,
        assign_auth_cookie: assign(this.$methode.assign_auth_cookie),
        assign_auth_key: assign(this.$methode.assign_auth_key),
        assign_authorization_error: assign(this.$methode.assign_authorization_error),
        assign_clear_authorization_error: assign(this.$methode.assign_clear_authorization_error),
        assign_clear_auth_cookie: assign(this.$methode.assign_clear_auth_cookie),
        assign_revoke_authorization_error: assign(this.$methode.assign_revoke_authorization_error),
        escalate_auth_load_cookie_error: this.$methode.escalate_auth_load_cookie_error,
      },
      guards: {
        guard_has_auth_cookie: this.$methode.guard_has_auth_cookie
      },
      actors: {
        actor_load_auth_local_key: fromPromise(this.$methode.actor_load_auth_local_key),
        actor_load_auth_cookie: fromPromise(this.$methode.actor_load_auth_cookie),
        actor_revoke_authorization: fromPromise(this.$methode.actor_revoke_authorization),
        actor_authorization: fromPromise(this.$methode.actor_authorization)
      },
    }).createMachine({
      context: ( { input }: { input: any} ) => {
        return ContextFgAuthLocalParser.parse( input || {})
      },
      id: "FG_AUTH_LOCAL_V1",
      type: "parallel",
      states: {
        STATE: {
          initial: "INITIALIZE",
          on: {
            "fg.auth.local.event.stop": {
              target: "#FG_AUTH_LOCAL_V1.STATE.DONE",
            },
          },
          states: {
            INITIALIZE: {
              type: "parallel",
              onDone: [
                {
                  target: "AUTHORIZED",
                  guard: {
                    type: "guard_has_auth_cookie",
                  },
                },
                {
                  target: "UNAUTHORIZED",
                },
              ],
              states: {
                AUTH_LOCAL_KEY: {
                  initial: "LOAD_AUTH_KEY",
                  states: {
                    LOAD_AUTH_KEY: {
                      invoke: {
                        id: "actor_load_auth_key",
                        input: parent_context_event_input,
                        onDone: {
                          target: "SUCCESS",
                          actions: {
                            type: "assign_auth_key",
                          },
                        },
                        onError: {
                          target:
                            "#FG_AUTH_LOCAL_V1.STATE.FAILURE",
                        },
                        src: "actor_load_auth_local_key",
                      },
                    },
                    SUCCESS: {
                      type: "final",
                    },
                  },
                },
                AUTH_COOKIE: {
                  initial: "LOAD_AUTH_COOKIE",
                  states: {
                    LOAD_AUTH_COOKIE: {
                      invoke: {
                        id: "actor_load_auth_cookie",
                        input: parent_context_event_input,
                        onDone: [
                          {
                            target: "SUCCESS",
                            actions: {
                              type: "assign_auth_cookie",
                            },
                          },
                        ],
                        onError: {
                          target: "SUCCESS",
                          actions: {
                            type: "escalate_auth_load_cookie_error",
                          },
                        },
                        src: "actor_load_auth_cookie",
                      },
                    },
                    SUCCESS: {
                      type: "final",
                    },
                  },
                },
              },
            },
            AUTHORIZED: {
              initial: "PENDING",
              onDone: {
                target: "UNAUTHORIZED",
              },
              entry: {
                type: "send_authorized_event_to",
              },
              states: {
                PENDING: {
                  on: {
                    "fg.auth.local.event.logout": {
                      target: "REVOKE_AUTHORIZATION",
                    },
                  },
                },
                REVOKE_AUTHORIZATION: {
                  invoke: {
                    id: "actor_revoke_authorization",
                    input: parent_context_event_input,
                    onDone: {
                      target: "SUCCESS",
                      actions: {
                        type: "assign_clear_auth_cookie",
                      },
                    },
                    onError: {
                      target: "ERROR",
                      actions: {
                        type: "assign_revoke_authorization_error",
                      },
                    },
                    src: "actor_revoke_authorization",
                  },
                },
                SUCCESS: {
                  type: "final",
                },
                ERROR: {
                  on: {
                    "fg.auth.local.event.logout": {
                      target: "REVOKE_AUTHORIZATION",
                      actions: {
                        type: "assign_clear_authorization_error",
                      },
                    },
                  },
                },
              },
            },
            UNAUTHORIZED: {
              initial: "PENDING",
              onDone: {
                target: "AUTHORIZED",
              },
              entry: {
                type: "send_unauthorized_event_to",
              },
              states: {
                PENDING: {
                  on: {
                    "fg.auth.local.event.login": {
                      target: "AUTHORIZATION",
                    },
                  },
                },
                AUTHORIZATION: {
                  invoke: {
                    id: "actor_authorization",
                    input: parent_context_event_input,
                    onDone: {
                      target: "SUCCESS",
                      actions: {
                        type: "assign_auth_cookie",
                      },
                    },
                    onError: {
                      target: "ERROR",
                      actions: {
                        type: "assign_authorization_error",
                      },
                    },
                    src: "actor_authorization",
                  },
                },
                SUCCESS: {
                  type: "final",
                },
                ERROR: {
                  on: {
                    "fg.auth.local.event.login": {
                      target: "AUTHORIZATION",
                      actions: {
                        type: "assign_clear_authorization_error",
                      },
                    },
                  },
                },
              },
            },
            DONE: {
              type: "final",
            },
            FAILURE: {
              type: "final",
              entry: {
                type: "escalate_auth_local_key_error",
              },
            },
          },
        },
      },
    });
  }
}
