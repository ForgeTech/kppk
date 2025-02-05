import { z } from 'zod';
import { AppConfigInterface } from '../../interface';
import { FgEnvironmentConfigInterface } from '@kppk/fg-lib-new';
import { fg_auth_local_credentials_parser } from '../fg-auth-local';
import { react_view_calculation_parser } from '../../types';

//  {
//           environment: FgEnvironmentConfigInterface<AppConfigInterface>
//           debug_culculation_v1: REACT_VIEW_CALCULATION,
//           credentials: CredentialsFgAuthLocal
//         },

export const load_admin_data_parser = z.object({
  debug_calculation_v1: react_view_calculation_parser,
  environment: z.custom<FgEnvironmentConfigInterface<AppConfigInterface>>(),
});
export type LOAD_ADMI_DATA = z.infer<typeof load_admin_data_parser>;

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

