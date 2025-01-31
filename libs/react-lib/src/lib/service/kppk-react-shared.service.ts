import { computed, inject, Injectable, isDevMode, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FgBaseService,
  FgEnvironmentService,
  FgTranslate,
} from '@kppk/fg-lib-new';
import { map, startWith, tap } from 'rxjs';
import { FgAuthLocalMachineActorService, FgSpinnerMachineActorService } from '../machine';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class KppkReactSharedService extends FgBaseService {
  protected $translate = inject(FgTranslate);
  protected $transloco = inject(TranslocoService);
  protected $env = inject(FgEnvironmentService);

  public $actor_auth = inject(FgAuthLocalMachineActorService);
  public $actor_spinner = inject(FgSpinnerMachineActorService)

  public auth_is_readyS = computed(() => {
    return (
      this.$actor_auth.stateS()?.matches({ STATE: 'INITIALIZE' }) === false
    );
  });
  public auth_is_authorizedS = computed(() => {
    return this.$actor_auth.stateS()?.matches({ STATE: 'AUTHORIZED' }) ?? false;
  });
  public auth_is_unauthorizedS = computed(() => {
    return this.$actor_auth.stateS()?.matches({ STATE: 'UNAUTHORIZED' });
  });
  public auth_authorization_pendingS = computed(() => {
    const result = this.$actor_auth
      .stateS()
      ?.matches({ STATE: { UNAUTHORIZED: 'AUTHORIZATION' } });
    return result;
  });
  public auth_logout_pendingS = computed(() => {
    const result = this.$actor_auth
      .stateS()
      ?.matches({ STATE: { UNAUTHORIZED: 'AUTHORIZATION' } });
    return result;
  });
  public auth_authorization_errorS = computed(() => {
    const result = this.$actor_auth
      .stateS()
      ?.matches({ STATE: { UNAUTHORIZED: 'ERROR' } });
    return result;
  });
  public auth_authoirzation_successS = computed(() => {
    const result = this.$actor_auth.stateS()?.matches({ STATE: 'AUTHORIZED' });
    return result;
  });

  public spinner_is_pendingS = computed(() => {
    const matches_idel =  this.$actor_spinner.stateS()?.matches({'DISPLAY': {
      'HIDDEN': 'IDEL'
    }});
    return matches_idel ? false : true;
  })

  public admin_show_toolbarS = computed(() => {
    return isDevMode() || this.auth_is_authorizedS();
  });

  public show_admin_toolbarS = signal(isDevMode());

  public kppk_react_default_layout_translation$ = this.$translate.get_translations$({
    close: 'general',
  });

  public kppk_react_home_translations$ = this.$translate.get_translations$({
    alt_pictogram_construction_site: 'home',
    alt_pictogram_container_village: 'home',
    alt_pictogram_demolish_disposal: 'home',
    alt_pictogram_excavation_pit: 'home',
    alt_pictogram_heating_system: 'home',
    alt_pictogram_material: 'home',

    button_back: 'home',
    button_cancel: 'home',
    button_start_calc: 'home',

    calculation_start: 'general',

    content_provide_calculation_data_choose_option: 'home',
    content_provide_calculation_data_from_files: 'home',
    content_provide_calculation_data_from_storage: 'home',
    content_provide_calculation_data: 'home',

    error_max_file_size: 'form',
    error_required: 'form',

    headline_selected_from_files: 'home',
    headline_selected_from_stored: 'home',
    headline_start_calc_modal: 'home',
    headline_welcome: 'home',

    label_version: 'general',

    placeholder_aufbauten_file: 'home',
    placeholder_bauteilflaechen_file: 'home',
    placeholder_heating_system_file: 'home',
    placeholder_oi3_file: 'home',
    text_welcome: 'home',
  });

  public kppk_react_admin_toolbar_translations$ =
    this.$translate.get_translations$({
      alt_kppk_logo: 'login',
      alt_react_logo: 'login',
      authorization_error: 'login',
      authorization_success: 'login',
      input_password_label: 'login',
      input_user_label: 'login',
      label_install: 'pwa',
      label_login: 'login',
      label_version: 'general',
      route_data_protection: 'route',
      route_imprint: 'route',
      tooltip_install: 'pwa',
    });

  public kppk_react_login_translations$ = this.$translate.get_translations$({
    alt_kppk_logo: 'login',
    alt_react_logo: 'login',
    authorization_error: 'login',
    authorization_success: 'login',
    input_password_label: 'login',
    input_user_label: 'login',
    label_install: 'pwa',
    label_login: 'login',
    label_version: 'general',
    route_data_protection: 'route',
    route_imprint: 'route',
    tooltip_install: 'pwa',
  });

  public kppk_react_navigation_translations$ =
    this.$translate.get_translations$({
      calculation_start: 'general',
      label_install: 'pwa',
      label_version: 'general',
      login: 'general',
      logout: 'general',
      manual: 'general',
      route_data_protection: 'route',
      route_home: 'route',
      route_imprint: 'route',
      route_login: 'route',
      tooltip_install: 'pwa',
    });

  protected lang_active$ = this.$transloco.langChanges$.pipe(
    startWith(this.$transloco.getActiveLang()),
    tap( value => {
      console.log('>>>>>>>>>>ACTIVE_LANG>>>>>>>');
      console.log( value )
    })
  );
  public lang_activeS = toSignal(this.lang_active$, {
    initialValue: this.$transloco.getActiveLang(),
  });

  protected langs_translation$ = this.$translate.get_translations$({
    de: 'language',
    en: 'language',
  });
  protected langs_available$ = this.langs_translation$.pipe(
    map((trans: any) => {
      return this.$env.i18n.availableLangs.map((item) => {
        let id: string;
        if (typeof item === 'string') {
          id = item;
        } else {
          id = item.id;
        }
        return {
          id,
          label: trans[id],
        };
      });
    })
  );
  public langs_availableS = toSignal(this.langs_available$, {
    initialValue: [],
  });
  public langs_icons_pathS = signal(this.$env.i18n.assetPath);
  public set_language(lang: any) {
    console.log('LANUAGE_SWITCH');
    console.log('set: ', lang);
    this.$transloco.setActiveLang( lang );
    console.log('active: ', this.$transloco.getActiveLang())
  }

  public versionS = signal(this.$env.version);

  constructor() {
    super();
  }
}
