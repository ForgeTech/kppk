import { inject, Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, map, merge, Observable } from 'rxjs';
import { EventObject } from 'xstate';
import { FgXstateService } from '../../service';
import { z } from 'zod';
import { fg_event_parser } from '@kppk/fg-lib-new';

export const fg_router_context_parser = z.object({
  target: z.string().optional(),
  source: z.string().optional(),
  broadcast: z.literal(true).optional(),
});
export type FG_ROUTER_CONTEXT = z.infer<typeof fg_router_context_parser>;

export const fg_navigation_event_start_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.start"),
  date: z.object({ 
    url: z.string()
  })
});
export type FG_NAVIGATION_EVENT_START = z.infer<typeof fg_navigation_event_start_parser>;

export const fg_navigation_event_end_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.end"),
  date: z.object({ 
    url: z.string(),
    url_after_redirects: z.string()
  })
});
export type FG_NAVIGATION_EVENT_END = z.infer<typeof fg_navigation_event_end_parser>;

export const fg_navigation_event_cancel_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.cancel"),
  date: z.object({ 
    url: z.string(),
    reason: z.string()
  })
});
export type FG_NAVIGATION_EVENT_CANCEL = z.infer<typeof fg_navigation_event_cancel_parser>;

@Injectable({
  providedIn: 'root',
})
export class FgRouterMachineService {
  protected $router = inject(Router);
  protected $xstate = inject(FgXstateService);

  public getMachine(config?: FG_ROUTER_CONTEXT) {
    const parsed_config = fg_router_context_parser.parse(config);
    const router$: Observable<EventObject> = merge(
      this.$router.events.pipe(
        filter((event) => (event instanceof NavigationStart ? true : false)),
        map((event) => {
          const { url } = event as NavigationStart;
          return fg_navigation_event_start_parser.parse({ 
            type: 'fg.navigation.event.start',
            ...parsed_config,
            data: { url } 
          });
      })),
      this.$router.events.pipe(
        filter((event) => (event instanceof NavigationEnd ? true : false)),
        map((event) => {
          const { url, urlAfterRedirects } = event as NavigationEnd;
          return fg_navigation_event_end_parser.parse({
            type: 'fg.navigation.event.end',
            ...parsed_config,
            data: { url, url_after_redirects: urlAfterRedirects },
          });
      })),
      this.$router.events.pipe(
        filter((event) => (event instanceof NavigationCancel ? true : false)),
        map((event) => {
          const { url, reason } = event as NavigationCancel;
          return fg_navigation_event_cancel_parser.parse({ 
            type: 'fg.navigation.event.cancel', 
            ...parsed_config,
            data: { url, reason } 
          });
      }))
    );
    return this.$xstate.fromEventObservable(() => router$);
  }
}
