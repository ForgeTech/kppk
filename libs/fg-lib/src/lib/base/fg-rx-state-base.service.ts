import { Injectable, OnDestroy, Optional } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { NGXLogger } from 'ngx-logger';
import { filter, Observable, Subject, Subscription } from 'rxjs';
import { FgEvent, FgLiveCycleEvent } from '../service/fg-event/fg-event.class';
import { FgEventService } from '../service/fg-event/fg-event.service';
import { FgBaseServiceInterface } from './fg-base-service.interface';
import { FgBaseEvent } from './fg-base.event';
/**
 * FgBaseService -
 * Meant to be extenden by FgServices to provide common service
 * functionality
 */
@Injectable({
  providedIn: 'root',
})
export class FgRxStateBaseService<T extends Object>
  extends RxState<T>
  implements FgBaseServiceInterface
{
  /** Holds the classes name taken from the constructor
   * CAUTION: This can vary between envirments depending on possible
   * javascript uglification etc. So don't use if for example
   * this.classname === 'className' comparissions
   */
  public readonly className: string = this.constructor.name;

  /**
   * Subscriptions pushed to this array useing
   * the subscribe-methode will be automatically
   * unsubscribed on onDestroy live-cycle event.
   */
  protected SUBSCRIBTIONS: Array<Subscription> = [];

  protected ON_INIT$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to onInit-event */
  public readonly onInit$ = this.ON_INIT$.asObservable();

  protected ON_DESTROY$ = new Subject<FgLiveCycleEvent>();
  /** Observable providing access to onDestroy-event */
  public readonly onDestroy$ = this.ON_DESTROY$.asObservable();

  protected EVENT$: Subject<FgEvent> = new Subject();
  /** Observable streaming a components events */
  public readonly event$ = this.EVENT$.asObservable();

  /** CONSTRUCTOR */
  constructor(
    /**  (Optional) Provide event service */
    @Optional() protected $event: FgEventService,
    /** (Optional) Provide logger service */
    @Optional() protected $log: NGXLogger
  ) {
    super();
    this?.$log.info('SERVICE: ', this.className, 'created!');
    this.ngOnInit();
  }

  /**
   * Dispatch an event via global event-service and component event-emitter
   * @param eventToDispatch The event to dispatch
   * @param bubble  if true event is also dispatched on components event$-object
   */
  public emitEvent<T extends FgEvent>(eventToDispatch: T): void {
    // Emit on components event$ observable
    this.EVENT$.next(eventToDispatch);
    // Emit global event-service
    this.$event?.emitEvent(eventToDispatch);
  }

  /**
   * Use this methode to create and
   * @param eventSignature The signature of the event to create the observable
   */
  public getEventObservable<T extends FgEvent>(
    eventSignature: string
  ): Observable<T> {
    return this.$event.event$.pipe(
      filter((event: FgEvent) => event.signature === eventSignature)
    ) as Observable<T>;
  }

  /**
   * CAUTION! Fakes metode of none existent service life-cycle OnInit-Interface and
   * gets triggered on service constructor call
   */
  public ngOnInit() {
    const onInitEvent = new FgLiveCycleEvent(FgBaseEvent.ON_INIT, this);
    this.SUBSCRIBTIONS.forEach((subscribtion: Subscription) => {
      subscribtion.unsubscribe();
    });
    this.ON_INIT$.next(onInitEvent);
    this.emitEvent(onInitEvent);
  }

  /** Implements methode for service life-cycle OnDestroy-Interface. */
  public override ngOnDestroy() {
    const eventToDispatch = new FgLiveCycleEvent(FgBaseEvent.ON_DESTROY, this);
    // super.ngOnDestroy()
    this.SUBSCRIBTIONS.forEach((subscribtion: Subscription) => {
      subscribtion.unsubscribe();
    });
    this.ON_DESTROY$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }

  public removeUndefined(toClean: any, recurse: boolean = true): any {
    for (var i in toClean) {
      if (toClean[i] === undefined) {
        delete toClean[i];
      } else if (recurse && typeof toClean[i] === 'object') {
        this.removeUndefined(toClean[i], recurse);
      }
    }
    return toClean;
  }

  public removeNullAndUndefined(toClean: any, recurse: boolean = true): any {
    for (var i in toClean) {
      if (toClean[i] === null || toClean[i] === undefined) {
        delete toClean[i];
      } else if (recurse && typeof toClean[i] === 'object') {
        this.removeNullAndUndefined(toClean[i], recurse);
      }
    }
    return toClean;
  }

  public setNullAndUndefinedToEmptyString(
    toClean: any,
    recurse: boolean = true
  ): any {
    for (var i in toClean) {
      if (toClean[i] === null || toClean[i] === undefined) {
        toClean[i] = '';
      } else if (recurse && typeof toClean[i] === 'object') {
        this.setNullAndUndefinedToEmptyString(toClean[i], recurse);
      }
    }
    return toClean;
  }
}
