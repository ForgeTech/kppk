import { z } from 'zod';

// export const ProgressItemFgSpinnerParser = z.object({
//   name: z.string(),
//   progress: z.number().min(0).max(100).default(0),
//   finished: z.boolean().default(false),
//   // .or(z.undefined().transform(() => 0)),
// });
// export type ProgressItemFgSpinner = z.infer<typeof ProgressItemFgSpinnerParser>;