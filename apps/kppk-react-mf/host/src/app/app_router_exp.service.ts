import { ApplicationRef, inject, Injectable, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FgBaseService, FgEnvironmentService, FgEventService } from '@kppk/fg-lib-new';
import { EventFgSpinnerHideParser,
  EventFgSpinnerShowParser,
  FgAuthLocalMachineActorService,
  FgSpinnerMachineActorService, 
} from '@kppk/react-lib';
import { filter, map, merge, Observable } from 'rxjs';
import { createActor, emit, EventObject, fromEventObservable, setup } from 'xstate';


/**
 * AppService - 
 * Service for setting up and running the main
 * logic of thereact application
 */
@Injectable({
  providedIn: 'root'
})
export class AppRouterExpService extends FgBaseService {
  protected $env = inject(FgEnvironmentService);  
  protected $app_ref = inject(ApplicationRef);
  protected $event = inject(FgEventService);

  protected $spinner = inject(FgSpinnerMachineActorService);
  protected $auth = inject(FgAuthLocalMachineActorService);
  protected $router = inject(Router);

  //  const router_events$ = this.$router.events.pipe( filter( event => {
  //   return event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationCancel ? true : false;
  //  }));
  //  const machine_obs = fromObservable( () => router_events$ );
  //  const actor_obs$ = createActor(machine_obs);
  //  actor_obs$.start();
  //  actor_obs$.subscribe( event => {
  //   this.$log.fatal('>>>>>>>>>>>>>> fromObservable >>>>>>>>>>>>')
  //   this.$log.fatal( event.context );
  //  });

   const transformed_router_events$: Observable<EventObject> = merge(
    this.$router.events.pipe(
      filter( event => event instanceof NavigationStart ? true : false ),
      map( event => {
        const { url } = ( event as NavigationStart );
        return  { type: 'fg.navigation.event.start', data: { url }};
      }),
    ),
    this.$router.events.pipe( 
      filter( event => event instanceof NavigationEnd ? true : false ),
      map( event => {
        const { url, urlAfterRedirects } = ( event as NavigationEnd );
        return  { type: 'fg.navigation.event.end', broadcast: true, data: { url, urlAfterRedirects }};
      })
    ),
    this.$router.events.pipe( 
      filter( event => event instanceof NavigationCancel ? true : false ),
      map( event => {
        const { url, reason } = ( event as NavigationCancel );
        return  { type: 'fg.navigation.event.cancel', data: { url, reason }};
      })
    ),
   );

  }
}
