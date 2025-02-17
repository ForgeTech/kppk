import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  SimpleChanges,
  OnChanges,
  OnInit,
  DoCheck,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  inject,
} from '@angular/core';
import {
  filter,
  isObservable,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import {
  FgEvent,
  FgLiveCycleEvent,
  FgLiveCycleOnChangesEvent,
} from '../service/fg-event/fg-event.class';
import { FgComponentBaseService } from './fg-component-base.service';
import { FgBaseEvent } from './fg-base.event';
import { RxState } from '@rx-angular/state';
import { FgAddObservable } from '../type';

/**
 * FgComponentBaseComponent -
 *
 * This component isnt' meant to be used directly but inherited by  all but the most basic components -
 * following the forgetech components specification. It provides a very basic set of functionallity used
 * to connect and allow communication with higher order components like forgetech app-root, pages, layouts
 * etc.
 */
@Component({
  selector: 'fg-component-base',
  template: ``,
})
/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
/* eslint-enabled */
export class FgComponentBaseComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  /** Holds the classes name taken from the constructor
   * CAUTION: This can vary between envirments depending on possible
   * javascript uglification etc. So don't use if for example
   * this.classname === 'className' comparissions
   */
  public readonly className: string = this.constructor.name;
  /** EMITS FgEvent instances published on component */
  @Output()
  public readonly event = new EventEmitter<FgEvent>();

  private EVENT$: Subject<FgEvent> = new Subject();
  /** Observable streaming a components events */
  public readonly event$ = this.EVENT$.asObservable();
  /**
   * Subscriptions pushed to this array useing
   * the subscribe-methode will be automatically
   * unsubscribed on onDestroy live-cycle event.
   */
  private SUBSCRIBTIONS: Array<Subscription> = [];

  private ON_CHANGES$ = new Subject<FgLiveCycleOnChangesEvent>();
  /** Observable providing access to onChanges-events */
  public readonly onChanges$ = this.ON_CHANGES$.asObservable();

  private ON_INIT$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to onInit-event */
  public readonly onInit$ = this.ON_INIT$.asObservable();

  private DO_CHECK$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to doCheck-events */
  public readonly doCheck$ = this.DO_CHECK$.asObservable();

  private AFTER_VIEW_INIT$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to afterViewInit-event */
  public readonly afterViewInit$ = this.AFTER_VIEW_INIT$.asObservable();

  private AFTER_CONTENT_INIT$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to afterContentInit-event */
  public readonly afterContentInit$ = this.AFTER_CONTENT_INIT$.asObservable();

  private AFTER_CONTENT_CHECKED$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to afterContentChecked-events */
  public readonly afterContentChecked$ =
    this.AFTER_CONTENT_CHECKED$.asObservable();

  private AFTER_VIEW_CHECKED$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to afterViewChecked-events */
  public readonly afterViewChecked$ = this.AFTER_VIEW_CHECKED$.asObservable();

  private ON_DESTROY$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to onDestroy-event */
  public readonly onDestroy$ = this.ON_DESTROY$.asObservable();

  protected $component = inject( FgComponentBaseService ); 
  /** CONSTRUCTOR */
  constructor() {
    this.$component.$log.info('COMPONENT: ', this.className, 'created!');
  }
  public setOnState<
    STATE extends object,
    KEY extends keyof STATE,
    I extends STATE[KEY]
  >(key: KEY, toSet: FgAddObservable<I>, state: RxState<STATE>) {
    if (toSet !== null && toSet !== undefined) {
      if (isObservable(toSet)) {
        state.connect(key, toSet);
      } else {
        state.connect(key, of(toSet));
      }
    } else {
      this.$component.$log.warn(
        `FgComponentBase: setOnState ignored for Key: ${String(
          key
        )} as passed property is null/undefined!`
      );
    }
  }

  /**
   * Methode to be use for subscribing to observables, that adds the subscribtion
   * to the component subscribtion-array - that handles the unsubscribing on
   * component destruction ( preventing memory leaks caused by not cleaning-up subscriptions )
   * @param observable An observable instance, like Rxjs Observable/Subject
   * @param fn The function to be called on the subscription
   * @param error (OPTIONAL) The function to be called on subscription error
   * @param complete (OPTIONAL) The function to be called on subscription complete
   */
  public subscribe<T>(
    obs$: Observable<T>,
    fn: ((value: T) => void) | null | undefined,
    error?: ((error: Error) => void) | null | undefined,
    complete?: () => void
  ): Subscription {
    let subscription: Subscription;
    if (error && complete) {
      subscription = obs$.subscribe(fn, error, complete);
    } else if (error) {
      subscription = obs$.subscribe(fn, error);
    } else {
      subscription = obs$.subscribe(fn);
    }
    this.SUBSCRIBTIONS.push(subscription);
    return subscription;
  }

  /**
   * Use this methode to create and
   * @param eventSignature The signature of the event to create the observable
   */
  public getEventObservable<T extends FgEvent>(
    eventSignature: string
  ): Observable<T> {
    return this.$component.$event.event$.pipe(
      filter((event: FgEvent) => event.signature === eventSignature)
    ) as Observable<T>;
  }
  /**
   * Dispatch an event via global event-service and component event-emitter
   * @param eventToDispatch The event to dispatch
   * @param bubble  if true event is also dispatched on components event$-object
   */
  public emitEvent(eventToDispatch: FgEvent) {
    // Emit on components event event emitter
    this.event.emit(eventToDispatch);
    // Emit on components event$ observable
    this.EVENT$.next(eventToDispatch);
    // Emit global event-service
    this.$component.$event.emitEvent(eventToDispatch);
  }
  /* eslint-disable @angular-eslint/no-conflicting-lifecycle */
  /**
   * Implements methode for component life-cycle OnChange-Interface.
   * @param changes The changes object from live-cycle
   */
  public ngOnChanges(changes: SimpleChanges) {
    const eventToDispatch = new FgLiveCycleOnChangesEvent(
      FgBaseEvent.ON_CHANGES,
      this,
      changes
    );
    this.ON_CHANGES$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /** Implements methode for component life-cycle OnInit-Interface. */
  public ngOnInit() {
    const eventToDispatch: FgLiveCycleEvent = new FgLiveCycleEvent(
      FgBaseEvent.ON_INIT,
      this
    );
    this.ON_INIT$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /** Implements methode for component life-cycle DoCheck-Interface. */
  public ngDoCheck() {
    const eventToDispatch = new FgLiveCycleEvent(FgBaseEvent.DO_CHECK, this);
    this.DO_CHECK$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /** Implements methode for component life-cycle AfterConentInit-Interface. */
  public ngAfterContentInit() {
    const eventToDispatch: FgLiveCycleEvent = new FgLiveCycleEvent(
      FgBaseEvent.AFTER_CONTENT_INIT,
      this
    );
    this.AFTER_CONTENT_INIT$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /** Implements methode for component life-cycle AfterConentChecked-Interface. */
  public ngAfterContentChecked() {
    const eventToDispatch: FgLiveCycleEvent = new FgLiveCycleEvent(
      FgBaseEvent.AFTER_CONTENT_CHECKED,
      this
    );
    this.AFTER_CONTENT_CHECKED$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /** Implements methode for component life-cycle AfterViewInit-Interface. */
  public ngAfterViewInit() {
    const eventToDispatch: FgLiveCycleEvent = new FgLiveCycleEvent(
      FgBaseEvent.AFTER_VIEW_INIT,
      this
    );
    this.AFTER_VIEW_INIT$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /** Implements methode for component life-cycle AfterConentChecked-Interface. */
  public ngAfterViewChecked() {
    const eventToDispatch: FgLiveCycleEvent = new FgLiveCycleEvent(
      FgBaseEvent.AFTER_VIEW_CHECKED,
      this
    );
    this.AFTER_VIEW_CHECKED$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /** Implements methode for component life-cycle OnInit-Interface. */
  public /*override*/ ngOnDestroy() {
    const eventToDispatch: FgLiveCycleEvent = new FgLiveCycleEvent(
      FgBaseEvent.ON_DESTROY,
      this
    );
    // super.ngOnDestroy()
    this.SUBSCRIBTIONS.forEach((subscribtion: Subscription) => {
      subscribtion.unsubscribe();
    });
    this.ON_DESTROY$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
  /* eslint-enable */
}
