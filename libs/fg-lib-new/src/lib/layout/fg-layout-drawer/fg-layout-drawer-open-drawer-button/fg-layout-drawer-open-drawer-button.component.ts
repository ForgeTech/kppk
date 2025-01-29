import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, TemplateRef, ViewContainerRef, ChangeDetectionStrategy, inject } from '@angular/core';
import { FgLayoutDrawerOpenDrawerOptionsInterface } from '../fg-layout-drawer/fg-layout-drawer-open-drawer-options.interface';
import { FgLayoutDrawerEvent } from '../fg-layout-drawer/fg-layout-drawer.event';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
/**
 * FgLayoutTriggerButtonComponent -
 * Component that can be used to
 */
@Component({
  selector: 'fg-layout-drawer-open-drawer-button',
  templateUrl: './fg-layout-drawer-open-drawer-button.component.html',
  styleUrls: ['./fg-layout-drawer-open-drawer-button.component.scss'],
  standalone: true,
  imports: [FgCommonModule, MatTooltipModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerOpenDrawerButtonComponent {
  protected $viewContainerRef = inject(ViewContainerRef);

  /** Allows to change the direction from which the navigation is opened from
   * (default: 'start')
   */
  @Input() public position: 'start' | 'end' = 'start';
  /** Allows to define the target layout of the open-drawer event (default: undefined)  */
  @Input() public target: undefined | string = undefined;
  /** Allows to change the mode of the drawer (default: 'over') */
  @Input() public mode: 'over' | 'push' | 'side' = 'over';
  /** Allows to change if drawer should display a backdrop (default: true) */
  @Input() public hasBackdrop = true;
  /** Allows to pass the component- or template-reference that should be displayed */
  @Input() public viewRef: ComponentType<any> | TemplateRef<any> | undefined = undefined;
  /** Methode used to trigger the dispatch of open drawer event */
  public triggerDrawerOpen(event: Event) {
    event.preventDefault();
    if (this.viewRef) {
      const options: FgLayoutDrawerOpenDrawerOptionsInterface = {
        position: this.position,
        mode: this.mode,
        hasBackdrop: this.hasBackdrop,
        target: this.target,
      };
      if (this.viewRef instanceof TemplateRef) {
        options.portalContent = new TemplatePortal(this.viewRef, this.$viewContainerRef);
      } else {
        options.portalContent = new ComponentPortal(this.viewRef);
      }
      this.emitEvent(new FgLayoutDrawerEvent(FgLayoutDrawerEvent.OPEN_DRAWER, this, options));
    } else {
      this.$component.$log.error('ERROR: viewRef-Input not set but required!');
    }
  }
}
