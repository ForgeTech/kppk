import { z } from 'zod';
import { ActorSystem } from 'xstate';
import { fg_auth_local_auth_cookie_parser } from './../fg-auth-local/fg-auth-local.machine.types'
import { fg_event_parser } from '@kppk/fg-lib-new';
import { react_view_calculation_parser } from '../../types';


export const assign_active_url_param_parser = z.object({
  url: z.string().startsWith('/'),
});
export type ASSIGN_ACTIVE_URL_PARAM = z.infer<typeof assign_active_url_param_parser>;

export const react_running_context_parser = z.object({
  auth_cookie: fg_auth_local_auth_cookie_parser.optional(),
  calculation: z.object({}).passthrough().optional()
});
export type REACT_RUNNING_CONTEXT = z.infer<typeof react_running_context_parser>;

export const react_running_action_input_parser = z.object({
  context: react_running_context_parser,
  event: z.any(),
  system: z.custom<ActorSystem<any>>()
});
export type REACT_RUNNING_ACTION_INPUT = z.infer<typeof react_running_action_input_parser>;

export const react_running_guard_input_parser = z.object({
  context: react_running_context_parser,
  event: z.any(),
});
export type REACT_RUNNING_GUARD_INPUT = z.infer<typeof react_running_guard_input_parser>;

export const react_running_event_calculation_start_parser = fg_event_parser.extend({
  type: z.literal("react.running.event.calculation.start"),
  data: z.object({
    calculation: react_view_calculation_parser
  })
});
export type REACT_RUNNING_EVENT_CALCULATION_START = z.infer<typeof react_running_event_calculation_start_parser>;

export const react_running_event_select_active_view_parser = fg_event_parser.extend({
  type: z.literal("react.running.select_active_view"),
  data: z.object({ 
    url: z.string()
  }).optional()
});
export type REACT_RUNNING_EVENT_SELECT_ACTIVE_VIEW = z.infer<typeof react_running_event_select_active_view_parser>;

// export const fg_navigation_internal_start_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.internal.start"),
// });
// export type FG_NAVIGATION_INTERNAL_START = z.infer<typeof fg_navigation_internal_start_parser>;

// export const fg_navigation_internal_end_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.internal.end"),
// });
// export type FG_NAVIGATION_INTERNAL_END = z.infer<typeof fg_navigation_internal_end_parser>;

// export const fg_navigation_internal_ready_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.internal.ready"),
// });
// export type FG_NAVIGATION_INTERNAL_READY = z.infer<typeof fg_navigation_internal_ready_parser>;

// export const fg_navigation_event_block_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.event.block"),
// });
// export type FG_NAVIGATION_EVENT_BLOCK = z.infer<typeof fg_navigation_event_block_parser>;

// export const fg_navigation_event_unblock_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.event.unblock"),
// });
// export type FG_NAVIGATION_EVENT_UNBLOCK = z.infer<typeof fg_navigation_event_unblock_parser>;

// export const fg_navigation_event_permission_request_decline_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.event.permission_request.decline"),
// });
// export type FG_NAVIGATION_EVENT_PERMISSION_REQUEST_DECLINE = z.infer<typeof fg_navigation_event_permission_request_decline_parser>;

// export const fg_navigation_event_permission_request_accept_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.event.permission_request.accept"),
// });
// export type FG_NAVIGATION_EVENT_PERMISSION_REQUEST_ACCEPT = z.infer<typeof fg_navigation_event_permission_request_accept_parser>;

// export const fg_navigation_event_disable_parser = fg_event_parser.extend({
//   type: z.literal("fg.navigation.event.disable"),
// });
// export type FG_NAVIGATION_EVENT_DISABLE = z.infer<typeof fg_navigation_event_disable_parser>;

// export const fg_navigation_event_enable = fg_event_parser.extend({
//   type: z.literal("fg.navigation.event.enable"),
// });
// export type FG_NAVIGATION_EVENT_ENABLE = z.infer<typeof fg_navigation_event_enable>;
