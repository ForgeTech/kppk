import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgGlobalService } from '../../../../modules/fg-global/fg-global.service';
import { FgEnvironmentService } from '../fg-environment/fg-environment.service';
import { Subject, Observable, from, interval, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, take, distinct } from 'rxjs/operators';
import { FgSwPushService } from '../fg-sw-push/fg-sw-push.service';
import { FgEvent } from '../../class/fg-event.class';
import { FgNotificationEvent } from './fg-notification.event';

/** InjectionToken to allow customization of the permission-request delay */
export const CONFIG_NOTIFICATION_REQUEST_PERMISSION = new InjectionToken<boolean | number>(null);
/** InjectionToken to provide a value for permission detection-interval */
export const CONFIG_NOTIFICATION_DETECT_PERMISSION_CHANGE_INTERVAL = new InjectionToken<false | number>(null);
/** InjectionToken to provide default notification-options  */
export const CONFIG_NOTIFICATION_DEFAULT_OPTIONS = new InjectionToken<NotificationOptions>(null);

/**
 * FgSwPushService -
 * Service to wrap and handle angular service-worker push-message-service
 */
@Injectable({
  providedIn: 'root',
})
export class FgNotificationService {
  /** Holds the window-object in case angular is run in browser-environment */
  protected WINDOW: Window;
  /** Holds the crossbrowser-reference to the notification on window-object if available */
  protected NOTIFICATION: Notification;
  /** Holds the service-worker registration object after successful initialization */
  protected SW_REGISTRATION: ServiceWorkerRegistration;
  /** Holds initial value defining if there should be an immidiate request for notification-permission, or if it should be delayed */
  protected REQUEST_NOTIFICATION_PERMISSION_DELAY: 'manual' | number = 0;
  /** Holds the service-worker registration object after successful initialization */
  protected DETECT_NOTIFICATION_PERMISSION_CHANGE_INTERVAL: number = 1000;
  /** Holds the service-worker registration object after successful initialization */
  protected NOTIFICATION_DEFAULT_OPTIONS: NotificationOptions = {
    // dir: notification.dir,
    // timestamp: notification.timestamp,
    actions: [{ action: ' goto', title: 'anzeigen', icon: '' }],
    badge: 'https://forgetech.github.io/fg-vlv-pwa/assets/images/application/android-icon-144x144.png',
    body: 'This is a message.',
    data: { url: 'https://forgetech.github.io/fg-vlv-pwa/#/home' },
    icon: 'https://forgetech.github.io/fg-vlv-pwa/assets/images/forgetech/logo-small.png',
    image: 'https://forgetech.github.io/fg-vlv-pwa/assets/images/not-found/xs-x1.png',
    lang: 'de',
    renotify: true,
    requireInteraction: true,
    silent: false,
    tag: 'push demo',
    vibrate: [300, 100, 400, 100, 400, 100, 400],
  };
  /** Returns value of SW_REGISTRATIOM */
  get swRegistration(): ServiceWorkerRegistration {
    return this.SW_REGISTRATION;
  }
  /** Holds the service-worker registration object as soon as it is ready */
  protected SW_REGISTRATION$: Subject<ServiceWorkerRegistration> = new Subject();
  /** Streams value of SW_REGISTRATION as soon as it becomes available */
  get swRegistration$(): Observable<ServiceWorkerRegistration> {
    return this.SW_REGISTRATION$.asObservable();
  }
  /** Holds the permission-object received after requesting notification-Permissions successfully */
  protected PERMISSION$: Subject<NotificationPermission> = new Subject();
  /** Streams value of PERMISSION as soon as it becomes available */
  get permission$(): Observable<NotificationPermission> {
    return this.PERMISSION$.asObservable();
  }
  /** The interval in ms, after which the service-worker update-check is performed */
  protected PERMISSION: NotificationPermission;
  /** Returns value of SW_PUSH_SERVER_PUBLIC_KEY */
  get permission(): NotificationPermission {
    return this.PERMISSION;
  }
  protected NOTIFICATIONS$: Subject<any[]> = new BehaviorSubject([]);
  /** Returns value of NOTIFICATIONS$ */
  get notifications$(): Observable<any[]> {
    return combineLatest([this.$swPush.messages$, this.NOTIFICATIONS$.asObservable()]);
  }
  protected NOTIFICATIONS: Notification[] = [];
  /** Returns value of NOTIFICATIONS */
  get notifications(): any[] {
    return this.NOTIFICATIONS;
  }
  /** CONSTRUCTOR */
  constructor(
    /** Provide application global-object service */
    protected $global: FgGlobalService,
    /** Provide angular service-worker push-service */
    protected $swPush: FgSwPushService,
    /** Provide angular logging-service */
    protected $log: NGXLogger,
    /** Provide application event-bridge service */
    @Optional() protected $env: FgEnvironmentService,
    /** Provide application event-bridge service */
    @Optional() protected $event: FgEventService,
    /**
     * Provide value for CONFIG_NOTIFICATION_DETECT_PERMISSION_CHANGE_INTERVAL vie angular DI
     * CAUTION! This value overrides values from envirement-service
     */
    @Optional() @Inject(CONFIG_NOTIFICATION_DETECT_PERMISSION_CHANGE_INTERVAL) protected config_request_notification_permission,
    /**
     * Provide value for CONFIG_DETECT_NOTIFICATION_PERMISSION_CHANGE_INTERVAL vie angular DI
     * CAUTION! This value overrides values from envirement-service
     */
    @Optional()
    @Inject(CONFIG_NOTIFICATION_DETECT_PERMISSION_CHANGE_INTERVAL)
    protected config_detect_notification_permission_change_interval,
    /**
     * Provide value for CONFIG_NOTIFICATION_DEFAULT_OPTIONS vie angular DI
     * CAUTION! This value overrides values from envirement-service
     */
    @Optional() @Inject(CONFIG_NOTIFICATION_DEFAULT_OPTIONS) protected config_notification_default_options
  ) {
    this.$log.info('Notification-Service');
    if (this.$global.isBrowser) {
      this.WINDOW = this.$global.nativeGlobal<Window>();
      // @ts-ignore Ignore the ts-errors caused by references to mozNotification and webkitNotification
      this.NOTIFICATION = window.Notification || (mozNotification as Notification) || (webkitNotification as Notification);
      if (this.NOTIFICATION) {
        this.$log.error(this.PERMISSION);
        this.PERMISSION = this.NOTIFICATION['permission'];
        this.PERMISSION$.next(this.PERMISSION);
      }
      // Subscribe to service-worker registration
      from(this.WINDOW.navigator.serviceWorker.ready).subscribe(registration => {
        this.SW_REGISTRATION = registration;
        this.SW_REGISTRATION$.next(this.SW_REGISTRATION);
        this.updateSWNotifications();
      });
      // Use interval-value received via requestNotificationDelay environment-service
      if (this.$env && this.$env['requestNotificationDelay']) {
        this.REQUEST_NOTIFICATION_PERMISSION_DELAY = this.$env['requestNotificationDelay'];
      }
      // Use interval-value received via swDelayReload environment-service
      if (config_request_notification_permission !== null) {
        this.REQUEST_NOTIFICATION_PERMISSION_DELAY = config_request_notification_permission;
      }
      // Request notification-permission
      if (this.REQUEST_NOTIFICATION_PERMISSION_DELAY !== 'manual') {
        const requestNotificationPermissionDelay$$ = interval(this.REQUEST_NOTIFICATION_PERMISSION_DELAY)
          .pipe(take(1))
          .subscribe(tick => {
            this.requestPermission();
            requestNotificationPermissionDelay$$.unsubscribe();
          });
      }
      // Use interval-value received via requestNotificationDelay environment-service
      if (this.$env && this.$env['detectNotificationChangeDelay']) {
        this.DETECT_NOTIFICATION_PERMISSION_CHANGE_INTERVAL = this.$env['detectNotificationChangeDelay'];
      }
      // Use interval-value received via swDelayReload environment-service
      if (config_detect_notification_permission_change_interval !== null) {
        this.DETECT_NOTIFICATION_PERMISSION_CHANGE_INTERVAL = config_detect_notification_permission_change_interval;
      }
      // Detect changes to Notification API permissions by checking periodically if permissions have been changed by the user
      interval(this.DETECT_NOTIFICATION_PERMISSION_CHANGE_INTERVAL)
        .pipe(
          map(tick => this.NOTIFICATION['permission'] as NotificationPermission),
          distinct()
        )
        .subscribe(permission => {
          this.PERMISSION = permission;
          this.PERMISSION$.next(this.PERMISSION);
          if (this.$event) {
            this.$event.emitEvent(new FgEvent(FgNotificationEvent.PERMISSION_CHANGE, this));
          }
        });
      // Subscribe to messages received by service-worker push-subscribtion
      // CAUTION! It is checked object contains a title property,
      // if not it's filtered out
      this.$swPush.messages$.pipe(filter((msg: Notification) => msg.title !== undefined)).subscribe((msg: Notification) => {
        if (this.$event) {
          this.$event.emitEvent(new FgEvent(FgNotificationEvent.MESSAGE_RECEIVED, this, msg));
        }
        this.dispatchNotification(msg);
      });
    }
  }
  /**
   * Request notification-permission from user
   * CAUTION! Only displays browser-dialog if user didn't already
   * 'denied'/'granted' permissions and the permission is in state 'default'
   */
  public requestPermission(): Observable<NotificationPermission> {
    if (this.$event) {
      this.$event.emitEvent(new FgEvent(FgNotificationEvent.PERMISSION_REQUESTED, this));
    }
    // This is the request according to latest NotifiactionAPI requestPermission-methode definition returning a promise
    const standardRequest$ = from(Notification.requestPermission());
    // This is out-dated version NotifiactionAPI requestPermission-methode using a callback, still used by Safari
    // @ts-ignore
    // const callBackRequest$ = bindCallback( Notification.requestPermission() );
    // Combine this
    // const requestPermission$ = merge([
    //   standardRequest$,
    //   callBackRequest$.call( this )
    // ]).pipe(
    //   filter( value => value === 'default' || value === 'denied' || value === 'granted' ),
    //   map( value => value as NotificationPermission ),
    //   take( 1 )
    // );
    // Try both
    standardRequest$.subscribe(permission => {
      this.PERMISSION = permission;
      this.PERMISSION$.next(this.PERMISSION);
    });
    return this.permission$;
  }
  /**
   * Dispatch notification to be displayed by the operating system
   * CAUTION! Even if user 'granted' notification-permission - notifications
   * can still be turned of for the browser or all applications by the operating-system
   */
  public dispatchNotification(notification: Notification, options: NotificationOptions = undefined): void {
    if (this.SW_REGISTRATION) {
      if (options === undefined) {
        options = this.NOTIFICATION_DEFAULT_OPTIONS;
      } else {
        options = Object.assign(this.NOTIFICATION_DEFAULT_OPTIONS, options);
      }
      this.SW_REGISTRATION.showNotification(notification.title, options);
      this.updateSWNotifications();
    } else {
      this.$log.error(
        'Error! FgNotificationService: dispatchNotification-methode failed! Service-Worker-Registration not registered yet!'
      );
    }
  }
  /** Updates and dispatches the Notification-Properties of this service */
  protected updateSWNotifications(): void {
    this.SW_REGISTRATION.getNotifications().then(notifications => {
      this.NOTIFICATIONS$.next(notifications);
      this.NOTIFICATIONS = notifications;
      console.log('Get Notifications');
      console.table(this.NOTIFICATIONS);
    });
  }
}
