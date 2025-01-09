import { FgEventService } from './fg-event.service';
import { NGXLogger as FgLogService } from 'ngx-logger';
import { FgEvent } from './fg-event.class';
/**
 * FgEventSubscriber -
 * Abstract class to be extended by classes
 */
export abstract class FgEventSubscriber {
  /**
   * Holding the tubles of event.signiture and callback to subscribe to global
   * event-service
   */
  private _eventsToSubscribe: [string, (event: FgEvent) => void][];
  /** GETTER for protected member _eventsToSubscribe */
  get eventsToSubscribe(): [string, (event: FgEvent) => void][] {
    return this._eventsToSubscribe;
  }
  /** SETTER for protected member _eventsToSubscribe */
  set eventsToSubscribe(eventsToSubscribe: [string, (event: FgEvent) => void][]) {
    this.unsubscribeEvents(this.eventsToSubscribe);
    this._eventsToSubscribe = eventsToSubscribe;
    this.subscribeEvents(eventsToSubscribe);
  }
  /** CONSTRUCTOR */
  constructor(
    /** Instance of Log-Service  */
    protected $log: FgLogService,
    /** Instance of Forge Event-Service */
    protected $event: FgEventService
  ) {
    this._eventsToSubscribe = [];
  }
  /** Register events to global event-service */
  protected subscribeEvents(events: [string, (event: FgEvent) => void][]): void {
    // if ( events || events.length > 0 ) {
    //   events.forEach( event => {
    //     this.$event.subscribe( event[ 0 ], event[ 1 ] );
    //   });
    // } else {
    //   this.$log.warn( 'EventSubscriber: ', this, 'had no eventes to subscribe!' );
    // }
  }
  /** Unregister events from global event-service  */
  protected unsubscribeEvents(events: [string, (event: FgEvent) => void][]): void {
    // if ( events || events.length > 0 ) {
    //   events.forEach( event => {
    //     event.unsubscribe( event[ 0 ], event[ 1 ] );
    //   });
    // } else {
    //   this.$log.warn( 'EventSubscriber: ', this, 'had no eventes to unsubscribe!' );
    // }
  }
}
