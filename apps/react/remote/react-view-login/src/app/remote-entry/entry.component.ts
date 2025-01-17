import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FgLayoutDefaultComponent } from '@kppk/fg-lib-new';

@Component({
  imports: [
    CommonModule, 
    FormlyModule, 
    MatCardModule, 
    MatButtonModule,
    RouterModule,
    MatIcon,
    ReactiveFormsModule,
    FgLayoutDefaultComponent,
  ],
  selector: 'kppk-react-view-login',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
    protected $translate = inject(TranslocoService);

    protected versionS = signal('X.X.X');
    // protected pending_s = computed( () => {
    //   const result = this.state_auth_s()?.matches({'STATE': { "UNAUTHORIZED": "AUTHORIZATION"}});
    //   return result;
    // });
    // protected error_s = computed( () => {
    //   const result = this.state_auth_s()?.matches({'STATE': { "UNAUTHORIZED": "ERROR"}});
    //   return result;
    // });
    // protected success_s = computed( () => {
    //   const result = this.state_auth_s()?.matches({'STATE': "AUTHORIZED"});
    //   return result;
    // });
  
    public form_login = new FormGroup({});
    
    public fields_login = [
      {
        key: 'user',
        type: 'input',
        wrappers: [ 'form-field'],
        defaultValue: "",
        props: {
          label: this.$translate.translate('login.user-input-label'),
          required: true,
          type: 'string',
        },
        expressions: {
          'props.label': this.$translate.selectTranslate('user-input-label', {}, 'login')
        }
      },
      {
        key: 'password',
        type: 'input',
        wrappers: ['form-field'],
        defaultValue: "",
        props: {
          label: this.$translate.translate('login.password-input-label'),
          required: true,
          type: 'password',
        },
        expressions: {
          'props.label': this.$translate.selectTranslate('password-input-label', {}, 'login')
        }
      },
    ];

    public login( event?: Event ) {
      event?.preventDefault();
      const event_to_dispatch = { 
        type: 'fg.auth.local.event.login' as const, 
        payload: this.form_login.value as { user: string, password: string }
      };
      console.log( event_to_dispatch );
      // this.actor_auth_s()?.send(event_to_dispatch);
    };
}
