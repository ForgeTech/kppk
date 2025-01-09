import { ActorRefFrom, EventFromLogic, SnapshotFrom, setup } from 'xstate';
import {
  ContextFgSpinner,
  ContextFgSpinnerParser,
  EventFgSpinnerDismissError,
  EventFgSpinnerGetContext,
  EventFgSpinnerHide,
  EventFgSpinnerSetContext,
  EventFgSpinnerSetProgress,
  EventFgSpinnerShow,
  EventFgSpinnerStop,
  InternalFgSpinnerForceHide,
  InternalFgSpinnerForceShow,
  InternalFgSpinnerHide,
  InternalFgSpinnerResetTimeout,
  InternalFgSpinnerShow,
} from './fg-spinner.machine.types';

export type FgSpinnerV4_5_2Snapshot = SnapshotFrom<typeof FG_SPINNER_V4_5_2>;
export type FgSpinnerV4_5_2Event = EventFromLogic<typeof FG_SPINNER_V4_5_2>;
export type FgSpinnerV4_5_2Ref = ActorRefFrom<typeof FG_SPINNER_V4_5_2>;
export type FgSpinnerV4_5_2Machine = typeof FG_SPINNER_V4_5_2;

export const FG_SPINNER_V4_5_2  = setup(
  {
    types: {
      input: {} as Partial<ContextFgSpinner> | undefined,
      events: {} as
        | EventFgSpinnerHide
        | EventFgSpinnerShow
        | EventFgSpinnerStop
        | InternalFgSpinnerHide
        | InternalFgSpinnerShow
        | EventFgSpinnerGetContext
        | EventFgSpinnerSetContext
        | EventFgSpinnerSetProgress
        | InternalFgSpinnerForceHide
        | InternalFgSpinnerForceShow
        | InternalFgSpinnerResetTimeout
        | EventFgSpinnerDismissError
        | EventFgSpinnerSetContext,
      context: {} as ContextFgSpinner,
    },
    actions: {
      assign_set_context: ({ context, event }) => {},
      assign_set_progress: ({ context, event }) => {},
      escalate_timeout_error: ({ context, event }) => {},
      raise_spinner_event_stop: ({ context, event }) => {},
      raise_spinner_internal_hide: ({ context, event }) => {},
      raise_spinner_internal_show: ({ context, event }) => {},
      respond_spinner_event_context: ({ context, event }) => {},
      assign_decrease_triggers_count: ({ context, event }) => {},
      assign_increase_triggers_count: ({ context, event }) => {},
      raise_spinner_internal_force_hide: ({ context, event }) => {},
      raise_spinner_internal_force_show: ({ context, event }) => {},
      raise_spinner_internal_reset_timeout: ({ context, event }) => {},
    },
    actors: {},
    guards: {
      guard_force_hide_is_true: ({ context, event }, params) => {
        return false;
      },
      guard_force_show_is_true: ({ context, event }, params) => {
        return false;
      },
      guard_allow_reuse_is_false: ({ context, event }, params) => {
        return false;
      },
      guard_delay_timeout_is_not_zero: ({ context, event }, params) => {
        return false;
      },
      guard_delay_timeout_is_not_false: ({ context, event }, params) => {
        return false;
      },
      guard_triggers_count_equals_zero: ({ context, event }, params) => {
        return false;
      },
      guard_allow_timeout_reset_is_true: ({ context, event }, params) => {
        return false;
      },
      guard_delay_auto_dismiss_timeout_error_is_not_zero: (
        { context, event },
        params
      ) => {
        return false;
      },
    },
    delays: {
      delay_min_show_time: ({ context, event }) => {
        return 1000;
      },
      delay_timeout: ({ context, event }) => {
        return 1000;
      },
      delay_before_shown: ({ context, event }) => {
        return 1000;
      },
      delay_auto_dismiss_timeout_error: ({ context, event }) => {
        return 1000;
      },
    },
  },
).createMachine(
  {
    id: 'FG_SPINNER_V4_5_2',
    context: ( { input } ) => {
      return ContextFgSpinnerParser.parse( input || {})
    },
    type: 'parallel',
    states: {
      DISPLAY: {
        initial: 'HIDDEN',
        states: {
          HIDDEN: {
            tags: 'spinner_modal_hidden',
            initial: 'IDEL',
            states: {
              IDEL: {
                on: {
                  'fg.spinner.internal.show': {
                    target: 'PENDING_DELAY_BEFORE_SHOWN',
                    reenter: true,
                  },
                },
              },
              PENDING_DELAY_BEFORE_SHOWN: {
                after: {
                  delay_before_shown: {
                    target: '#FG_SPINNER_V4_5_2.DISPLAY.SHOWN',
                    actions: [],
                    meta: {},
                    reenter: true,
                  },
                },
                on: {
                  'fg.spinner.internal.hide': {
                    target: 'IDEL',
                    guard: 'guard_triggers_count_equals_zero',
                    reenter: true,
                  },
                },
              },
              RETURNED_FROM_SHOWN: {
                always: [
                  {
                    target: 'IDEL',
                    guard: 'guard_allow_reuse_is_false',
                    actions: {
                      type: 'raise_spinner_event_stop',
                    },
                  },
                  {
                    target: 'IDEL',
                  },
                ],
              },
            },
            on: {
              'fg.spinner.internal.force_show': {
                target: 'SHOWN',
                reenter: true,
              },
            },
          },
          SHOWN: {
            tags: 'spinner_modal_shown',
            initial: 'PENDING_MIN_SHOW_TIME',
            states: {
              PENDING_MIN_SHOW_TIME: {
                after: {
                  delay_min_show_time: {
                    target:
                      '#FG_SPINNER_V4_5_2.DISPLAY.SHOWN.REACHED_MIN_SHOW_TIME',
                    actions: [],
                    meta: {},
                    reenter: true,
                  },
                },
              },
              REACHED_MIN_SHOW_TIME: {
                initial: 'PENDING_TIMEOUT',
                states: {
                  PENDING_TIMEOUT: {
                    after: {
                      delay_timeout: {
                        target:
                          '#FG_SPINNER_V4_5_2.DISPLAY.SHOWN.REACHED_MIN_SHOW_TIME.ERROR',
                        guard: 'guard_delay_timeout_is_not_zero',
                        actions: [],
                        meta: {},
                      },
                    },
                  },
                  ERROR: {
                    entry: {
                      type: 'escalate_timeout_error',
                    },
                    after: {
                      delay_auto_dismiss_timeout_error: {
                        target:
                          '#FG_SPINNER_V4_5_2.DISPLAY.HIDDEN.RETURNED_FROM_SHOWN',
                        guard:
                          'guard_delay_auto_dismiss_timeout_error_is_not_zero',
                        actions: [],
                        meta: {},
                      },
                    },
                    tags: 'spinner_modal_shown_error',
                    on: {
                      'fg.spinner.event.dismiss_error': {
                        target:
                          '#FG_SPINNER_V4_5_2.DISPLAY.HIDDEN.RETURNED_FROM_SHOWN',
                      },
                    },
                  },
                },
                always: {
                  target:
                    '#FG_SPINNER_V4_5_2.DISPLAY.HIDDEN.RETURNED_FROM_SHOWN',
                  guard: 'guard_triggers_count_equals_zero',
                  reenter: true,
                },
                on: {
                  'fg.spinner.internal.reset_timeout': {
                    target: '.PENDING_TIMEOUT',
                    guard: 'guard_allow_timeout_reset_is_true',
                  },
                  'fg.spinner.internal.hide': {
                    target:
                      '#FG_SPINNER_V4_5_2.DISPLAY.HIDDEN.RETURNED_FROM_SHOWN',
                    guard: 'guard_triggers_count_equals_zero',
                    reenter: true,
                  },
                },
              },
            },
            on: {
              'fg.spinner.internal.force_hide': {
                target: '#FG_SPINNER_V4_5_2.DISPLAY.HIDDEN.RETURNED_FROM_SHOWN',
              },
            },
          },
          DONE: {
            tags: 'spinner_modal_hidden',
            type: 'final',
          },
        },
        on: {
          'fg.spinner.event.stop': {
            target: '.DONE',
          },
        },
      },
      TRIGGERS: {
        initial: 'RECEIVING',
        states: {
          RECEIVING: {
            on: {
              'fg.spinner.event.show': [
                {
                  target: 'RECEIVING',
                  guard: 'guard_force_show_is_true',
                  actions: [
                    {
                      type: 'assign_increase_triggers_count',
                    },
                    {
                      type: 'raise_spinner_internal_force_show',
                    },
                    {
                      type: 'raise_spinner_internal_reset_timeout',
                    },
                  ],
                  reenter: false,
                },
                {
                  target: 'RECEIVING',
                  actions: [
                    {
                      type: 'assign_increase_triggers_count',
                    },
                    {
                      type: 'raise_spinner_internal_show',
                    },
                    {
                      type: 'raise_spinner_internal_reset_timeout',
                    },
                  ],
                  reenter: false,
                },
              ],
              'fg.spinner.event.hide': [
                {
                  target: 'RECEIVING',
                  guard: 'guard_force_hide_is_true',
                  actions: [
                    {
                      type: 'assign_decrease_triggers_count',
                    },
                    {
                      type: 'raise_spinner_internal_force_hide',
                    },
                  ],
                  reenter: false,
                },
                {
                  target: 'RECEIVING',
                  actions: [
                    {
                      type: 'assign_decrease_triggers_count',
                    },
                    {
                      type: 'raise_spinner_internal_hide',
                    },
                  ],
                  reenter: false,
                },
              ],
              'fg.spinner.event.set_context': {
                target: 'RECEIVING',
                actions: {
                  type: 'assign_set_context',
                },
                reenter: false,
              },
              'fg.spinner.event.get_context': {
                target: 'RECEIVING',
                actions: {
                  type: 'respond_spinner_event_context',
                },
                reenter: false,
              },
              'fg.spinner.event.stop': {
                target: 'DONE',
              },
              'fg.spinner.event.set_progress': {
                target: 'RECEIVING',
                actions: {
                  type: 'assign_set_progress',
                },
                reenter: false,
              },
            },
          },
          DONE: {
            type: 'final',
          },
        },
      },
    },
  },
);
