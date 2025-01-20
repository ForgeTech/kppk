import { ChangeDetectionStrategy, Component, computed, effect, inject, isDevMode, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FgEnvironmentService, FgLayoutDefaultComponent } from '@kppk/fg-lib-new';
import { FgAuthLocalMachineActorService, KppkAdminToolbarComponent, KppkFormlyModule } from '@kppk/react-lib';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FgLanguageSwitchComponent, FgPwaInstallComponent } from '@kppk/fg-lib-new';
import { combineLatest, map, startWith, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
    KppkAdminToolbarComponent
  ],
  selector: 'kppk-react-view-login',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntryComponent {
    protected $translate = inject(TranslocoService);
    protected $auth_local = inject(FgAuthLocalMachineActorService);
    protected $env = inject(FgEnvironmentService);

    protected show_admin_toolbarS = signal(isDevMode());

    protected translation$ = this.$translate.langChanges$.pipe(
      startWith( this.$translate.getActiveLang()),
      switchMap( () => {
        return combineLatest([
          this.$translate.selectTranslation( 'login' ),
          this.$translate.selectTranslation( 'language' ),
          this.$translate.selectTranslation( 'pwa' ),
          this.$translate.selectTranslation( 'route' ),
        ]);
      }),
      map( () => {
        return {
          alt_kppk_logo: this.$translate.translate( 'login.alt_kppk_logo' ),
          alt_react_logo: this.$translate.translate( 'login.alt_react_logo' ),
          authorization_error: this.$translate.translate( 'login.authorization_error' ),
          authorization_success: this.$translate.translate( 'login.authorization_success' ),
          de: this.$translate.translate( 'language.de' ),
          en: this.$translate.translate( 'language.en' ),
          input_password_label: this.$translate.translate( 'login.input_password_label' ),
          input_user_label: this.$translate.translate( 'login.input_user_label' ),
          label_install: this.$translate.translate( 'pwa.label_install' ),
          label_login: this.$translate.translate( 'login.label_login' ),
          label_version: this.$translate.translate( 'login.label_version' ),
          route_data_protection: this.$translate.translate( 'route.route_data_protection' ),
          route_imprint: this.$translate.translate( 'route.route_imprint' ),
          tooltip_install: this.$translate.translate( 'pwa.tooltip_install' ),
        }
      })
    );
    protected transS = toSignal(this.translation$, { initialValue: undefined } );

    protected active_lang$ = this.$translate.langChanges$.pipe( startWith( this.$translate.getActiveLang() ));
    protected active_langS = toSignal(this.active_lang$, { initialValue: this.$translate.getDefaultLang() });
    
    protected available_langs$ = this.translation$.pipe( map( (trans: any) => {
      return this.$env.i18n.availableLangs.map( item => {
        let id: string;
        if( typeof item === 'string') {
          id = item;
        } else {
          id = item.id;
        }
        return {
          id,
          label: trans[id]
        }
      });
    }));
    protected available_langsS = toSignal(this.available_langs$, { initialValue: [] });

    protected versionS = signal(this.$env.version);
    protected lang_icons_pathS = signal(this.$env.i18n.assetPath);
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
          'props.label': this.translation$.pipe( map( trans => trans['input_user_label'] ))
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
          'props.label': this.translation$.pipe( map( trans => trans['input_password_label'] ))
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
