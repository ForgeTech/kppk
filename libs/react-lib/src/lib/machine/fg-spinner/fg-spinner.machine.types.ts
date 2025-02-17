import { fg_event_parser } from '@kppk/fg-lib-new';
import { ActorRef, ActorSystem, AnyActorRef } from 'xstate';
import { AnyActorSystem } from 'xstate/dist/declarations/src/system';
import { z } from 'zod';

export const fg_spinner_progress_item_parser = z.object({
  name: z.string(),
  progress: z.number().min(0).max(100).default(0),
  finished: z.boolean().default(false),
  // .or(z.undefined().transform(() => 0)),
});
export type FG_SPINNER_PROGRESS_ITEM = z.infer<typeof fg_spinner_progress_item_parser>;

export const fg_spinner_context_parser = z.object({
  allow_reuse: z.boolean().default(true),
  allow_timeout_reset: z.boolean().default(true),
  trigger_count: z.number().min(0).default(0),
  // .or(z.undefined().transform(() => 0)),
  progressItems: z.array(fg_spinner_progress_item_parser).default([]),
  delay_min_show_time: z.number().min(0).default(1000),
  // .or(z.undefined().transform(() => 1000)),
  delay_timeout: z.number().min(0).default(0),
  // .or(z.undefined().transform(() => 2500)),
  delay_before_shown: z.number().min(0).default(250),
  // .or(z.undefined().transform(() => 250)),
  delay_auto_dismiss_timeout_error: z.number().min(0).default(1000),
  // .or(z.undefined().transform(() => 250)),
});

export type FG_SPINNER_CONTEXT = z.infer<typeof fg_spinner_context_parser>;

export const fg_spinner_action_input_parser = z.object({
  context: fg_spinner_context_parser,
  event: z.any(),
  system: z.custom<AnyActorSystem>()
});
export type FG_SPINNER_ACTION_INPUT = z.infer<typeof fg_spinner_action_input_parser>;

export const fg_spinner_guard_input_parser = z.object({
  context: fg_spinner_context_parser,
  event: z.any(),
});
export type FG_SPINNER_GUARD_INPUT = z.infer<typeof fg_spinner_guard_input_parser>;

export const fg_spinner_event_option_parser = z.object({
  force: z.literal(true).optional()
}).optional()
export type FG_SPINNER_EVENT_OPTION = z.infer<typeof fg_spinner_event_option_parser>;

export const fg_spinner_event_hide_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.hide').default('fg.spinner.event.hide'),
  data: fg_spinner_event_option_parser
});
export type FG_SPINNER_EVENT_HIDE = z.infer<typeof fg_spinner_event_hide_parser>;

export const fg_spinner_event_show_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.show').default('fg.spinner.event.show'),
  data: fg_spinner_event_option_parser
});
export type FG_SPINNER_EVENT_SHOW = z.infer<typeof fg_spinner_event_show_parser>;

export const fg_spinner_event_stop_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.stop').default('fg.spinner.event.stop')
});
export type FG_SPINNER_EVENT_STOP = z.infer<typeof fg_spinner_event_stop_parser>;

export const fg_spinner_internal_hide_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.internal.hide').default('fg.spinner.internal.hide')
});
export type FG_SPINNER_INTERNAL_HIDE = z.infer<typeof fg_spinner_internal_hide_parser>;

export const fg_spinner_internal_show_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.internal.show').default('fg.spinner.internal.show')
});
export type FG_SPINNER_INTERNAL_SHOW = z.infer<typeof fg_spinner_internal_show_parser>;

export const fg_spinner_event_get_context_send_to_machine_id_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.get_context').default('fg.spinner.event.get_context'),
  data: z.object({
    machine_id: z.string(),
  }),
});
export const fg_spinner_event_get_context_send_to_machine_ref_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.get_context').default('fg.spinner.event.get_context'),
  data: z.object({
    machine_ref: z.custom<AnyActorRef>()
  }),
});
export const fg_spinner_event_get_context_parser =  fg_spinner_event_get_context_send_to_machine_id_parser
.or( fg_spinner_event_get_context_send_to_machine_ref_parser );
// export const EventFgSpinnerGetContextParser =  z.object({
//   type: z
//     .literal('fg.spinner.event.get_context')
//     .default('fg.spinner.event.get_context'),
//   payload:
//     z.object({
//         machineId: z.string(),
//     }).or(
//     z.object({
//       machineRef: z.object({}).passthrough(),
//     })
//   )
// });
export type fg_spinner_event_get_context = z.infer<typeof fg_spinner_event_get_context_parser>;

export const fg_spinner_event_respond_context_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.respond_context').default('fg.spinner.event.respond_context'),
  data: fg_spinner_context_parser,
});
export type FG_SPINNER_EVENT_RESPOND_CONTEXT = z.infer<typeof fg_spinner_event_respond_context_parser>;

export const fg_spinner_event_set_context_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.set_context').default('fg.spinner.event.set_context'),
  data: fg_spinner_context_parser.partial(),
});
export type FG_SPINNER_EVENT_SET_CONTEXT = z.infer<typeof fg_spinner_event_set_context_parser>;

export const fg_spinner_event_set_progress_data_parser = z.object({
  items: fg_spinner_progress_item_parser.or(z.array(fg_spinner_progress_item_parser)),
});
export type FG_SPINNER_EVENT_SET_PROGRESS_DATA = z.infer<typeof fg_spinner_event_set_progress_data_parser>;

export const fg_spinner_event_set_progress_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.set_progress').default('fg.spinner.event.set_progress'),
  data: fg_spinner_event_set_progress_data_parser,
});
export type FG_SPINNER_EVENT_SET_PROGRESS = z.infer<typeof fg_spinner_event_set_progress_parser>;

export const fg_spinner_internal_force_hide_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.internal.force_hide').default('fg.spinner.internal.force_hide')
});
export type FG_SPINNER_INTERNAL_FORCE_HIDE = z.infer<typeof fg_spinner_internal_force_hide_parser>;

export const fg_spinner_internal_force_show_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.internal.force_show').default('fg.spinner.internal.force_show')
});
export type FG_SPINNER_INTERNAL_FORCE_SHOW = z.infer<typeof fg_spinner_internal_force_show_parser>;

export const fg_spinner_internal_reset_timeout_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.internal.reset_timeout').default('fg.spinner.internal.reset_timeout')
});
export type FG_SPINNER_INTERNAL_RESET_TIMEOUT = z.infer<typeof fg_spinner_internal_reset_timeout_parser>;

export const fg_spinner_event_dismiss_error_parser = fg_event_parser.extend({
  type: z.literal('fg.spinner.event.dismiss_error').default('fg.spinner.event.dismiss_error')
});
export type FG_SPINNER_EVENT_DISMISS_ERROR = z.infer<typeof fg_spinner_event_dismiss_error_parser>;
