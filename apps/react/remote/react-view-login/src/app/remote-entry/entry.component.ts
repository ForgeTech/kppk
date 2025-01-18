import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FgEnvironmentService, FgLayoutDefaultComponent } from '@kppk/fg-lib-new';
import { KppkAuthLocalActorService, KppkFormlyModule } from '@kppk/react-lib';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FgLanguageSwitchComponent, FgPwaInstallComponent } from '@kppk/fg-lib-new';

@Component({
  imports: [
    CommonModule, 
    FgLanguageSwitchComponent,
    FgLayoutDefaultComponent,
    FgPwaInstallComponent,
    KppkFormlyModule,
    MatButtonModule,
    MatCardModule, 
    MatIcon,
    MatProgressBarModule,
    RouterModule,
  ],
  selector: 'kppk-react-view-login',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {
    protected $translate = inject(TranslocoService);
    protected $auth_local = inject(KppkAuthLocalActorService);
    protected $env = inject(FgEnvironmentService);

    protected versionS = signal('X.X.X');
    protected pending_s = computed( () => {
      const result = this.$auth_local.stateS()?.matches({'STATE': { "UNAUTHORIZED": "AUTHORIZATION"}});
      return result;
    });
    protected error_s = computed( () => {
      const result = this.$auth_local.stateS()?.matches({'STATE': { "UNAUTHORIZED": "ERROR"}});
      return result;
    });
    protected success_s = computed( () => {
      const result = this.$auth_local.stateS()?.matches({'STATE': "AUTHORIZED"});
      return result;
    });
  
    public form_login = new FormGroup({});
    
    public fields_login = [
      {
        key: 'user',
        type: 'input',
        wrappers: [ 'form-field'],
        defaultValue: "",
        props: {
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
