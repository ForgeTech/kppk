import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FgAuthLocalMachineActorService,
  KppkFormlyModule,
  KppkReactSharedService,
} from '@kppk/react-lib';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { HOST_ROUTES } from '@kppk/react-lib';
import { KppkReactViewAuthLayoutContentComponent } from '../../layout';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  imports: [
    CommonModule,
    KppkFormlyModule,
    MatButtonModule,
    MatIconModule,
    KppkReactViewAuthLayoutContentComponent
  ],
  selector: 'kppk-react-view-auth-logout',
  templateUrl: './kppk-react-view-auth-logout.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthLogoutComponent {
  protected HOST_ROUTES = HOST_ROUTES;
  protected $translate = inject(FgTranslate);
  protected $auth_actor = inject(FgAuthLocalMachineActorService);
  protected translations$ = this.$translate.get_translations$({
    "headline_auth_logout": "auth", 
    "error_auth_logout": "auth", 
    "success_auth_logout": "auth", 
    "label_back": "general", 
    "label_send": "general", 
  });
  protected translationsS = toSignal(
    this.translations$,
    { initialValue: undefined }
  );

  protected errorS = computed( () => {
    return false;
  })
  protected successS = computed( () => {
    return false;
  })
  protected pendingS = computed( () => {
    return false;
  })

  protected action(event?: Event) {
    // event?.preventDefault();
    // const event_to_dispatch = {
    //   type: 'fg.password_change.event.' as const,
    //   payload: this.form.value
    // };
    // this.$auth_actor.send(event_to_dispatch);
  }
}
