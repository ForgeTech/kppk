import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { FG_REACT_RUNNING_V2, ReactAppRunningV2Context, } from './react-running.machine';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { assign, forwardTo, fromEventObservable, raise, sendParent } from 'xstate';
import { EventFgAuthLocalAuthorizedParser, EventFgAuthLocalUnauthorizedParser } from '../fg-auth-local/fg-auth-local.machine.types';
import { ROUTES_ENUM } from '../../app.routes';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { EventFgSpinnerHide, EventFgSpinnerShow } from '../fg-spinner/fg-spinner.machine.types';
import { ReactViewHomeService } from '../react-view-home/react-view-home.service';
import { ReactViewCalculationService } from '../react-view-calculation/react-view-calculation.service';
import { ReactAdminToolbarService } from '../react-admin-toolbar/react-admin-toolbar.service';
import { REACT_ACTOR_ENUM } from '../react-main/react-mainv2.service';

@Injectable({
  providedIn: 'root',
})
export class ReactRunningService extends FgBaseService {
  public machine;
  // public machineV1;

  protected $immer = inject(FgImmutableService);
  protected $home = inject(ReactViewHomeService);
  protected $calculation = inject(ReactViewCalculationService);
  protected $admin_toolbar = inject(ReactAdminToolbarService);
  protected $router = inject(Router);

  constructor() {
    super();
    this.machine = FG_REACT_RUNNING_V2.provide({
      actions: {
        action_router_navigate_to: this.action_router_navigate_to,
        assign_navigation_current_url: assign( this.assign_navigation_current_url),
        // assign_react_running_input: assign( this.assign_react_running_input ),
        assign_auth_cookie_set: assign( this.assign_auth_cookie_set ),
        assign_target_url_calculation: assign( this.assign_target_url_calculation ),
        assign_target_url_data_protection: assign( this.assign_target_url_data_protection ),
        assign_target_url_demo: assign( this.assign_target_url_demo ),
        assign_target_url_home: assign( this.assign_target_url_home ),
        assign_target_url_imprint: assign( this.assign_target_url_imprint ),
        assign_target_url_login: assign( this.assign_target_url_login ),
        assign_auth_cookie_unset: assign( this.assign_auth_cookie_unset ),
        assign_calculation_set: assign( this.assign_calculation_set ),
        assign_calculation_unset: assign( this.assign_calculation_unset ),
        raise_navigation_internal_end: raise( this.raise_navigation_internal_end ),
        send_to_spinner_hide_event: sendParent( this.send_to_spinner_hide_event ),
        send_to_spinner_show_event: sendParent( this.send_to_spinner_show_event ),
        send_to_admin_toolbar: forwardTo( REACT_ACTOR_ENUM.REACT_RUNNING_ADMIN_TOOLBAR )
      },
      guards: {
        guard_is_authorized: this.guard_is_authorized,
        guard_is_unauthorized: this.guard_is_unauthorized,
        // guard_current_url_is_login: this.guard_current_url_is_login,
        guard_current_url_is_imprint: this.guard_current_url_is_imprint,
        guard_current_url_is_data_protection: this.guard_current_url_is_data_protection,
        guard_current_url_is_demo: this.guard_current_url_is_demo,
        guard_has_calculation: this.guard_has_calculation,
      },
      actors: {
        actor_react_view_home: this.actor_react_view_home(),
        actor_react_view_calculation: this.actor_react_view_calculation(),
        actor_navigation: fromEventObservable(this.actor_route_navigation),
        actor_admin_toolbar: this.actor_react_admin_toolbar()
      },
    });
  }

  public actor_react_view_home = () => {
    this.$log.info('REACT_RUNNING_ACTOR: actor_react_view_home');
    return this.$home.machine;
  };

  public actor_react_view_calculation = () => {
    this.$log.info('REACT_RUNNING_ACTOR: actor_react_view_calculation');
    return this.$calculation.machine;
  };

  public actor_react_admin_toolbar = () => {
    this.$log.info('REACT_RUNNING_ACTOR: actor_react_admin_toolbar');
    return this.$admin_toolbar.machine;
  };



  protected assign_auth_cookie_set = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    // console.log(event);
    const authorized_event = EventFgAuthLocalAuthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
      draft.auth_cookie = authorized_event.payload.auth_cookie;
    });
    return result;
  }

  protected assign_auth_cookie_unset = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    EventFgAuthLocalUnauthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
      draft.auth_cookie = undefined;
    });
    return result;
  }

  protected assign_calculation_set = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    // EventFgAuthLocalUnauthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
      draft.calculation = event.payload || event.output;
    });
    return result;
  }

  protected assign_calculation_unset = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    // EventFgAuthLocalUnauthorizedParser.parse( event );
    const result = this.$immer.produce( context, draft => { 
        draft.calculation = undefined;
    });
    return result;
  }

  protected assign_navigation_current_url = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.current_url = event?.payload?.urlAfterRedirects;
      // draft.current_url = event?.payload?.url || event?.payload?.urlAfterRedirects;
    });
    return result;
  }

  protected assign_target_url_login = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.LOGIN;
    });
    return result;
  }

  protected assign_target_url_home = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.HOME;
    });
    return result;
  }
  protected assign_target_url_data_protection = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.DATA_PROTECTION;
    });
    return result;
  }
  protected assign_target_url_demo = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.DEMO;
    });
    return result;
  }

  protected assign_target_url_imprint = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.IMPRINT;
    });
    return result;
  }

  protected assign_target_url_calculation = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      draft.target_url = '/' + ROUTES_ENUM.CALC;
    });
    return result;
  }
 

  protected action_router_navigate_to = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>ROUTER_NAVIGATE_TO>>>>>>>>>>>>>>>>>>>>>>>>>')
    // console.log( event );
    return false;
  }
  protected raise_navigation_internal_end = ({ context, event }: { context: ReactAppRunningV2Context, event: any }) => {
    return { type: "react.running.navigation.internal.end" } as const;
  }
  protected send_to_spinner_hide_event = () => {
    const event: EventFgSpinnerHide = {
      type: 'fg.spinner.event.hide',
      payload: {
        force: false
      }
    };
    return event;
  }
  protected send_to_spinner_show_event = () => {
    const event: EventFgSpinnerShow = {
      type: 'fg.spinner.event.show',
      payload: {
        force: false
      }
    };
    return event;
  }

  protected guard_is_authorized = ({ context }: { context: ReactAppRunningV2Context }) => {
    const result = context.auth_cookie ? true : false;
    return result;
  }

  protected guard_is_unauthorized = ({ context }: { context: ReactAppRunningV2Context }) => {
    const result = context.auth_cookie ? false : true;
    return result;
  }

  // protected guard_current_url_is_login = ({ context }: { context: ReactAppRunningV2Context }) => {
  //   const result = context.current_url?.startsWith('/' + ROUTES_ENUM.LOGIN) ? true : false;
  //   return result;
  // }

  protected guard_current_url_is_imprint = ({ context }: { context: ReactAppRunningV2Context }) => {
    const result = context.current_url?.startsWith('/' + ROUTES_ENUM.IMPRINT) ? true : false;
    return result;
  }

  protected guard_current_url_is_data_protection = ({ context }: { context: ReactAppRunningV2Context }) => {
    const result = context.current_url?.startsWith('/' + ROUTES_ENUM.DATA_PROTECTION) ? true : false;
    return result;
  }

  protected guard_current_url_is_demo = ({ context }: { context: ReactAppRunningV2Context }) => {
    const result = context.current_url?.startsWith('/' + ROUTES_ENUM.DEMO) ? true : false;
    return result;
  }
  protected guard_has_calculation = ({ context }: { context: ReactAppRunningV2Context }) => {
    const result = context.calculation ? true : false;
    return result;
  }

  protected actor_route_navigation = () => {
    return this.$router.events.pipe(
      filter( event => event instanceof NavigationStart || event instanceof NavigationEnd ), 
      map( event => {
        if( event instanceof NavigationStart ) {
          return { type: 'fg.navigation.event.start', payload: event };
        } else {
          return { type: 'fg.navigation.event.end', payload: event };
        }
      }),
    );
  }
  
}
