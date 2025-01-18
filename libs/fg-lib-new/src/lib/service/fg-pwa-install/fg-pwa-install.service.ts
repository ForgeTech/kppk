import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgBaseService } from '../../base';
import { DOCUMENT } from '@angular/common';

  /** Event to be dispatched when user installs pwa */
export const BEFORE_INSTALL = 'fg.pwa.event.before_install';
/** Event to be dispatched when user installs pwa */
export const INSTALLED = 'fg.pwa.event.installed';
/** Event to be dispatched when user installs pwa */
export const USER_ACCEPTED_INSTALL_PROMPT = 'fg.pwa.event.user_accepted_install_propmt';
/** Event to be dispatched when user installs pwa */
export const USER_DECLINED_INSTALL_PROMPT = 'fg.pwa.event.user_declined_install_prompt';

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 * READ: https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 * READ: https://stackoverflow.com/questions/51503754/typescript-type-beforeinstallpromptevent
 *
 */
// * @deprecated Only supported on Chrome and Android Webview.
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

/**
 * FgPwaInstallService -
 * Service provides the browsers pwa-install event for install-components
 * defering the default install dialog
 *
 * READ: * https://www.netguru.com/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native
 */
@Injectable({ providedIn: 'root' })
export class FgPwaInstallService extends FgBaseService {
  protected $event = inject(FgEventService, { optional: true });
  protected $document = inject(DOCUMENT);

  /** Observable signaling if a pwa install-promt was received and deferred for use with install-component */
  protected PWA_DEFERRED_PROMT_AVAILABLE$ = new BehaviorSubject(true);
  public readonly pwa_deferred_promt_available$ = this.PWA_DEFERRED_PROMT_AVAILABLE$.asObservable().pipe(shareReplay(1));
  /**
   * Variable to hold and share the browsers pwa-install
   * event between multiple instances of the install button
   * until its used, from the time it's set from application.component.ts
   */
  protected PWA_DEFERRED_PROMT: BeforeInstallPromptEvent | undefined;
  public get pwa_deferred_promt() {
    return this.PWA_DEFERRED_PROMT;
  }
  /** Hold global window-object */
  protected WINDOW = this.$document.defaultView;
  /** CONSTRUCTOR */
  constructor() {
    super()
    // Attach eventlistener for 'beforeinstallpromt' pwa-event
    this.WINDOW?.addEventListener('beforeinstallprompt', event => {
      this.$log?.info('FgPwaInstallService: beforeinstallprompt-event fired!');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Dispatch event signaling that user intendet to install progressive wep-app
      this.$event?.emit({ type: BEFORE_INSTALL });
      // Stash the event so it can be triggered later.
      this.PWA_DEFERRED_PROMT = event as BeforeInstallPromptEvent;
      this.PWA_DEFERRED_PROMT_AVAILABLE$.next(true);
    });
    // Attach eventlistener for 'appInstalled' pwa-event
    this.WINDOW?.addEventListener('appinstalled', event => {
      this.$log?.info('FgPwaInstallService: appinstalled-event fired!');
      // Dispatch event signaling that user install progressive wep-app
      this.$event?.emit({ type: INSTALLED });
      this.PWA_DEFERRED_PROMT_AVAILABLE$.next(false);
    });
  }
  /**
   * Methode to promt application installation
   */
  public install() {
    this.$log?.info('FgPwaInstallService: prompt install!');
    if (this.PWA_DEFERRED_PROMT) {
      this.PWA_DEFERRED_PROMT.prompt();
      // Wait for the user to respond to the prompt
      this.PWA_DEFERRED_PROMT.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          this.$log?.info('FgPwaInstallService: prompt accepted!');
          this.$event?.emit({ type: USER_ACCEPTED_INSTALL_PROMPT });
        } else {
          this.$log?.info('FgPwaInstallService: prompt declined!');
          this.$event?.emit({ type: USER_DECLINED_INSTALL_PROMPT });
        }
      });
    } else {
      this.$log?.info('FgPwaInstallService: no prompt available!');
    }
  }
}
