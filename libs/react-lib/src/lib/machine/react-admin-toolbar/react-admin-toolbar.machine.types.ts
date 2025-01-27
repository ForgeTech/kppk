import { z } from 'zod';

export const react_admin_toolbar_context_parser = z.object({
  test_calculation: z.any().optional(),
});
export type REACT_ADMIN_TOOLBAR_CONTEXT = z.infer<
  typeof react_admin_toolbar_context_parser
>;
