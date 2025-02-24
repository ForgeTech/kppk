import { z } from 'zod';
import { AppConfigInterface } from '../../interface';
import { fg_event_parser, FgEnvironmentConfigInterface } from '@kppk/fg-lib-new';
import { fg_auth_local_credentials_parser } from '../fg-auth-local';
import { react_view_calculation_parser } from '../../types';

export const load_admin_data_parser = z.object({
  debug_calculation_v1: react_view_calculation_parser,
  environment: z.custom<FgEnvironmentConfigInterface<AppConfigInterface>>(),
});
export type LOAD_ADMIN_DATA = z.infer<typeof load_admin_data_parser>;

export const react_admin_toolbar_context_parser = z.object({
  environment: z.custom<FgEnvironmentConfigInterface<AppConfigInterface>>(),
  debug_culculation_v1: react_view_calculation_parser.optional(),
  credentials: fg_auth_local_credentials_parser.optional()
});
export type REACT_ADMIN_TOOLBAR_CONTEXT = z.infer<
  typeof react_admin_toolbar_context_parser
>;

export const react_admin_toolbar_input_parser = z.object({
  context: react_admin_toolbar_context_parser,
  event: z.any()
});
export type REACT_ADMIN_TOOLBAR_INPUT = z.infer<typeof load_admin_data_parser>;

export const react_admin_toolbar_event_auth_toggle_parser = fg_event_parser.extend({
  type: z.literal("react.admin_toolbox.event.auth.toggle"),
});
export type REACT_ADMIN_TOOLBAR_EVENT_AUTH_TOGGLE = z.infer<typeof react_admin_toolbar_event_auth_toggle_parser>;

export const react_admin_toolbar_event_test_calculation_toggle_parser = fg_event_parser.extend({
  type: z.literal("react.admin_toolbox.event.test_calculation.toggle"),
});
export type REACT_ADMIN_TOOLBAR_EVENT_TEST_CALCULATION_TOGGLE = z.infer<typeof react_admin_toolbar_event_test_calculation_toggle_parser>;

export const react_admin_toolbar_event_x_state_toggle_parser = fg_event_parser.extend({
  type: z.literal("react.admin_toolbox.event.x_state.toggle"),
});
export type REACT_ADMIN_TOOLBAR_EVENT_X_STATE_TOGGLE = z.infer<typeof react_admin_toolbar_event_x_state_toggle_parser>;

export const react_admin_toolbar_event_stopped_parser = fg_event_parser.extend({
  type: z.literal("react.admin_toolbox.event.stopped"),
});
export type REACT_ADMIN_TOOLBAR_EVENT_STOPPED = z.infer<typeof react_admin_toolbar_event_stopped_parser>;

export const react_admin_toolbar_event_refresh_parser = fg_event_parser.extend({
  type: z.literal("react.admin_toolbox.event.refresh"),
});
export type REACT_ADMIN_TOOLBAR_EVENT_REFRESH = z.infer<typeof react_admin_toolbar_event_refresh_parser>;

