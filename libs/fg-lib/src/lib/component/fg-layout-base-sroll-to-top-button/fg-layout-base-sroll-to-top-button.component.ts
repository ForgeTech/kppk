import { ChangeDetectionStrategy, Component, Input, ViewContainerRef } from '@angular/core';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgLayoutBaseEventOptionsInterface } from '../fg-layout-base/fg-layout-base-event-options.interface';
import { FgLayoutBaseEvent } from '../fg-layout-base/fg-layout-base.event';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';
/**
 * FgLayoutTriggerButtonComponent -
 * Component that can be used to wrapp components that should
 * dispatch events to scroll to view-port position
 */
@Component({
  selector: 'fg-layout-base-sroll-to-top-button',
  templateUrl: './fg-layout-base-sroll-to-top-button.component.html',
  styleUrls: ['./fg-layout-base-sroll-to-top-button.component.scss'],
  standalone: true,
  imports: [FgCommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutBaseScrollToButtonComponent extends FgComponentBaseComponent {
  /** Allows to define the target layout of the scroll-to-top event (default: undefined)  */
  @Input() public name: undefined | string = undefined;
  /** Allows to define the position to scroll to on y-axis (default: undefined)  */
  @Input() public top: undefined | number = undefined;
  /** Allows to define the position to scroll to on x-axis (default: undefined)  */
  @Input() public left: undefined | number = undefined;
  /** Allows to modify scolling behaviour (default: auto)  */
  @Input() public behaviour: 'smooth' | 'auto' = 'auto';
  /** CONSTRUCTOR */
  constructor(public override $component: FgComponentBaseService, public $viewContainerRef: ViewContainerRef) {
   super();
  }
  /** Methode used to dispatch event for opening layout-drawer */
  public triggerScrollTo(event: Event) {
    event.preventDefault();
    const options: FgLayoutBaseEventOptionsInterface = {
      name: this.name,
      scrollTo: {
        top: this.top,
        left: this.left,
        behavior: this.behaviour,
      },
    };
    this.emitEvent(new FgLayoutBaseEvent(FgLayoutBaseEvent.SCROLL_TO, this, options));
  }
}
