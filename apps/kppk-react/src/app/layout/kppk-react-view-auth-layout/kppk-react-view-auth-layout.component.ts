import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  FgEnvironmentService,
  FgLayoutDefaultComponent,
  FgTranslate,
} from '@kppk/fg-lib-new';
import {
  FgAuthLocalMachineActorService,
  KppkAdminToolbarComponent,
  KppkFormlyModule,
} from '@kppk/react-lib';
import {
  FgLanguageSwitchComponent,
} from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    CommonModule,
    FgLanguageSwitchComponent,
    FgLayoutDefaultComponent,
    KppkAdminToolbarComponent,
    KppkFormlyModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  selector: 'kppk-react-view-auth-layout',
  templateUrl: './kppk-react-view-auth-layout.component.html',
  styleUrl: './kppk-react-view-auth-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthLayoutComponent {
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected $translate = inject(FgTranslate);
  protected $env = inject(FgEnvironmentService);
  protected ROUTES = HOST_ROUTES;
  protected kppk_react_auth_layout_translationsS = toSignal(
    this.$translate.get_translations$({
      alt_kppk_logo: 'general',
      label_version: 'general',
      route_data_protection: 'route',
      route_imprint: 'route',
    }),
    { initialValue: undefined }
  );
  protected versionS = signal(this.$env.version);
  protected admin_toolbar_showS = computed( () => {
    const user_is_admin = this.$actor_auth.stateS()?.context.auth_cookie?.profile.admin;
    const result = this.$env.development?.enabled || user_is_admin ? true : false;
    return result;
  });
}
