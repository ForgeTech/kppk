import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FgAuthLocalMachineActorService,
  FgButtonBackNavigationComponent,
  FgButtonFormSubmitComponent,
  KppkFormlyModule,
} from '@kppk/react-lib';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';
import { FgTranslate } from '@kppk/fg-lib-new';
import { HOST_ROUTES } from '@kppk/react-lib';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  imports: [
    FgButtonBackNavigationComponent,
    FgButtonFormSubmitComponent,
    KppkFormlyModule,
    KppkReactViewAuthLayoutContentComponent,
  ],
  selector: 'kppk-react-view-auth-password-forgot',
  templateUrl: './kppk-react-view-auth-password-forgot.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthPasswordForgotComponent {
  protected HOST_ROUTES = HOST_ROUTES;
  protected $translate = inject(FgTranslate);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected translations$ = this.$translate.get_translations$({
    "headline_auth_password_forgot": "auth",
    "headline_sub_auth_password_forgot": "auth",
    "error_auth_password_forgot": "auth",
    "success_auth_password_forgot": "auth",
    "input_email_label": "auth",
    "label_back": "general",
    "label_send": "general",
  });
  protected translationsS = toSignal(
    this.translations$,
    { initialValue: undefined }
  );

  protected errorS = computed( () => {
    return false;
  })
  protected successS = computed( () => {
    return false;
  })
  protected pendingS = computed( () => {
    return false;
  })
  
  protected model = {};
  protected form = new FormGroup({});
  protected fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'string',
      },
      expressions: {
        'props.label': this.translations$.pipe(
          map((trans) => trans['input_email_label'])
        ),
      },
    }
  ];

  protected action(event?: Event) {
    event?.preventDefault();
    // const event_to_dispatch = {
    //   type: 'fg.auth.local.event.login' as const,
    //   data: this.form.value as { user: string; password: string },
    // };
    // this.$auth_actor.send(event_to_dispatch);
  }
}
