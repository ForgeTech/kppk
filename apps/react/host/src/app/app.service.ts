import { ApplicationRef, effect, inject, Injectable, signal } from '@angular/core';
import { FgEnvironmentService } from '@kppk/fg-lib-new';
import { EventFgSpinnerHideParser, EventFgSpinnerShowParser, KppkAuthLocalActorService, KppkSpinnerActorService } from '@kppk/react-lib';


/**
 * AppService - 
 * Service for setting up and running the main
 * logic of thereact application
 */
@Injectable({
  providedIn: 'root'
})
export class AppService {
  protected $env = inject(FgEnvironmentService);  
  protected $app_ref = inject(ApplicationRef);

  protected $spinner = inject(KppkSpinnerActorService);
  protected $auth = inject(KppkAuthLocalActorService);

  public readonly app_readyS = signal(false);
  // CONSTRUCTOR
  constructor() { 
    const event_force_spinner_show = EventFgSpinnerShowParser.parse({ payload: { force: true }})
    this.$spinner.start();
    this.$spinner.send(event_force_spinner_show);
    this.$auth.start();

    this.$app_ref.whenStable().then( () => {
      this.app_readyS.set(true);
      const event_spinner_hide = EventFgSpinnerHideParser.parse({})
      this.$spinner.send(event_spinner_hide);
    });

    // effect( () => {
    //   console.warn('>>>>>>>AUTH_EMIT>>>>>>>');
    //   console.warn(this.$auth.eventsS());
    // })
    // effect( () => {
    //   console.error('>>>>>>>AUTH_SNAPSHOT>>>>>>>');
    //   console.error(this.$auth.stateS());
    //   if(this.$auth.stateS()?.matches({'STATE': 'UNAUTHORIZED'})) {
    //     console.log('TRY LOGIN');
        
    //   }
    // })
    // effect( () => {
    //   console.error('>>>>>>>SPINNER_EMIT>>>>>>>');
    //   console.error(this.$spinner.eventsS());
    // })
    // effect( () => {
    //   console.error('>>>>>>>SPINNER_SNAPSHOT>>>>>>>');
    //   console.error(this.$spinner.stateS());
    // })
  }
}
