import { Injectable, inject } from '@angular/core';
import { FgBaseService } from '../../base';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import * as IOS_VERSIONS from './fg-apple-ios-tyes.const';

/** Turn const values imported to type-module to be processed */
type AppleIosTypeModule = typeof IOS_VERSIONS;
/** Provides typing for FgDetectDeviceTypeUserAgentServiceEvent  */
export type AppleIosType = AppleIosTypeModule[keyof AppleIosTypeModule];

/**
 * FgAppleIosService -
 * Provides apple-related helper-methodes like ios-device detection
 * and similar, mostly based on parsing a browsers user-agent string,
 * so this service should be used with caution as it's not a hundred percent
 * reliable, as user-agents can also be faked.
 * Read:
 * https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 * https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
 */
@Injectable({
  providedIn: 'root',
})
export class FgAppleIosService extends FgBaseService {
  protected $global = inject(FgGlobalService);

  /**
   * Reference to a browsers global window-instance
   * NOTE: Will only be initialized when service is used
   * in Browser.
   */
  protected WINDOW: Window | undefined;
  /** CONSTRUCTOR */
  constructor() {
    super()
    if (this.$global.isBrowser) {
      this.WINDOW = this.$global.nativeGlobal<Window>();
    }
    // this.$modernizr.
  }
  /**
   * Detect IOS on apple mobile-device
   * NOTE: Use with caution for none-critical use-cases
   */
  public isDesktopIOS(): boolean {
    let isIOS = false;
    const iDevices = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'Pike v7.6 release 92', 'Pike v7.8 release 517'];
    if (
      this.WINDOW?.navigator &&
      this.WINDOW?.navigator.platform &&
      this.WINDOW?.navigator.platform.indexOf('Windows') === -1
    ) {
      while (iDevices.length) {
        if (navigator?.platform === iDevices.pop()) {
          isIOS = true;
        }
      }
    }
    return isIOS;
  }
  /**
   * Detect IOS on apple mobile-device
   * NOTE: Use with caution for none-critical use-cases
   */
  public isMobileIOS(): boolean {
    let isIOS = false;
    if (this.$global.isBrowser) {
      const iDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'];
      if (
        this.WINDOW?.navigator &&
        this.WINDOW?.navigator.platform &&
        this.WINDOW?.navigator.platform.indexOf('Windows') === -1
      ) {
        while (iDevices.length) {
          if (navigator.platform === iDevices.pop()) {
            isIOS = true;
          }
        }
      }
    }
    return isIOS;
  }
  /**
   * Detect IOS on apple mobile-device
   * NOTE: Use with caution for none-critical use-cases
   */
  public isIOS(): boolean {
    let isIOS = false;
    if (this.isDesktopIOS() || this.isMobileIOS()) {
      isIOS = true;
    }
    return isIOS;
  }
  /**
   * Detect safari-browser on apple mobile-device by user-agent
   * sniffing and checking window?.navigator.plattform property.
   * NOTE: Use with caution for none-critical use-cases
   */
  public isSafariOnMobileIOS(): boolean {
    let isSafariOnMobileIOS = false;
    if (this.$global.isBrowser) {
      const userAgent = this.WINDOW?.navigator.userAgent;
      if (
        userAgent &&
        this.isMobileIOS() &&
        !/CriOS/.test(userAgent) &&
        !/FxiOS/.test(userAgent) &&
        !/OPiOS/.test(userAgent) &&
        !/mercury/.test(userAgent)
      ) {
        isSafariOnMobileIOS = true;
      }
    }
    return isSafariOnMobileIOS;
  }
  /**
   * Detect safari-browser on apple desktop-device by user-agent
   * sniffing and checking window?.navigator.plattform property.
   * NOTE: Use with caution for none-critical use-cases
   */
  public isSafariOnDesktopIOS(): boolean {
    let isSafariOnDesktopIOS = false;
    if (this.$global.isBrowser) {
      const userAgent = this.WINDOW?.navigator.userAgent;
      if (
        userAgent &&
        this.isDesktopIOS() &&
        !/CriOS/.test(userAgent) &&
        !/FxiOS/.test(userAgent) &&
        !/OPiOS/.test(userAgent) &&
        !/mercury/.test(userAgent)
      ) {
        isSafariOnDesktopIOS = true;
      }
    }
    return isSafariOnDesktopIOS;
  }
  /**
   * Detect safari-browser on desktop/mobile-device
   * NOTE: Use with caution for none-critical use-cases
   */
  public isSafariOnIOS(): boolean {
    let isSafari = false;
    if (this.isSafariOnDesktopIOS() || this.isSafariOnMobileIOS()) {
      isSafari = true;
    }
    return isSafari;
  }
  /* eslint-disable */
  /**
   * Detect IOS-version IOS8 and above to IOS3 and below, by using
   * feature-detects
   * NOTE: Use with caution for none-critical use-cases
   * Read: https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
   */
  public getiOSversion(): false | AppleIosType {
    let detectedIOSVersion: false | AppleIosType = false;
    // @ts-ignore
    if (this.isIOS() && !this.WINDOW.MSStream) {
      if (this.WINDOW?.indexedDB) {
        detectedIOSVersion = IOS_VERSIONS.IOS8AndNewer;
      }
      // @ts-ignore
      if (this.WINDOW?.SpeechSynthesisUtterance) {
        detectedIOSVersion = IOS_VERSIONS.IOS7;
      }
      // @ts-ignore
      if (this.WINDOW?.webkitAudioContext) {
        detectedIOSVersion = IOS_VERSIONS.IOS6;
      }
      // @ts-ignore
      if (this.WINDOW?.matchMedia) {
        detectedIOSVersion = IOS_VERSIONS.IOS5;
      }
      // @ts-ignore
      if (this.WINDOW?.history && 'pushState' in window.history) {
        detectedIOSVersion = IOS_VERSIONS.IOS4;
      }
      detectedIOSVersion = IOS_VERSIONS.IOS3AndLower;
    }
    return detectedIOSVersion;
  }
  /* eslint-disable */
}
