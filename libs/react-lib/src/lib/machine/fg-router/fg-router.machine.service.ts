import { inject, Injectable } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, map, merge, Observable, of, switchMap } from 'rxjs';
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
  data: z.object({ 
    url: z.string()
  })
});
export type FG_NAVIGATION_EVENT_START = z.infer<typeof fg_navigation_event_start_parser>;

export const fg_navigation_event_end_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.end"),
  data: z.object({ 
    url: z.string(),
    url_after_redirects: z.string()
  })
});
export type FG_NAVIGATION_EVENT_END = z.infer<typeof fg_navigation_event_end_parser>;

export const fg_navigation_event_cancel_parser = fg_event_parser.extend({
  type: z.literal("fg.navigation.event.cancel"),
  data: z.object({ 
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
    const parsed_config = fg_router_context_parser.parse(config ?? {});


    const router$: Observable<EventObject> = of(parsed_config).pipe(switchMap( config => {
      return merge(
        this.$router.events.pipe(
          filter((event) => (event instanceof NavigationStart ? true : false)),
          map((event) => {
            const { url } = event as NavigationStart;
            const result = fg_navigation_event_start_parser.parse({ 
              type: 'fg.navigation.event.start',
              ...config,
              data: { url } 
            });
            return result;
        })),
        this.$router.events.pipe(
          filter((event) => (event instanceof NavigationEnd ? true : false)),
          map((event) => {
            const { url, urlAfterRedirects } = event as NavigationEnd;
            const result = fg_navigation_event_end_parser.parse({
              type: 'fg.navigation.event.end',
              ...config,
              data: { url, url_after_redirects: urlAfterRedirects },
            });
            return result;
        })),
        this.$router.events.pipe(
          filter((event) => (event instanceof NavigationCancel ? true : false)),
          map((event) => {
            const { url, reason } = event as NavigationCancel;
            const result = fg_navigation_event_cancel_parser.parse({ 
              type: 'fg.navigation.event.cancel', 
              ...config,
              data: { url, reason } 
            });
            return result;
        }))
      );
    })) 
    return this.$xstate.fromEventObservable(() => router$);
  }
}
