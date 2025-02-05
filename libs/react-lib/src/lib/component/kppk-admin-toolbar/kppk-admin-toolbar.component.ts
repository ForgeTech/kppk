import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import {
  ReactAdminToolbarMachineActorService,
  ReactInitMachineActorService,
} from '../../machine';
import { toSignal } from '@angular/core/rxjs-interop';
import { FgTranslate } from '@kppk/fg-lib-new';
import { FgXstateService } from '../../service';

/**
 * KppkAdminToolbarComponent -
 * Admin Toolbar for Kppk React Application
 */
@Component({
  selector: 'kppk-admin-toolbar, [kppk-admin-toolbar]',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  templateUrl: './kppk-admin-toolbar.component.html',
  styles: [`
    .xs kppk-admin-toolbar {
      .headline {
        display: none;
      }
    } 
  `],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ReactAdminToolbarMachineActorService
  ]
})
export class KppkAdminToolbarComponent {
  protected $actor_admin_toolbar = inject(ReactAdminToolbarMachineActorService);
  protected $translate = inject(FgTranslate);
  protected $xstate = inject(FgXstateService);
  public $element_ref = inject(ElementRef);
  public showS = input<boolean>(true, {alias: 'show'});

  protected translationS = toSignal(
    this.$translate.get_translations$({
      alt_xstate: 'admin',
      headline_admin_toolbar: 'admin',
      headline_error_admin_toolbar: 'admin',
      label_authorization: 'admin',
      label_calculation: 'admin',
      label_refresh_admin_toolbar: 'admin',
      tooltip_authorization: 'admin',
      tooltip_calculation: 'admin',
      tooltip_refresh_admin_toolbar: 'admin',
      tooltip_xstate: 'admin',
    }),
    { initialValue: undefined }
  );

  protected admin_toolbar_disabledS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches('RUNNING')
    ? false
    : true;
  });
  protected admin_toolbar_errorS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches('ERROR')
    ? true
    : false;
  });

  protected authorization_is_onS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches({ 'RUNNING': {'AUTHORIZATION': 'ON'}})
      ? true
      : false;
  });

  protected test_calculation_is_onS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches({ 'RUNNING': {'TEST_CALCULATION': 'ON'}})
      ? true
      : false;
  });

  protected xstate_is_onS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches({ 'RUNNING': {'X_STATE': 'ON'}})
      ? true
      : false;
  });

  constructor() {
    this.$actor_admin_toolbar.start();
    this.$actor_admin_toolbar.state$.subscribe({
      next: value => {
        console.log('FARK_FARK_FARK');
        console.log( value )
      }
    })
    // effect( () => {
    //   if( this.authorization_is_onS() ){
    //     console.log('AUTHORIZATION: ON')
    //   } else {
    //     console.log('AUTHORIZATION: OFF')
    //   }
    // });
    // effect( () => {
    //     if( this.test_calculation_is_onS() ){
    //       console.log('TEST_CALCULATION: ON')
    //     } else {
    //       console.log('TEST_CALCULATION: OFF')
    //     }
    // });
    // effect(() => {
    //   if (this.xstate_is_onS()) {
    //     this.$xstate.start();
    //   } else {
    //     this.$xstate.stop();
    //   }
    // });
  }

  protected toggle_authorization(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar.send({
      type: 'react.admin_toolbox.event.x_state.toggle',
    });
    if( this.authorization_is_onS() ){
      console.log('AUTHORIZATION: ON')
    } else {
      console.log('AUTHORIZATION: OFF')
    }
  }

  protected toggle_xstate(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar.send({
      type: 'react.admin_toolbox.event.x_state.toggle',
    });
    if( this.xstate_is_onS() ){
      console.log('XSTATE: ON');
      this.$xstate.start();
    } else {
      console.log('XSTATE: OFF')
      this.$xstate.stop();
    }
  }

  protected toggle_test_calculation(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar?.send({
      type: 'react.admin_toolbox.event.test_calculation.toggle',
    });
    // if (this.xstate_is_onS()) {
    //   this.$xstate.start();
    // } else {
    //   this.$xstate.stop();
    // }
  }

  protected refresh_admin_toolbar(event: Event) {
    event.preventDefault();
    this.$actor_admin_toolbar?.send({
      type: 'react.admin_toolbox.event.refresh',
    });
  }

}
