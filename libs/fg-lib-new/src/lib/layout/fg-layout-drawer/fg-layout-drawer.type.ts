import { Portal } from '@angular/cdk/portal';
import { z } from 'zod';

export const fg_layout_drawer_options_parser = z.object({
  has_backdrop: z.boolean().default(true),
  mode: z.literal('over').or(z.literal('push')).or(z.literal('side')).default('push'),
  portal_content: z.custom<Portal<any>>(),
  position: z.literal('start').or(z.literal('end')).default('start'),
  target: z.string().optional(),
  source: z.string().optional(),
});

export type FG_LAYOUT_DRAWER_OPTIONS = z.infer<typeof fg_layout_drawer_options_parser>; 
