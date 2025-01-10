import { Injectable, inject } from '@angular/core';
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
  protected $global = inject(FgGlobalService);

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
}
