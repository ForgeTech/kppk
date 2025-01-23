import {  ApplicationRef, Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { FgSpinnerMachineActorService, KppkReactLoadingIndicatorComponent, KppkRegisterIconsService } from '@kppk/react-lib';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  imports: [
    RouterModule, 
    KppkReactLoadingIndicatorComponent
  ],
  selector: 'kppk-react-root',
  template: `
    <router-outlet/>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  protected $actor_spinner = inject(FgSpinnerMachineActorService);
  protected $app = inject(AppService);
  // protected $appRef = inject(ApplicationRef);
  protected $dialog = inject(MatDialog);
  protected $icon = inject(KppkRegisterIconsService);

  protected dialog_ref: MatDialogRef<any, any> | undefined;
  protected dialog_toggleE = effect( () => {
      const state = this.$actor_spinner.stateS();
      if( state?.matches({DISPLAY: 'SHOWN'}) ) {
        if( this.dialog_ref === undefined ) {
          this.dialog_ref = this.$dialog.open(KppkReactLoadingIndicatorComponent, {
            backdropClass: 'fg_spinner_modal_backdrop',
            panelClass: 'fg_spinner_modal_panal',
            enterAnimationDuration: this.$app.app_readyS() ? '200ms' : '0',
            exitAnimationDuration: '500ms',
            autoFocus: true,
            restoreFocus: true,
            disableClose: true,
          });
        }
      }
      else if( state?.matches({DISPLAY: 'HIDDEN'}) || state?.matches({DISPLAY: 'DONE'})) {
          this.dialog_ref?.close();
      }
  });
  public title = 'kppk-react';
}
