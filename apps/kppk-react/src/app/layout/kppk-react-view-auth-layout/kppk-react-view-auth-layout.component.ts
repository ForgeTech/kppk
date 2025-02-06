import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  FgLayoutDefaultComponent,
  FgTranslate,
} from '@kppk/fg-lib-new';
import {
  KppkAdminToolbarComponent,
  KppkFormlyModule,
  KppkReactSharedService,
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
  protected $translate = inject(FgTranslate);
  protected $shared = inject(KppkReactSharedService);
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
}
