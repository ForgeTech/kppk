import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgEvent } from './fg-event.class';
import { FgNgxLoggerMethodeType } from '../../interface/fg-environment-develpment-event.config.interface';
import { FgBaseService } from '../../base/fg-base.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * FgEventService -
 * Service provides an interface to handle and distribute
 * events inside forge-application. It should be used as
 * main-interface for inter module/component/service
 * communication within the application
 */
@Injectable({ providedIn: 'root' })
export class FgEventService extends FgBaseService {
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
   * CONSTRUCTOR
   */
  constructor(
    /** Instance of Forge Log-Service */
    protected $env: FgEnvironmentService,
    
  ) {
    super();

    this.EVENT_SIGNATURES_TO_LOG = [];
    this.event$.pipe(takeUntilDestroyed()).subscribe(event => {
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
}
