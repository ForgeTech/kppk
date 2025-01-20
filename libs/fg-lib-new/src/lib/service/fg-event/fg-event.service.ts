import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { FgNgxLoggerMethodeType } from '../../interface/fg-environment-develpment-event.config.interface';
import { FgBaseService } from '../../base/fg-base.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { z } from 'zod';
import { json_parser } from './../../type/json-type.zod';

export const fg_event_parser = z.object({
  type: z.string(),
  target: z.string().optional(),
  source: z.string().optional(),
  broadcast: z.literal(true).optional(),
  data: json_parser.optional(),
});

export type FgEvent = z.infer<typeof fg_event_parser>;

/**
 * FgEventService -
 * Service provides an interface to handle and distribute
 * events inside forge-application. It should be used as
 * main-interface for inter module/component/service
 * communication within the application
 */
@Injectable({ providedIn: 'root' })
export class FgEventService extends FgBaseService {
  protected $env = inject(FgEnvironmentService, { optional: true });
  
  protected log_level: FgNgxLoggerMethodeType = 'debug';
  /**
   * The observable subject used to push events
   * within the angular application
   */
  protected EVENT$ = new Subject<FgEvent>();
  public readonly event$ = this.EVENT$.asObservable();

  /**  Holds event-signatures to be logged */
  protected EVENT_SIGNATURES_TO_LOG: string[];

  /** Holds event broadcast-channel */
  protected eventC = new BroadcastChannel('fg_event');

  /** CONSTRUCTOR  */
  constructor( ) {
    super();
    if( this.$env?.development?.event?.eventsTolog ) {
      this.registerEventsToLog(
        this.$env.development.event.eventsTolog, 
        this.$env?.development.event?.level
      )
    }
    this.EVENT_SIGNATURES_TO_LOG = [];
    this.event$.pipe(takeUntilDestroyed()).subscribe(event => {
      if (this.EVENT_SIGNATURES_TO_LOG.indexOf(event.type) !== -1) {
        this.log(event.type);
        this.log(event);
      }
    });
  }
  /**
   * Methode to define a set of events that should be logged
   */
  public registerEventsToLog(events: string[], level?: FgNgxLoggerMethodeType): string[] {
    this.EVENT_SIGNATURES_TO_LOG = events;
    this.log_level = level ?? 'debug';
    this.log('Events to log:')
    this.log(this.EVENT_SIGNATURES_TO_LOG);
    return this.EVENT_SIGNATURES_TO_LOG;
  }
  /**
   * Methode to dispatch events over the event-pipeline
   * @param component
   * @param event
   */
  public emit(event: FgEvent): void {
    fg_event_parser.parse( event );
    // Publish event as next action on event loop
    setTimeout(this.push_event.bind(this, event), 0);
  }

  /**
   * Methode used to publish an event
   * @param event 
   */
  protected push_event( event: FgEvent ): void {
    // Emit event via event-service observable
    this.EVENT$.next(event);
    // If marked as broadcast publish on channel
    if( event.broadcast ) {
      this.eventC.postMessage( event );
    }
  }
  /**
   * Methode to help with logging on
   * configured log-level
   * @param message 
   */
  protected log( message: any ) {
    if( this.$log ) {
      this.$log[this.log_level]( message );
    } else {
      console.warn( message )
    }
  }
}
