import { ApplicationRef, inject, Injectable, signal } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';
import { EventFgSpinnerHideParser,
  EventFgSpinnerShowParser,
  FgAuthLocalMachineActorService,
  FgSpinnerMachineActorService, 
} from '@kppk/react-lib';

/**
 * AppService - 
 * Service for setting up and running the main
 * logic of thereact application
 */
@Injectable({
  providedIn: 'root'
})
export class AppService extends FgBaseService {
  protected $app_ref = inject(ApplicationRef);
  protected $actor_spinner = inject(FgSpinnerMachineActorService);
  protected $actor_auth = inject(FgAuthLocalMachineActorService);


  public readonly app_readyS = signal(false);
  // CONSTRUCTOR
  constructor() { 
    super();
    const event_force_spinner_show = EventFgSpinnerShowParser.parse({ payload: { force: true }})
    this.$actor_spinner.start();
    this.$actor_spinner.send(event_force_spinner_show);
    this.$actor_auth.start();

    this.$app_ref.whenStable().then( () => {
      this.app_readyS.set(true);
      const event_spinner_hide = EventFgSpinnerHideParser.parse({})
      this.$actor_spinner.send(event_spinner_hide);
    });
  }
}
