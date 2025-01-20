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
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="react_view_login">ReactViewLogin</a></li>
      <li><a routerLink="react_view_home">ReactViewHome</a></li>
      <li><a routerLink="react_view_calc">ReactViewCalc</a></li>
    </ul>
    <router-outlet/>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  protected $icon = inject(KppkRegisterIconsService);
  protected $app = inject(AppService);
  protected $appRef = inject(ApplicationRef);
  
  public title = 'kppk-react';
      protected $dialog = inject(MatDialog);
      protected $actor_spinner = inject(FgSpinnerMachineActorService);
      protected dialog_ref: MatDialogRef<any, any> | undefined;
      protected dialog_toggleE = effect( () => {
          const state = this.$actor_spinner.stateS();
          if( state?.matches({DISPLAY: 'SHOWN'}) ) {
            if( this.dialog_ref === undefined ) {
              this.dialog_ref = this.$dialog.open(KppkReactLoadingIndicatorComponent, {
                backdropClass: 'fg_spinner_modal_backdrop',
                panelClass: 'fg_spinner_modal_panal',
                enterAnimationDuration: '200ms',
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
}
