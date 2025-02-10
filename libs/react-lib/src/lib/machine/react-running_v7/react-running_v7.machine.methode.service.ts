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
  assign_active_url_param_parser
} from './react-running_v7.machine.types';
import { fg_auth_local_emitted_authorized_parser, fg_auth_local_emitted_unauthorized_parser } from '../fg-auth-local';
import { FG_NAVIGATION_EVENT_BLOCK, fg_navigation_event_block_parser, FG_NAVIGATION_EVENT_ENABLE, fg_navigation_event_enable, fg_navigation_event_navigate, FG_NAVIGATION_EVENT_NAVIGATE, FgNavigationMachineMethodeService } from '../fg-navigation';
import { fg_router_emitted_start_parser } from '../fg-router/fg-router.machine.service';

@Injectable({
  providedIn: 'root',
})
export class ReactRunningV7MachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $xstate = inject(FgXstateService);
  // protected $http = inject(HttpClient);
  // protected $env = inject(FgEnvironmentService);
  // protected $storage = inject(FgStorageService);
  // protected $event = inject(FgEventService);
  // protected $router = inject(Router);

  @boundMethod
  public assign_auth_cookie_set({ context, event }: REACT_RUNNING_ACTION_INPUT) {
    const parsed_event = fg_auth_local_emitted_authorized_parser.parse(event);
    const result = this.$immer.produce( context, draft => {
      draft.auth_cookie = parsed_event.data.auth_cookie;
    });
    return result;
  };

  @boundMethod
  public assign_auth_cookie_unset({ context, event }: REACT_RUNNING_ACTION_INPUT) {
    const parsed_event = fg_auth_local_emitted_unauthorized_parser.parse(event);
    const result = this.$immer.produce( context, draft => {
        draft.auth_cookie = undefined;
    });
    return result;
  };

  @boundMethod
  public assign_calculation_set({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return this.$immer.produce( context, draft => {
      throw 'NEEDS_IMPLEMENTATION';
    });
  };

  @boundMethod
  public assign_calculation_unset({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return this.$immer.produce( context, draft => {
      draft.calculation = undefined;
    })
  };

  @boundMethod
  public log_info({ context, event }: REACT_RUNNING_ACTION_INPUT, methode_name?: string, log_event = true, log_context = true ) {
    if( methode_name ) {
      this.$log?.info('METHODE:' + methode_name.toUpperCase)
    }
    if( event && log_event ) {
      this.$log?.info('EVENT: ' + event.type.toUpperCase)
    }
    if( context && log_context ) {
      this.$log?.info('CONTEXT: ');
      this.$log?.info(context)
    }
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
    if( params ) {
      const parsed_param = assign_active_url_param_parser.parse(params);
      url = parsed_param.url
    }
    else if( event ) {
      const parsed_event = fg_router_emitted_start_parser.parse(event);
      url = parsed_event.data.url
    }
    else {
      throw new Error('ERROR: NO VALID INPUT');
    }
    return react_running_event_select_active_view_parser.parse({ type: 'react.running.select_active_view', data: {
      url
    }} as REACT_RUNNING_EVENT_SELECT_ACTIVE_VIEW);
  };

  @boundMethod
  public guard_is_authorized({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
    const result = context.auth_cookie ? true : false;
    return result;
  }

  @boundMethod
  public guard_url_matches({ context, event }: REACT_RUNNING_GUARD_INPUT, param: ASSIGN_ACTIVE_URL_PARAM ) {
    const parsed_param = assign_active_url_param_parser.parse(param);
    const result = event?.data?.url === '/'.concat(parsed_param.url);
    return result;
  }

  @boundMethod
  public guard_has_calculation({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
    const result = context.calculation ? true : false;
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

  
  // @boundMethod
  // public action_navigation_redirect({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
  //   // this.$router.navigateByUrl( context.actived_url );
  // };
  // @boundMethod
  // public send_to_spinner_show_event({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
  //   // return fg_spinner_event_show_parser.parse({ type: 'fg.spinner.event.show' })
  //   return fg_spinner_event_hide_parser.parse({ type: 'fg.spinner.event.hide', data: { force: true} })
  // };
  // @boundMethod
  // public send_to_spinner_hide_event({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
  //   return fg_spinner_event_hide_parser.parse({ type: 'fg.spinner.event.hide', data: { force: true} })
  // };


  // @boundMethod
  // public raise_navigation_internal_start({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
  //   return fg_navigation_internal_start_parser.parse({ type: 'fg.navigation.internal.start'});
  // };

  // @boundMethod
  // public raise_navigation_internal_ready({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
  //   console.log('raise_navigation_internal_ready')
  //   console.log(context)
  //   return fg_navigation_internal_ready_parser.parse({ type: 'fg.navigation.internal.ready'});
  // };

  // @boundMethod
  // public raise_navigation_internal_end({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
  //   return fg_navigation_internal_end_parser.parse({ type: 'fg.navigation.internal.end'});
  // };

  // @boundMethod
  // public assign_target_url({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
  //   const parsed_event = fg_router_emitted_start_parser.parse(event)
  //   return this.$immer.produce( context, draft => {
  //     draft.target_url = parsed_event.data.url;
  //   });
  // };

  // @boundMethod
  // public assign_active_url({ context, event }: REACT_RUNNING_ACTION_INPUT, param: ASSIGN_ACTIVE_URL_PARAM) {
  //   const parsed_param = assign_active_url_param_parser.parse(param);
  //   return this.$immer.produce( context, draft => {
  //     draft.actived_url = parsed_param.url;
  //   })
  // };
  // @boundMethod
  // public assign_active_url_to_target_url({ context, event }: REACT_RUNNING_ACTION_INPUT) {
  //   return this.$immer.produce( context, draft => {
  //     draft.target_url = context.actived_url;
  //   })
  // };

  // @boundMethod
  // public guard_target_matches_active_url({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
  //   console.log('GUARD_TARGET_MATCHES_ACTIVE_URL')
  //   console.log(context.target_url)
  //   console.log(context.actived_url)
  //   return context.target_url === context.actived_url ? true : false;
  // }

}
