import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Subject, Observable, combineLatest, BehaviorSubject, isObservable, of } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FgEvent } from '../fg-event/fg-event.class';
import { FgApplicationModelEvent } from './fg-application-model.event';
import { produce } from 'immer';
import { FgAddObservable } from '../../type/fg-add-observable.type';
import { RxState } from '@rx-angular/state';

/**
 * Inject-Token allowing to configure app-model to wait with
 * constuction until subscribtion
 */
export const DELAY_MODEL_CONSTRUCTION_UNTIL = new InjectionToken<true>('');

/**
 * FgApplicationModelService -
 * Service is used to hold a applications data-model, make it
 * accessible and distribute changes within the application
 * CAUTION: This version only holds application-data
 * defined in envirement-file and is meant to be exchanged
 * with specific application implementation via DI
 */
@Injectable({
  providedIn: 'platform',
})
export abstract class FgApplicationModelServiceAbstract<T> extends FgBaseService {
  protected produce = produce;
  protected PREINITIALIZE_MODEL = true;
  /** Events allowed to update the application model */
  protected MODEL_UPDATE_EVENTS: string[] = this._getModelUpdateEvents();
  /** Stream of events allowed to update the application model */
  protected MODEL_UPDATE_EVENTS$ = new Subject<FgEvent>();
  /** Provides stream of events allowed to update the application model */
  readonly modelUpdateEvents$ = this.MODEL_UPDATE_EVENTS$.asObservable().pipe(shareReplay(1));
  /** Stream of  application model */
  protected MODEL$ = new BehaviorSubject<T | undefined>(undefined);
  /** Provide stream of applicaiton model */
  readonly model$ = this.MODEL$.asObservable().pipe(shareReplay(1));
  /** CONSTRUCTOR */
  constructor(
    /** (Optional) Injection token to prevent modal preinitalization */
    @Optional() @Inject(DELAY_MODEL_CONSTRUCTION_UNTIL) DELAY_UNTIL_SUBSCRIPTION: boolean,
  ) {
    super()
    // Check for delay model initialization token
    if (DELAY_UNTIL_SUBSCRIPTION) {
      this.PREINITIALIZE_MODEL = false;
    }
    // Observable providing initialized model
    const initToModel$ = this._initModel().pipe(
      tap(model => this.MODEL$.next(model)),
      switchMap(() => this.MODEL$),
      filter(model => (model ? true : false)),
      map(model => model as T),
      shareReplay(1)
    );
    // if DELAY_MODEL_CONSTRUCTION is true - subscription
    if (this.PREINITIALIZE_MODEL === true) {
      initToModel$.subscribe(model => {
        this?.$log.debug('FgApplicationModelServiceAbstract: Model preinitialized!');
      });
    }
    // Observable providing model update events
    const modelUpdateEvent$ = this.$event.event$.pipe(
      startWith(new FgApplicationModelEvent(FgApplicationModelEvent.INIT)),
      filter(event => (this.MODEL_UPDATE_EVENTS.find(signature => event.signature === signature) ? true : false)),
      shareReplay(1)
    );
    // Observable publishing updated model
    this.model$ = combineLatest([initToModel$, modelUpdateEvent$]).pipe(
      map(values => {
        const [model, event] = values;
        return this._updateModel(model, event);
      }),
      shareReplay(1)
    );
  }

  // public setOnState<STATE extends object, KEY extends keyof STATE, I extends STATE[KEY]>(
  //   key: KEY,
  //   toSet: FgAddObservable<I>,
  //   state: RxState<STATE>,
  //   persist: boolean = false,
  //   persistScope: string = 'default'
  // ) {
  //   if (isObservable(toSet)) {
  //     state.connect(key, toSet);
  //   } else {
  //     state.connect(key, of(toSet));
  //   }
  // }
  /**
   * Methode adding handlers for internal applicaiton model service
   * events
   */
  private _updateModel(model: T, event: FgEvent): T {
    switch (event.signature) {
      case FgApplicationModelEvent.INIT:
        this.$log.warn('FgApplicationModelService: Application Model initialized!');
        break;
      case FgApplicationModelEvent.OVERRIDE:
        this.$log.warn('FgApplicationModelService: Application Model overwritten!');
        model = Object.assign({}, event.data) as T;
        break;
    }
    return this.updateModel(model, event);
  }
  /**
   * Methode for automatically kicking of model initialization on subscribe
   */
  private _initModel(): Observable<T> {
    return this.initModel().pipe(
      tap(model => this.emitEvent(new FgApplicationModelEvent(FgApplicationModelEvent.INIT, this, model)))
    );
  }
  /**
   * Methode adding internal application model events
   */
  private _getModelUpdateEvents(): string[] {
    const events = this.getModelUpdateEvents();
    events.push(FgApplicationModelEvent.INIT);
    events.push(FgApplicationModelEvent.OVERRIDE);
    this.$log.error('MODEL_EVENTS');
    this.$log.error(events);
    return events;
  }

  /** Connect user to applicaiton model and fetch specific data */
  private _connectUser<U>(options?: U): Observable<boolean> {
    const connected$ = this.connectUser(options);
    return connected$;
  }
  /** Disconnect user from applicaiton model and perform cleanup */
  private _disconnectUser<D>(options?: D): Observable<boolean> {
    const disconnectUser$ = this.disconnectUser();
    return disconnectUser$;
  }
  /**
   * OVERRIDE to implement specific bootstrap for application
   * model data
   */
  protected abstract initModel(): Observable<T>;
  /**
   * OVERRIDE to implement model updates based on your specific update events
   */
  protected abstract updateModel(model: T, event: FgEvent): T;
  /**
   * OVERRIDE to add the specific model update events being implemented
   */
  protected abstract getModelUpdateEvents(): string[];
  /** Connect user to applicaiton model and fetch specific data */
  public abstract connectUser<U>(options?: U): Observable<boolean>;
  /** Disconnect user from applicaiton model and perform cleanup*/
  public abstract disconnectUser<D>(options?: D): Observable<boolean>;
}
