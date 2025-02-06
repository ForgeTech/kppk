import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FgAuthLocalMachineActorService,
  KppkFormlyModule,
  KppkReactSharedService,
} from '@kppk/react-lib';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';

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
  protected $translate = inject(TranslocoService);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected $shared = inject(KppkReactSharedService);
  
  protected HOST_ROUTES = HOST_ROUTES;
  protected translationsS = toSignal(
    this.$shared.kppk_react_change_password_translations$,
    { initialValue: undefined }
  );

  
  protected model = {};
  protected form = new FormGroup({});
  protected fields = [
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
        'props.label': this.$shared.kppk_react_change_password_translations$.pipe(
          map((trans) => trans['input_password_old'])
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
        'props.label': this.$shared.kppk_react_change_password_translations$.pipe(
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
        'props.label': this.$shared.kppk_react_change_password_translations$.pipe(
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
