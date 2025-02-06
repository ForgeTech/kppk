import { Component, ElementRef, ViewEncapsulation, inject } from '@angular/core';
import { FgLayoutDrawerOpenButtonComponent } from '@kppk/fg-lib-new';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatTooltipModule } from '@angular/material/tooltip';
// import { FgPagedjsService } from 'apps/fg-react-demo/src/app/service/fg-pagedjs.service';
// import { ROUTES_ENUM } from 'apps/fg-react-demo/src/app/app.routes';
import { CommonModule } from '@angular/common';
import { HOST_ROUTES, KppkReactSharedService } from '@kppk/react-lib';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  protected $shared = inject(KppkReactSharedService);
  protected HOST_ROUTES = HOST_ROUTES;
  public $element_ref = inject(ElementRef);



  public print(event: Event) {
    event.preventDefault();
    // this.actor_auth_s()?.send({ type: 'fg.auth.local.event.logout' } );
  }
}
