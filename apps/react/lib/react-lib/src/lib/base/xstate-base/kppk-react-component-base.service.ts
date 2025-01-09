import { Injectable, inject } from '@angular/core';
import { FgComponentBaseService } from '@fg-kppk/fg-base';
import { toSignal } from '@angular/core/rxjs-interop';
import { SnapshotFrom } from 'xstate';
import { Observable, distinctUntilChanged, filter, from, map, of, shareReplay, startWith, switchMap } from 'rxjs';
import { FgAuthLocalV1Machine, FgAuthLocalV1Snapshot } from '../../machine/fg-auth-local/fg-auth-local.machine';
import { Actor } from 'xstate';
import { REACT_ACTOR_ENUM, ReactMainV2Service } from '../../machine/react-main/react-mainv2.service';
import { FgXstateService } from '../../service/fg-xstate.service';
import { ROUTES_ENUM } from '../../app.routes';
import { FgSpinnerV4_5_2Snapshot } from '../../machine/fg-spinner/fg-spinner.machine';
import { ReactAppRunningV2Snapshot } from '../../machine/react-running/react-running.machine';
import { ReactViewHomeV1Machine, ReactViewHomeV1Snapshot } from '../../machine/react-view-home/react-view-home.machine';
import { ReactViewCalculationV1Machine, ReactViewCalculationV1Snapshot } from '../../machine/react-view-calculation/react-view-calculation.machine';
import { ReactAdminToolbarV1Machine, ReactAdminToolbarV1Snapshot } from '../../machine/react-admin-toolbar/react-admin-toolbar.machine';
import { ReactAppInitV1Snapshot } from '../../machine/react-init/react-init.machine';

/**
 * FgComponentBaseService -
 * Essential services used by FgComponentBase components and
 * higher order 'fgBase'-Components
 */
@Injectable({
  providedIn: 'root',
})
export class KppkReactComponentBaseService extends FgComponentBaseService {
  public readonly ROUTES = ROUTES_ENUM;
  public readonly SYSTEM = REACT_ACTOR_ENUM;

  // public readonly $main = inject(ReactMainService);
  public readonly $main = inject(ReactMainV2Service);
  public readonly $xstate = inject(FgXstateService);

  /** Observable providing react-main actor */  
  public readonly actor_main$ = of( this.$main.actor ).pipe(
    shareReplay(1)
  );
  /** Observable providing snapshot of react-main actor */
  public readonly state_main$ = this.actor_main$.pipe( 
    switchMap( actor =>
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<SnapshotFrom<typeof this.$main.machine>>;
  
  public readonly system_main$ = this.actor_main$.pipe( 
    switchMap( _ => this.actor_main$),
    map( actor => actor.system ),
    shareReplay(1)
  );
  /** Signal providing react-main actor */
  public readonly actor_main_s = toSignal( this.actor_main$ );
  /** Signal providing snapshot of react-main actor */
  public readonly state_main_s = toSignal( this.state_main$ );

  /** Observable providing authorization actor nested in react-main actor */
  public readonly actor_auth$ = this.system_main$.pipe(
    filter( system => system.get(this.SYSTEM.FG_AUTH_LOCAL) ? true : false),
    map( system => system.get(this.SYSTEM.FG_AUTH_LOCAL) as Actor<FgAuthLocalV1Machine>),
    shareReplay(1)
  );
  /** Observable providing snapshot of authorization actor nest in react-main actor */
  public readonly state_auth$ = this.actor_auth$.pipe( 
    switchMap( actor =>
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<FgAuthLocalV1Snapshot>;
  /** Signal providing authorization actor nested in react-main actor  */
  public readonly actor_auth_s = toSignal( this.actor_auth$ );
  /** Signal providing snapshot of authorization actor nested in react-main actor */
  public readonly state_auth_s = toSignal( this.state_auth$ );

  /** Observable providing loading-spinner actor nested in react-main actor */
  public readonly actor_spinner$ = this.state_main$.pipe(
    filter( main => main.children[this.SYSTEM.FG_SPINNER] ? true : false),
    map( main => main.children[this.SYSTEM.FG_SPINNER] as Actor<any>),
    shareReplay(1)
  );
  /** Observable providing snapshot of loading-spinner actor nested in react-main actor */
  public readonly state_spinner$ = this.actor_spinner$.pipe( 
    switchMap( actor =>
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<FgSpinnerV4_5_2Snapshot>;
  /** Signal providing loading-spinner actor nested in react-main actor */
  public readonly actor_spinner_s = toSignal( this.actor_spinner$ );
  /** Signal providing snapshot of loading-spinner actor nested in react-main actor */
  public readonly state_spinner_s = toSignal( this.state_spinner$ );

  /** Observable providing react-init actor nested in react-main actor */
  public readonly actor_react_init$ = this.state_main$.pipe(
    filter( main => main.children[this.SYSTEM.REACT_INIT] ? true : false),
    map( main => main.children[this.SYSTEM.REACT_INIT] as Actor<any>),
    shareReplay(1)
  );
  /** Observable providing snapshot of react-init actor nested in react-main actor */
  public readonly state_react_init$ = this.actor_react_init$.pipe( 
    switchMap( actor =>
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<ReactAppInitV1Snapshot>;
  /** Signal providing react-init actor nested in react-main actor */
  public readonly actor_react_init_s = toSignal( this.actor_react_init$ );
  /** Signal providing snapshot of react-init actor nested in react-main actor */
  public readonly state_react_init_s = toSignal( this.state_react_init$ );
 
  /** Observable providing react-running actor nested in react-main actor */
  public readonly actor_react_running$ = this.state_main$.pipe(
    filter( main => main.children[this.SYSTEM.REACT_RUNNING] ? true : false),
    map( main => main.children[this.SYSTEM.REACT_RUNNING] as Actor<any>),
    shareReplay(1)
  );
  /** Observable providing snapshot of react-running actor nested in react-main actor */
  public readonly state_react_running$ = this.actor_react_running$.pipe( 
    switchMap( actor =>
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<ReactAppRunningV2Snapshot>;
  /** Signal providing react-running actor nested in react-main actor */
  public readonly actor_react_running_s = toSignal( this.actor_react_running$ );
  /** Signal providing snapshot of react-running actor nested in react-main actor */
  public readonly state_react_running_s = toSignal( this.state_react_running$ );

  /** Observable providing react_running_admin_toolbar actor nested in react-main actor */
  public readonly actor_react_running_admin_toolbar$ = this.state_react_running$.pipe(
    filter( running => {
      const result = running.children[this.SYSTEM.REACT_RUNNING_ADMIN_TOOLBAR] ? true : false
      return result;
    }),
    map( running => running.children[this.SYSTEM.REACT_RUNNING_ADMIN_TOOLBAR] as Actor<ReactAdminToolbarV1Machine>),
    distinctUntilChanged(),
    shareReplay(1)
  );
  /** Observable providing snapshot of react_running_admin_toolbar actor nested in react-main actor */
  public readonly state_react_running_admin_toolbar$ = this.actor_react_running_admin_toolbar$.pipe( 
    switchMap( actor =>
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<ReactAdminToolbarV1Snapshot>;
  /** Signal providing react_running_admin_toolbar actor nested in react-main actor */
  public readonly actor_react_running_admin_toolbar_s = toSignal( this.actor_react_running_admin_toolbar$ );
  /** Signal providing snapshot of react_running_admin_toolbar actor nested in react-main actor */
  public readonly state_react_running_admin_toolbar_s = toSignal( this.state_react_running_admin_toolbar$ );

  /** Observable providing react_view_home actor nested in react-main actor */
  public readonly actor_react_view_home$ = this.state_react_running$.pipe(
    filter( running => {
      const result = running.children[this.SYSTEM.REACT_VIEW_HOME] ? true : false
      return result;
    }),
    map( running => running.children[this.SYSTEM.REACT_VIEW_HOME] as Actor<ReactViewHomeV1Machine>),
    shareReplay(1)
  );
  /** Observable providing snapshot of react_view_home actor nested in react-main actor */
  public readonly state_react_view_home$ = this.actor_react_view_home$.pipe( 
    switchMap( actor =>
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<ReactViewHomeV1Snapshot>;
  /** Signal providing react_view_home actor nested in react-main actor */
  public readonly actor_react_view_home_s = toSignal( this.actor_react_view_home$ );
  /** Signal providing snapshot of react_view_home actor nested in react-main actor */
  public readonly state_react_view_home_s = toSignal( this.state_react_view_home$ );

  /** Observable providing react_view_calculation actor nested in react-main actor */
  public readonly actor_react_view_calculation$ = this.state_react_running$.pipe(
    filter( main => main.children[this.SYSTEM.REACT_VIEW_CALCULATION] ? true : false),
    map( main => main.children[this.SYSTEM.REACT_VIEW_CALCULATION] as Actor<ReactViewCalculationV1Machine>),
    shareReplay(1)
  );
  /** Observable providing snapshot of react_view_calculation actor nested in react-main actor */
  public readonly state_react_view_calculation$ = this.actor_react_view_calculation$.pipe( 
    switchMap( actor => 
      from( actor ).pipe( 
        startWith( actor.getSnapshot() )
    )),
    shareReplay(1)
  ) as unknown as Observable<ReactViewCalculationV1Snapshot>;
  /** Signal providing react_view_calculation actor nested in react-main actor */
  public readonly actor_react_view_calculation_s = toSignal( this.actor_react_view_calculation$ );
  /** Signal providing snapshot of react_view_calculation actor nested in react-main actor */
  public readonly state_react_view_calculation_s = toSignal( this.state_react_view_calculation$ );
  
  // /** Observable providing set of actors used in react-main actor */
  // public readonly actors$ = combineLatest([
  //   this.actor_auth$,
  //   this.actor_main$,
  //   this.actor_spinner$,
  // ]).pipe(
  //   map ( actors => {
  //     const [ auth, main, spinner ] = actors;
  //     return {
  //       auth,
  //       main,
  //       spinner,
  //     }
  //   }),
  //   shareReplay(1),
  // );
  /** Signal providing set of actors used in react-main actor */
  // public readonly actors_s = toSignal( this.actor_auth$ );

  /** Observable providing set of actor states from actors used in react-main actor */
  // public readonly states$ = combineLatest([
  //   this.state_auth$,
  //   this.state_main$,
  //   this.state_spinner$,
  // ]).pipe(
  //   map ( actors => {
  //     const [ auth, main, spinner ] = actors;
  //     return {
  //       auth,
  //       main,
  //       spinner,
  //     }
  //   }),
  //   shareReplay(1),
  // );
  // public readonly states_s = toSignal( this.states$ );
    
  // public readonly app$ = combineLatest([
  //   this.actors$,
  //   this.states$
  // ]).pipe(
  //   map ( app => {
  //     const [ actors, states ] = app;
  //     return {
  //       actors,
  //       states,
  //     }
  //   }),
  //   shareReplay(1),
  // );
  // public readonly app_s = toSignal( this.app$ );

  /** CONSTRUCTOR */
  constructor() {
    super();
    this.$main.actor.start();
    // this.state_react_running$.subscribe( actor => {
    //   console.log('>>>>>>>>>>RUNNING_REACT_ACTOR>>>>>>');
    //   console.log(actor);
    // });
    // this.state_react_running$.subscribe( state => {
    //   console.log('>>>>>>>>>>RUNNING_REACT_STATE>>>>>>');
    //   console.log(state);
    // });
    // this.actor_react_running_admin_toolbar$.subscribe( actor => {
    //   console.log('>>>>>>>>>>ADMIN_TOOLBAR_ACTOR>>>>>>');
    //   console.log(actor);
    // });
    // this.state_react_running_admin_toolbar$.subscribe( state => {
    //   console.log('>>>>>>>>>>ADMIN_TOOLBAR_STATE>>>>>>');
    //   console.log(state);
    // });
  }
}
