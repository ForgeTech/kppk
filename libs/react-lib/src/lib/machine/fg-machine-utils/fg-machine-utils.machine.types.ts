import { FgNgxLoggerMethodeType } from 'libs/fg-lib-new/src/lib/interface/fg-environment-develpment-event.config.interface';
import { ActorSystem } from 'xstate';
import { z } from 'zod';

export const any_action_input_parser = z.object({
  context: z.any().optional(),
  event: z.any().optional(),
  system: z.custom<ActorSystem<any>>()
});
export type ANY_ACTION_INPUT = z.infer<typeof any_action_input_parser>;


export const log_option_parser = z.object({
  message: z.string().optional(),
  log_event: z.boolean().optional(),
  log_context: z.boolean().optional(),
});
export const log_option_params_parser = log_option_parser.optional();
export type LOG_OPTIONS = z.infer<typeof log_option_params_parser>;



export const log_level_option_params_parser = log_option_parser.extend({
  level: z.custom<FgNgxLoggerMethodeType>()
}).optional();
export type LOG_LEVEL_OPTIONS = z.infer<typeof log_level_option_params_parser>;
