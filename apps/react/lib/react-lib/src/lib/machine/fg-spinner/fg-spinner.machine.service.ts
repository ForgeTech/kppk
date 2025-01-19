import { Injectable, inject } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';
import { FgXstateService } from '../../service/fg-xstate.service';
import { FgSpinnerMachineMethodeService } from './fg-spinner.machine.methode.service';
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

@Injectable({
  providedIn: 'root',
})
export class FgSpinnerMachineService extends FgBaseService {
  protected $xstate = inject(FgXstateService);
  protected $methode = inject(FgSpinnerMachineMethodeService);

  public get_machine( context?: ContextFgSpinner ) {
    return this.$xstate.setup({
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
        assign_set_context: this.$xstate.assign(this.$methode.assign_set_context),
        assign_set_progress: this.$xstate.assign(this.$methode.assign_set_progress),
        escalate_timeout_error: this.$methode.escalate_timeout_error,
        raise_spinner_event_stop: this.$xstate.raise(this.$methode.raise_spinner_event_stop),
        raise_spinner_internal_hide: this.$xstate.raise(this.$methode.raise_spinner_internal_hide),
        raise_spinner_internal_show: this.$xstate.raise(this.$methode.raise_spinner_internal_show),
        respond_spinner_event_context: this.$xstate.sendTo( this.$methode.respond_spinner_event_context_get_target, this.$methode.respond_spinner_event_context_get_event),
        assign_decrease_triggers_count: this.$xstate.assign(
          this.$methode.assign_decrease_triggers_count
        ),
        assign_increase_triggers_count: this.$xstate.assign(
          this.$methode.assign_increase_triggers_count
        ),
        raise_spinner_internal_force_hide: this.$xstate.raise(
          this.$methode.raise_spinner_internal_force_show
        ),
        raise_spinner_internal_force_show: this.$xstate.raise(
          this.$methode.raise_spinner_internal_force_show
        ),
        raise_spinner_internal_reset_timeout: this.$xstate.raise(
          this.$methode.raise_spinner_internal_reset_timeout
        ),
      },
      guards: {
        guard_force_hide_is_true: this.$methode.guard_force_hide_is_true,
        guard_force_show_is_true: this.$methode.guard_force_show_is_true,
        guard_allow_reuse_is_false: this.$methode.guard_allow_reuse_is_false,
        guard_delay_timeout_is_not_zero: this.$methode.guard_delay_timeout_is_not_zero,
        guard_delay_timeout_is_not_false: this.$methode.guard_delay_timeout_is_not_zero,
        guard_triggers_count_equals_zero:
          this.$methode.guard_triggers_count_equals_zero,
        guard_allow_timeout_reset_is_true:
          this.$methode.guard_allow_timeout_reset_is_true,
        guard_delay_auto_dismiss_timeout_error_is_not_zero:
          this.$methode.guard_delay_auto_dismiss_timeout_error_is_not_zero,
      },
      delays: {
        delay_min_show_time: this.$methode.delay_min_show_time,
        delay_timeout: this.$methode.delay_timeout,
        delay_before_shown: this.$methode.delay_before_shown,
        delay_auto_dismiss_timeout_error:
          this.$methode.delay_auto_dismiss_timeout_error,
      },
    }).createMachine(
      {
        id: 'FG_SPINNER_V4_5_2',
        context: ContextFgSpinnerParser.parse(context ?? {}),
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
  }
}
