import { z } from 'zod';
import { ActorSystem } from 'xstate';
import { fg_auth_local_auth_cookie_parser } from './../fg-auth-local/fg-auth-local.machine.types'
import { fg_event_parser } from '@kppk/fg-lib-new';
import { form_values_parser, react_calculation_data_parser, react_view_calculation_parser } from '../../types';


export const assign_active_url_param_parser = z.object({
  url: z.string().startsWith('/'),
});
export type ASSIGN_ACTIVE_URL_PARAM = z.infer<typeof assign_active_url_param_parser>;

export const assign_active_navigation_params_parser = z.object({
  active_navigation: z.boolean(),
});
export type ASSIGN_ACTIVE_NAVIGATION_PARAM = z.infer<typeof assign_active_navigation_params_parser>;

export const react_running_context_parser = z.object({
  active_navigation: z.boolean().default(false),
  auth_cookie: fg_auth_local_auth_cookie_parser.optional(),
  calculation: z.object({}).passthrough().optional(),
  data: react_calculation_data_parser.optional(),
  form_defaults: form_values_parser.optional(),
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
