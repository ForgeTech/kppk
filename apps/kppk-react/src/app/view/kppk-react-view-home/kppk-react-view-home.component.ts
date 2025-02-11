import { ActivatedRoute } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkReactHomeStartCalcModalComponent } from './component/kppk-react-home-start-calc-modal/kppk-react-home-start-calc-modal.component';
import {
  ReactViewHomeMachineActorService,
} from '@kppk/react-lib';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NGXLogger } from 'ngx-logger';
import { toSignal } from '@angular/core/rxjs-interop';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  imports: [
    CommonModule,
    // FgLayoutDefaultComponent,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
  ],
  selector: 'kppk-react-view-home',
  templateUrl: './kppk-react-view-home.component.html',
  styles: [
    `
      :host {
        display: block;
        min-height: 100%;
        height: 100%;
      }
      .kppk_react_home_view_modal_panal {
        background-color: red;
      }
      // .home-filler-container {
      //   background-color: #a2b819;
      // }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewHomeComponent {
  protected $active_route = inject(ActivatedRoute);
  protected $dialog = inject(MatDialog);
  protected $translate = inject(FgTranslate);
  protected $log = inject(NGXLogger);
  protected $actor_react_view_home = inject(ReactViewHomeMachineActorService);
  
  protected kppk_react_home_translationsS = toSignal(
    this.$translate.get_translations$({
      "headline_welcome": "home",
      "text_welcome": "home",
      "label_calculation_start": "general",
      "alt_pictogram_material": "home",
      "alt_pictogram_construction_site": "home",
      "alt_pictogram_container_village": "home",
      "alt_pictogram_demolish_disposal": "home",
      "alt_pictogram_excavation_pit": "home",
      "alt_pictogram_heating_system": "home",
    }), {initialValue: undefined}
  );
  protected ref_start_calculation_dialog: undefined | MatDialogRef<any, any>;

  constructor() {
    // if (this.$actor_react_init.is_runningS() === false) {
    //   this.$actor_react_init.start();
    // }
    // this.$actor_react_view_home.start();

    effect(() => {
      const state = this.$actor_react_view_home.stateS();
      if (
        state?.matches({ MODAL: 'SHOWN' }) &&
        this.ref_start_calculation_dialog === undefined
      ) {
        this.ref_start_calculation_dialog = this.$dialog.open(
          KppkReactHomeStartCalcModalComponent,
          {
            enterAnimationDuration: '250ms',
            exitAnimationDuration: '250ms',
            height: '600px',
            minWidth: '300px',
            width: '95%',
            maxWidth: '600px',
            autoFocus: true,
            disableClose: true,
          }
        );
      } else if (
        this.ref_start_calculation_dialog &&
        (state?.matches({ MODAL: 'HIDDEN' }) ||
          state?.matches({ MODAL: 'DONE' }))
      ) {
        this.ref_start_calculation_dialog.close();
        this.ref_start_calculation_dialog = undefined;
      }
    });
  }

  protected open_start_calc_modal = (event: Event) => {
    event.preventDefault();
    this.$actor_react_view_home.send({
      type: 'react.view.home.event.modal.open',
    });
  };
}
