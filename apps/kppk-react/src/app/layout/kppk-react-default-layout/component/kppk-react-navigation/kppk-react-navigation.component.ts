import {
  FgEnvironmentService,
  FgLanguageSwitchComponent,
  FgPwaInstallComponent,
  FgPwaInstallService,
  FgTranslate,
} from '@kppk/fg-lib-new';
import { MatIconModule } from '@angular/material/icon';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FgAuthLocalMachineActorService,
} from '@kppk/react-lib';
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
    RouterModule,
  ],
  templateUrl: './kppk-react-navigation.component.html',
  styleUrls: ['./kppk-react-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactNavigationComponent {
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected $env = inject(FgEnvironmentService);
  protected $pwa = inject(FgPwaInstallService);
  protected $translate = inject(FgTranslate);

  protected translationsS = toSignal(
    this.$translate.get_translations$({
      "tooltip_install": "home",
      "label_install": "pwa",
      "route_home": "route",
      "label_manual": "general",
      "label_calculation_start": "general",
      "route_login": "route",
      "route_imprint": "route",
      "route_data_protection": "route",
      "label_logout": "general",
    }),
    { initialValue: undefined }
  );

  protected auth_is_authorizedS = computed(() => {
    return this.$actor_auth.stateS()?.matches({ STATE: 'AUTHORIZED' }) ?? false;
  }); 

  protected HOST_ROUTES = HOST_ROUTES;

  protected can_install_pwaS = toSignal(
    this.$pwa.pwa_deferred_promt_available$,
    { initialValue: false }
  );
}
