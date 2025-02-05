import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  CanMatch,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
  UrlSerializer,
} from '@angular/router';
import { Component, inject, Injectable, } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { FgEventService } from '@kppk/fg-lib-new';
import { ReactRunningV7MachineActorService } from '../../machine';
import { merge, of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { z } from 'zod';
import { AnyStateMachine, SnapshotFrom } from 'xstate';

export const fg_navigation_guard_data_parser = z.object({
  component: z.custom<any>().optional(), 
  currentRoute: z.custom<ActivatedRouteSnapshot>().optional(), 
  currentState: z.custom<RouterStateSnapshot>().optional(),
  nextState: z.custom<RouterStateSnapshot>().optional(),
  snapshot: z.custom<SnapshotFrom<AnyStateMachine>>().optional(),
})

export type FG_NAVIGATION_GUARD_DATA = z.infer<typeof fg_navigation_guard_data_parser>;

@Injectable({
  providedIn: 'root'
})
export class KppkReactNavigationGuard implements CanActivate, CanDeactivate<any> {


    protected $actor_running = inject(ReactRunningV7MachineActorService);
    protected $event = inject(FgEventService);
    // protected $environment_injector = inject(EnvironmentInjector);
    // protected $injector = inject(Injector);
    protected $url_serializer = inject(UrlSerializer);
    protected $dialog = inject(MatDialog);

    protected dialog_ref: MatDialogRef<any, FG_NAVIGATION_GUARD_DATA> | undefined;
    // protected default_dialog_module;


    // protected  lazy_load_deactivate_dialog_component( host: Component ) {
    //   // 1. lazy load the barrel file
    //   import('./deactivate_guard_default_dialog.component').then((m) => {
  

    //   // if(this.default_dialog_module === undefined) {
    //   //   this.default_dialog_module = m;
    //   // } 
    //   // const childEnvironmentInjector = createEnvironmentInjector(
    //   //   this.$environment_injector,
    //   // );
  
    //     // 3. instantiate a lazy component, passing:
    //     //      the parent component's element `Injector`
    //     //      and the just created child `EnvironmentInjector`
    //   // const dialog_component = createComponent(m.DeactivateGuardDefaultDialogComponent, {
    //     //   environmentInjector: childEnvironmentInjector,
    //     //   elementInjector: this.$injector,
    //     // });
  
    //   });
    // }

    protected disallow_navigation_for_router_disabled$ = this.$actor_running.state$.pipe( 
      filter( snapshot => snapshot.matches({'ROUTER': 'DISABLED'})),
      map( _ => {
        return false;
      }
      )
    );

    protected resolve_for_navigation_for_router_blocked$(component: any, currentRoute?: ActivatedRouteSnapshot, currentState?: RouterStateSnapshot, nextState?: RouterStateSnapshot ) {
      return this.$actor_running.state$.pipe(
        filter( 
          snapshot => snapshot.matches({'ROUTER': 'BLOCKED'}) 
          && snapshot.matches({'ROUTER': {'BLOCKED': 'IDEL'}}) === false 
        ),
        switchMap( snapshot => {
          // if routing is in request permission state 
          if(snapshot.matches({'ROUTER': { 'BLOCKED': 'REQUEST_PERMISSION'}})) {
            // check if component has a custom deactivation dialog
            if( component?.deactivation_dialog) {
              this.dialog_ref = this.$dialog.open<any, FG_NAVIGATION_GUARD_DATA>(
                component.deactivation_dialog,
                {
                  data: {
                    component,
                    currentRoute,
                    currentState,
                    nextState,
                    snapshot
                  }
                }
              );
              const dialog_result$ = this.dialog_ref.afterClosed().pipe( map( value => {
                const parsed_value = z.boolean().optional().parse(value);
                return parsed_value ? true : false;
              })).pipe(
                // If dialog was closed by passing true/false update machine
                tap( accepted_or_declined => this.send_permission_request_answer_event( accepted_or_declined ))
              );
              return dialog_result$;
            }
            // Otherwise use default confirm dialog
            const confirm_result = confirm('ALLOW NAVIGATION');
            // and updated machine based on result
            this.send_permission_request_answer_event( confirm_result );
            return of( confirm_result );
          } else {
            // if custom dialog didn't close but machine resolved to 
            // ACCEPTED or DECLINED close dialog
            if( this.dialog_ref ) {
              this.dialog_ref.close();
              this.dialog_ref = undefined;
            }
            if(snapshot.matches({'ROUTER': { 'BLOCKED': 'ACCEPTED'}})) {
              // If confirm dialog
              return of(true);
            } else if(snapshot.matches({'ROUTER': { 'BLOCKED': 'DECLINED'}})) {
              return of(false);
            } else {
              throw new Error(
                this.create_error_msg('resolve_for_navigation_for_router_blocked$ received unhandeled state', snapshot),
              )
            }
          }
        })
      );
    } 


    protected resolve_navigation_for_router_enabled$ = this.$actor_running.state$.pipe( 
      filter( snapshot => 
        // If normal routing is enabled
        snapshot.matches({'ROUTER': 'ENABLED'}) 
        // wait for navigation to reach state allow or redirect
        && ( 
          snapshot.matches({'NAVIGATION': 'ALLOW'}) 
          // || snapshot.matches({'NAVIGATION': 'REDIRECT'}) 
      )
      ),
      map( snapshot => {
        if( snapshot.matches({'NAVIGATION': 'ALLOW'}) ) {
          // allow navigation
          return true;
        } 
        // else if( snapshot.matches({'NAVIGATION': 'REDIRECT'}) ) {
        //   return this.$url_serializer.parse( snapshot.context.actived_url );
        // }
        else {
          throw new Error(
            this.create_error_msg('resolve_navigation_for_router_enabled$ received unhandeled state', snapshot),
          )
        }
      })
    );  
  
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return merge(
          this.resolve_navigation_for_router_enabled$,
          // this.disallow_navigation_for_router_disabled$,
        )
    }

    public canDeactivate(component: Component, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return merge(
          // this.resolve_navigation_for_router_enabled$,
          // this.disallow_navigation_for_router_disabled$,
          // this.resolve_for_navigation_for_router_blocked$(component, currentRoute, currentState, nextState),
        )
    }

    protected send_permission_request_answer_event(accept_or_declined: boolean) {
      if( accept_or_declined === true) {
        this.$actor_running.send({ type: 'fg.navigation.event.permission_request.accept'})
      } else {
        this.$actor_running.send({ type: 'fg.navigation.event.permission_request.decline'})
      }
    }

    protected create_error_msg(msg: string, snapshot: SnapshotFrom<AnyStateMachine>) {
      return 'ERROR: ' + msg + '\n' + ' from machine: ' + snapshot.machine.id + ' with value of: ' + snapshot.value + '!';
    }

}
