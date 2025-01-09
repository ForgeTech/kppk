import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
/**
 * FgCanUnloadService -
 * Service to share a routed-components route-params
 * with other none-routed components
 */
@Injectable({
  providedIn: 'root',
})
export class FgCanUnloadService extends FgBaseService {
  /** Is used to dispatch angulars active-route via service */
  private CAN_UNLOAD$ = new BehaviorSubject<boolean>(true);
  /** Observable allowing to subscribe to route-param changes */
  public readonly canUnload$ = this.CAN_UNLOAD$.asObservable();
  set canOnload(setTo: boolean) {
    this.CAN_UNLOAD$.next(setTo);
  }
  get canOnload(): boolean {
    return this.CAN_UNLOAD$.getValue();
  }

  /** CONSTRUCTOR */
  constructor(public $global: FgGlobalService) {
    super()
    // this.subscribe(this.CAN_UNLOAD$, change => {
    //   console.log('CAN_UNLOAD_SERVICE');
    //   console.log('SetTo: ', this.canOnload);
    // });
    // const beforeUnloadListener = (event: any) => {
    //   event.preventDefault();
    //   console.log('UNLOAD_CALLED');
    //   return (event.returnValue = 'Are you sure you want to exit?');
    // };
    // addEventListener('beforeunload', beforeUnloadListener, { capture: true });
    // if (this.$global.isBrowser) {
    // const window = this.$global.nativeGlobal() as Window;
    // window.onbeforeunload = event => {
    //   // event.preventDefault();
    //   console.log('ADD_ONBEFORE_ONLOAD_EVENT');
    //   console.log('UNLOAD_CALLED');
    //   return false;
    // };
    // window.onbeforeunload = event => {
    //   console.log('UNLOAD_CALLED');
    //   return false;
    // };
    // }
  }
}
