import { z } from 'zod';
import { ActorSystem } from 'xstate';
import { fg_auth_local_auth_cookie_parser } from '../fg-auth-local/fg-auth-local.machine.types'
import { fg_event_parser } from '@kppk/fg-lib-new';
import { method } from 'lodash-es';


// export const assign_active_url_param_parser = z.object({
//   url: z.string().startsWith('/'),
// });
// export type ASSIGN_ACTIVE_URL_PARAM = z.infer<typeof assign_active_url_param_parser>;

export const react_main_context_parser = z.object({
  environment: z.any().optional(),
});
export type REACT_MAIN_CONTEXT = z.infer<typeof react_main_context_parser>;

export const react_main_action_input_parser = z.object({
  context: react_main_context_parser,
  event: z.any(),
  system: z.custom<ActorSystem<any>>()
});
export type REACT_MAIN_ACTION_INPUT = z.infer<typeof react_main_action_input_parser>;

export const react_main_guard_input_parser = z.object({
  context: react_main_context_parser,
  event: z.any(),
});
export type REACT_MAIN_GUARD_INPUT = z.infer<typeof react_main_guard_input_parser>;

// export const log_info_option_params_parser = z.object({
//   message: z.string().optional(),
//   log_event: z.boolean().optional(),
//   log_context: z.boolean().optional(),
// });
// export type LOG_INFO_OPTIONS = z.infer<typeof log_info_option_params_parser>;

// export const react_running_event_calculation_start_parser = fg_event_parser.extend({
//   type: z.literal("react.running.event.calculation.start"),
// });
// export type REACT_RUNNING_EVENT_CALCULATION_START = z.infer<typeof react_running_event_calculation_start_parser>;

// export const react_running_event_select_active_view_parser = fg_event_parser.extend({
//   type: z.literal("react.running.select_active_view"),
//   data: z.object({ 
//     url: z.string()
//   }).optional()
// });
// export type REACT_RUNNING_EVENT_SELECT_ACTIVE_VIEW = z.infer<typeof react_running_event_select_active_view_parser>;
