import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FgAuthLocalMachineActorService,
  KppkFormlyModule,
} from '@kppk/react-lib';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  imports: [
    CommonModule,
    KppkFormlyModule,
    MatButtonModule,
    MatIconModule,
    KppkReactViewAuthLayoutContentComponent
  ],
  selector: 'kppk-react-view-auth-password-reset',
  templateUrl: './kppk-react-view-auth-password-reset.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewPasswordChangeComponent {
  protected HOST_ROUTES = HOST_ROUTES;
  protected $translate = inject(FgTranslate);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected translations$ = this.$translate.get_translations$({
    "headline_auth_password_reset": "auth",
    "error_auth_password_reset": "auth",
    "success_auth_password_reset": "auth",
    "input_password_reset_code": "auth",
    "input_password_new": "auth",
    "input_password_confirm": "auth",
    "input_email": "auth",
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
  protected fields = [
    {
      key: 'password_reset_code',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'string',
      },
      expressions: {
        'props.label': this.translations$.pipe(
          map((trans) => trans['input_password_reset_code'])
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
          map((trans) => trans['input_password_new'])
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
          map((trans) => trans['input_password_confirm'])
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
