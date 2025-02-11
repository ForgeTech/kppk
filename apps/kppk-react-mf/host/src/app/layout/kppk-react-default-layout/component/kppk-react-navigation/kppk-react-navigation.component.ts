import { FgEnvironmentService, FgLanguageSwitchComponent, FgPwaInstallComponent, FgPwaInstallService, FgTranslate } from '@kppk/fg-lib-new';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FgAuthLocalMachineActorService, KppkReactSharedService } from '@kppk/react-lib';
import { HOST_ROUTES } from '@kppk/react-lib';
/**
 * KppkReactNavigationComponent -
 * Sidebar navigation-component
 */
@Component({
  selector: 'kppk-react-navigation, [kppk-react-navigation]',
  imports: [ 
    CommonModule,
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
})
export class KppkReactNavigationComponent  {
  protected $auth_local = inject(FgAuthLocalMachineActorService);
  protected $env = inject(FgEnvironmentService);
  protected $pwa = inject(FgPwaInstallService);
  protected $translate = inject(FgTranslate);

  protected translationsS = toSignal(this.$translate.get_translations$({
    "tooltip_install": "general",
    "label_install": "general",
    "route_home": "general",
    "label_manual": "general",
    "label_calculation_start": "general",
    "route_login": "general",
    "route_imprint": "general",
    "route_data_protection": "general",
    "logout": "general",
  }), { initialValue: undefined})

  protected HOST_ROUTES = HOST_ROUTES;

  protected can_install_pwaS = toSignal( this.$pwa.pwa_deferred_promt_available$, { initialValue: false } );
}
