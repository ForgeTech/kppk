import { DestroyRef, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FgBaseService, FgEnvironmentService } from '@kppk/fg-lib-new';
import { FgXstateService } from './../service/fg-xstate.service';
import { Subject } from 'rxjs';
import {
  Actor,
  ActorLogicFrom,
  ActorOptions,
  AnyStateMachine,
  createActor,
  EmittedFrom,
  SnapshotFrom,
} from 'xstate';

/**
 * FgMachineActorAbstract -
 * Abstract class used as base for an 'actor' service of an xstate
 * state machine
 */
export abstract class FgMachineActorAbstract<
  T extends AnyStateMachine
> extends FgBaseService {
  protected $destroy_ref = inject(DestroyRef);
  protected $env = inject(FgEnvironmentService);
  protected $xstate = inject(FgXstateService);

  protected state_subscription;
  protected events_subscription;

  protected EVENT$ = new Subject<EmittedFrom<T>>();
  public readonly event$ = this.EVENT$.asObservable();
  public readonly eventsS = toSignal<EmittedFrom<T> | undefined>(this.event$, {
    initialValue: undefined,
  });

  protected STATE$ = new Subject<SnapshotFrom<T>>();
  public readonly state$ =  public readonly state$ = this.STATE$.asObservable().pipe(shareReplay(1));
  public readonly stateS = toSignal<EmittedFrom<T> | undefined>(this.event$, {
    initialValue: undefined,
  });

  public readonly id: string;
  public readonly system_id: Signal<string>;
  public readonly machine: T;
  public readonly actor: Actor<T>;
  public readonly config: ActorOptions<ActorLogicFrom<T>> = {};

  public readonly is_runningS = signal(false);

  // CONSTRUCTOR
  constructor(machine: T) {
    super();
    this.id = machine.id;
    this.system_id = signal(this.id);
    this.machine = machine;
    // If development mode is enabled set xstate inspector
    if (this.$env.development?.enabled) {
      this.config.inspect = this.$xstate.inspect;
    }
    // Create actor
    this.actor = createActor(machine, this.config);
    // Push actor snapshot to state-signal
    this.state_subscription = this.actor.subscribe((snapshot) => {
      this.STATE$.next(snapshot);
    });
    // Push emitted actor events to subject
    this.events_subscription = this.actor.on('*', (snapshot) => {
      this.EVENT$.next(snapshot);
    });
    // OnDestroy
    this.$destroy_ref.onDestroy(() => {
      // Stop actor
      this.actor.stop();
      // Unsubscribe
      this.state_subscription.unsubscribe();
      this.events_subscription.unsubscribe();
    });
  }

  public create_from_config(config: ActorOptions<ActorLogicFrom<T>>) {
    if (this.is_runningS()) {
      this.$log?.warn('WARNING: FgMachineAbstract > create_from_with_config');
      this.$log?.warn();
    } else {
    }
  }
  public start() {
    this.actor.start();
    this.is_runningS.set(true);
  }
  public stop() {
    this.actor.stop();
    this.is_runningS.set(false);
  }
}
