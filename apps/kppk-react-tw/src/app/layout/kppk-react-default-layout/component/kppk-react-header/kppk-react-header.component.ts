import { Component, ViewEncapsulation, computed } from '@angular/core';
import { FgLayoutDrawerOpenButtonComponent } from '@kppk/fg-lib-new';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatTooltipModule } from '@angular/material/tooltip';
// import { FgPagedjsService } from 'apps/fg-react-demo/src/app/service/fg-pagedjs.service';
// import { ROUTES_ENUM } from 'apps/fg-react-demo/src/app/app.routes';
import { CommonModule } from '@angular/common';
import { HOST_ROUTES } from '@kppk/react-lib';
import { MatButtonModule } from '@angular/material/button';

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
    MatTooltipModule
  ],
  templateUrl: './kppk-react-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [``]
})
export class KppkReactHeaderComponent  {
  protected HOST_ROUTES = HOST_ROUTES
  // protected $pagedjs = inject(FgPagedjsService)
  // protected route_calc = ROUTES_ENUM.CALC;
  // protected route_calc_print = ROUTES_ENUM.CALC_PRINT;
  protected is_authorizedS = computed( () => {
    // return this.state_auth_s()?.matches( {'STATE': 'AUTHORIZED' })
    return true;
  });
  /** Dispatch logout event */
  public logout( event: Event ) {
    event.preventDefault();
    // this.actor_auth_s()?.send({ type: 'fg.auth.local.event.logout' } );
  }
  /** Dispatch print event */
  public print( event: Event ) {
    event.preventDefault();
    // this.actor_auth_s()?.send({ type: 'fg.auth.local.event.logout' } );
  }
}
