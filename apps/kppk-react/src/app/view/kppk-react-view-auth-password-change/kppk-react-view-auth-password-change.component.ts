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
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';
import { FgTranslate } from '@kppk/fg-lib-new';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  imports: [
    FgButtonBackNavigationComponent,
    FgButtonFormSubmitComponent,
    KppkFormlyModule,
    KppkReactViewAuthLayoutContentComponent,
  ],
  selector: 'kppk-react-view-auth-password-change',
  templateUrl: './kppk-react-view-auth-password-change.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthPasswordChangeComponent {
  protected HOST_ROUTES = HOST_ROUTES;
  protected $translate = inject(FgTranslate);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected translations$ = this.$translate.get_translations$({
    "error_auth_password_change": 'auth',
    "headline_auth_password_change": 'auth',
    "headline_sub_auth_password_change": 'auth',
    "input_password_confirm_label": 'auth',
    "input_password_new_label": 'auth',
    "input_password_old_label": 'auth',
    "label_back": "general",
    "label_send": "general",
    "success_auth_password_change": 'auth',
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
  // protected translationsS = toSignal(
  //   this.$shared.kppk_react_change_password_translations$,
  //   { initialValue: undefined }
  // );
  protected fields: FormlyFieldConfig[] = [
    {
      key: 'password_old',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'string',
      },
      expressions: {
        'props.label': this.translations$.pipe(
          map((trans) => trans['input_password_old_label'])
        ),
      },
    },
    {
      key: 'password_new',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'password',
      },
      expressions: {
        'props.label': this.translations$.pipe(
          map((trans) => trans['input_password_new_label'])
        ),
      },
    },
    {
      key: 'password_confirm',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'password',
      },
      expressions: {
        'props.label': this.translations$.pipe(
          map((trans) => trans['input_password_confirm_label'])
        ),
      },
    },
  ];

  protected action(event?: Event) {
    // event?.preventDefault();
    // const event_to_dispatch = {
    //   type: 'fg.password_change.event.' as const,
    //   payload: this.form.value
    // };
    // this.$auth_actor.send(event_to_dispatch);
  }
}
