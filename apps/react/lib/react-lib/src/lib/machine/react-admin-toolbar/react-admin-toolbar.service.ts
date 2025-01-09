import { Injectable, inject } from "@angular/core";
import { FgBaseService, FgImmutableService } from "@kppk/fg-lib";
import { REACT_ADMIN_TOOLBOX_V1, ReactAdminToolbarV1Context } from "./react-admin-toolbar.machine";
import { assign } from "lodash-es";
import { Actor, ActorSystem, raise, sendParent } from "xstate";
import { FgAuthLocalV1Machine } from "../fg-auth-local/fg-auth-local.machine";
import { REACT_ACTOR_ENUM } from "../react-main/react-mainv2.service";

@Injectable({
    providedIn: 'root',
  })
  export class ReactAdminToolbarService extends FgBaseService {
    public machine;
  
    protected $immer = inject(FgImmutableService);
  
    constructor() {
      super();
      this.machine = REACT_ADMIN_TOOLBOX_V1.provide({
        actions: {
            // assign_context_from_system: assign( this.assign_context_from_system ),
            // assign_context_from_input: assign( this.assign_context_from_input ),
            assign_update_context_from_main_auth_actor: assign( this.assign_update_context_from_main_auth_actor ),
            raise_internal_update: raise( this.raise_internal_update ),
        },
        guards: {
          guard_env_is_dev_enabled: this.guard_env_is_dev_enabled,
          guard_user_is_admin: this.guard_user_is_admin,
        }
      });
    }

    // protected assign_context_from_system = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
    //   const result = this.$immer.produce( context, draft => { 
    //     const fg_auth_local_actor = system.get(REACT_ACTOR_ENUM.FG_AUTH_LOCAL) as Actor<FgAuthLocalV1Machine>;
    //     draft.auth_cookie = fg_auth_local_actor.getSnapshot().context.auth_cookie;
    //     const react_main_actor = system.get(REACT_ACTOR_ENUM.REACT_MAIN) as Actor<ReactAppMainV1Machine>;
    //     draft.environment = react_main_actor.getSnapshot().context;
    //   });
    //   return result;
    // }

    // protected assign_context_from_input = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
    //   const result = this.$immer.produce( context, draft => {
    //   });
    //   return result;
    // }

    protected assign_update_context_from_main_auth_actor = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
      const result = this.$immer.produce( context, draft => { 
        const fg_auth_local_actor = system.get(REACT_ACTOR_ENUM.FG_AUTH_LOCAL) as Actor<FgAuthLocalV1Machine>;
        draft.auth_cookie = fg_auth_local_actor.getSnapshot().context.auth_cookie;
        
      });
      return result;
    }

    protected raise_internal_update = ({ context, event, system }: { context: ReactAdminToolbarV1Context, event: any, system: ActorSystem<any> }) => {
      return { type: 'react.admin_toolbox.internal.update' } as const;
    }

    protected guard_env_is_dev_enabled = ({ context, event }: { context: ReactAdminToolbarV1Context, event: any }) => {
      const result = context.environment?.development?.enabled ? true : false;
      return result;
    }

    protected guard_user_is_admin = ({ context, event }: { context: ReactAdminToolbarV1Context, event: any }) => {
      const result = context.auth_cookie ? true : false;
      return result;
    }
    
}