import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgLayoutDrawerEvent } from '../fg-layout-drawer/fg-layout-drawer.event';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
/**
 * FgLayoutDrawerCloseDrawerButtonComponent -
 * Component that can be used to dispatch a close-drawer event
 */
@Component({
  selector: 'fg-layout-drawer-close-drawer-button',
  templateUrl: './fg-layout-drawer-close-drawer-button.component.html',
  styleUrls: ['./fg-layout-drawer-close-drawer-button.component.scss'],
  standalone: true,
  imports: [FgCommonModule, MatTooltipModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerCloseDrawerButtonComponent extends FgComponentBaseComponent {
  override $component = inject(FgComponentBaseService);

  /** Allows to define the target layout of the open-drawer event (default: undefined)  */
  @Input() public target: undefined | string = undefined;
  /** Methode used to trigger the dispatch of close drawer event */
  public triggerDrawerOpen(event: Event) {
    event.preventDefault();
    this.emitEvent(new FgLayoutDrawerEvent(FgLayoutDrawerEvent.CLOSE_DRAWER, this, false));
  }
}
