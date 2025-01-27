import { z } from 'zod';

export const form_step_selection_data = z.object({
  material: z.boolean().optional().default(true),
  construction_site: z.boolean().optional().default(true),
  container_village: z.boolean().optional().default(true),
  demolish_disposal: z.boolean().optional().default(true),
  excavation_pit: z.boolean().optional().default(true),
  heating_system: z.boolean().optional().default(true),
});

export type FORM_STEP_SELECTION_DATA = z.infer<typeof form_step_selection_data>;
