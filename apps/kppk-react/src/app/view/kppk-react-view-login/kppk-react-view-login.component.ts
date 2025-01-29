import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  FgEnvironmentService,
  FgLayoutDefaultComponent,
} from '@kppk/fg-lib-new';
import {
  FgAuthLocalMachineActorService,
  KppkAdminToolbarComponent,
  KppkFormlyModule,
  KppkReactSharedService,
} from '@kppk/react-lib';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  FgLanguageSwitchComponent,
  FgPwaInstallComponent,
} from '@kppk/fg-lib-new';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    CommonModule,
    FgLanguageSwitchComponent,
    FgLayoutDefaultComponent,
    FgPwaInstallComponent,
    KppkAdminToolbarComponent,
    KppkFormlyModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatProgressBarModule,
    RouterModule,
  ],
  selector: 'kppk-react-view-login',
  templateUrl: './kppk-react-view-login.component.html',
  styleUrl: './kppk-react-view-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewLoginComponent {
  protected $translate = inject(TranslocoService);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected $env = inject(FgEnvironmentService);
  protected $shared = inject(KppkReactSharedService);
  protected kppk_react_login_translationsS = toSignal(
    this.$shared.kppk_react_login_translations$,
    { initialValue: undefined }
  );

  protected form_login = new FormGroup({});
  protected fields_login = [
    {
      key: 'user',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'string',
      },
      expressions: {
        'props.label': this.$shared.kppk_react_login_translations$.pipe(
          map((trans) => trans['input_user_label'])
        ),
      },
    },
    {
      key: 'password',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'password',
      },
      expressions: {
        'props.label': this.$shared.kppk_react_login_translations$.pipe(
          map((trans) => trans['input_password_label'])
        ),
      },
    },
  ];

  protected login(event?: Event) {
    event?.preventDefault();
    const event_to_dispatch = {
      type: 'fg.auth.local.event.login' as const,
      payload: this.form_login.value as { user: string; password: string },
    };
    this.$auth_actor.send(event_to_dispatch);
  }
}
