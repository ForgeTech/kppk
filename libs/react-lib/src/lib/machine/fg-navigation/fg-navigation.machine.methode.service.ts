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
  FG_NAVIGATION_ACTION_INPUT, 
  FG_NAVIGATION_GUARD_INPUT,
  FG_NAVIGATION_EMITTED_ENDED,
  FG_NAVIGATION_EMITTED_STARTED,
  FG_NAVIGATION_INTERNAL_CHECK,
  FG_NAVIGATION_INTERNAL_END,
  FG_NAVIGATION_INTERNAL_REDIRECT,
  FG_NAVIGATION_INTERNAL_START,
  fg_navigation_event_navigate,
  fg_navigation_emitted_ended_parser,
  fg_navigation_emitted_started_parser
} from './fg-navigation.machine.types';
import { fg_router_emitted_start_parser } from '../fg-router/fg-router.machine.service';
import { Router } from '@angular/router';
import { assign_active_url_param_parser } from '../react-running_v7';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FgNavigationMachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $location = inject(Location);
  protected $router = inject(Router);


  @boundMethod
  public assign_active_url({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const parsed_event = fg_navigation_event_navigate.parse(event);
    return this.$immer.produce( context, draft => {
      draft.actived_url = parsed_event.data.url;
    })
  };

  @boundMethod
  public assign_target_url({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const parsed_event = fg_navigation_event_navigate.parse(event)
    return this.$immer.produce( context, draft => {
      draft.target_url = parsed_event.data.url;
    });
  };

  @boundMethod
  public send_navigation_emitted_ended({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    return fg_navigation_emitted_ended_parser.parse({ type: 'fg.navigation.emitted.ended'} as FG_NAVIGATION_EMITTED_ENDED);
  };

  @boundMethod
  public send_navigation_emitted_started({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    return fg_navigation_emitted_started_parser.parse({type: 'fg.navigation.emitted.started'} as FG_NAVIGATION_EMITTED_STARTED);
  };

  @boundMethod
  public log_error({ context, event }: FG_NAVIGATION_ACTION_INPUT, methode_name?: string, log_event = true, log_context = true ) {
    if( methode_name ) {
      this.$log?.error('METHODE:' + methode_name.toUpperCase)
    }
    if( event && log_event ) {
      this.$log?.error('EVENT: ' + event.type.toUpperCase)
    }
    if( context && log_context ) {
      this.$log?.error('CONTEXT: ');
      this.$log?.error(context)
    }
  };

  @boundMethod
  public raise_navigation_internal_check({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    return {type: 'fg.navigation.internal.check'} as FG_NAVIGATION_INTERNAL_CHECK;
  };

  @boundMethod
  public raise_navigation_internal_end({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    return {type: 'fg.navigation.internal.end'} as FG_NAVIGATION_INTERNAL_END;
  };

  @boundMethod
  public raise_navigation_internal_redirect({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    return {type: 'fg.navigation.internal.redirect' } as FG_NAVIGATION_INTERNAL_REDIRECT;
  };

  @boundMethod
  public raise_navigation_internal_start({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    return {type: 'fg.navigation.internal.start' } as FG_NAVIGATION_INTERNAL_START;
  };

  @boundMethod
  public guard_target_url_matching_active_url({ context, event }: FG_NAVIGATION_GUARD_INPUT) {
    return context.actived_url === context.target_url;
  };


}
