import { computed, inject, Injectable, isDevMode, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FgBaseService, FgEnvironmentService, FgTranslate } from "@kppk/fg-lib-new";
import { map, startWith } from "rxjs";
import { FgAuthLocalMachineActorService } from "../machine";
import { TranslocoService } from "@jsverse/transloco";

@Injectable({
    providedIn: 'root'
})
export class KppkReactSharedService extends FgBaseService {
    protected $translate = inject(FgTranslate);
    protected $transloco = inject(TranslocoService);
    protected $env = inject(FgEnvironmentService);
    protected $auth_actor = inject(FgAuthLocalMachineActorService);

    public auth_is_readyS = computed( () => {
      return this.$auth_actor.stateS()?.matches( {'STATE': 'INITIALIZE' }) === false;
    });
    public auth_is_authorizedS = computed( () => {
      return this.$auth_actor.stateS()?.matches( {'STATE': 'AUTHORIZED' }) ?? false;
    });
    public auth_is_unauthorizedS = computed( () => {
      return this.$auth_actor.stateS()?.matches( {'STATE': 'UNAUTHORIZED' });
    });
    public auth_authorization_pendingS = computed( () => {
      const result = this.$auth_actor.stateS()?.matches({'STATE': { "UNAUTHORIZED": "AUTHORIZATION"}});
      return result;
    });
    public auth_logout_pendingS = computed( () => {
      const result = this.$auth_actor.stateS()?.matches({'STATE': { "UNAUTHORIZED": "AUTHORIZATION"}});
      return result;
    });
    public auth_authorization_errorS = computed( () => {
      const result = this.$auth_actor.stateS()?.matches({'STATE': { "UNAUTHORIZED": "ERROR"}});
      return result;
    });
    public auth_authoirzation_successS = computed( () => {
      const result = this.$auth_actor.stateS()?.matches({'STATE': "AUTHORIZED"});
      return result;
    });

    public admin_show_toolbarS = computed( () => {
      return isDevMode() ||  this.auth_is_authorizedS();
    });

    public show_admin_toolbarS = signal(isDevMode());
    
    public kppk_react_admin_toolbar_translations$ = this.$translate.get_translations$({
      alt_kppk_logo: "login",
      alt_react_logo: "login",
      authorization_error: "login",
      authorization_success: "login",
      input_password_label: "login",
      input_user_label: "login",
      label_install: "pwa",
      label_login: "login",
      label_version: "login",
      route_data_protection: "route",
      route_imprint: "route",
      tooltip_install: "pwa",
    });
    public kppk_react_admin_toolbar_translationsS = toSignal(this.kppk_react_admin_toolbar_translations$, { initialValue: undefined });

    public kppk_react_login_translations$ = this.$translate.get_translations$({
      alt_kppk_logo: "login",
      alt_react_logo: "login",
      authorization_error: "login",
      authorization_success: "login",
      input_password_label: "login",
      input_user_label: "login",
      label_install: "pwa",
      label_login: "login",
      label_version: "login",
      route_data_protection: "route",
      route_imprint: "route",
      tooltip_install: "pwa",
    });
    public kppk_react_login_translationsS = toSignal(this.kppk_react_login_translations$, { initialValue: undefined });

    public kppk_react_navigation_translationsS = toSignal(this.$translate.get_translations$({
      calculation_start: "general",
      label_install: "pwa",
      label_version: "login",
      login: "general",
      logout: "general",
      manual: "general",
      route_data_protection: "route",
      route_home: "route",
      route_imprint: "route",
      route_login: "route",
      tooltip_install: "pwa",
    }), { initialValue: undefined });

      protected lang_active$ = this.$transloco.langChanges$.pipe( startWith( this.$transloco.getActiveLang() ));
      public    lang_activeS = toSignal(this.lang_active$, { initialValue: this.$transloco.getDefaultLang() });

      protected langs_translation$ = this.$translate.get_translations$({
        de: "language",
        en: "language",
      })
      protected langs_available$ = this.langs_translation$.pipe( map( (trans: any) => {
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
      public langs_availableS = toSignal(this.langs_available$, { initialValue: [] });
      public langs_icons_pathS = signal(this.$env.i18n.assetPath);

      public versionS = signal(this.$env.version);

      constructor() {
        super();
      }
}