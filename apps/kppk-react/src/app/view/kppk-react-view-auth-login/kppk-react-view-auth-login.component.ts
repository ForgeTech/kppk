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
} from '@kppk/fg-lib-new';
import {
  EventFgAuthLocalLoginParser,
  FgAuthLocalMachineActorService,
  KppkFormlyModule,
  KppkReactSharedService,
} from '@kppk/react-lib';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  FgPwaInstallComponent,
} from '@kppk/fg-lib-new';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';

@Component({
  imports: [
    CommonModule,
    FgPwaInstallComponent,
    KppkFormlyModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatProgressBarModule,
    RouterModule,
  ],
  selector: 'kppk-react-view-auth-login',
  templateUrl: './kppk-react-view-auth-login.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewLoginComponent {
  protected $translate = inject(TranslocoService);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected $env = inject(FgEnvironmentService);
  protected $shared = inject(KppkReactSharedService);
  
  protected HOST_ROUTES = HOST_ROUTES;
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
    const event_to_dispatch = EventFgAuthLocalLoginParser.parse({
      type: 'fg.auth.local.event.login',
      payload: this.form_login.value as { user: string; password: string },
    });
    this.$auth_actor.send(event_to_dispatch);
  };
}
