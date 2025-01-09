import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { ActorRefFrom, EventFromLogic, setup, SnapshotFrom } from 'xstate';
import {
  FG_AUTH_LOCAL_V1,
  FgAuthLocalV1ParentInput,
} from './fg-auth-local.machine';
import { HttpClient } from '@angular/common/http';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { HMAC } from 'crypto-es/lib/core';
import { SHA256Algo } from 'crypto-es/lib/sha256';
import { Base64 } from 'crypto-es/lib/enc-base64';
import {
  AuthCookieFgAuthLocalParser,
  ContextFgAuthLocalParser,
  EventFgAuthLocalAuthorizedParser,
  EventFgAuthLocalLoginParser,
  EventFgAuthLocalUnauthorizedParser,
  FgAuthLocalContext,
  SaltFileContentFgAuthLocalParser,
} from './fg-auth-local.machine.types';
import { catchError, firstValueFrom, map, tap } from 'rxjs';
import { CookieOptions } from 'ngx-cookie';
import {
  FgStorageNgxCookieService,
  FgTimeStringService,
} from '@kppk/fg-lib-new';

export type FgAuthLocalActorRef = ActorRefFrom<typeof FG_AUTH_LOCAL_V1>;
export type FgAuthLocalV1Snapshot = SnapshotFrom<typeof FG_AUTH_LOCAL_V1>;
export type FgAuthLocalV1Event = EventFromLogic<typeof FG_AUTH_LOCAL_V1>;
export type FgAuthLocalV1Actor = typeof FG_AUTH_LOCAL_V1;

@Injectable({
  providedIn: 'root',
})
export class FgAuthLocalV3Service extends FgBaseService {
  public machine;
  // public machine_parent;
  // public actor;
  // public state$;

  protected $immer = inject(FgImmutableService);
  protected $cookie = inject(FgStorageNgxCookieService);
  protected $http = inject(HttpClient);
  protected $time = inject(FgTimeStringService);

  constructor() // protected $xstate: FgXstateService
  {
    super();

    this.machine = this.get_machine();
  }

  public createHashValidForPathUrl = (toHash: string, salt: string): string => {
    const hash = HMAC.create(SHA256Algo, salt).finalize(toHash);
    return Base64.stringify(hash).split('+').join('-').split('/').join('_');
  };

  public send_authorized_event_to = ({
    context,
  }: {
    context: FgAuthLocalContext;
  }) => {
    const result = EventFgAuthLocalAuthorizedParser.parse({
      type: 'fg.auth.local.emitted.authorized',
      payload: {
        auth_cookie: context.auth_cookie,
      },
    });
    return result;
  };

  public send_unauthorized_event_to = ({
    context,
  }: {
    context: FgAuthLocalContext;
  }) => {
    return EventFgAuthLocalUnauthorizedParser.parse({
      type: 'fg.auth.local.emitted.unauthorized',
    });
  };

  public escalate_auth_local_key_error = ({
    context,
  }: {
    context: FgAuthLocalContext;
  }) => {
    throw new Error('fg-auth-local-key-error');
  };

  public assign_auth_cookie = ({
    context,
    event,
  }: {
    context: FgAuthLocalContext;
    event: any;
  }) => {
    const auth_cookie = AuthCookieFgAuthLocalParser.optional().parse(
      event.output
    );
    return this.$immer.produce(context, (draft) => {
      draft.auth_cookie = auth_cookie;
    });
  };

  public assign_auth_key = ({
    context,
    event,
  }: {
    context: FgAuthLocalContext;
    event: any;
  }) => {
    const event_output = SaltFileContentFgAuthLocalParser.parse(event.output);
    return this.$immer.produce(context, (draft) => {
      draft.salt = event_output.publicSalt;
    });
  };

  public assign_authorization_error = ({
    context,
    event,
  }: {
    context: FgAuthLocalContext;
    event: any;
  }) => {
    return this.$immer.produce(context, (draft) => {
      draft.error = (event.error as Error).message;
    });
  };

  public assign_clear_authorization_error = ({
    context,
  }: {
    context: FgAuthLocalContext;
  }) => {
    return this.$immer.produce(context, (draft) => {
      draft.error = undefined;
    });
  };

  public assign_clear_auth_cookie = ({
    context,
  }: {
    context: FgAuthLocalContext;
  }) => {
    return this.$immer.produce(context, (draft) => {
      draft.auth_cookie = undefined;
    });
  };

  public assign_revoke_authorization_error = ({
    context,
    event,
  }: {
    context: FgAuthLocalContext;
    event: any;
  }) => {
    return this.$immer.produce(context, (draft) => {
      draft.error = (event.error as Error).message;
    });
  };

  public escalate_auth_load_cookie_error = ({
    context,
    event,
  }: {
    context: FgAuthLocalContext;
    event: any;
  }) => {
    // console.log( '<<<<<<<<<<<<ERROR>>>>>>>>>>>>' );
    // console.log( context );
    // console.log( event );
    throw new Error('error_fg_auth_load_cookie_error');
  };

  public guard_has_auth_cookie = ({
    context,
  }: {
    context: FgAuthLocalContext;
  }) => {
    return context.auth_cookie ? true : false;
  };

  public actor_load_auth_local_key = async ({
    input,
  }: {
    input: FgAuthLocalV1ParentInput;
  }) => {
    // ContextFgAuthLocalParser.parse(input.context);
    const url = input.context.path.concat(input.context.salt_filename);
    const public_salt = await firstValueFrom(
      this.$http.get(url).pipe(
        catchError((error) => {
          throw new Error('error_actor_load_auth_local_key_not_found');
        }),
        map((result) => {
          SaltFileContentFgAuthLocalParser.parse(result);
          return result;
        }),
        catchError((error) => {
          {
            throw new Error(
              'error_actor_load_auth_local_key_invalid: ' + error?.message
            );
          }
        })
      )
    );
    return public_salt;
  };

  public actor_load_auth_cookie = async ({
    input,
  }: {
    input: FgAuthLocalV1ParentInput;
  }) => {
    return firstValueFrom(
      this.$cookie.getItem(input.context.auth_cookie_storage_key).pipe(
        catchError((error) => {
          throw new Error('error_actor_load_auth_cookie_failed');
        }),
        map((result) => {
          const auth_cookie = result ? result : undefined;
          AuthCookieFgAuthLocalParser.optional().parse(auth_cookie);
          return auth_cookie;
        }),
        catchError((error) => {
          throw new Error('error_actor_load_auth_cookie_invalid');
        })
      )
    );
  };

  public actor_revoke_authorization = async ({
    input,
  }: {
    input: FgAuthLocalV1ParentInput;
  }) => {
    const result = await firstValueFrom(
      this.$cookie.removeItem(input.context.auth_cookie_storage_key).pipe(
        catchError((error) => {
          throw new Error('error_actor_revoke_authorization_failed');
        })
      )
    );
    return result;
  };

  public actor_authorization = async ({
    input,
  }: {
    input: FgAuthLocalV1ParentInput;
  }) => {
    const context = ContextFgAuthLocalParser.parse(input.context);
    const event = EventFgAuthLocalLoginParser.parse(input.event);
    let filename: string;
    if (context.salt) {
      filename = this.createHashValidForPathUrl(
        event.payload.user + event.payload.password,
        context.salt
      ).concat('.json');
    } else {
      throw new Error('error_actor_authorization_passed_salt_invalid');
    }
    const result = await firstValueFrom(
      this.$http.get(input.context.path + filename).pipe(
        catchError((error) => {
          throw new Error('error_actor_authorization_not_found');
        }),
        map((value) => {
          const result = AuthCookieFgAuthLocalParser.parse(value);
          return result;
        }),
        tap((value) => {
          // Set auth_cookie in browser
          const options: CookieOptions = {
            expires: this.$time.getCookieExpirationDate(
              value.profile.cookieLifeTime
            ),
          };
          this.$cookie.setItem(context.auth_cookie_storage_key, value, options);
        }),
        catchError((error) => {
          throw new Error('error_actor_authorization_invalid');
        })
      )
    );
    return result;
  };

  public get_machine() {
    return setup({
      types: {
        context: {} as FgAuthLocalContext,
        events: {} as
          | { type: 'fg.auth.local.event.login' }
          | { type: 'fg.auth.local.event.logout' }
          | { type: 'fg.auth.local.event.initialize' },
      },
    }).createMachine({
      context: ContextFgAuthLocalParser.parse({}),
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
                        input: {},
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
                        input: {},
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
                    'fg.auth.local.event.logout': {
                      target: 'REVOKE_AUTHORIZATION',
                    },
                  },
                },
                REVOKE_AUTHORIZATION: {
                  invoke: {
                    id: 'actor_revoke_authorization',
                    input: {},
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
                    'fg.auth.local.event.logout': {
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
                    'fg.auth.local.event.login': {
                      target: 'AUTHORIZATION',
                    },
                  },
                },
                AUTHORIZATION: {
                  invoke: {
                    id: 'actor_authorization',
                    input: {},
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
                    'fg.auth.local.event.login': {
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
