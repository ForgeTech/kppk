import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service';

import { boundMethod } from 'autobind-decorator';
import { 
  FgBaseService,
  FgEnvironmentService,
  FgEventService,
  FgStorageService 
} from '@kppk/fg-lib-new';
import { HttpClient } from '@angular/common/http';
import { 
  assign_active_url_param_parser,
  ASSIGN_ACTIVE_URL_PARAM,
  fg_navigation_event_block_parser,
  fg_navigation_event_unblock_parser,
  fg_navigation_internal_end_parser,
  fg_navigation_internal_ready_parser, 
  fg_navigation_internal_start_parser, 
  REACT_RUNNING_ACTION_INPUT, 
  REACT_RUNNING_GUARD_INPUT
} from './react-running_v7.machine.types';
import { fg_navigation_event_start_parser } from '../fg-router/fg-router.machine.service';
import { Router } from '@angular/router';
import { fg_spinner_event_hide_parser, fg_spinner_event_show_parser } from '../fg-spinner';
import { fg_auth_local_event_authorized_parser, fg_auth_local_event_unauthorized_parser } from '../fg-auth-local';

@Injectable({
  providedIn: 'root',
})
export class ReactRunningV7MachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $http = inject(HttpClient);
  protected $env = inject(FgEnvironmentService);
  protected $storage = inject(FgStorageService);
  protected $event = inject(FgEventService);
  protected $router = inject(Router);


  @boundMethod
  public raise_navigation_block({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return fg_navigation_event_block_parser.parse({ type: 'fg.navigation.event.block'});
  };
  @boundMethod
  public raise_navigation_unblock({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return fg_navigation_event_unblock_parser.parse({ type: 'fg.navigation.event.unblock'});
  };

  @boundMethod
  public action_navigation_redirect({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    // this.$router.navigateByUrl( context.actived_url );
  };
  @boundMethod
  public send_to_spinner_show_event({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    // return fg_spinner_event_show_parser.parse({ type: 'fg.spinner.event.show' })
    return fg_spinner_event_hide_parser.parse({ type: 'fg.spinner.event.hide', data: { force: true} })
  };
  @boundMethod
  public send_to_spinner_hide_event({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return fg_spinner_event_hide_parser.parse({ type: 'fg.spinner.event.hide', data: { force: true} })
  };
  @boundMethod
  public assign_calculation_set({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return this.$immer.produce( context, draft => {
      // context.calculation = ev
    });
  };
  @boundMethod
  public assign_calculation_unset({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return this.$immer.produce( context, draft => {
      draft.calculation = undefined;
    })
  };

  @boundMethod
  public raise_navigation_internal_start({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return fg_navigation_internal_start_parser.parse({ type: 'fg.navigation.internal.start'});
  };

  @boundMethod
  public raise_navigation_internal_ready({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    console.log('raise_navigation_internal_ready')
    console.log(context)
    return fg_navigation_internal_ready_parser.parse({ type: 'fg.navigation.internal.ready'});
  };

  @boundMethod
  public raise_navigation_internal_end({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    return fg_navigation_internal_end_parser.parse({ type: 'fg.navigation.internal.end'});
  };

  @boundMethod
  public assign_target_url({ context, event }: REACT_RUNNING_ACTION_INPUT ) {
    const parsed_event = fg_navigation_event_start_parser.parse(event)
    return this.$immer.produce( context, draft => {
      draft.target_url = parsed_event.data.url;
    });
  };

  @boundMethod
  public assign_active_url({ context, event }: REACT_RUNNING_ACTION_INPUT, param: ASSIGN_ACTIVE_URL_PARAM) {
    const parsed_param = assign_active_url_param_parser.parse(param);
    return this.$immer.produce( context, draft => {
      draft.actived_url = parsed_param.url;
    })
  };
  @boundMethod
  public assign_active_url_to_target_url({ context, event }: REACT_RUNNING_ACTION_INPUT) {
    return this.$immer.produce( context, draft => {
      draft.target_url = context.actived_url;
    })
  };

  @boundMethod
  public assign_auth_cookie_set({ context, event }: REACT_RUNNING_ACTION_INPUT) {
    const parsed_event = fg_auth_local_event_authorized_parser.parse(event);
    return this.$immer.produce( context, draft => {
      draft.auth_cookie = parsed_event.data.auth_cookie;
    });
  };

  @boundMethod
  public assign_auth_cookie_unset({ context, event }: REACT_RUNNING_ACTION_INPUT) {
  const parsed_event = fg_auth_local_event_unauthorized_parser.parse(event);
    return this.$immer.produce( context, draft => {
      draft.auth_cookie = undefined;
    });
  };

  @boundMethod
  public guard_has_calculation({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
    return context.calculation ? true : false;
  }

  @boundMethod
  public guard_target_url_matches({ context, event }: REACT_RUNNING_GUARD_INPUT, param: ASSIGN_ACTIVE_URL_PARAM ) {
    const parsed_param = assign_active_url_param_parser.parse(param);
    return context.target_url === '/'.concat(parsed_param.url);
  }
  @boundMethod
  public guard_is_authorized({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
    return context.auth_cookie ? true : false;
  }

  @boundMethod
  public guard_target_matches_active_url({ context, event }: REACT_RUNNING_GUARD_INPUT ) {
    console.log('GUARD_TARGET_MATCHES_ACTIVE_URL')
    console.log(context.target_url)
    console.log(context.actived_url)
    return context.target_url === context.actived_url ? true : false;
  }

}
