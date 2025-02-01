import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
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
  selector: 'kppk-react-view-auth-password-forgot',
  templateUrl: './kppk-react-view-auth-password-forgot.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthPasswordForgotComponent {
  protected $translate = inject(TranslocoService);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected $shared = inject(KppkReactSharedService);

  protected translationsS = toSignal(
    this.$shared.kppk_react_login_translations$,
    { initialValue: undefined }
  );

  protected model = new FormGroup({});
  protected form = new FormGroup({});
  protected fields = [
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
    }
  ];

  protected action(event?: Event) {
    event?.preventDefault();
    const event_to_dispatch = {
      type: 'fg.auth.local.event.login' as const,
      payload: this.form.value as { user: string; password: string },
    };
    this.$auth_actor.send(event_to_dispatch);
  }
}
