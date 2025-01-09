import { FgCommonModule, FgEvent, FgLanguageSwitchComponent, FgLayoutDrawerEvent, FgPwaInstallComponent, FgPwaInstallService } from '@fg-kppk/fg-base';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { KppkReactBaseComponent } from 'apps/fg-react-demo/src/app/base/xstate-base/kppk-react-base.component';
import { provideTranslocoScope } from '@jsverse/transloco';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';

/**
 * KppkReactNavigationComponent -
 * Sidebar navigation-component
 */
@Component({
  selector: '[kppk-react-navigation]',
  standalone: true,
  imports: [ 
    FgCommonModule,
    MatListModule,
    MatButtonModule,
    FgPwaInstallComponent,
    FgLanguageSwitchComponent,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './kppk-react-navigation.component.html',
  styleUrls: ['./kppk-react-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope( 'general' )
  ]
})
export class KppkReactNavigationComponent extends KppkReactBaseComponent {
  protected $pwa = inject( FgPwaInstallService );
  protected can_install_pwa_s = toSignal( this.$pwa.pwaDeferredPromtAvailable$, { initialValue: false } );
  protected is_authorized_s = computed( () => {
    return this.state_auth_s()?.matches( {'STATE': 'AUTHORIZED' })
  });
  protected logout( event: Event ) {
    event.preventDefault();
    this.actor_auth_s()?.send({ type: 'fg.auth.local.event.logout' } );
  }
}
