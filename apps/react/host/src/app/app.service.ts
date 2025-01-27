import { ApplicationRef, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { FgBaseService, FgBreakpoint, FgEnvironmentService, FgEventService } from '@kppk/fg-lib-new';
import { EventFgSpinnerHideParser,
  EventFgSpinnerShowParser,
  FgAuthLocalMachineActorService,
  FgSpinnerMachineActorService,
  ReactInitMachineActorService, 
} from '@kppk/react-lib';
import { filter } from 'rxjs';

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
  protected $translate = inject(TranslocoService);
  protected $environment = inject(FgEnvironmentService);
  protected $actor_spinner = inject(FgSpinnerMachineActorService);
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected $breakpoint = inject(FgBreakpoint);

  public readonly app_readyS = signal(false);
  // CONSTRUCTOR
  constructor() { 
    super();

    const event_force_spinner_show = EventFgSpinnerShowParser.parse({ payload: { force: true }})
    this.$actor_spinner.start();
    this.$actor_spinner.send(event_force_spinner_show);
    this.$actor_auth.start();

    this.$translate.setDefaultLang(this.$environment.i18n.defaultLang);

    this.$app_ref.whenStable().then( () => {
      this.app_readyS.set(true);
      const event_spinner_hide = EventFgSpinnerHideParser.parse({})
      this.$actor_spinner.send(event_spinner_hide);
    });

    const custom_breakpoints = {
      'xs': 'screen and (min-width: 320px)',
      'sm': 'screen and (min-width: 640px)',
      'md': 'screen and (min-width: 768px)',
      'lg': 'screen and (min-width: 1024px)',
      'xl': 'screen and (min-width: 1280px)',
      '2xl': 'screen and (min-width: 1536px)'
    }
    this.$breakpoint.register(custom_breakpoints);
  }
}
