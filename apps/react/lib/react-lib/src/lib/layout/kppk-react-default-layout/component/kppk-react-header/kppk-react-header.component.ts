import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import { FgCommonModule, FgLayoutDrawerOpenDrawerButtonComponent, FgMaterialModule } from '@fg-kppk/fg-base';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { KppkReactBaseComponent } from 'apps/fg-react-demo/src/app/base/xstate-base/kppk-react-base.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FgPagedjsService } from 'apps/fg-react-demo/src/app/service/fg-pagedjs.service';
import { ROUTES_ENUM } from 'apps/fg-react-demo/src/app/app.routes';

/**
 * RoseHeaderComponent -
 * Header-component for R.E.A.C.T.® application
 */
@Component({
  selector: '[kppk-react-header]',
  standalone: true,
  imports: [
    FgMaterialModule,
    FgCommonModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    FgLayoutDrawerOpenDrawerButtonComponent,
    MatTooltipModule
  ],
  templateUrl: './kppk-react-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./kppk-react-header.component.scss']
})
export class KppkReactHeaderComponent extends KppkReactBaseComponent {
  protected $pagedjs = inject(FgPagedjsService)
  protected route_calc = ROUTES_ENUM.CALC;
  protected route_calc_print = ROUTES_ENUM.CALC_PRINT;
  protected is_authorized_s = computed( () => {
    return this.state_auth_s()?.matches( {'STATE': 'AUTHORIZED' })
  });
  /** Dispatch logout event */
  public logout( event: Event ) {
    event.preventDefault();
    this.actor_auth_s()?.send({ type: 'fg.auth.local.event.logout' } );
  }
  /** Dispatch print event */
  public print( event: Event ) {
    event.preventDefault();
    // this.actor_auth_s()?.send({ type: 'fg.auth.local.event.logout' } );
  }
}
