import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { KppkReactSharedService, ReactInitMachineActorService, ReactViewHomeMachineActorService } from '@kppk/react-lib';
import { MatButtonModule } from '@angular/material/button';
import { NGXLogger } from 'ngx-logger';
import { KppkReactHomeStartCalcModalComponent } from './component/kppk-react-home-start-calc-modal/kppk-react-home-start-calc-modal.component';

@Component({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
  ],
  selector: 'kppk-react-view-home',
  templateUrl: './entry.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100%;
    }
    .home-filler-container {
      background-color: #a2b819;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
  protected $active_route = inject(ActivatedRoute);
  protected $dialog = inject(MatDialog);
  protected $log = inject(NGXLogger);
  protected $shared = inject(KppkReactSharedService);
  protected $actor_react_view_home = inject(ReactViewHomeMachineActorService);
  protected $actor_react_init = inject(ReactInitMachineActorService);

  protected ref_start_calculation_dialog: undefined | MatDialogRef<any, any>;
  constructor() {
    if( this.$actor_react_init.is_runningS() === false ) {
      this.$actor_react_init.start();
    }
    this.$actor_react_view_home.start()

    effect( () => {
      const state = this.$actor_react_view_home.stateS();
      if( state?.matches( { 'MODAL': 'SHOWN' } ) && this.ref_start_calculation_dialog === undefined) {
        this.ref_start_calculation_dialog = this.$dialog.open(
          KppkReactHomeStartCalcModalComponent, {
          panelClass: 'kppk_react_home_view_modal_panal',
          enterAnimationDuration: '250ms',
          exitAnimationDuration: '250ms',
          autoFocus: true,
          disableClose: true,
        });
      } else if( 
        this.ref_start_calculation_dialog 
        && (state?.matches({ 'MODAL': 'HIDDEN'}) || state?.matches({ 'MODAL': 'DONE'})) 
      ) {
        this.ref_start_calculation_dialog.close();
        this.ref_start_calculation_dialog = undefined;
      }
    });
  }

  protected open_start_calc_modal = ( event: Event ) => {
    event.preventDefault();
    this.$actor_react_view_home.send({ type: 'react.view.home.event.modal.open' });
  };
}
