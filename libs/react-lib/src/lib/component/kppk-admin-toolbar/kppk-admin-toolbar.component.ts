import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
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
  fg_auth_emitted_parser,
  FgAuthLocalMachineActorService,
  REACT_RUNNING_EVENT_CALCULATION_START,
  react_running_event_calculation_start_parser,
  ReactAdminToolbarMachineActorService,
  ReactRunningV7MachineActorService,
} from '../../machine';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
  protected $actor_auth = inject(FgAuthLocalMachineActorService);
  protected $actor_running = inject(ReactRunningV7MachineActorService);
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

  constructor() {
    this.$actor_auth.event$.pipe(takeUntilDestroyed()).subscribe({
      next: event => {
        const parsed_event = fg_auth_emitted_parser.parse(event);
        this.$actor_admin_toolbar.send( parsed_event )
      }
    })
    this.$actor_auth.state$.pipe(takeUntilDestroyed()).subscribe({
      next: snapshot => {
        console.log('SNAPSHOT ADMIN TOOLBAR')
        console.log(snapshot)
      }
    });
    this.$actor_admin_toolbar.start();
  }

  protected admin_toolbar_disabledS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches('RUNNING') ? false : true;
  });
  protected admin_toolbar_errorS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches('ERROR');
  });

  protected authorization_is_onS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches({ 'RUNNING': {'AUTHORIZATION': 'ON'}});
  });

  protected test_calculation_is_onS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches({ 'RUNNING': {'TEST_CALCULATION': 'ON'}});
  });

  protected xstate_is_onS = computed(() => {
    return this.$actor_admin_toolbar.stateS()?.matches({ 'RUNNING': {'X_STATE': 'ON'}});
  });

  protected authorization_stateE = effect( () => {
    if( this.authorization_is_onS() ){
      console.log('AUTHORIZATION: ON')
    } else {
      console.log('AUTHORIZATION: OFF')
    }
  })

  protected test_calculation_stateE = effect( () => {
    if (this.test_calculation_is_onS() ) {
      const calculation = this.$actor_admin_toolbar?.stateS()?.context.debug_culculation_v1;
      console.log('CALCULATION: ON');
      if(calculation) {
        const event_to_dispatch = react_running_event_calculation_start_parser.parse({
          type: 'react.running.event.calculation.start',
          data: {
            calculation
          }
        });
        this.$actor_running?.send(event_to_dispatch);
      }
    } else {
      console.log('CALCULATION: OFF');
    }
  })

  protected xstate_stateE = effect( () => {
    if( this.xstate_is_onS() ){
      console.log('XSTATE: ON');
      this.$xstate.start();
    } else {
      console.log('XSTATE: OFF')
      this.$xstate.stop();
    }
  })

  protected toggle_authorization(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar.send({
      type: 'react.admin_toolbox.event.auth.toggle',
    });
  }

  protected toggle_test_calculation(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar?.send({
      type: 'react.admin_toolbox.event.test_calculation.toggle',
    });
  }

  protected toggle_xstate(event: MatSlideToggleChange) {
    this.$actor_admin_toolbar.send({
      type: 'react.admin_toolbox.event.x_state.toggle',
    });
  }

  protected refresh_admin_toolbar(event: Event) {
    event.preventDefault();
    this.$actor_admin_toolbar?.send({
      type: 'react.admin_toolbox.event.refresh',
    });
  }

}
