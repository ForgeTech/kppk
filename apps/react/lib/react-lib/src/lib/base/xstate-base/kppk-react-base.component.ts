import { computed, effect, inject } from '@angular/core';
import { FgComponentBaseComponent } from '@fg-kppk/fg-base';

import { KppkReactComponentBaseService } from './kppk-react-component-base.service';
import { FgXstateService } from '../../service/fg-xstate.service';


/**
 * KppkReactBaseComponent -
 * Abstract base component to be extended to access basic shared
 * resources of kppk react application 
 */ 
export abstract class KppkReactBaseComponent extends FgComponentBaseComponent {
  public override readonly $component = inject(KppkReactComponentBaseService);
  public readonly ROUTES = this.$component.ROUTES;
  public readonly SYSTEM = this.$component.SYSTEM;

  /** Observable providing react-main actor */  
  public readonly actor_main$ = this.$component.actor_main$;
  /** Observable providing snapshot of react-main actor */
  public readonly state_main$ = this.$component.state_main$;
  /** Signal providing react-main actor */
  public readonly actor_main_s = this.$component.actor_main_s;
  /** Signal providing snapshot of react-main actor */
  public readonly state_main_s = this.$component.state_main_s;

  /** Observable providing authorization actor nested in react-main actor */
  public readonly actor_auth$ = this.$component.actor_auth$;
  /** Observable providing snapshot of authorization actor nest in react-main actor */
  public readonly state_auth$ = this.$component.state_auth$;
  /** Signal providing authorization actor nested in react-main actor  */
  public readonly actor_auth_s = this.$component.actor_auth_s;
  /** Signal providing snapshot of authorization actor nested in react-main actor */
  public readonly state_auth_s = this.$component.state_auth_s;

  /** Observable providing loading-spinner actor nested in react-main actor */
  public readonly actor_spinner$ = this.$component.actor_spinner$;
  /** Observable providing snapshot of loading-spinner actor nested in react-main actor */
  public readonly state_spinner$ = this.$component.state_spinner$;
  /** Signal providing loading-spinner actor nested in react-main actor */
  public readonly actor_spinner_s = this.$component.actor_spinner_s;
  /** Signal providing snapshot of loading-spinner actor nested in react-main actor */
  public readonly state_spinner_s = this.$component.state_spinner_s;

  /** Observable providing react-init actor nested in react-main actor */
  public readonly actor_react_init$ = this.$component.actor_react_init$;
  /** Observable providing snapshot of react-init actor nested in react-main actor */
  public readonly state_react_init$ = this.$component.state_react_init$;
  /** Signal providing react-init actor nested in react-main actor */
  public readonly actor_react_init_s = this.$component.actor_react_init_s;
  /** Signal providing snapshot of react-init actor nested in react-main actor */
  public readonly state_react_init_s = this.$component.state_react_init_s;

  /** Observable providing react-running actor nested in react-main actor */
  public readonly actor_react_running$ = this.$component.actor_react_running$;
  /** Observable providing snapshot of react-running actor nested in react-main actor */
  public readonly state_react_running$ = this.$component.state_react_running$;
  /** Signal providing react-running actor nested in react-main actor */
  public readonly actor_react_running_s = this.$component.actor_react_running_s;
  /** Signal providing snapshot of react-running actor nested in react-main actor */
  public readonly state_react_running_s = this.$component.state_react_running_s;

  /** Observable providing react_running_admin_toolbar actor nested in react-main actor */
  public readonly actor_react_running_admin_toolbar$ = this.$component.actor_react_running_admin_toolbar$;
  /** Observable providing snapshot of react_running_admin_toolbar actor nested in react-main actor */
  public readonly state_react_running_admin_toolbar$ = this.$component.state_react_running_admin_toolbar$;
  /** Signal providing react_running_admin_toolbar actor nested in react-main actor */
  public readonly actor_react_running_admin_toolbar_s = this.$component.actor_react_running_admin_toolbar_s;
  /** Signal providing snapshot of react_running_admin_toolbar actor nested in react-main actor */
  public readonly state_react_running_admin_toolbar_s = this.$component.state_react_running_admin_toolbar_s;

  /** Observable providing react-view-home actor nested in react-main actor */
  public readonly actor_react_view_home$ = this.$component.actor_react_view_home$;
  /** Observable providing snapshot of react-view-home actor nested in react-main actor */
  public readonly state_react_view_home$ = this.$component.state_react_view_home$;
  /** Signal providing react-view-home actor nested in react-main actor */
  public readonly actor_react_view_home_s = this.$component.actor_react_view_home_s;
  /** Signal providing snapshot of react-view-home actor nested in react-main actor */
  public readonly state_react_view_home_s = this.$component.state_react_view_home_s;

  /** Observable providing react-view-calculation actor nested in react-main actor */
  public readonly actor_react_view_calculation$ = this.$component.actor_react_view_calculation$;
  /** Observable providing snapshot of react-view-calculation actor nested in react-main actor */
  public readonly state_react_view_calculation$ = this.$component.state_react_view_calculation$;
  /** Signal providing react-view-calculation actor nested in react-main actor */
  public readonly actor_react_view_calculation_s = this.$component.actor_react_view_calculation_s;
  /** Signal providing snapshot of react-view-calculation actor nested in react-main actor */
  public readonly state_react_view_calculation_s = this.$component.state_react_view_calculation_s;
  
  // /** Observable providing set of actors used in react-main actor */
  // public readonly actors$ = this.$component.actors$;
  // /** Signal providing set of actors used in react-main actor */
  // public readonly actors_s = this.$component.actors_s;

  // /** Observable providing set of actor states from actors used in react-main actor */
  // public readonly states$ = this.$component.states$;
  // public readonly states_s = this.$component.states_s;
    
  // public readonly app$ = this.$component.app$;
  // public readonly app_s = this.$component.app_s;

  public readonly $xstate = inject(FgXstateService);

  protected version_s = computed( () => {
    return this.state_main_s()?.context.environment.version;
  });

  // CONSTRUCTOR
  constructor(
  ) {
    super();
    // this.$xstate.start();
    // this.actor_main$.subscribe( actor => {
    //   this.$component.$log.fatal('1>>>>>>>>>>>>OBSERVABLE_actor_main$>>>>>>>>>>>>')
    //   console.log( actor );
    // });
    // this.state_main$.subscribe( state => {
    //   this.$component.$log.fatal('2>>>>>>>>>>>>OBSERVABLE_state_main$>>>>>>>>>>>>')
    //   console.log( state );
    // });
    // this.actor_spinner$.subscribe( actor => {
    //   this.$component.$log.fatal('3>>>>>>>>>>>>OBSERVABLE_actor_spinner$>>>>>>>>>>>>')
    //   console.log( actor );
    // });
    // this.state_spinner$.subscribe( state => {
    //   this.$component.$log.fatal('4>>>>>>>>>>>>OBSERVABLE_state_spinner$>>>>>>>>>>>>')
    //   console.log( state );
    // });
    // this.actor_auth$.subscribe( actor => {
    //   this.$component.$log.fatal('5>>>>>>>>>>>>OBSERVABLE_actor_auth$>>>>>>>>>>>>')
    //   console.log( actor );
    // });
    // this.state_auth$.subscribe( state => {
    //   this.$component.$log.fatal('6>>>>>>>>>>>>OBSERVABLE_state_auth$>>>>>>>>>>>>')
    //   console.log( state );
    // });

    effect( () => {
      this.$component.$log.warn('1>>>>>>>>>>>>FARK_state_react_view_calculation_s>>>>>>>>>>>>')
      console.log( this.state_react_view_calculation_s() )
    })
    // effect( () => {
    //   this.$component.$log.warn('1>>>>>>>>>>>>FARK_actor_main_s>>>>>>>>>>>>')
    //   console.log( this.actor_main_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('2>>>>>>>>>>>>FARK_state_main_s>>>>>>>>>>>>')
    //   console.log( this.state_main_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('3>>>>>>>>>>>>FARK_actor_auth_s>>>>>>>>>>>>')
    //   console.log( this.actor_auth_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('4>>>>>>>>>>>>FARK_state_auth_s>>>>>>>>>>>>')
    //   console.log( this.state_auth_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('5>>>>>>>>>>>>FARK_actor_spinner_s>>>>>>>>>>>>')
    //   console.log( this.actor_spinner_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('6>>>>>>>>>>>>state_spinner_s>>>>>>>>>>>>')
    //   console.log( this.state_spinner_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('7>>>>>>>>>>>>FARK_actors_s>>>>>>>>>>>>')
    //   console.log( this.actors_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('8>>>>>>>>>>>>FARK_states_s>>>>>>>>>>>>')
    //   console.log( this.states_s() )
    // })
    // effect( () => {
    //   this.$component.$log.warn('9>>>>>>>>>>>>FARK_app_s>>>>>>>>>>>>')
    //   console.log( this.app_s() )
    // })
    
    // this.$auth.actor.start();
    // this.$spinner.actor.start();
      // this.$main.actor.system.get( this.SYSTEM.FG_AUTH_LOCAL ),
      // this.$main.actor.system.get( this.SYSTEM.FG_SPINNER ).getSnapshot(),
    // this.app$.subscribe( systems => {
    //   this.$component.$log.warn('>>>>>>>>>>>>>>>>>SYSTEMS');
    //   console.log( systems )
    //   // const [ main, auth, spinner] = values;
      
    // })
    // this.$spinner = this.$main.actor.system.get( this.SYSTEM.FG_SPINNER ) as ActorRef<FgSpinnerV4_5_2Snapshot, FgSpinnerV4_5_2Event>;
    // this.$auth = this.$main.actor.system.get( this.SYSTEM.FG_AUTH_LOCAL ) as ActorRef<FgAuthLocalV1Snapshot, FgAuthLocalV1Event>;
    // this.$main.actor.start();
  }
 
  /** Dispatch event signaling user-logout */
  // public logout( event: Event ) {
  //   event.preventDefault();
  //   this.auth$.actor.send({ type: 'fg.auth.local.event.logout' });
  // }
}
