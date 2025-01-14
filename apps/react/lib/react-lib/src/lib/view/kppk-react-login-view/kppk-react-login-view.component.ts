import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed } from '@angular/core';
import { FgCommonModule, FgLanguageSwitchComponent, FgMaterialModule, FgMessageBoxComponent, FgPwaInstallComponent } from '@kppk/fg-lib-new';
import { FgLayoutDefaultComponent } from '@kppk/fg-lib-new';
import { RouterModule } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';
import { KppkFormlyModule } from '../../module/kppk-formly-form/kppk-formly.module';
import { provideTranslocoScope } from '@jsverse/transloco';
import { KppkAdminToolbarComponent } from '../../component/kppk-admin-toolbar/kppk-admin-toolbar.component';


@Component({
  selector: 'kppk-react-login-view',
  
  imports: [ 
    FgCommonModule, 
    FgMaterialModule,
    KppkFormlyModule,
    RouterModule,
    FgLanguageSwitchComponent,
    FgLayoutDefaultComponent,
    FgPwaInstallComponent,
    FgMessageBoxComponent,
    KppkAdminToolbarComponent,
  ],
  templateUrl: './kppk-react-login-view.component.html',
  styleUrl: './kppk-react-login-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('general', 'login')
  ]
})
export class KppkReactLoginViewComponent  {
  
  protected pending_s = computed( () => {
    const result = this.state_auth_s()?.matches({'STATE': { "UNAUTHORIZED": "AUTHORIZATION"}});
    return result;
  });
  protected error_s = computed( () => {
    const result = this.state_auth_s()?.matches({'STATE': { "UNAUTHORIZED": "ERROR"}});
    return result;
  });
  protected success_s = computed( () => {
    const result = this.state_auth_s()?.matches({'STATE': "AUTHORIZED"});
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
        label: this.$component.$translate.translate('login.user-input-label'),
        required: true,
        type: 'string',
      },
      expressions: {
        'props.label': this.$component.$translate.selectTranslate('user-input-label', {}, 'login')
      }
    },
    {
      key: 'password',
      type: 'input',
      wrappers: ['form-field'],
      defaultValue: "",
      props: {
        label: this.$component.$translate.translate('login.password-input-label'),
        required: true,
        type: 'password',
      },
      expressions: {
        'props.label': this.$component.$translate.selectTranslate('password-input-label', {}, 'login')
      }
    },
  ];
  // CONSTRUCTOR
  constructor() {
    super();
  }
  public login( event?: Event ) {
    event?.preventDefault();
    const event_to_dispatch = { 
      type: 'fg.auth.local.event.login' as const, 
      payload: this.form_login.value as { user: string, password: string }
    };
    console.log( event_to_dispatch );
    this.actor_auth_s()?.send(event_to_dispatch);
  };
}