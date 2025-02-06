import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FgEnvironmentService,
} from '@kppk/fg-lib-new';
import {
  FG_AUTH_LOCAL_CREDENTIALS,
  fg_auth_local_event_login_parser,
  FgAuthLocalMachineActorService,
  KppkFormlyModule,
  KppkReactSharedService,
} from '@kppk/react-lib';
import {
  FgPwaInstallComponent,
} from '@kppk/fg-lib-new';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';

@Component({
  imports: [
    CommonModule,
    FgPwaInstallComponent,
    KppkFormlyModule,
    MatButtonModule,
    MatIconModule,
    KppkReactViewAuthLayoutContentComponent
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
  protected translationsS = toSignal(
    this.$shared.kppk_react_login_translations$,
    { initialValue: undefined }
  );

  protected form = new FormGroup({});
  protected model = {};
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

  protected action(event?: Event) {
    event?.preventDefault();
    const event_to_dispatch = fg_auth_local_event_login_parser.parse({
      type: 'fg.auth.local.event.login',
      data: this.form.value,
    });
    this.$auth_actor.send(event_to_dispatch);
  };
}
