import { ApplicationRef, inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import {
  FgBaseService,
  FgBreakpoint,
  FgEnvironmentService,
} from '@kppk/fg-lib-new';
import {
  ReactMainV3MachineActorService,
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
  public $actor_main = inject(ReactMainV3MachineActorService);
  protected $breakpoint = inject(FgBreakpoint);

  // public readonly app_readyS = signal(false);
  // CONSTRUCTOR
  constructor() {
    super();

    // const event_force_spinner_show = fg_spinner_event_show_parser.parse({ data:{ force: true }});
    // this.$actor_spinner.start();
    // this.$actor_spinner.send(event_force_spinner_show);
    // // this.$actor_running.start();
    // this.$actor_auth.event$.pipe(takeUntilDestroyed()).subscribe({
    //   next: event => {
    //     console.log('EMITTED_FROM_AUTHLOCAL')
    //     console.log( event );
    //     const parsed_event = fg_auth_local_emitted_authorized_parser.or(fg_auth_local_emitted_unauthorized_parser).parse(event);
    //     this.$actor_running.send(parsed_event);
    //     this.$actor_main.send(parsed_event as any);
    //   },
    // })
    // this.$actor_auth.state$.pipe(takeUntilDestroyed()).subscribe({
    //   next: snapshot => {
    //     // console.log('SNAPSHOT_FROM_AUTHLOCAL');
    //     console.log( snapshot );
    //   },
    //   error: error => {
    //     // console.log('ERROR_FROM_AUTHLOCAL');
    //     console.log(error)
    //   },
    //   complete: () => {
    //     console.log('COMPLETE_FROM_AUTHLOCAL');
    //   }
    // })
    // this.$actor_auth.start();
    // this.$actor_running.state$.pipe(takeUntilDestroyed()).subscribe({
    //   next: snapshot => {
    //     console.log('SNAPSHOT_FROM_RUNNING');
    //     console.log( snapshot);
    //     console.log( this.$actor_running.actor.system );
    //   },
    //   error: error => {
    //     // console.log('ERROR_FROM_RUNNING');
    //     console.log(error)
    //   },
    //   complete: () => {
    //     console.log('COMPLETE_FROM_RUNNING');
    //   }
    // })
    // this.$actor_running.start();
    this.$actor_main.state$.pipe(takeUntilDestroyed()).subscribe({
      next: snapshot => {
        console.log('SNAPSHOT_FROM_MAIN');
        console.log( snapshot);
        console.log( this.$actor_main.actor.system );
      },
      error: error => {
        console.log('ERROR_FROM_MAIN');
        console.log(error)
      },
      complete: () => {
        console.log('COMPLETE_FROM_MAIN');
      }
    })
    this.$actor_main.start();

    this.$translate.setDefaultLang(this.$environment.i18n.defaultLang);

    // this.$app_ref.whenStable().then(() => {
    //   this.app_readyS.set(true);
    //   this.$actor_main.send({ type: 'fg.app.ready'});
    //   const event_spinner_hide = fg_spinner_event_hide_parser.parse({});
    //   this.$actor_spinner.send(event_spinner_hide);
    // });

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
