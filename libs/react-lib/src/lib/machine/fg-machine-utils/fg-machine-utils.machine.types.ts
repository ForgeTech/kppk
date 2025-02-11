import { ActorSystem } from 'xstate';
import { z } from 'zod';

export const any_action_input_parser = z.object({
  context: z.any().optional(),
  event: z.any().optional(),
  system: z.custom<ActorSystem<any>>()
});
export type ANY_ACTION_INPUT = z.infer<typeof any_action_input_parser>;


export const log_info_option_params_parser = z.object({
  message: z.string().optional(),
  log_event: z.boolean().optional(),
  log_context: z.boolean().optional(),
});
export type LOG_INFO_OPTIONS = z.infer<typeof log_info_option_params_parser>;
