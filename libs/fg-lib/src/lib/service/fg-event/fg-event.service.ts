import { Injectable, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { FgBaseLogService } from '../../base/fg-base-log.service';
import { FgBaseEvent } from '../../base/fg-base.event';
import { FgNgxLoggerMethodeType } from '../../type/fg-ngx-logger-methodes.type';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgEvent, FgLiveCycleEvent } from './fg-event.class';

/**
 * FgEventService -
 * Service provides an interface to handle and distribute
 * events inside forge-application. It should be used as
 * main-interface for inter module/component/service
 * communication within the application
 */
@Injectable({ providedIn: 'root' })
export class FgEventService extends FgBaseLogService {
  protected $env = inject(FgEnvironmentService);

  protected loglevel: FgNgxLoggerMethodeType = 'debug';
  /**
   * The observable subject used to push events
   * within the angular application
   */
  protected EVENT$: Subject<FgEvent> = new Subject<FgEvent>();
  public readonly event$ = this.EVENT$.asObservable();

  /**  Holds event-signatures to be logged */
  protected EVENT_SIGNATURES_TO_LOG: string[];
  /**
   * Member to hold event-subscriptions
   * Every subscribed event-type is used as object-key
   * exposing an array of objects subscribed to according
   * event
   */
  protected subscribed: [string, (event: FgEvent) => void, any][];
  /**
   * CONSTRUCTOR
   */
  constructor() {
    super();

    this.EVENT_SIGNATURES_TO_LOG = [];
    this.subscribed = [];
    if (this.$env?.development?.enabled && this.$env.development.event) {
      this.subscribed;
    }
    this.event$.subscribe(event => {
      if (this.EVENT_SIGNATURES_TO_LOG.indexOf(event.signature) !== -1) {
        this.$log[this.loglevel](event.signature);
        this.$log[this.loglevel](event);
      }
    });
  }
  /**
   * Methode to define a set of events that should be logged
   */
  public registerEventsToLog(events: string[], level: FgNgxLoggerMethodeType): string[] {
    this.EVENT_SIGNATURES_TO_LOG = events;
    this.loglevel = level;
    this.$log[this.loglevel]('Events to log:', this.EVENT_SIGNATURES_TO_LOG);
    return this.EVENT_SIGNATURES_TO_LOG;
  }
  /**
   * Methode to dispatch events over the event-pipeline
   * @param component
   * @param event
   */
  public emitEvent(event: FgEvent): void {
    // Emit event via event-service observable
    this.EVENT$.next(event);
  }
  /**
   * @TODO
   * Implement methode to push stuff on the end of the current event-loop
   * @param methode
   */
  // public pushEndOffCurrentStack( methode: (...args)): void {

  // }
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
