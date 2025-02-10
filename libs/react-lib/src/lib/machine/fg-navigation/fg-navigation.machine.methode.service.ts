import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service';

import { boundMethod } from 'autobind-decorator';
import { 
  FgBaseService,
} from '@kppk/fg-lib-new';
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
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FgNavigationMachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $router = inject(Router);

  @boundMethod
  public action_navigation_redirect_to_target_url({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    // const parsed_event = fg_navigation_event_navigate.parse(event);
    // const result = this.$immer.produce( context, draft => {
    //   draft.actived_url = parsed_event.data.url;
    // });
    // return result;
    this.$router.navigate([context.target_url])
  };

  @boundMethod
  public assign_active_url({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const parsed_event = fg_navigation_event_navigate.parse(event);
    const result = this.$immer.produce( context, draft => {
      draft.actived_url = parsed_event.data.url;
    });
    return result;
  };

  @boundMethod
  public assign_target_url({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const parsed_event = fg_navigation_event_navigate.parse(event)
    const result = this.$immer.produce( context, draft => {
      draft.target_url = parsed_event.data.url;
    });
    return result;
  };

  @boundMethod
  public send_navigation_emitted_ended({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const result = fg_navigation_emitted_ended_parser.parse({ type: 'fg.navigation.emitted.ended'} as FG_NAVIGATION_EMITTED_ENDED);
    return result;
  };

  @boundMethod
  public send_navigation_emitted_started({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const result = fg_navigation_emitted_started_parser.parse({type: 'fg.navigation.emitted.started'} as FG_NAVIGATION_EMITTED_STARTED);
    return result;
  };

  @boundMethod
  public log_error({ context, event }: FG_NAVIGATION_ACTION_INPUT, methode_name?: string, log_event = true, log_context = true ) {
    if( methode_name ) {
      this.$log?.error('METHODE:' + methode_name.toUpperCase())
    }
    if( event && log_event ) {
      this.$log?.error('EVENT: ' + event.type.toUpperCase())
    }
    if( context && log_context ) {
      this.$log?.error('CONTEXT: ');
      this.$log?.error(context)
    }
  };

  @boundMethod
  public raise_navigation_internal_check({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const result = {type: 'fg.navigation.internal.check'} as FG_NAVIGATION_INTERNAL_CHECK;
    return result;
  };

  @boundMethod
  public raise_navigation_internal_end({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const result = {type: 'fg.navigation.internal.end'} as FG_NAVIGATION_INTERNAL_END;
    return result;
  };

  @boundMethod
  public raise_navigation_internal_redirect({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const result = {type: 'fg.navigation.internal.redirect' } as FG_NAVIGATION_INTERNAL_REDIRECT;
    return result;
  };

  @boundMethod
  public raise_navigation_internal_start({ context, event }: FG_NAVIGATION_ACTION_INPUT ) {
    const result = {type: 'fg.navigation.internal.start' } as FG_NAVIGATION_INTERNAL_START;
    return result;
  };

  @boundMethod
  public guard_target_url_matching_active_url({ context, event }: FG_NAVIGATION_GUARD_INPUT) {
    const result = context.actived_url === context.target_url;
    return result;
  };


}
