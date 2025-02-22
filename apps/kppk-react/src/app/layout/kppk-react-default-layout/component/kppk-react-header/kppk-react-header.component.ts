import { Component, ElementRef, ViewEncapsulation, computed, inject } from '@angular/core';
import { FgLayoutDrawerOpenButtonComponent, FgTranslate } from '@kppk/fg-lib-new';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FgAuthLocalMachineActorService, FgSpinnerMachineActorService, HOST_ROUTES } from '@kppk/react-lib';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * RoseHeaderComponent -
 * Header-component for R.E.A.C.T.® application
 */
@Component({
  selector: 'kppk-react-header, [kppk-react-header]',

  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FgLayoutDrawerOpenButtonComponent,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  templateUrl: './kppk-react-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [``],
})
export class KppkReactHeaderComponent {
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected $actor_spinner = inject(FgSpinnerMachineActorService);
  protected $translate = inject(FgTranslate);
  protected HOST_ROUTES = HOST_ROUTES;
  public $element_ref = inject(ElementRef);

  protected translationsS = toSignal(
    this.$translate.get_translations$({
      "alt_react_logo": "general",
      "label_login": "general",
      "label_logout": "general",
      "label_print": "general",
    }),
    { initialValue: undefined }
  );

  protected auth_is_authorizedS = computed(() => {
    return this.$actor_auth.stateS()?.matches({ STATE: 'AUTHORIZED' }) ?? false;
  }); 

  protected spinner_is_pendingS = computed(() => {
    const matches_idel =  this.$actor_spinner.stateS()?.matches({'DISPLAY': {
      'HIDDEN': 'IDEL'
    }});
    return matches_idel ? false : true;
  })

  public print(event: Event) {
    event.preventDefault();
    // this.actor_auth_s()?.send({ type: 'fg.auth.local.event.logout' } );
  }
}
