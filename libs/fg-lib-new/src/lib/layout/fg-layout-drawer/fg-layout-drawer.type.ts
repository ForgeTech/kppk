import { ComponentType, Portal } from '@angular/cdk/portal';
import { z } from 'zod';
import { fg_event_parser } from '../../service';
import { TemplateRef } from '@angular/core';

export const fg_layout_drawer_open_options_parser = z.object({
  has_backdrop: z.boolean().default(true),
  mode: z.literal('over').or(z.literal('push')).or(z.literal('side')).default('push'),
  content: z.custom<Portal<any>>().optional(),
  from: z.literal('start').or(z.literal('end')).default('start'),
  target: z.string().optional(),
  source: z.string().optional(),
});

export type FG_LAYOUT_DRAWER_OPEN_OPTIONS = z.infer<typeof fg_layout_drawer_open_options_parser>; 

export const fg_layout_drawer_event_open_parser = fg_event_parser.extend({
  type: z.literal('fg.layout.drawer.event.open'),
  data: fg_layout_drawer_open_options_parser
})
export type FG_LAYOUT_DRAWER_OPEN_EVENT = z.infer<typeof fg_layout_drawer_event_open_parser>;

export const fg_layout_drawer_close_options_parser = z.object({
  source: z.string().optional(),
  target: z.string().optional()
});
export type FG_LAYOUT_DRAWER_CLOSE_OPTIONS = z.infer<typeof fg_layout_drawer_close_options_parser>; 

export const fg_layout_drawer_event_close_parser = fg_event_parser.extend({
  type: z.literal('fg.layout.drawer.event.close')
})
export type FG_LAYOUT_DRAWER_CLOSE_EVENT = z.infer<typeof fg_layout_drawer_event_close_parser>;

export const fg_layout_event_scroll_to_data_parser = z.object({
  left: z.number(),
  top: z.number(),
  behavior: z.literal('smooth').or(z.literal('auto')).default('smooth')
})
export type FG_LAYOUT_SCROLL_TO_EVENT_DATA = z.infer<typeof fg_layout_event_scroll_to_data_parser>;

export const fg_layout_event_scroll_to_parser = fg_event_parser.extend({
  type: z.literal('fg.layout.event.scroll_to'),
  date: fg_layout_event_scroll_to_data_parser
})
export type FG_LAYOUT_SCROLL_TO_EVENT = z.infer<typeof fg_layout_event_scroll_to_parser>;
