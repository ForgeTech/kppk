import { ElementRef, Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subject } from 'rxjs';
import { FgBaseService } from '../../base/fg-base.service';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgResizeEvent } from './fg-resize-event.event';

/**
 * FgResizeEventService -
 * Service to attach resize-eventlistener to global window-object
 * if available and stream occurence of window-resize
 */
@Injectable({
  providedIn: 'root',
})
export class FgResizeEventService extends FgBaseService {
  $global = inject(FgGlobalService);
  override $event = inject(FgEventService);
  override $log = inject(NGXLogger);

  /** Hold global window-reference when available */
  protected WINDOW: Window;
  /** Hold last resize change-data */
  protected DATA: {
    height: number;
    width: number;
  };
  /** Subject to stream resize-events dispatched on global-window object */
  protected RESIZE_EVENT$: Subject<FgResizeEvent> = new Subject();
  /** Listen to appearence of window resize-event */
  public resize$: Observable<FgResizeEvent> = this.RESIZE_EVENT$.asObservable();
  /** Subject to stream horizontal resize-events dispatched on global-window object */
  protected HORIZONTAL_RESIZE_EVENT$: Subject<FgResizeEvent> = new Subject();
  /** Listen to appearence of horizontal window resize-event */
  public horizontalResize$: Observable<FgResizeEvent> = this.RESIZE_EVENT$.asObservable();
  /** Subject to stream resize-events dispatched on global-window object */
  protected VERTICAL_RESIZE_EVENT$: Subject<FgResizeEvent> = new Subject();
  /** Listen to appearence of window resize-event */
  public verticalResize$: Observable<FgResizeEvent> = this.RESIZE_EVENT$.asObservable();
  /** CONSTRUCTOR */
  constructor() {
    super()
    if (this.$global.isBrowser) {
      this.WINDOW = this.$global.nativeGlobal<Window>();
      this.WINDOW.addEventListener('resize', this.dispatchEvent.bind(this));
    }
  }
  /** Methode to dispatch resize-event */
  public dispatchEvent(): void {
    const data = {
      height: this.WINDOW.innerHeight,
      width: this.WINDOW.innerWidth,
    };
    if (this.DATA?.width !== data.width || this.DATA?.height !== data.height) {
      this.DATA = data;
      const event = new FgResizeEvent(FgResizeEvent.RESIZE, this, data);
      this.$event.emitEvent(event);
      this.RESIZE_EVENT$.next(event);
      if (this.DATA?.width !== data.width) {
        const horzEvent = new FgResizeEvent(FgResizeEvent.HORIZONTAL_RESIZE, this, data);
        this.$event.emitEvent(horzEvent);
        this.RESIZE_EVENT$.next(horzEvent);
      }
      if (this.DATA?.height !== data.height) {
        const vertEvent = new FgResizeEvent(FgResizeEvent.VERTICAL_RESIZE, this, data);
        this.$event.emitEvent(vertEvent);
        this.RESIZE_EVENT$.next(vertEvent);
      }
    }
  }
}
