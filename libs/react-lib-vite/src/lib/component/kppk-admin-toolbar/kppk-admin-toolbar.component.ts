import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
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
  selector: 'kppk-admin-toolbar',

  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  templateUrl: './kppk-admin-toolbar.component.html',
  styleUrls: ['./kppk-admin-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkAdminToolbarComponent {
  protected $actor_admin_toolbar = inject(ReactAdminToolbarMachineActorService);
  protected $actor_react_init = inject(ReactInitMachineActorService);
  protected $translate = inject(FgTranslate);
  protected $xstate = inject(FgXstateService);

  public showS = input<boolean>(false, { alias: 'show' });

  protected disabled_test_calculationS = computed(() => {
    let disabled = true;
    const status = this.$actor_react_init.stateS()?.status;
    if (status === 'done') {
      disabled = false;
    }
    return disabled;
  });

  protected translationS = toSignal(
    this.$translate.get_translations$({
      alt_xstate: 'admin',
      development_tools: 'admin',
      test_calculation: 'admin',
      tooltip_test_calculation: 'admin',
      tooltip_xstate: 'admin',
    }),
    { initialValue: undefined }
  );

  protected xstate_is_onS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches({ X_STATE: 'ON' })
      ? true
      : false;
  });
  protected test_calculation_is_onS = computed(() => {
    return this.$actor_admin_toolbar
      .stateS()
      ?.matches({ TEST_CALCULATION: 'ON' })
      ? true
      : false;
  });
  protected inspector_activesS = signal(false);

  constructor() {
    this.$actor_admin_toolbar.start();
    if (this.$actor_react_init.is_runningS() === false) {
      this.$actor_react_init.start();
    }
    effect(() => {
      const init = this.$actor_admin_toolbar.stateS();
      if (init) {
        console.log('>>>>>>>>>>>>>>ADMIN_TOOLBAR>>>>>>>>');
        console.log(init.context);
      }
    });
    effect(() => {
      if (this.xstate_is_onS()) {
        this.$xstate.start();
      } else {
        this.$xstate.stop();
      }
    });
    effect(
      () => {
        // console.log('>>>>>>>>>>>>>>TEST_CALCILATION>>>>>>>>>>>');
        // console.log( this.test_calculation_is_on_s() );
        const test_calculation_is_on = this.test_calculation_is_onS();
        untracked(() => {
          // const payload = this.state_react_running_s()?.context.init_output?.debug_calculation_v1;
          // const calculation = this.state_react_running_s()?.context.calculation;
          // if( test_calculation_is_on === true && calculation === undefined && payload  ) {
          //   const event: { type: "react.running.event.calculation.start",  payload: REACT_VIEW_CALCULATION_CONTEXT } = { type: 'react.running.event.calculation.start', payload }
          //   this.actor_react_running_s()?.send(event);
          // } else if ( test_calculation_is_on === false) {
          //   this.actor_react_running_s()?.send({ type: 'react.running.event.calculation.cancel'});
          // }
        });
      },
      { allowSignalWrites: true }
    );
  }

  protected toggle_xstate(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar.send({
      type: 'react.admin_toolbox.event.x_state.toggle',
    });
  }
  protected toggle_test_calculation(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar?.send({
      type: 'react.admin_toolbox.event.test_calculation.toggle',
    });
  }
}
