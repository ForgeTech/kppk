import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FgTranslate,
} from '@kppk/fg-lib-new';
import {
  FG_AUTH_EVENT_LOGIN,
  fg_auth_event_login_parser,
  FgAuthLocalMachineActorService,
  FgButtonFormSubmitComponent,
  KppkFormlyModule,
} from '@kppk/react-lib';
import {
  FgPwaInstallComponent,
} from '@kppk/fg-lib-new';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  imports: [
    FgButtonFormSubmitComponent,
    FgPwaInstallComponent,
    KppkFormlyModule,
    KppkReactViewAuthLayoutContentComponent,
  ],
  selector: 'kppk-react-view-auth-login',
  templateUrl: './kppk-react-view-auth-login.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthLoginComponent {
  protected HOST_ROUTES = HOST_ROUTES;
  protected $translate = inject(FgTranslate);
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected translations$ = this.$translate.get_translations$({
    "alt_react_logo": 'general',
    "error_auth_login": "auth",
    "headline_auth_login": "auth",
    "input_password_label": 'auth',
    "input_user_label": 'auth',
    "label_go_to_account_create": "auth",
    "label_go_to_password_forgot": "auth",
    "label_install": 'pwa',
    "label_login": 'auth',
    "success_auth_login": "auth",
    "text_auth_logout_error": "auth",
    "text_auth_logout_pending": "auth",
    "text_auth_logout_success": "auth",
    "tooltip_install": 'pwa',
  });
  protected translationsS = toSignal(
    this.translations$,
    { initialValue: undefined }
  );

  // protected errorS = computed( () => {
  //   const result = this.$actor_auth.stateS()?.matches({ 'STATE': { 'UNAUTHORIZED': 'ERROR' }});
  //   return result;
  // })
  protected errorS = toSignal(this.$actor_auth.state$.pipe(
    map( snapshot => {
      return snapshot.matches({ 'STATE': { 'UNAUTHORIZED': 'ERROR' }});
    })
  ), { initialValue: false });
  protected successS = toSignal(this.$actor_auth.state$.pipe(
    map( snapshot => {
      return snapshot.matches({ 'STATE': 'AUTHORIZED' });
    })
  ), { initialValue: false });
  // protected successS = computed( () => {
  //   const result = this.$actor_auth.stateS()?.matches({ 'STATE': 'AUTHORIZED' });
  //   return result;
  // })
  protected pendingS = toSignal(this.$actor_auth.state$.pipe(
    map( snapshot => {
      return snapshot.matches({'STATE': {'UNAUTHORIZED': 'AUTHORIZATION'}})
    })
  ), { initialValue: false });
  // protected pendingS = computed( () => {
  //   const result = this.$actor_auth
  //   .stateS()
  //   ?.matches({'STATE': {'UNAUTHORIZED': 'AUTHORIZATION'}});
  //   return result;
  // })
  
  protected model = {};
  protected form = new FormGroup({});
  protected fields: FormlyFieldConfig[] = [
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
        'props.label': this.translations$.pipe(
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
        'props.label': this.translations$.pipe(
          map((trans) => trans['input_password_label'])
        ),
      },
    },
  ];

  protected action(event?: Event) {
    event?.preventDefault();
    const event_to_dispatch = fg_auth_event_login_parser.parse({
      type: 'fg.auth.event.login',
      data: this.form.value,
    } as FG_AUTH_EVENT_LOGIN);
    this.$actor_auth.send(event_to_dispatch);
  };
}
