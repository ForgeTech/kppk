import { ApplicationRef, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import {
  FgBaseService,
  FgBreakpoint,
  FgEnvironmentService,
} from '@kppk/fg-lib-new';
import {
  fg_spinner_event_hide_parser,
  fg_spinner_event_show_parser,
  FgAuthLocalMachineActorService,
  FgSpinnerMachineActorService,
  ReactRunningV7MachineActorService,
} from '@kppk/react-lib';
import { Breakpoints as MATERIAL_BREAKPOINTS} from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
/**
 * AppService -
 * Service for setting up and running the main
 * logic of thereact application
 */
@Injectable({
  providedIn: 'root',
})
export class AppService extends FgBaseService {
  protected $app_ref = inject(ApplicationRef);
  protected $translate = inject(TranslocoService);
  protected $environment = inject(FgEnvironmentService);
  protected $actor_spinner = inject(FgSpinnerMachineActorService);
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected $breakpoint = inject(FgBreakpoint);
  public $actor_running = inject(ReactRunningV7MachineActorService);

  public readonly app_readyS = signal(false);
  // CONSTRUCTOR
  constructor() {
    super();

    const event_force_spinner_show = fg_spinner_event_show_parser.parse({ data:{ force: true }});
    this.$actor_spinner.start();
    this.$actor_spinner.send(event_force_spinner_show);
    this.$actor_running.start();
    // this.$actor_auth.event$.pipe(takeUntilDestroyed()).subscribe({
    //   next: event => {
    //     console.log('EMITTED_FROM_AUTHLOCAL')
    //     console.log( event );
    //     this.$actor_running.send(event as any)
    //   }
    // })
    this.$actor_auth.start();

    this.$translate.setDefaultLang(this.$environment.i18n.defaultLang);

    this.$app_ref.whenStable().then(() => {
      this.app_readyS.set(true);
      const event_spinner_hide = fg_spinner_event_hide_parser.parse({});
      this.$actor_spinner.send(event_spinner_hide);
    });

    const breakpoints = {
      // Tailwind media-queries
      'xs': 'screen and (min-width: 320px)',
      'sm': 'screen and (min-width: 640px)',
      'md': 'screen and (min-width: 768px)',
      'lg': 'screen and (min-width: 1024px)',
      'xl': 'screen and (min-width: 1280px)',
      '2xl': 'screen and (min-width: 1536px)',
      ...MATERIAL_BREAKPOINTS
    };
    this.$breakpoint.register(breakpoints);
  }
}
