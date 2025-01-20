import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, effect, inject, isDevMode, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { REACT_VIEW_CALCULATION_CONTEXT } from '../../types/kppk-react-calculation.types';
import { CommonModule } from '@angular/common';
import { FgAuthLocalMachineActorService, ReactInitMachineActorService } from '../../machine';

/**
 * KppkAdminToolbarComponent -
 * Admin Toolbar for Kppk React Application
 */
@Component({
  selector: 'kppk-admin-toolbar',
  
  imports: [ 
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule 
  ],
  templateUrl: './kppk-admin-toolbar.component.html',
  styleUrls: ['./kppk-admin-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkAdminToolbarComponent  {
  protected $auth = inject(FgAuthLocalMachineActorService);
  protected $init = inject(ReactInitMachineActorService);

  public show_admin_toolbarS = computed( () => {
    return isDevMode() || this.$auth.stateS()?.matches({'STATE': 'AUTHORIZED'}) ? true : false;;
  });
  protected xstate_is_onS = computed( () => {
    // return this.state_react_running_admin_toolbar_s()?.matches({'X_STATE': 'ON'}) ? true : false;
  });
  protected test_calculation_is_onS = computed( () => {
    // return this.state_react_running_admin_toolbar_s()?.matches({'TEST_CALCULATION': 'ON'}) ? true : false;
  });
  protected inspector_activesS = signal(false);

  constructor(){
    if( this.$init.is_runningS() === false ) {
      this.$init.start();
    }
    // effect( () => {
    //   const show_admin_toolbar_s = this.show_admin_toolbar_s();
    //   console.log('>>>>>>>>>>>>>>SHOW_ADMIN_TOOLBAR>>>>>>>>');
    //   console.log(show_admin_toolbar_s);
    // });
    effect( () => {
      const init = this.$init.stateS();
      if( init ) {
        console.log('>>>>>>>>>>>>>>SHOW_INIT_STATE>>>>>>>>');
        console.log(init.context);
      }
    });
    // effect( () => {
    //   // console.log('>>>>>>>>>>>>>>XSTATE>>>>>>>>>>>');
    //   // console.log( this.xstate_is_on_s() );
    //   if( this.xstate_is_on_s() ) {
    //     this.$xstate.start();
    //   } else {
    //     this.$xstate.stop();
    //   }
    // })
    // effect( () => {
    //     // console.log('>>>>>>>>>>>>>>TEST_CALCILATION>>>>>>>>>>>');
    //     // console.log( this.test_calculation_is_on_s() );
    //     const test_calculation_is_on = this.test_calculation_is_on_s();
    //     untracked(() => {
    //       const payload = this.state_react_running_s()?.context.init_output?.debug_calculation_v1;
    //       const calculation = this.state_react_running_s()?.context.calculation;
    //       if( test_calculation_is_on === true && calculation === undefined && payload  ) {
    //         const event: { type: "react.running.event.calculation.start",  payload: REACT_VIEW_CALCULATION_CONTEXT } = { type: 'react.running.event.calculation.start', payload }
    //         this.actor_react_running_s()?.send(event);
    //       } else if ( test_calculation_is_on === false) {
    //         this.actor_react_running_s()?.send({ type: 'react.running.event.calculation.cancel'});
    //       }
    //     });

    // }, { allowSignalWrites: true})
  }

  protected toggle_xstate( event: MatSlideToggleChange ) {
    // this.actor_react_running_admin_toolbar_s()?.send({ type: 'react.admin_toolbox.event.x_state.toggle' });
  }
  protected toggle_test_calculation( event: MatSlideToggleChange ) {
    // this.actor_react_running_admin_toolbar_s()?.send({ type: 'react.admin_toolbox.event.test_calculation.toggle' });
  }
}
