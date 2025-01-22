import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  selector: 'kppk-react-view-home',
  templateUrl: './entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
  protected $active_route = inject(ActivatedRoute);
  protected $dialog = inject(MAT_RADIO_DEFAULT_OPTIONS);

  protected start_calculation_dialog: undefined | MatDialogRe<any, any>;
  // constructor() {
    // super()
    // this.$active_route.queryParams.subscribe( values => {
    //   this.$component.$log.warn('3>>>>>>>>>>>PARAMS>>>>>>>>');
    //   console.log( values );
    // });
    // effect( () => {
      // const state = this.state_react_view_home_s()
      // console.log()
      // if( state?.matches( { 'MODAL': 'SHOWN' } ) && this.start_calculation_dialog === undefined) {
      //   this.start_calculation_dialog = this.$dialog.open(
      //     KppkReactHomeStartCalcModalComponent, {
      //     panelClass: 'kppk_react_home_view_modal_panal',
      //     enterAnimationDuration: '250ms',
      //     exitAnimationDuration: '250ms',
      //     autoFocus: true,
      //     disableClose: true,
      //   });
      // } else if( 
      //   this.start_calculation_dialog 
      //   && (state?.matches({ 'MODAL': 'HIDDEN'}) || state?.matches({ 'MODAL': 'DONE'})) 
      // ) {
      //   this.start_calculation_dialog.close();
      //   this.start_calculation_dialog = undefined;
      // }
    // });
  // }

  protected open_start_calc_modal = ( event: Event ) => {
    event.preventDefault();
    // this.actor_react_view_home_s()?.send({ type: 'react.view.home.event.modal.open' });
  };
}
