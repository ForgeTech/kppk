import { Injectable, inject } from '@angular/core';
import {
  ContextFgSpinner,
  EventFgSpinnerGetContextParser,
  EventFgSpinnerHideParser,
  EventFgSpinnerRespondContextParser,
  EventFgSpinnerSetContextParser,
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
import { FgBaseService, object_apply_values_of_shared_keys } from '@kppk/fg-lib-new';
import { FgXstateService } from '../../service/fg-xstate.service';
import { ActorRef } from 'xstate';
import { boundMethod } from 'autobind-decorator';

@Injectable({
  providedIn: 'root',
})
export class FgSpinnerMachineMethodeService extends FgBaseService {
  protected $xstate = inject(FgXstateService);
  protected $immer = inject(FgImmutableService);

  @boundMethod
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

  @boundMethod
  public assign_set_progress({
    context,
    event,
  }: {
    context: ContextFgSpinner;
    event: any;
  }) {
    const set_progress_event = EventFgSpinnerSetProgressParser.parse(event);
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

  @boundMethod
  public escalate_timeout_error() {
    throw new Error('fg_spinner_timeout_error');
  }
  
  @boundMethod
  public raise_spinner_event_stop() {
    return EventFgSpinnerStopParser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_hide() {
    return InternalFgSpinnerHideParser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_show() {
    return InternalFgSpinnerShowParser.parse({});
  }

  @boundMethod
  public respond_spinner_event_context_get_target({
    event,
  }: {
    context: ContextFgSpinner;
    event: any;
  }){
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

  @boundMethod
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

  @boundMethod
  public assign_decrease_triggers_count ({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return this.$immer.produce( context, draft => {
      if (context.trigger_count > 0) {
        draft.trigger_count--;
      }
    })
  };

  @boundMethod
  public raise_spinner_internal_force_hide() {
    return InternalFgSpinnerForceHideParser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_force_show() {
    return InternalFgSpinnerForceShowParser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_reset_timeout() {
    return InternalFgSpinnerResetTimeoutParser.parse({});
  }

  @boundMethod
  public assign_increase_triggers_count({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return this.$immer.produce( context, draft => {
      draft.trigger_count++;
    })
  };

  @boundMethod
  public guard_force_hide_is_true ({
    event,
  }: {
    event: any;
  }) {
    const valid_event = EventFgSpinnerHideParser.parse(event);
    return valid_event.payload.force;
  };

  @boundMethod
  public guard_force_show_is_true({
    event,
  }: {
    event: any;
  }) {
    const valid_event = EventFgSpinnerShowParser.parse(event);
    return valid_event.payload.force;
  };

  @boundMethod
  public guard_allow_reuse_is_false({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.allow_reuse === false;
  };

  @boundMethod
  public guard_delay_timeout_is_not_zero({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.delay_timeout > 0;
  };

  @boundMethod
  public guard_triggers_count_equals_zero({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.trigger_count === 0;
  };

  @boundMethod
  public guard_allow_timeout_reset_is_true({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.allow_timeout_reset === true;
  };

  @boundMethod
  public guard_delay_auto_dismiss_timeout_error_is_not_zero ({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.delay_auto_dismiss_timeout_error > 0;
  };

  @boundMethod
  public delay_min_show_time({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.delay_min_show_time;
  };

  @boundMethod
  public delay_timeout({ context }: { context: ContextFgSpinner }) {
    return context.delay_timeout;
  };

  @boundMethod
  public delay_before_shown({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.delay_before_shown;
  };

  @boundMethod
  public delay_auto_dismiss_timeout_error({
    context,
  }: {
    context: ContextFgSpinner;
  }) {
    return context.delay_auto_dismiss_timeout_error;
  };
}
