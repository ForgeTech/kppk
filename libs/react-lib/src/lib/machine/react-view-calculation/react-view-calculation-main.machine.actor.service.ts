import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FgBaseService, FgEnvironmentService } from '@kppk/fg-lib-new';
import { BehaviorSubject, filter, from, map, shareReplay, Subject, switchMap, tap } from 'rxjs';
import {
  Actor,
  ActorOptions,
  EmittedFrom,
  EventFrom,
  SnapshotFrom,
  Subscription
} from 'xstate';
import { FgXstateService } from '../../service/fg-xstate.service';
import { ReactMainV3MachineActorService } from '../react-main';
import { REACT_ACTOR_ENUM } from '../../enum';
import { ReactViewCalculationMachineService } from './react-view-calculation.machine.service';

@Injectable({
  providedIn: 'root',
})
export class ReactViewCalculationMainMachineActorService
  extends FgBaseService
  implements OnDestroy
{
  protected $env = inject(FgEnvironmentService);
  protected $xstate = inject(FgXstateService);
  protected $machine = inject(ReactViewCalculationMachineService);
  protected $source = inject(ReactMainV3MachineActorService);

  protected machine = this.$machine.get_machine();
  protected config: ActorOptions<any> = {};
  protected ACTOR = new BehaviorSubject( undefined ) as BehaviorSubject<Actor<typeof this.machine> | undefined>;
  public get actor() {
    return this.ACTOR.getValue();
  }

  protected EVENT$ = new Subject<EmittedFrom<typeof this.machine>>();
  public readonly event$ = this.EVENT$.asObservable();
  public readonly eventsS = toSignal<
    EmittedFrom<typeof this.machine> | undefined
  >(this.EVENT$, { initialValue: undefined });
  protected events_subscription: Subscription | undefined;

  protected STATE$ = new Subject<SnapshotFrom<typeof this.machine>>();
  public readonly state$ = this.STATE$.asObservable().pipe(shareReplay(1));
  public readonly stateS = toSignal<
    SnapshotFrom<typeof this.machine> | undefined
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
      filter( () => {
        return this.$source.actor.system.get(REACT_ACTOR_ENUM.REACT_RUNNING) ? true : false;
      }),
      switchMap( _ => from(this.$source.actor.system.get(REACT_ACTOR_ENUM.REACT_RUNNING)).pipe(
        //tap( snapshot => console.log(snapshot)),
        map( snapshot => this.$source.actor.system.get(REACT_ACTOR_ENUM.REACT_RUNNING)),
        //tap( actor => console.log(actor)),
      )),
    ).subscribe({
      next: source_actor => {
        const actor = source_actor.system.get(REACT_ACTOR_ENUM.REACT_VIEW_CALCULATION) as Actor<typeof this.machine> | undefined;
        this.ACTOR.next( actor );
        if( actor ) {
          // Push actor snapshot to state-signal
          this.STATE$.next( actor.getSnapshot() );
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

  public send(event: EventFrom<typeof this.machine>) {
    this.ACTOR.getValue()?.send(event);
  }

  public stop() {
    // this.ACTOR.getValue()?.stop();
    this.is_runningS.set(false);
  }

  public override ngOnDestroy(): void {
    // Stop actor
    //this.ACTOR.getValue()?.stop();
    // Unsubscribe
    this.state_subscription?.unsubscribe();
    this.events_subscription?.unsubscribe();
    // Call parent ngOnDestroy
    super.ngOnDestroy();
  }
}
