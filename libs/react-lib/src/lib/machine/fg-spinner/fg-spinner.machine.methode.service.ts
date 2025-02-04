import { Injectable, inject } from '@angular/core';
import {
  FG_SPINNER_ACTION_INPUT,
  fg_spinner_event_get_context_parser,
  fg_spinner_event_hide_parser,
  fg_spinner_event_respond_context_parser,
  fg_spinner_event_set_context_parser,
  fg_spinner_event_set_progress_parser,
  fg_spinner_event_show_parser,
  fg_spinner_event_stop_parser,
  FG_SPINNER_GUARD_INPUT,
  fg_spinner_internal_force_hide_parser,
  fg_spinner_internal_force_show_parser,
  fg_spinner_internal_hide_parser,
  fg_spinner_internal_reset_timeout_parser,
  fg_spinner_internal_show_parser,
  FG_SPINNER_PROGRESS_ITEM,
} from './fg-spinner.machine.types';
import { FgImmutableService } from '../../service/fg-immutable.service';
import {
  FgBaseService,
  object_apply_values_of_shared_keys,
} from '@kppk/fg-lib-new';
import { FgXstateService } from '../../service/fg-xstate.service';
import { AnyActorRef } from 'xstate';
import { boundMethod } from 'autobind-decorator';

@Injectable({
  providedIn: 'root',
})
export class FgSpinnerMachineMethodeService extends FgBaseService {
  protected $xstate = inject(FgXstateService);
  protected $immer = inject(FgImmutableService);

  @boundMethod
  public assign_set_context({ context, event }: FG_SPINNER_ACTION_INPUT) {
    const valid_event = fg_spinner_event_set_context_parser.parse(event);
    return this.$immer.produce(context, draft => {
      object_apply_values_of_shared_keys(draft, valid_event.data);
    });
  }

  @boundMethod
  public assign_set_progress({ context, event  }: FG_SPINNER_ACTION_INPUT) {
    const set_progress_event = fg_spinner_event_set_progress_parser.parse(event);
    return this.$immer.produce(context, draft => {
      // If single item received wrap in array
      const eventItems: FG_SPINNER_PROGRESS_ITEM[] =
       Array.isArray(set_progress_event.data.items)
        ? set_progress_event.data.items : [set_progress_event.data.items];
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
    return fg_spinner_event_stop_parser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_hide() {
    return fg_spinner_internal_hide_parser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_show() {
    return fg_spinner_internal_show_parser.parse({});
  }

  @boundMethod
  public respond_spinner_event_context_get_target({
    event,
  }: FG_SPINNER_ACTION_INPUT) {
    const parsed_event = fg_spinner_event_get_context_parser.parse(event) as any;
    let target: string | AnyActorRef;
    if (parsed_event?.data?.machine_id ) {
      target = parsed_event.data.machine_id;
    } else {
      target = parsed_event.data.machine_ref;
    } 
    return target;
  }

  @boundMethod
  public respond_spinner_event_context_get_event({
    context,
  }: FG_SPINNER_ACTION_INPUT ) {
    return fg_spinner_event_respond_context_parser.parse({
      payload: {
        context: context,
      },
    });
  }

  @boundMethod
  public assign_decrease_triggers_count({
    context,
  }: FG_SPINNER_ACTION_INPUT ) {
    return this.$immer.produce(context, draft => {
      if (context.trigger_count > 0) {
        draft.trigger_count--;
      }
    });
  }

  @boundMethod
  public raise_spinner_internal_force_hide() {
    return fg_spinner_internal_force_hide_parser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_force_show() {
    return fg_spinner_internal_force_show_parser.parse({});
  }

  @boundMethod
  public raise_spinner_internal_reset_timeout() {
    return fg_spinner_internal_reset_timeout_parser.parse({});
  }

  @boundMethod
  public assign_increase_triggers_count({
    context,
  }: FG_SPINNER_ACTION_INPUT ) {
    return this.$immer.produce(context, draft => {
      draft.trigger_count++;
    });
  }

  @boundMethod
  public guard_force_hide_is_true({ event }: FG_SPINNER_GUARD_INPUT) {
    const valid_event = fg_spinner_event_hide_parser.parse(event);
    return valid_event?.data?.force ? true : false;
  }

  @boundMethod
  public guard_force_show_is_true({ event }: FG_SPINNER_GUARD_INPUT) {
    const valid_event = fg_spinner_event_show_parser.parse(event);
    return valid_event?.data?.force ? true : false;
  }

  @boundMethod
  public guard_allow_reuse_is_false({ context }: FG_SPINNER_GUARD_INPUT ) {
    return context.allow_reuse === false;
  }

  @boundMethod
  public guard_delay_timeout_is_not_zero({ context }: FG_SPINNER_GUARD_INPUT ) {
    return context.delay_timeout > 0;
  }

  @boundMethod
  public guard_triggers_count_equals_zero({ context }: FG_SPINNER_GUARD_INPUT ) {
    return context.trigger_count === 0;
  }

  @boundMethod
  public guard_allow_timeout_reset_is_true({ context }: FG_SPINNER_GUARD_INPUT ) {
    return context.allow_timeout_reset === true;
  }

  @boundMethod
  public guard_delay_auto_dismiss_timeout_error_is_not_zero({ context }: FG_SPINNER_GUARD_INPUT ) {
    return context.delay_auto_dismiss_timeout_error > 0;
  }

  @boundMethod
  public delay_min_show_time({ context }: FG_SPINNER_ACTION_INPUT ) {
    return context.delay_min_show_time;
  }

  @boundMethod
  public delay_timeout({ context }: FG_SPINNER_ACTION_INPUT ) {
    return context.delay_timeout;
  }

  @boundMethod
  public delay_before_shown({ context }: FG_SPINNER_ACTION_INPUT ) {
    return context.delay_before_shown;
  }

  @boundMethod
  public delay_auto_dismiss_timeout_error({ context }: FG_SPINNER_ACTION_INPUT ) {
    return context.delay_auto_dismiss_timeout_error;
  }
}
