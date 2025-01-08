import { ActorRefFrom, EventFromLogic, SnapshotFrom, setup, createMachine } from "xstate";
import {  ContextFgAuthLocalParser, EventFgAuthLocalAuthorized, EventFgAuthLocalLogin, EventFgAuthLocalLogout, EventFgAuthLocalStop, EventFgAuthLocalUnauthorized, FgAuthLocalContext } from "./fg-auth-local.machine.types";
import { parent_context_event_input } from "../machine.utils";

export type FgAuthLocalV1Snapshot = SnapshotFrom<typeof FG_AUTH_LOCAL_V1>;
export type FgAuthLocalV1Event = EventFromLogic<typeof FG_AUTH_LOCAL_V1>;
export type FgAuthLocalV1Ref = ActorRefFrom<typeof FG_AUTH_LOCAL_V1>;
export type FgAuthLocalV1Machine = typeof FG_AUTH_LOCAL_V1;
export type FgAuthLocalV1Context = FgAuthLocalContext;
export type FgAuthLocalV1ParentInput = { context: FgAuthLocalV1Context, event: any};


export const FG_AUTH_LOCAL_V1 = setup({
  types: {
    input: {} as Partial<FgAuthLocalV1Context>,
    context: {} as FgAuthLocalV1Context,
    events: {} as EventFgAuthLocalLogin
      | EventFgAuthLocalLogout
      | EventFgAuthLocalAuthorized
      | EventFgAuthLocalUnauthorized
      | EventFgAuthLocalStop
  },
  actions: {
    send_authorized_event_to: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    send_unauthorized_event_to: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    escalate_auth_local_key_error: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    assign_auth_cookie: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    assign_auth_key: function ({ context, event }, params) {
      // Add your action code here
      // ...
    },
    assign_authorization_error: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    assign_clear_authorization_error: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    assign_clear_auth_cookie: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    assign_revoke_authorization_error: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
    escalate_auth_load_cookie_error: function (
      { context, event },
      params,
    ) {
      // Add your action code here
      // ...
    },
  },
  actors: {
    // actor_load_auth_local_key: fromObservable(({ input }) => of("publicSalt" as any)),
    // actor_load_auth_cookie: fromObservable(({ input, system }: {input:string, system:any}) => interval(input.interval)),
    // actor_revoke_authorization: fromObservable(({ input, system }: {input:any, system:any}) => interval(input.interval)),
    // actor_authorization: fromObservable(({ input, system }: {input:any, system:any}) => interval(input.interval)),
  },
  guards: {
    guard_has_auth_cookie: function ({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDEDiB9AggVQCoAl0AZAeQGFMj0A1ARgDoBlXTXAUQGIAzKegQwCuAFwAW9ADYB7AMZ9x9MADcwAOyH1YQyQAcA2gAYAuolDbJsAJZCLklSZAAPRACYAzM+f1aAFmcAOZ30ANm93WgB2bwAaEABPRFpXP3pXcL8-bwBWIJ9IzIyAXwKYtCw8QlIKKjomFnZ6AEkAOQbcBsoGgC1OCFswDSE+IX7SnAJickoaBmZWNkaWto7ug2MkEDNLa1t7JwRXfVcUzP0ATm9zv3C0vxj4hHDaTPpncP19byDw0+cgj2ciiUMGMKpNqjM6vNmq12kQuj0+gMhiNgeUJlVprU5gsYcs2LpaGtTOYrDY7Os9rR9OFPIlMqcvplMp8Ipk7ohHs9fqcGT8gn5Ut5woCQKM0ZUpjVZvVoUs4d16CD0VMANJsACa9FImAAImVxmr1Rxeip+hYVIpJABrfp8aRaABO6CkfAg6EEonQNtiq3sm1JOwpCWcWXofn0tFeEfeIQi7P2AXon0yVNcFwOQX5IrF4wl4KxMsWsPhivFYPQhq1JF1+sIho4YAdDskDvo2nEQy4LYAtvx7S3nZJXe7hCIvWAfUY-STtuTQJS3t4w6dXD50jlvL4gvHXkdHql+UFTgLj5ls6jc+WpZCcXKS0qyCQSCqGvNtXqH0+XwjTfRzZabT7R1B2HD0x2kSRrQsMBfXWf1Z12RAglXegVwjH4UxyFdtziRBPiOC43keJ53BTVxz1rZV82lKEizxUtxkfZ9XyrGtP2YzhG2bVt207HsgIHF03TA9AIKgmCpzgmcyUQhA-iXSJfnSfRAkjGkdySMMQ3yNMGV8Q4KKVPNMRohj8BIAAleEdWNRFNGRegc1BDFr2xEFLOs2DiS2GSgwQNcgjDC58ljTIkmQ+MMgYc59HDFMGQ8BlDLLFyITc8oPO6HV6AABTYJodWaVBuF4MCJBkOQFGUNRyqgSRhC8jZpMDedEFcA4w35VwUwybwPjC+Nj30VDvm8SNaD+XlaGSy9UoLeZ3KsrL6AsthqGfNha0y1gGhIJpbN-f9rVtfsnQdJRjpHUQWwsAAvIYyUa+DfNa-yPnCVDnCZGlwi+SIGUG+ktNXZw10FCIZucyU0vqRbrJWtaNq2padr2hsmxbNsOyELsHV7O1gPOgCwCukQbvu2cnuaudHDw04PsyDxwjTTNfmceNaE55JXD+yMjxXcImUhqiTJvOHlrYCyLMskr+FHcrZHkJRVHUKQ6oayTvIDGm9nDJdMm+NJYyyK5aA5znAr8P7Tn0Jl+oM4pRQvKHqJvbAmnFtgbJNfp7OGRznZF1z6ndz2dSpnyWtp-ywuSQXThTCMeqecIOY+I5YvcPxWQFdrhUdpyg5h+ZQ4ypavdy-LCqaYqeDl0QFcq5WarV80I+12TaAZQK+tOKlHh5Pq41whAhpG85xsm-lTmF4zg5Lj2y-h8XUf2n2-wtY6BKdMDyYe2x24QvzXk5rxXHpplzlXYJAdOYHxu8AVIghgvA7n4v6FLghMorle2jRrimNeI434gTAcu8HR3X3ioQ+L1o7-AzqDIUXw-A-AZKnEenNaDc15tyAWBtZ5Xg-l-cy5dsqS2lhZWWZUpCKyqirWqbdNZNUjjrFwWQPrBFXF3ak1wkhskwRbTqv12qpHDIcciIoVCSAgHAewhd37TlYbJdqI1NwXH5qDH43V4wAFoqR3xZFSQ4VI-j0gBK-Si795pKI7n5bOajNy8h+F3EMeiPApFQZmK2aR3jMjPJYoyRD5q3mLN0WxR9XqRjvvTdRzitFuJHiEeg-IIiTWZDkE401AkpWhiE2UYSFq5KoIaCJcDKQ+ECrFKKhxrjBQ5ozeg1JqmP3pH1D4hC5qmQKfRIJGJKzvkoqUqSyi-Kc3OE09IY1an-QEfcNwd8fCJTIocB2QIrHBO6XReURTZqqg1EwbAZAyBsEYIwMpUdKSvEMYLbqsYeR-HjCcTwq4aR+KCMEL6kROl5K2biHZZl0BMW-Bcth-lriOI0TyBJ0RMEpnoLciI7gvopl+kEH5rtsQ9IBexb8rEPxomBa+UFskPDPFiU4zRrjYX3DTAwVB9IGTiPPgKbwGLRZYu2feQlX4WKMCOScs5JL7G-RSbFUIvg7aRFcPGHme4wpPBDOGHkNt0U5L2Zi2GS8srCqid1JMts+4SJ5JzDB9xs5Ll+CmcZBxmQqXZfPMyP9sp5QKkVXV0dsEEUNamc+fdh73DHkeVIXckiJFigE9ZfTfli21RXVa601TIy6KvD1ewcieGpKgt44Y0W20GkKVC1JjzpG+O8M4DqP5h0Occ055yRl2KiWcTw1zvipB5iEUI5tUioXSK47Ozh0GVpCdWihlk00chQryEI6Q0x+BTOzTBrwe7pHDKa3wXjh2mRIc6id4L9X0x+KEVc-CriRTcAioIKYxqg3Ffa9VLsOUh0Xt-Mhlc3U1z3REAU48QztUSPOs9I8g0C1DdnA4Aot1uxfaQ5e2rU0NsifAr6d98gGx5CcO2A1gMGwNWu7O9IDixSg9iHdb7+W1qFYh8pLhn70EZhatdHxDzdo+iWtMRtKkWKjcUp9C9R1S3HdRy57DYrHElaDfw3icL3DUiu5S67-BJQfUXEJOo9psD3W4IG2QjyPzON1UGO43gpN8akfq4HJE8Y1XxxymAGhEGwKtL9Y8WT-vDWcGT7CPrnzJdhEioQihFCAA */
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