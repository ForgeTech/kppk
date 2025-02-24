import { z } from 'zod';
import { ActorSystem } from 'xstate';
import { fg_event_parser } from '@kppk/fg-lib-new';


export const fg_navigation_context_parser = z.object({
  // current_url: z.string().default(''),
  actived_url: z.string().default(''),
  target_url: z.string().default(''),
});
export type FG_NAVIGATION_CONTEXT = z.infer<typeof fg_navigation_context_parser>;

export const fg_navigation_action_input_parser = z.object({
  context: fg_navigation_context_parser,
  event: fg_event_parser,
  system: z.custom<ActorSystem<any>>()
});
export type FG_NAVIGATION_ACTION_INPUT = z.infer<typeof fg_navigation_action_input_parser>;

export const fg_navigation_guard_input_parser = z.object({
  context: fg_navigation_context_parser,
  event: z.any(),
});
export type FG_NAVIGATION_GUARD_INPUT = z.infer<typeof fg_navigation_guard_input_parser>;

export const fg_navigation_event_block_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.block"),
});
export type FG_NAVIGATION_EVENT_BLOCK = z.infer<typeof fg_navigation_event_block_parser>;

export const fg_navigation_event_disable_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.disable"),
});
export type FG_NAVIGATION_EVENT_DISABLE = z.infer<typeof fg_navigation_event_disable_parser>;

export const fg_navigation_event_enable = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.enable"),
});
export type FG_NAVIGATION_EVENT_ENABLE = z.infer<typeof fg_navigation_event_enable>;

export const fg_navigation_event_navigate = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.navigate"),
  data: z.object({
    url: z.string()
  })
});
export type FG_NAVIGATION_EVENT_NAVIGATE = z.infer<typeof fg_navigation_event_navigate>;

export const fg_navigation_event_permission_request_accept_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.permission_request.accept"),
});
export type FG_NAVIGATION_EVENT_PERMISSION_REQUEST_ACCEPT = z.infer<typeof fg_navigation_event_permission_request_accept_parser>;

export const fg_navigation_event_permission_request_decline_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.permission_request.decline"),
});
export type FG_NAVIGATION_EVENT_PERMISSION_REQUEST_DECLINE = z.infer<typeof fg_navigation_event_permission_request_decline_parser>;

export const fg_navigation_internal_check_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.internal.check"),
});
export type FG_NAVIGATION_INTERNAL_CHECK = z.infer<typeof fg_navigation_internal_check_parser>;

export const fg_navigation_internal_end_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.internal.end"),
});
export type FG_NAVIGATION_INTERNAL_END = z.infer<typeof fg_navigation_internal_end_parser>;

export const fg_navigation_internal_redirect_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.internal.redirect"),
});
export type FG_NAVIGATION_INTERNAL_REDIRECT = z.infer<typeof fg_navigation_internal_redirect_parser>;

export const fg_navigation_internal_start_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.internal.start"),
});
export type FG_NAVIGATION_INTERNAL_START = z.infer<typeof fg_navigation_internal_start_parser>;

export const fg_navigation_emitted_ended_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.emitted.ended"),
});
export type FG_NAVIGATION_EMITTED_ENDED = z.infer<typeof fg_navigation_emitted_ended_parser>;

export const fg_navigation_emitted_started_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.emitted.started"),
});
export type FG_NAVIGATION_EMITTED_STARTED = z.infer<typeof fg_navigation_emitted_started_parser>;

