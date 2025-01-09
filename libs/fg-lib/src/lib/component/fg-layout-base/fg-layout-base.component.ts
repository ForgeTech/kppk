import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FgComponentBaseComponent, FgComponentBaseService } from '../../base';
import { filter, Observable } from 'rxjs';
import { FgLayoutBaseEvent } from './fg-layout-base.event';

@Component({
  selector: 'fg-layout-base',
  templateUrl: './fg-layout-base.component.html',
  styleUrls: ['./fg-layout-base.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutBaseComponent extends FgComponentBaseComponent {
  /** Allows setting a name for the layout-component so it can be specifically
   * targeted by events in case there might be multiple instances of a layout
   * present */
  @Input() public name: string | undefined;
  /** CONSTRUCTOR */
  constructor() {
   super();
    // Define observable for scroll to top events
    const scrollToTopEvent$ = this.$component.event$.pipe(
      filter(event => event.signature === FgLayoutBaseEvent.SCROLL_TO)
    ) as Observable<FgLayoutBaseEvent>;
    //
    this.subscribe(scrollToTopEvent$, event => {
      if (event.data && event.data.scrollTo) {
        if (event.data.name === this.name) {
          this.scrollTo(event.data.scrollTo);
        }
      } else {
        this.$component.$log.error(`FgLayoutBaseComponent: Error: Received scroll-to event didn't contain valid options!`);
      }
    });
  }
  /** Methode implementing basic layout-scrolling in browser */
  public scrollTo(options: ScrollToOptions) {
    if (this.$component.$global.isBrowser) {
      const window: Window = this.$component.$global.nativeGlobal<Window>();
      window.scrollTo(options);
    }
  }
}
