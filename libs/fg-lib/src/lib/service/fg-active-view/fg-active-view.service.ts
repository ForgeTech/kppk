import { Injectable, Optional } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FgBaseService } from '../../base';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgViewBaseComponent } from './../../base/fg-view-base.component';
import { FgActiveViewEvent } from './fg-active-view.event';

/**
 * FgActiveViewService -
 * Service used to provide last active view-component
 */
@Injectable({
  providedIn: 'root',
})
export class FgActiveViewService extends FgBaseService {
  /** This subject is used to dispatch changes to the active-view */
  protected ACTIVE_VIEW$ = new Subject<FgViewBaseComponent>();
  /** Observable allowing to subscribe to active-view changes */
  public readonly activeView$ = this.ACTIVE_VIEW$.asObservable().pipe(map(value => value as FgViewBaseComponent));
  /** CONSTRUCTOR */
  constructor() {
    super()
  }
  /** Methode used publish active-view */
  public updateActiveView(view: FgViewBaseComponent): void {
    this.ACTIVE_VIEW$.next(view);
    this.emitEvent(new FgActiveViewEvent(FgActiveViewEvent.UPDATE, this, view));
  }
}
