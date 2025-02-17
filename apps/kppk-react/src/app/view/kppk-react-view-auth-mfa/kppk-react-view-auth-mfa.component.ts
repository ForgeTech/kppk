import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FgAuthLocalMachineActorService,
  KppkFormlyModule,
} from '@kppk/react-lib';
import {
  FgTranslate,
} from '@kppk/fg-lib-new';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  imports: [
    CommonModule,
    KppkFormlyModule,
    MatButtonModule,
    MatIconModule,
    KppkReactViewAuthLayoutContentComponent
  ],
  selector: 'kppk-react-view-auth-mfa',
  templateUrl: './kppk-react-view-auth-mfa.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthMfaComponent {
  protected $translate = inject(FgTranslate);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  
  protected HOST_ROUTES = HOST_ROUTES;
  protected translations$ = this.$translate.get_translations$({
    "error_auth_mfa": "auth",
    "headline_auth_mfa": "auth",
    "input_mfa_code_label": "auth",
    "label_back": "general",
    "label_send": "general",
    "success_auth_mfa": "auth",
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
      key: 'mfa_code',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: '',
      props: {
        required: true,
        type: 'string',
      },
      expressions: {
        'props.label': this.translations$.pipe(
          map((trans) => trans['input_mfa_code_label'])
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
