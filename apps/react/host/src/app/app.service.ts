import { ApplicationRef, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FgEnvironmentService } from '@kppk/fg-lib-new';
import { FgAuthLocalService, FgSpinnerService, FgXstateService } from '@kppk/react-lib';
import { ActorRefFrom, createActor, SnapshotFrom } from 'xstate';

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
  protected $xstate = inject(FgXstateService);
  protected $destroy_ref = inject(DestroyRef);

  protected $app_ref = inject(ApplicationRef);
  public app_readyS = signal(false)

  protected $auth_machine = inject(FgAuthLocalService);
  public auth_actor: ActorRefFrom<typeof this.$auth_machine.machine>;
  public auth_stateS = signal<SnapshotFrom<typeof this.$auth_machine.machine> | undefined>(undefined);

  protected $spinner_machine = inject(FgSpinnerService);
  public spinner_actor: ActorRefFrom<typeof this.$spinner_machine.machine>;
  public spinner_stateS =  signal<SnapshotFrom<typeof this.$spinner_machine.machine> | undefined>(undefined);
  
  // CONSTRUCTOR
  constructor() { 
    this.$app_ref.whenStable().then( () => {
      this.app_readyS.set(true);
    })
    // const config_auth_machine: ActorOptions<ActorLogicFrom<typeof this.$auth_machine.machine>> = {
    // const config_auth_machine: ActorOptions<AnyActorLogic> = {
    const config_auth_machine: any = {
      input: undefined,
      systemId: 'AUTH_ACTOR'
    };
    // const config_spinner_machine: ActorOptions<ActorLogicFrom<typeof this.$auth_machine.machine>> = {
    // const config_spinner_machine: ActorOptions<AnyActorLogic> = {
    const config_spinner_machine: any = {
      input: undefined,
      systemId: 'SPINNER_ACTOR',
    };
    // If development mode is enabled set xstate inspector
    if(this.$env.development?.enabled) {
      config_auth_machine.inspect = this.$xstate.inspect;
      config_spinner_machine.inspect = this.$xstate.inspect;
    }
    // Create actors
    this.auth_actor = createActor(this.$auth_machine.machine, config_auth_machine);
    this.spinner_actor = createActor(this.$spinner_machine.machine, config_spinner_machine);
    // Push actor snapshots to signals
    this.auth_actor.subscribe( snapshot => {
      this.auth_stateS.set( snapshot );
    });
    this.spinner_actor.subscribe( snapshot => {
      this.spinner_stateS.set( snapshot );
    });
    // Start actors
    this.auth_actor.start();
    this.spinner_actor.start();
    // OnDestroy
    this.$destroy_ref.onDestroy( () => {
      // Stop actors
      this.auth_actor.stop();
      this.spinner_actor.stop();
    });
  }
}
