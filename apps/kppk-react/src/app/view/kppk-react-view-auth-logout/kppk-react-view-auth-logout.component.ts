import { ChangeDetectionStrategy, Component, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FG_AUTH_LOCAL_EVENT_LOGOUT,
  FgAuthLocalMachineActorService,
  KppkFormlyModule,
  KppkReactLoadingIndicatorComponent,
} from '@kppk/react-lib';
import { delay, filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';
import { FgEnvironmentService, FgTranslate } from '@kppk/fg-lib-new';
import { Router } from '@angular/router';

@Component({
  imports: [
    CommonModule,
    KppkFormlyModule,
    MatButtonModule,
    MatIconModule,
    KppkReactViewAuthLayoutContentComponent,
    KppkReactLoadingIndicatorComponent
  ],
  selector: 'kppk-react-view-auth-logout',
  templateUrl: './kppk-react-view-auth-logout.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class KppkReactViewAuthLogoutComponent {
  protected HOST_ROUTES = HOST_ROUTES;
  protected $translate = inject(FgTranslate);
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected $env = inject(FgEnvironmentService);
  protected $router = inject(Router);
  protected translations$ = this.$translate.get_translations$({
    "error_auth_logout": "auth", 
    "headline_auth_logout": "auth", 
    "label_back": "general", 
    "label_retry": "general", 
    "success_auth_logout_text": "auth", 
    "success_auth_logout": "auth", 
    "text_auth_logout_error": "auth",
    "text_auth_logout_pending": "auth",
    "text_auth_logout_success": "auth",
  });
  protected translationsS = toSignal(
    this.translations$,
    { initialValue: undefined }
  );
  protected errorS = toSignal(
    this.$actor_auth.state$.pipe(
      map(snapshot => snapshot.matches({ 'STATE':{'AUTHORIZED': 'ERROR' }}))
    ), 
    { initialValue: false}
  );
  protected show_successS = signal(false);
  protected successS = toSignal(
    this.$actor_auth.state$.pipe(
      map(snapshot => snapshot.matches({'STATE': 'UNAUTHORIZED'})),
      filter( is_success => is_success ? true : false),
      tap( is_success => this.show_successS.set(is_success)),
      delay(3500)
    ), 
    { initialValue: false}
  );
  protected successE = effect( () => {
    if( this.successS() ) {
      this.$router.navigate([HOST_ROUTES.AUTH, HOST_ROUTES.AUTH_LOGIN]);
    }
  })
  protected pendingS = toSignal(
    this.$actor_auth.state$.pipe(
      map(snapshot => snapshot.matches({ 'STATE':{'AUTHORIZED': 'REVOKE_AUTHORIZATION' }}))
    ), 
    { initialValue: true }
  );

  constructor() {
    if( !this.$env.development?.enabled ) {
      this.logout();
    }
  }

  protected logout(event?: Event) {
    event?.preventDefault();
    const event_to_dispatch: FG_AUTH_LOCAL_EVENT_LOGOUT = {
      type: 'fg.auth.local.event.logout'
    };
    this.$actor_auth.send(event_to_dispatch);
  }
}
