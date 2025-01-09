import { Injectable, Optional } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { FgPwaInstallEvent } from './fg-pwa-install.event';
import { NGXLogger } from 'ngx-logger';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgEvent } from '../fg-event/fg-event.class';
import { FgBaseService } from '../../base';

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
  /** Observable signaling if a pwa install-promt was received and deferred for use with install-component */
  public pwaDeferredPromtAvailable$ = new BehaviorSubject(true);
  /**
   * Variable to hold and share the browsers pwa-install
   * event between multiple instances of the install button
   * until its used, from the time it's set from application.component.ts
   */
  public pwaDeferredPromt: BeforeInstallPromptEvent | undefined;
  /** Hold global window-object */
  protected WINDOW: Window | undefined;
  /** CONSTRUCTOR */
  constructor(
    // Provide global object service
    public $global: FgGlobalService,
  ) {
    super()

    if (this.$global.isBrowser) {
      this.WINDOW = this.$global.nativeGlobal<Window>();
      // Attach eventlistener for 'beforeinstallpromt' pwa-event
      this.WINDOW.addEventListener('beforeinstallprompt', event => {
        this.$log.debug('FgPwaInstallService: beforeinstallprompt-event fired!');
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        event.preventDefault();
        // Dispatch event signaling that user intendet to install progressive wep-app
        this.emitEvent(new FgEvent(FgPwaInstallEvent.BEFORE_INSTALL, this, event));
        // Stash the event so it can be triggered later.
        this.pwaDeferredPromt = event as BeforeInstallPromptEvent;
        this.pwaDeferredPromtAvailable$.next(true);
      });
      // Attach eventlistener for 'appInstalled' pwa-event
      this.WINDOW.addEventListener('appinstalled', event => {
        this.$log.debug('FgPwaInstallService: appinstalled-event fired!');
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        // event.preventDefault();
        // Dispatch event signaling that user install progressive wep-app
        this.emitEvent(new FgEvent(FgPwaInstallEvent.INSTALLED, this));
        this.pwaDeferredPromtAvailable$.next(false);
      });
    }
  }
  /**
   * Methode to promt application installation
   */
  public install() {
    this.$log.debug('FgPwaInstallService: prompt install!');
    if (this.pwaDeferredPromt) {
      this.pwaDeferredPromt.prompt();
      // Wait for the user to respond to the prompt
      this.pwaDeferredPromt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          this.$log.debug('FgPwaInstallService: prompt accepted!');
          this.emitEvent(new FgEvent(FgPwaInstallEvent.USER_ACCEPTED_INSTALL_PROMPT, this));
        } else {
          this.$log.debug('FgPwaInstallService: prompt declined!');
          this.emitEvent(new FgEvent(FgPwaInstallEvent.USER_DECLINED_INSTALL_PROMPT, this));
        }
      });
    } else {
      this.$log.debug('FgPwaInstallService: no prompt available!');
    }
  }
}
