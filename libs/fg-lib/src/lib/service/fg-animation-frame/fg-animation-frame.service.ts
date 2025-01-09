import { Injectable, Optional } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subject } from 'rxjs';
import { filter, map, shareReplay, startWith, timestamp } from 'rxjs/operators';
import { FgBaseService } from '../../base';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgViewBaseComponent } from '../../base/fg-view-base.component';
import { FgAnimationFrameEvent } from './fg-animation-frame.event';
import { time } from 'console';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { boundMethod } from 'autobind-decorator';

/**
 * FgAnimationFrameService -
 * Service used to provide last active view-component
 */
@Injectable({
  providedIn: 'root',
})
export class FgAnimationFrameService extends FgBaseService {
  /** This subject is used to dispatch changes to the active-view */
  protected ANIMATION_FRAME$ = new Subject<DOMHighResTimeStamp>();
  /** Observable allowing to subscribe to active-view changes */
  public readonly animationFrame$ = this.ANIMATION_FRAME$.asObservable().pipe(
    filter((value, index) => value !== undefined && value % 20 === 0),
    startWith(this.requestAnimationFrame()),
    map(value => value as DOMHighResTimeStamp),
    shareReplay(1)
  );
  /** CONSTRUCTOR */
  constructor(
    protected $global: FgGlobalService,
  ) {
    super()
  }
  /** Methode used publish active-view */
  @boundMethod
  public requestAnimationFrame(timeStamp: DOMHighResTimeStamp = 0): void {
    if (this.$global.isBrowser) {
      this.ANIMATION_FRAME$.next(timeStamp);
      this.emitEvent(new FgAnimationFrameEvent(FgAnimationFrameEvent.UPDATE, this, timeStamp));
      this.$global.nativeGlobal<Window>().requestAnimationFrame(this.requestAnimationFrame);
      // this.requestAnimationFrame( timeStamp );
    }
  }
}
