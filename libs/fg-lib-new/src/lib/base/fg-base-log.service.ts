import { Injectable, OnDestroy, Optional, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject, Subscription } from 'rxjs';
import { FgEvent, FgLiveCycleEvent } from '../service/fg-event/fg-event.class';
import { FgEventService } from '../service/fg-event/fg-event.service';
import { FgBaseEvent } from './fg-base.event';
/**
 * FgBaseLogService -
 * Meant to be extenden by FgServices to provide common service
 * functionality
 */
@Injectable({
  providedIn: 'root',
})
export class FgBaseLogService {
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
  protected readonly onDestroy$ = this.ON_DESTROY$.asObservable();

  /** (Optional) Provide logger service */
  protected $log = inject(NGXLogger);

  /** CONSTRUCTOR */
  constructor() {
    this?.$log.info('SERVICE: ', this.className, 'created!');
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
    error?: ((error: any) => void) | null | undefined,
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
}
