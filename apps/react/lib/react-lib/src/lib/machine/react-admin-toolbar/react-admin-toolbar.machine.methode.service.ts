import { Injectable, inject } from '@angular/core';
import { ActorSystem } from 'xstate';
import { FgImmutableService } from '../../service';
import { FgBaseService, FgEnvironmentService } from '../../../../../../../../libs/fg-lib-new/src';
import { REACT_ADMIN_TOOLBAR_CONTEXT } from './react-admin-toolbar.machine.types';
import { FgAuthLocalMachineActorService } from '../fg-auth-local';
import { boundMethod } from 'autobind-decorator';


@Injectable({
    providedIn: 'root',
  })
  export class ReactAdminToolbarMachineMethodeService extends FgBaseService {
    protected $immer = inject(FgImmutableService);
    protected $env = inject(FgEnvironmentService);
    protected $actor_auth = inject(FgAuthLocalMachineActorService);
  
    // @boundMethod
    // public assign_context_from_system = ({ context, event, system }: { context: REACT_ADMIN_TOOLBAR_CONTEXT, event: any, system: ActorSystem<any> }) => {
    //   const result = this.$immer.produce( context, draft => { 
    //     const fg_auth_local_actor = system.get(REACT_ACTOR_ENUM.FG_AUTH_LOCAL) as Actor<FgAuthLocalV1Machine>;
    //     draft.auth_cookie = fg_auth_local_actor.getSnapshot().context.auth_cookie;
    //     const react_main_actor = system.get(REACT_ACTOR_ENUM.REACT_MAIN) as Actor<ReactAppMainV1Machine>;
    //     draft.environment = react_main_actor.getSnapshot().context;
    //   });
    //   return result;
    // }

    // @boundMethod
    // public assign_context_from_input = ({ context, event, system }: { context: REACT_ADMIN_TOOLBAR_CONTEXT, event: any, system: ActorSystem<any> }) => {
    //   const result = this.$immer.produce( context, draft => {
    //   });
    //   return result;
    // }
    @boundMethod
    public assign_update_context_from_main_auth_actor({ context, event, system }: { context: REACT_ADMIN_TOOLBAR_CONTEXT, event: any, system: ActorSystem<any> }) {
      const result = this.$immer.produce( context, draft => { 
        // const fg_auth_local_actor = system.get(REACT_ACTOR_ENUM.FG_AUTH_LOCAL) as Actor<FgAuthLocalV1Machine>;
        // draft.auth_cookie = fg_auth_local_actor.getSnapshot().context.auth_cookie;
        
      });
      return result;
    }

    @boundMethod
    public raise_internal_update ({ context, event, system }: { context: REACT_ADMIN_TOOLBAR_CONTEXT, event: any, system: ActorSystem<any> }) {
      return { type: 'react.admin_toolbox.internal.update' } as const;
    }

    @boundMethod
    public guard_env_is_dev_enabled ({ context, event }: { context: REACT_ADMIN_TOOLBAR_CONTEXT, event: any }) {
      const result = this.$env.development?.enabled ? true : false;
      return result;
    }

    @boundMethod
    public guard_user_is_admin({ context, event }: { context: REACT_ADMIN_TOOLBAR_CONTEXT, event: any }) {
      const result = this.$actor_auth.stateS()?.context?.auth_cookie?.profile?.admin ? true : false;
      return result;
    }
    
}