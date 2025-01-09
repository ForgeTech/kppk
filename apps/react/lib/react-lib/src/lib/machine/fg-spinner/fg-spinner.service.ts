import { Injectable, inject } from '@angular/core';
import { ActorRef, assign,  raise, sendTo, setup } from 'xstate';
import {
  ContextFgSpinner,
  ContextFgSpinnerParser,
  EventFgSpinnerGetContextParser,
  EventFgSpinnerHideParser,
  EventFgSpinnerRespondContextParser,
  EventFgSpinnerSetContextParser,
  EventFgSpinnerSetProgress,
  EventFgSpinnerSetProgressParser,
  EventFgSpinnerShowParser,
  EventFgSpinnerStopParser,
  InternalFgSpinnerForceHideParser,
  InternalFgSpinnerForceShowParser,
  InternalFgSpinnerHideParser,
  InternalFgSpinnerResetTimeoutParser,
  InternalFgSpinnerShowParser,
  ProgressItemFgSpinner,
} from './fg-spinner.machine.types';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { FgBaseService, object_apply_values_of_shared_keys } from '@kppk/fg-lib';
import { FgXstateService } from '../../service/fg-xstate.service';

@Injectable({
  providedIn: 'root',
})
export class FgSpinnerService extends FgBaseService {
  public machine;
  // public actor;
  // public state$;
  protected $immer = inject(FgImmutableService);
  constructor(
    protected $xstate: FgXstateService
  ) {
    super();
    this.machine = this.get_machine();
  }

  public assign_set_context({
    context,
    event,
  }: {
    context: ContextFgSpinner;
    event: any;
  }) {
    const valid_event = EventFgSpinnerSetContextParser.parse(event);
    return this.$immer.produce( context, draft => {
      object_apply_values_of_shared_keys(draft, valid_event.payload);
    });
  }

  public assign_set_progress({
    context,
    event,
  }: {
    context: ContextFgSpinner;
    event: any;
  }) {
    let set_progress_event: EventFgSpinnerSetProgress;
    set_progress_event = EventFgSpinnerSetProgressParser.parse(event);
    return this.$immer.produce( context, draft => {
      // If single item received wrap in array
      const eventItems: ProgressItemFgSpinner[] = Array.isArray(
        set_progress_event.payload.items
      )
        ? set_progress_event.payload.items
        : [set_progress_event.payload.items];
      // Iterate array of items
      eventItems.forEach((eventItem) => {
        // Check if item with existing name is contained in items on context an get index
        const foundIndex = context.progressItems.findIndex((contextItem) => {
          return contextItem.name === eventItem.name;
        });
        // Remove finished items
        if (eventItem.finished === true && foundIndex >= 0) {
          draft.progressItems.splice(foundIndex, 1);
        }
        // Update progress on existing items
        else if (foundIndex >= 0) {
          draft.progressItems[foundIndex].progress = eventItem.progress;
        }
        // Add item if not finished and none-existing in context
        else if (eventItem.finished === false && foundIndex === -1) {
          draft.progressItems.push(eventItem);
        }
      });
    });
  }

  public escalate_timeout_error() {
    throw new Error('fg_spinner_timeout_error');
  }
  public raise_spinner_event_stop() {
    return EventFgSpinnerStopParser.parse({});
  }

  public raise_spinner_internal_hide() {
    return InternalFgSpinnerHideParser.parse({});
  }

  public raise_spinner_internal_show() {
    return InternalFgSpinnerShowParser.parse({});
  }
  public respond_spinner_event_context_get_target({
    event,
  }: {
    event: any;
  }) {
    EventFgSpinnerGetContextParser.parse(event);
    let target: string | ActorRef<any, any> = '';
    if( event?.payload?.machineId ) {
      target = event.payload.machineId as string;
    }
    else if (event?.payload?.machineRef) {
      target = event.payload.machineRef as ActorRef<any, any>;
    }
    return target;
  }
  public respond_spinner_event_context_get_event({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return EventFgSpinnerRespondContextParser.parse({
      payload: {
        context: context
      }
    })
  }
  public assign_decrease_triggers_count = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return this.$immer.produce( context, draft => {
      if (context.triggerCount > 0) {
        draft.triggerCount--;
      }
    })
  };
  public raise_spinner_internal_force_hide() {
    return InternalFgSpinnerForceHideParser.parse({});
  }

  public raise_spinner_internal_force_show() {
    return InternalFgSpinnerForceShowParser.parse({});
  }

  public raise_spinner_internal_reset_timeout() {
    return InternalFgSpinnerResetTimeoutParser.parse({});
  }

  public assign_increase_triggers_count = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return this.$immer.produce( context, draft => {
      draft.triggerCount++;
    })
  };

  public guard_force_hide_is_true = ({
    event,
  }: {
    event: any;
  }) => {
    const valid_event = EventFgSpinnerHideParser.parse(event);
    return valid_event.payload.force;
  };

  public guard_force_show_is_true = ({
    event,
  }: {
    event: any;
  }) => {
    const valid_event = EventFgSpinnerShowParser.parse(event);
    return valid_event.payload.force;
  };

  public guard_allow_reuse_is_false = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.allowReuse === false;
  };

  public guard_delay_timeout_is_not_zero = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.delay_timeout > 0;
  };

  public guard_triggers_count_equals_zero = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.triggerCount === 0;
  };

  public guard_allow_timeout_reset_is_true = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.allowTimeoutReset === true;
  };

  public guard_delay_auto_dismiss_timeout_error_is_not_zero = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.delay_auto_dismiss_timeout_error > 0;
  };

  public delay_min_show_time = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.delay_min_show_time;
  };

  public delay_timeout = ({ context }: { context: ContextFgSpinner }) => {
    return context.delay_timeout;
  };

  public delay_before_shown = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.delay_before_shown;
  };

  public delay_auto_dismiss_timeout_error = ({
    context,
  }: {
    context: ContextFgSpinner;
  }) => {
    return context.delay_auto_dismiss_timeout_error;
  };

  public get_machine() {
    return setup({
      actions: {
        assign_set_context: assign(this.assign_set_context),
        assign_set_progress: assign(this.assign_set_progress),
        escalate_timeout_error: this.escalate_timeout_error,
        raise_spinner_event_stop: raise(this.raise_spinner_event_stop),
        raise_spinner_internal_hide: raise(this.raise_spinner_internal_hide),
        raise_spinner_internal_show: raise(this.raise_spinner_internal_show),
        respond_spinner_event_context: sendTo( this.respond_spinner_event_context_get_target, this.respond_spinner_event_context_get_event),
        assign_decrease_triggers_count: assign(
          this.assign_decrease_triggers_count
        ),
        assign_increase_triggers_count: assign(
          this.assign_increase_triggers_count
        ),
        raise_spinner_internal_force_hide: raise(
          this.raise_spinner_internal_force_show
        ),
        raise_spinner_internal_force_show: raise(
          this.raise_spinner_internal_force_show
        ),
        raise_spinner_internal_reset_timeout: raise(
          this.raise_spinner_internal_reset_timeout
        ),
      },
      guards: {
        guard_force_hide_is_true: this.guard_force_hide_is_true,
        guard_force_show_is_true: this.guard_force_show_is_true,
        guard_allow_reuse_is_false: this.guard_allow_reuse_is_false,
        guard_delay_timeout_is_not_zero: this.guard_delay_timeout_is_not_zero,
        guard_delay_timeout_is_not_false: this.guard_delay_timeout_is_not_zero,
        guard_triggers_count_equals_zero:
          this.guard_triggers_count_equals_zero,
        guard_allow_timeout_reset_is_true:
          this.guard_allow_timeout_reset_is_true,
        guard_delay_auto_dismiss_timeout_error_is_not_zero:
          this.guard_delay_auto_dismiss_timeout_error_is_not_zero,
      },
      delays: {
        delay_min_show_time: this.delay_min_show_time,
        delay_timeout: this.delay_timeout,
        delay_before_shown: this.delay_before_shown,
        delay_auto_dismiss_timeout_error:
          this.delay_auto_dismiss_timeout_error,
      },
    }).createMachine(
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
  }
}
