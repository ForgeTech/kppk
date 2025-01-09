import { Injectable, InjectionToken, inject } from '@angular/core';
import { shareReplay, startWith, Subject } from 'rxjs';
import { FgDetectDeviceTypeUserAgentEvent } from './fg-detect-device-user-agent.event';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgBaseService } from '../../base/fg-base.service';


export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');


/**
 * FgDetectDeviceTypeUserAgentService -
 * Service to detect if device it mobile/tablet/desktop based
 * on browsers user-agent
 * Base on answer https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 * an http://detectmobilebrowsers.com/
 * CAUTION! UserAgent can be faked so this is not relaiable - use feature testing for
 * critical applications.
 */
@Injectable({
  providedIn: 'root',
})
export class FgDetectDeviceTypeUserAgentService extends FgBaseService {
  protected $global = inject(FgGlobalService);
  protected $detect = inject(DeviceDetectorService);
  protected request = inject<Request>(REQUEST, { optional: true });

  /** Used to push current device-info state */
  protected DEVICE_INFO$ = new Subject<DeviceInfo>();
  /** Provides access to detected device-info */
  public readonly deviceInfo$ = this.DEVICE_INFO$.asObservable().pipe(startWith(this.detect()), shareReplay(1));
  /** CONSTRUCTOR */
  constructor() {
    super()
    const request = this.request;

    if (this.$global.isBrowser) {
      this?.$log.info('FgDetectDeviceTypeUserAgentService: Runs in browser!');
    } else {
      this?.$log.info('FgDetectDeviceTypeUserAgentService: Runs on server!');
      if (request === null) {
        const error = 'FgDetectDeviceTypeUserAgentService: Requires provider for @nguniversal/express-engine REQUEST token!';
        if (this.$log) {
          this?.$log.error(error);
        } else {
          throw error;
        }
      }
    }
  }
  /**
   * Detects device information based on provided user-agent-string
   * @param userAgent (Optional) user-agent
   * @returns
   */
  public detect(userAgent?: string): DeviceInfo {
    if (userAgent) {
      this.$detect.setDeviceInfo(userAgent);
    }
    const deviceInfo = this.$detect.getDeviceInfo();
    this.DEVICE_INFO$.next(deviceInfo);
    this.emitEvent(new FgDetectDeviceTypeUserAgentEvent(FgDetectDeviceTypeUserAgentEvent.DETECTED, this, deviceInfo));
    return deviceInfo;
  }
}
