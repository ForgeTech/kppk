import { ChangeDetectionStrategy, Component, ViewEncapsulation, effect, inject } from '@angular/core';
import { FgCommonModule } from '@kppk/fg-lib-new';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { KppkReactDefaultLayoutComponent } from '../../layout/kppk-react-default-layout/kppk-react-default-layout.component';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideTranslocoScope } from '@jsverse/transloco';
import { KppkReactHomeStartCalcModalComponent } from './component/kppk-react-home-start-calc-modal/kppk-react-home-start-calc-modal.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'kppk-react-home-view',
  
  imports: [ 
    FgCommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    KppkReactDefaultLayoutComponent,
    KppkReactHomeStartCalcModalComponent 
  ],
  templateUrl: './kppk-react-home-view.component.html',
  styleUrl: './kppk-react-home-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('general', 'home')
  ]
})
export class KppkReactHomeViewComponent  {
  protected $active_route = inject(ActivatedRoute);
  protected $dialog = inject(MatDialog);

  protected start_calculation_dialog: undefined | MatDialogRef<any, any>;
  constructor() {
    super()
    // this.$active_route.queryParams.subscribe( values => {
    //   this.$component.$log.warn('3>>>>>>>>>>>PARAMS>>>>>>>>');
    //   console.log( values );
    // });
    effect( () => {
      const state = this.state_react_view_home_s()
      // console.log()
      if( state?.matches( { 'MODAL': 'SHOWN' } ) && this.start_calculation_dialog === undefined) {
        this.start_calculation_dialog = this.$dialog.open(
          KppkReactHomeStartCalcModalComponent, {
          panelClass: 'kppk_react_home_view_modal_panal',
          enterAnimationDuration: '250ms',
          exitAnimationDuration: '250ms',
          autoFocus: true,
          disableClose: true,
        });
      } else if( 
        this.start_calculation_dialog 
        && (state?.matches({ 'MODAL': 'HIDDEN'}) || state?.matches({ 'MODAL': 'DONE'})) 
      ) {
        this.start_calculation_dialog.close();
        this.start_calculation_dialog = undefined;
      }
    });
  }

  protected open_start_calc_modal = ( event: Event ) => {
    event.preventDefault();
    this.actor_react_view_home_s()?.send({ type: 'react.view.home.event.modal.open' });
  };
}
