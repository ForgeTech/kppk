import { Injectable, inject } from '@angular/core';
import { FgImmutableService, FgXstateService } from '../../service';

import { boundMethod } from 'autobind-decorator';
import { 
  FgBaseService,
} from '@kppk/fg-lib-new';
import { 
  react_running_event_select_active_view_parser,
  REACT_RUNNING_ACTION_INPUT, 
  REACT_RUNNING_GUARD_INPUT,
  REACT_RUNNING_EVENT_SELECT_ACTIVE_VIEW,
  ASSIGN_ACTIVE_URL_PARAM,
  assign_active_url_param_parser,
  react_running_event_calculation_start_parser,
  ASSIGN_ACTIVE_NAVIGATION_PARAM,
  assign_active_navigation_params_parser,
} from './react-running_v7.machine.types';
import { fg_auth_emitted_authorized_parser, fg_auth_emitted_unauthorized_parser } from '../fg-auth-local';
import { FG_NAVIGATION_EVENT_BLOCK, fg_navigation_event_block_parser, FG_NAVIGATION_EVENT_ENABLE, fg_navigation_event_enable, fg_navigation_event_navigate, FG_NAVIGATION_EVENT_NAVIGATE, FgNavigationMachineMethodeService } from '../fg-navigation';
import { fg_router_emitted_start_parser } from '../fg-router/fg-router.machine.service';
import { Router } from '@angular/router';
import { FgMachineUtilsMethodeService } from '../fg-machine-utils';
import { firstValueFrom, forkJoin } from 'rxjs';
import { react_init_load_from_remote_parser } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ReactRunningV7MachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $xstate = inject(FgXstateService);
  protected $router = inject(Router);
  protected $common = inject(FgMachineUtilsMethodeService);
  // protected $http = inject(HttpClient);
  // protected $env = inject(FgEnvironmentService);
  // protected $storage = inject(FgStorageService);
  // protected $event = inject(FgEventService);
  // protected $router = inject(Router);

  @boundMethod
  public assign_auth_cookie_set({ context, event }: REACT_RUNNING_ACTION_INPUT) {
    const parsed_event = fg_auth_emitted_authorized_parser.parse(event);
    const result = this.$immer.produce( context, draft => {
      draft.auth_cookie = parsed_event.data.auth_cookie;
    });
    return result;
  };

  @boundMethod
  public assign_auth_cookie_unset({ context, event }: REACT_RUNNING_ACTION_INPUT) {
    const parsed_event = fg_auth_emitted_unauthorized_parser.parse(event);
    const result = this.$immer.produce( context, draft => {
        draft.auth_cookie = undefined;
    });
    return result;
  };

  @boundMethod
  public assign_calculation_set({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    const parsed_event = react_running_event_calculation_start_parser.parse(event);
    const result = this.$immer.produce( context, draft => {
      context.calculation = parsed_event.data.calculation;
    });
    return result;
  };
  
  @boundMethod
  public assign_calculation_data_loaded({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    const parsed_output = react_init_load_from_remote_parser.parse(event.output);
    const result = this.$immer.produce( context, draft => {
      context.data = parsed_output.common;
      context.form_defaults = parsed_output.form_defaults;
    });
    return result;
  };

  @boundMethod
  public assign_calculation_unset({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    const result = this.$immer.produce( context, draft => {
      draft.calculation = undefined;
    })
    return result;
  };

  @boundMethod
  public assign_navigation_active({ context, event }: REACT_RUNNING_ACTION_INPUT, params: ASSIGN_ACTIVE_NAVIGATION_PARAM ) {
    const parsed_params = assign_active_navigation_params_parser.parse( params );
    const result = this.$immer.produce( context, draft => {
      draft.active_navigation = parsed_params.active_navigation;
    });
    return result;
  };

  @boundMethod
  public raise_initial_navigation(input: REACT_RUNNING_ACTION_INPUT ) {
    const url = this.$router.url;
    const result = this.raise_react_running_select_active_view( input, { url })
    return result;
  };

  @boundMethod
  public raise_navigation_block({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    const result = fg_navigation_event_block_parser.parse({ type: 'fg.navigation.event.block'} as FG_NAVIGATION_EVENT_BLOCK);
    return result;
  };

  @boundMethod
  public raise_navigation_enable({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    const result = fg_navigation_event_enable.parse({ type: 'fg.navigation.event.enable'} as FG_NAVIGATION_EVENT_ENABLE);
    return result;
  };

  @boundMethod
  public raise_navigation_navigate({ context, event }: REACT_RUNNING_ACTION_INPUT, params: ASSIGN_ACTIVE_URL_PARAM ) {
    const parsed_params =  assign_active_url_param_parser.parse(params);
    return fg_navigation_event_navigate.parse({ type: 'fg.navigation.event.navigate', data: {
      url: parsed_params.url
    }} as FG_NAVIGATION_EVENT_NAVIGATE);
  };

  @boundMethod
  public raise_react_running_select_active_view({ context, event }: REACT_RUNNING_ACTION_INPUT, params: ASSIGN_ACTIVE_URL_PARAM | undefined) {
    let url = ''
    const parsed_param = assign_active_url_param_parser.parse(params);
    url = parsed_param.url
    return react_running_event_select_active_view_parser.parse({ type: 'react.running.select_active_view', data: {
      url
    }} as REACT_RUNNING_EVENT_SELECT_ACTIVE_VIEW);
  };

  @boundMethod
  public guard_calculation_data_loaded({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
    const has_data = context.data ? true : false;
    const has_form_defaults = context.form_defaults ? true : false;
    const result = has_data && has_form_defaults;
    return result;
  }

  @boundMethod
  public guard_is_authorized({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
    const result = context.auth_cookie ? true : false;
    return result;
  }

  @boundMethod
  public guard_url_matches({ context, event }: REACT_RUNNING_GUARD_INPUT, param: ASSIGN_ACTIVE_URL_PARAM ) {
    const parsed_param = assign_active_url_param_parser.parse(param);
    const parsed_event = react_running_event_select_active_view_parser.parse(event);
    const result = parsed_event.data?.url.startsWith(parsed_param.url) ? true : false;
    return result;
  }

  // @boundMethod
  // public guard_has_calculation({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
  //   const result = context.calculation ? true : false;
  //   return result;
  // }
  
  @boundMethod
  public guard_navigation_is_active( input: REACT_RUNNING_GUARD_INPUT ) {
    const result = input.context.active_navigation;
    return result;
  }
  
  @boundMethod
  public guard_view_calculation(input: REACT_RUNNING_GUARD_INPUT,  param: ASSIGN_ACTIVE_URL_PARAM ) {
    const result = this.guard_is_authorized( input ) && this.guard_url_matches(input, param);
    return result;
  }

  @boundMethod
  public guard_view_data_protection(input: REACT_RUNNING_GUARD_INPUT,  param: ASSIGN_ACTIVE_URL_PARAM ) {
    const result = this.guard_url_matches(input, param);
    return result;
  }

  @boundMethod
  public guard_view_home(input: REACT_RUNNING_GUARD_INPUT,  param: ASSIGN_ACTIVE_URL_PARAM ) {
    const result = this.guard_is_authorized( input ) && this.guard_url_matches(input, param);
    return result;
  }

  @boundMethod
  public guard_view_imprint(input: REACT_RUNNING_GUARD_INPUT,  param: ASSIGN_ACTIVE_URL_PARAM ) {
    const result = this.guard_url_matches(input, param);
    return result;
  }

  @boundMethod
  public guard_view_login(input: REACT_RUNNING_GUARD_INPUT,  param: ASSIGN_ACTIVE_URL_PARAM ) {
    const result = this.guard_is_authorized( input ) && this.guard_url_matches(input, param);
    return result;
  }

  @boundMethod
  public guard_view_logout(input: REACT_RUNNING_GUARD_INPUT,  param: ASSIGN_ACTIVE_URL_PARAM ) {
    const result = this.guard_is_authorized( input ) && this.guard_url_matches(input, param);
    return result;
  }
  @boundMethod
  public guard_target_url_unequal_curret_url(input: REACT_RUNNING_GUARD_INPUT ) {
    const current_url = this.$router.url;
    const parsed_event = fg_router_emitted_start_parser.parse(input.event);
    const result = current_url !== parsed_event.data.url;
    return result;
  }

   @boundMethod
    public async actor_view_calculation_load_data({ input }: { input: any }) {
      const common$ = this.$common.load_object({
        concrete_types: './react/data/august2024/common/concrete_types.json',
        //construction_site_energy_usage: './react/data/august2024/common/construction_site_energy_usage.json',
        container_disposal:
          './react/data/august2024/common/container_disposal.json',
        container_village:
          './react/data/august2024/common/container_village.json',
        material_co2_equ: './react/data/august2024/common/material_co2_equ.json',
        material_density: './react/data/august2024/common/material_density.json',
        truck: './react/data/august2024/common/truck.json',
        window_frames: './react/data/august2024/common/window_frames.json',
        window_glass: './react/data/august2024/common/window_glass.json',
      });
  
      const form_defaults$ = this.$common.load_object({
        form_common: './react/data/august2024/form_default/form_common.json',
        form_construction_site:
          './react/data/august2024/form_default/form_construction_site.json',
        form_container_village:
          './react/data/august2024/form_default/form_container_village.json',
        form_demolish_disposal:
          './react/data/august2024/form_default/form_demolish_disposal.json',
        form_excavation_pit:
          './react/data/august2024/form_default/form_excavation_pit.json',
        form_heating_system: './react/data/august2024/form_default/form_heating_system.json',
        form_selection:
          './react/data/august2024/form_default/form_selection.json',
      });
  
      const load_from_remote$ = forkJoin({
        common: common$,
        form_defaults: form_defaults$,
      });
      const result = await firstValueFrom(load_from_remote$);
      // TODO Add validation
      return result;
    }
}
