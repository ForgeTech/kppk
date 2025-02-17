import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FgEvent } from '../service/fg-event/fg-event.class';

export interface FgBaseServiceInterface extends OnDestroy {
  /** Observable streaming a components events */
  readonly event$: Observable<FgEvent>;
  /**
   * Dispatch an event via global event-service and component event-emitter
   * @param eventToDispatch The event to dispatch
   * @param bubble  if true event is also dispatched on components event$-object
   */
  emitEvent<T extends FgEvent>(eventToDispatch: T): void;
  /**
   * Use this methode to create and
   * @param eventSignature The signature of the event to create the observable
   */
  getEventObservable<T extends FgEvent>(eventSignature: string): Observable<T>;
  /**
   * CAUTION! Fakes metode of none existent service life-cycle OnInit-Interface and
   * gets triggered on service constructor call
   */
  ngOnInit(): void;
  /** Implements methode for service life-cycle OnDestroy-Interface. */
  ngOnDestroy(): void;
}
