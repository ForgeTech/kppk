import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FgBaseService, FgEnvironmentService } from '@kppk/fg-lib-new';
import { BehaviorSubject, map, shareReplay, Subject } from 'rxjs';
import {
  Actor,
  ActorOptions,
  AnyStateMachine,
  EmittedFrom,
  EventFrom,
  SnapshotFrom,
  Subscription
} from 'xstate';
import { FgXstateService } from '../../service/fg-xstate.service';
import { ReactMainV3MachineActorService } from '../react-main';
import { REACT_ACTOR_ENUM } from '../../enum';
// import { FgNavigationMachineService } from './fg-navigation.machine.service';

@Injectable({
  providedIn: 'root',
})
export class FgNavigationMainMachineActorService
  extends FgBaseService
  implements OnDestroy
{
  protected $env = inject(FgEnvironmentService);
  protected $xstate = inject(FgXstateService);
  // protected $machine = inject(FgNavigationMachineService);
  protected $source = inject(ReactMainV3MachineActorService);

  // protected machine = this.$machine.get_machine();
  protected config: ActorOptions<any> = {};
  protected ACTOR = new BehaviorSubject( undefined ) as BehaviorSubject<Actor<AnyStateMachine> | undefined>;
  public get actor() {
    return this.ACTOR.getValue();
  }

  protected EVENT$ = new Subject<EmittedFrom<AnyStateMachine>>();
  public readonly event$ = this.EVENT$.asObservable();
  public readonly eventsS = toSignal<
    EmittedFrom<AnyStateMachine> | undefined
  >(this.EVENT$, { initialValue: undefined });
  protected events_subscription: Subscription | undefined;

  protected STATE$ = new Subject<SnapshotFrom<AnyStateMachine>>();
  public readonly state$ = this.STATE$.asObservable().pipe(shareReplay(1));
  public readonly stateS = toSignal<
    SnapshotFrom<AnyStateMachine> | undefined
  >(this.STATE$, { initialValue: undefined });
  protected state_subscription: Subscription | undefined;

  public readonly is_runningS = signal(false);

  constructor() {
    super();
    // If development mode is enabled set xstate inspector
    if (this.$env.development?.enabled) {
      this.config.inspect = this.$xstate.inspect;
    }
    // Create actor
    // this.ACTOR = 
    this.$source.state$.pipe(
      takeUntilDestroyed(),
      map( () => {
        return this.$source.actor;
      })
    ).subscribe({
      next: source_actor => {
        const actor =  source_actor.system.get(REACT_ACTOR_ENUM.REACT_NAVIGATION) as Actor<AnyStateMachine> | undefined;
        if( actor ) {
          this.ACTOR.next( actor );
          // Push actor snapshot to state-signal
          this.state_subscription = actor.subscribe( snapshot => {
            this.STATE$.next(snapshot);
          });
          // Push emitted actor events to subject
          this.events_subscription = actor.on('*', snapshot => {
            this.EVENT$.next(snapshot);
          });
        } else {
          // Unsubscribe
          this.state_subscription?.unsubscribe();
          this.events_subscription?.unsubscribe();
        }
      }
    });
  }

  public start() {
    this.ACTOR.getValue()?.start();
    this.is_runningS.set(true);
  }

  public send(event: EventFrom<AnyStateMachine>) {
    this.ACTOR.getValue()?.send(event);
  }

  public override ngOnDestroy(): void {
    // Unsubscribe
    this.state_subscription?.unsubscribe();
    this.events_subscription?.unsubscribe();
    // Call parent ngOnDestroy
    super.ngOnDestroy();
  }
}
