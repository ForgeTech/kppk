import { Injectable, OnDestroy, Optional, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { filter, Observable, Subject, Subscription } from 'rxjs';
import { FgEvent, FgLiveCycleEvent } from '../service/fg-event/fg-event.class';
import { FgEventService } from '../service/fg-event/fg-event.service';
import { FgBaseLogService } from './fg-base-log.service';
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
export class FgBaseService
  extends FgBaseLogService
  implements FgBaseServiceInterface, OnDestroy
{
  protected EVENT$: Subject<FgEvent> = new Subject();
  /** Observable streaming a components events */
  public readonly event$ = this.EVENT$.asObservable();

  /**  (Optional) Provide event service */
  protected $event = inject(FgEventService);

  /** CONSTRUCTOR */
  constructor(
  ) {
    super();
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
  public ngOnDestroy() {
    const eventToDispatch = new FgLiveCycleEvent(FgBaseEvent.ON_DESTROY, this);
    // super.ngOnDestroy()
    this.SUBSCRIBTIONS.forEach((subscribtion: Subscription) => {
      subscribtion.unsubscribe();
    });
    this.ON_DESTROY$.next(eventToDispatch);
    this.emitEvent(eventToDispatch);
  }
}
