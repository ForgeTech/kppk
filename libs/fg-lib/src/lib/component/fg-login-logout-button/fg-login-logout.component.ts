import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgAuthService } from '../../service/fg-auth/fg-auth.service';
import { FgAuthEvent } from '../../service/fg-auth/fg-auth.event';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FgAuthTokenInterface } from '../../service/fg-auth/fg-auth.abstract.service';
/**
 * FgLayoutTriggerButtonComponent -
 * Component that can be used to wrapp components that should
 * dispatch events to scroll to view-port position
 */
@Component({
  selector: 'fg-login-logout',
  templateUrl: './fg-login-logout.component.html',
  styleUrls: ['./fg-login-logout.component.scss'],
  standalone: true,
  imports: [FgCommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLoginLogoutButton extends FgComponentBaseComponent {
  /** CONSTRUCTOR */
  constructor(
    public override $component: FgComponentBaseService,
    public $viewContainerRef: ViewContainerRef,
    public $auth: FgAuthService
  ) {
   super();
  }
  /** Methode used to dispatch event for opening layout-drawer */
  public triggerScrollTo(isAuthorized: FgAuthTokenInterface | false) {
    this.$component.$log.debug('IS_AUTHORIZED_BUTTON: ', isAuthorized);
    if (isAuthorized) {
      this.emitEvent(new FgAuthEvent(FgAuthEvent.LOGOUT, this));
    } else {
      this.emitEvent(new FgAuthEvent(FgAuthEvent.LOGIN, this));
    }
  }
}
