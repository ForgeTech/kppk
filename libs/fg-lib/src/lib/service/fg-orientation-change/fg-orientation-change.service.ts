import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay, Subject } from 'rxjs';
import { FgBaseService } from '../../base/fg-base.service';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgOrientationChangeEvent } from './fg-orientation-change.event';
import { boundMethod } from 'autobind-decorator';
import { FgDetectDeviceTypeUserAgentService } from '../fg-detect-device-user-agent/fg-detect-device-user-agent.service';
import { DeviceInfo } from 'ngx-device-detector';

/** ENUM providing values available on ScreenOrientation.type */
export enum FgOrientationChangeTypeEnum {
  PORTRAIT_PRIMARY = 'portrait-primary',
  PORTRAIT_SECONDARY = 'portrait-secondary',
  LANDSCAPE_PRIMARY = 'landscape-primary',
  LANDSCAPE_SECONDARY = 'landscape-secondary',
}

export interface FgOrientationChangeInterface {
  mode: 'portrait' | 'landscape';
  type: FgOrientationChangeTypeEnum;
  angel: 0 | 90 | 180 | 270;
}

/**
 * FgOrientationChangeService -
 * Service to attach orientag-eventlistener to global window-object
 * if available and stream occurence of window-resize
 */
@Injectable({
  providedIn: 'root',
})
export class FgOrientationChangeService extends FgBaseService {
  protected $global = inject(FgGlobalService);
  protected $device = inject(FgDetectDeviceTypeUserAgentService);

  /** Hold global window-reference when available */
  protected WINDOW?: Window;
  /** Subject to stream window orientation */
  protected ORIENTATION$: Subject<FgOrientationChangeInterface> = new Subject();
  /** Listen to appearence of window resize-event */
  public orientation$: Observable<FgOrientationChangeInterface> = this.ORIENTATION$.asObservable().pipe(shareReplay(1));
  /** CONSTRUCTOR */
  constructor() {
    super()
    const $device = this.$device;

    if (this.$global.isBrowser) {
      this.WINDOW = this.$global.nativeGlobal<Window>();
      if (this.WINDOW.screen.orientation) {
        this.WINDOW.screen.orientation.addEventListener('change', this.orientationHandler);
      }
      // Setup for deprecated api
      // else if (this.WINDOW.orientation) {
      if (this.WINDOW.orientation) {
        this.WINDOW.addEventListener('orientationchange', this.deprecatedOrientationHandler);
      } else {
        this.$log.error('FgOrientationChangeService: Not supported - defaults are returned! ');
        this.dispatchDefault($device.detect());
      }
    } else {
      this.dispatchDefault($device.detect());
    }
  }
  /** Methode to simulate a matching result for deprecated api */
  // TODO: MAKE CONSISTENT WITH NEW API
  @boundMethod
  public deprecatedOrientationHandler(): void {
    const deviceInfo = this.$device.detect();
    const deviceType = deviceInfo.deviceType;
    if (this.WINDOW) {
      const angel = this.WINDOW.orientation as 0 | -90 | 90 | 180;
      const orientation: FgOrientationChangeInterface = {
        mode: this.getDepricatedMode(deviceType, angel),
        angel: this.getDepricatedAngel(deviceType, angel),
        type: this.getDepricatedType(deviceType, angel),
      };
      console.log('##################ORIENTATIGION_CHANGE_DEPRECATED');
      console.log(orientation);
      const eventToDispatch = new FgOrientationChangeEvent(FgOrientationChangeEvent.DETECTED, this, orientation);
      this.$event.emitEvent(eventToDispatch);
      this.ORIENTATION$.next(orientation);
    }
  }

  protected getDepricatedMode(deviceType: string, angel: 0 | -90 | 90 | 180): 'portrait' | 'landscape' {
    return 'landscape';
  }
  protected getDepricatedAngel(deviceType: string, angel: 0 | -90 | 90 | 180): 0 | 90 | 180 | 270 {
    return 0;
  }
  protected getDepricatedType(deviceType: string, angel: 0 | -90 | 90 | 180): FgOrientationChangeTypeEnum {
    return FgOrientationChangeTypeEnum.LANDSCAPE_PRIMARY;
  }
  /** Methode to create result for Screenorientation api
   * https://w3c.github.io/screen-orientation/#dom-screenorientation
   */
  @boundMethod
  public orientationHandler(): void {
    if (this.WINDOW) {
      const orientation: FgOrientationChangeInterface = {
        mode: this.WINDOW.screen.orientation.type.indexOf('portrait') !== -1 ? 'portrait' : 'landscape',
        angel: this.WINDOW.screen.orientation.angle as 0 | 90 | 180 | 270,
        type: this.WINDOW.screen.orientation.type as FgOrientationChangeTypeEnum,
      };
      console.log('##################ORIENTATIGION_CHANGE_NEW');
      console.log(orientation);
      const eventToDispatch = new FgOrientationChangeEvent(FgOrientationChangeEvent.DETECTED, this, orientation);
      this.$event.emitEvent(eventToDispatch);
      this.ORIENTATION$.next(orientation);
    }
  }
  /**
   * Methode to
   */
  public dispatchDefault(device: DeviceInfo): void {
    const orientation: FgOrientationChangeInterface = {
      // For desktop landscape for pads/mobile portrait
      mode: device.deviceType === 'desktop' ? 'landscape' : 'portrait',
      // Set as 0 from neutral orientation
      angel: 0,
      // For desktop landscape for pads/mobile portrait
      type:
        device.deviceType === 'desktop'
          ? FgOrientationChangeTypeEnum.LANDSCAPE_PRIMARY
          : FgOrientationChangeTypeEnum.PORTRAIT_PRIMARY,
    };
    const eventToDispatch = new FgOrientationChangeEvent(FgOrientationChangeEvent.DETECTED, this, orientation);
    this.$event.emitEvent(eventToDispatch);
    this.ORIENTATION$.next(orientation);
  }
}
