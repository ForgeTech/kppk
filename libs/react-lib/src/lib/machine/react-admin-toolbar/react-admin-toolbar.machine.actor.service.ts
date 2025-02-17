import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { shareReplay, Subject } from 'rxjs';
import {
  Actor,
  ActorLogicFrom,
  ActorOptions,
  createActor,
  EmittedFrom,
  EventFrom,
  SnapshotFrom,
} from 'xstate';
import { FgXstateService } from '../../service/fg-xstate.service';
import { ReactAdminToolbarService } from './react-admin-toolbar.machine.service';
import {
  FgBaseService,
  FgEnvironmentService,
} from '@kppk/fg-lib-new';

@Injectable({
  providedIn: 'root',
})
export class ReactAdminToolbarMachineActorService
  extends FgBaseService
  implements OnDestroy
{
  protected $env = inject(FgEnvironmentService);
  protected $xstate = inject(FgXstateService);
  protected $machine = inject(ReactAdminToolbarService);

  protected machine = this.$machine.get_machine();
  protected config: ActorOptions<any> = {};
protected ACTOR: Actor<typeof this.machine>;
  public get actor() {
    return this.ACTOR;
  }

  protected EVENT$ = new Subject<EmittedFrom<typeof this.machine>>();
  public readonly event$ = this.EVENT$.asObservable();
  public readonly eventsS = toSignal<
    EmittedFrom<typeof this.machine> | undefined
  >(this.EVENT$, { initialValue: undefined });
  protected events_subscription;

  protected STATE$ = new Subject<SnapshotFrom<typeof this.machine>>();
  public readonly state$ = this.STATE$.asObservable().pipe(shareReplay(1));
  public readonly stateS = toSignal<
    SnapshotFrom<typeof this.machine> | undefined
  >(this.STATE$, { initialValue: undefined });
  protected state_subscription;

  public readonly is_runningS = signal(false);

  constructor() {
    super();
    // If development mode is enabled set xstate inspector
    if (this.$env.development?.enabled) {
      this.config.inspect = this.$xstate.inspect;
    }
    // Create actor
    this.ACTOR = createActor(this.machine, this.config);
    // Push actor snapshot to state-signal
    this.state_subscription = this.ACTOR.subscribe((snapshot) => {
      this.STATE$.next(snapshot);
    });
    // Push emitted actor events to subject
    this.events_subscription = this.ACTOR.on('*', (snapshot) => {
      this.EVENT$.next(snapshot);
    });
  }

  public create_from_config(config: ActorOptions<ActorLogicFrom<any>>) {
    if (this.is_runningS()) {
      this.$log?.warn(
        'WARNING: ReactInitMachineActorService > create_from_with_config'
      );
      this.$log?.warn("Methode should be called when actor isn't running!");
    } else {
      this.state_subscription.unsubscribe();
      this.events_subscription.unsubscribe();
      // Create actor
      this.ACTOR = createActor(this.machine, this.config);
      // Push actor snapshot to state-signal
      this.state_subscription = this.ACTOR.subscribe((snapshot) => {
        this.STATE$.next(snapshot);
      });
      // Push emitted actor events to subject
      this.events_subscription = this.ACTOR.on('*', (snapshot) => {
        this.EVENT$.next(snapshot);
      });
    }
  }
  public start() {
    this.ACTOR.start();
    this.is_runningS.set(true);
  }

  public send(event: EventFrom<typeof this.machine>) {
    this.ACTOR.send(event);
  }

  public stop() {
    this.ACTOR.stop();
    this.is_runningS.set(false);
  }

  public override ngOnDestroy(): void {
    // Stop actor
    this.ACTOR.stop();
    // Unsubscribe
    this.state_subscription.unsubscribe();
    this.events_subscription.unsubscribe();
    // Call parent ngOnDestroy
    super.ngOnDestroy();
  }
}
