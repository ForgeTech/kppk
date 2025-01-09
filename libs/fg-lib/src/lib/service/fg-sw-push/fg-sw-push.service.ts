import { Injectable, Optional, Inject, InjectionToken } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NGXLogger } from 'ngx-logger';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgGlobalService } from '../../../../modules/fg-global/fg-global.service';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { Observable, from } from 'rxjs';
import { FgEvent } from '../../class/fg-event.class';
import { FgSWPushEvent } from './fg-sw-push.event';

/** Inject-Token Provider for for service-worker push-service public-key */
export const CONFIG_SW_PUSH_SERVER_PUBLIC_KEY = new InjectionToken<{ serverPublicKey: string }>(null);
/**
 * FgSwPushService -
 * Service to wrap and handle angular service-worker push-message-service
 */
@Injectable({
  providedIn: 'root',
})
export class FgSwPushService {
  /** Holds the window-object in case angular is run in browser-environment */
  protected WINDOW: Window;
  /** The interval in ms, after which the service-worker update-check is performed */
  protected SW_PUSH_SERVER_PUBLIC_KEY: { serverPublicKey };
  /** Returns value of SW_PUSH_SERVER_PUBLIC_KEY */
  get swPushServerPublicKey(): { serverPublicKey } {
    return this.SW_PUSH_SERVER_PUBLIC_KEY;
  }
  /** The interval in ms, after which the service-worker update-check is performed */
  protected SW_PUSH_SUBSCRIBTION: PushSubscription;
  /** Returns value of SW_PUSH_SUBSCRIBTION */
  get swPushSubscribtion(): PushSubscription {
    return this.SW_PUSH_SUBSCRIBTION;
  }
  /** Returns value of SW_PUSH_SUBSCRIBTION */
  get swPushSubscribtion$(): Observable<PushSubscription> {
    return this.$push.subscription;
  }
  /** Returns value of SW_PUSH_DATA */
  get messages$(): Observable<object> {
    return this.$push.messages;
  }
  /** CONSTRUCTOR */
  constructor(
    /** Provide application global-object service */
    protected $global: FgGlobalService,
    /** Provide angular service-worker push-service */
    protected $push: SwPush,
    /** Provide application event-bridge service */
    protected $log: NGXLogger,
    /** Provide value for UPDATE_CHECK_INTERVAL via environment-service */
    @Optional() protected $env: FgEnvironmentService,
    /** Provide application event-bridge service */
    @Optional() protected $event: FgEventService,
    /**
     * Provide value for CONFIG_SW_PUSH_SERVER_PUBLIC_KEY vie angular DI
     * CAUTION! This value overrides values from envirement-service
     */
    @Optional() @Inject(CONFIG_SW_PUSH_SERVER_PUBLIC_KEY) protected configSwPushServerPublicKey: { serverPublicKey }
  ) {
    this.$log.info('PUSH-SERVICE:', this.$push.isEnabled);
    if (this.$global.isBrowser && this.$push.isEnabled) {
      this.WINDOW = this.$global.nativeGlobal<Window>();
      // Use interval-value received via swUpdateCheckInterval environment-service
      if (this.$env && this.$env.sw && this.$env.sw.pushServerPublicKey) {
        this.SW_PUSH_SERVER_PUBLIC_KEY = { serverPublicKey: this.$env.sw.pushServerPublicKey };
      }
      // Use value from configUpdateIntervalValue injection-token
      if (this.configSwPushServerPublicKey !== null) {
        this.SW_PUSH_SERVER_PUBLIC_KEY = this.configSwPushServerPublicKey;
      }
    }
    this.$push.notificationClicks.subscribe(msg => {
      this.$log.error('NOTIFICATION CLICK');
      // console.table( msg );
    });
  }
  /**
   * Request the service-worker push subscribtion from the server
   * @param options Object containing the serverPublicKey
   */
  public requestSubscription(options?: { serverPublicKey: any }): Observable<PushSubscription> {
    if (options) {
      this.SW_PUSH_SERVER_PUBLIC_KEY = options;
    }
    if (this.SW_PUSH_SERVER_PUBLIC_KEY) {
      from(this.$push.requestSubscription(this.SW_PUSH_SERVER_PUBLIC_KEY))
        .subscribe(
          subscribtion => {
            this.SW_PUSH_SUBSCRIBTION = subscribtion;
            if (this.$event) {
              this.$event.emitEvent(new FgEvent(FgSWPushEvent.SUBSCRIBED, this, this.SW_PUSH_SUBSCRIBTION));
            }
            //
            this.$push.subscription.subscribe(subscription => {
              if (this.$event) {
                this.SW_PUSH_SUBSCRIBTION = subscribtion;
                this.$event.emitEvent(new FgEvent(FgSWPushEvent.SUBSCRIPTION_UPDATED, this, this.SW_PUSH_SUBSCRIBTION));
              }
            });
          },
          error => {
            this.$log.error('Error! FgSwPushService: requestSubscribtion-methode');
            this.$log.error(error);
          }
        )
        .unsubscribe();
    } else {
      this.$log.error(
        'Error! FgSwPushService: ',
        `'SW_PUSH_SERVER_PUBLIC_KEY'-object of type { serverPublicKey: string},
        needed to request service-worker push-subscribtion from server is undefined!`
      );
    }
    return this.$push.subscription;
  }
  /** Unsubscribe from push-subscribtion */
  public unsubscribe(): Observable<void> {
    if (this.$event) {
      this.$event.emitEvent(new FgEvent(FgSWPushEvent.UNSUBSCRIBE, this));
    }
    return from(this.$push.unsubscribe());
  }
}
