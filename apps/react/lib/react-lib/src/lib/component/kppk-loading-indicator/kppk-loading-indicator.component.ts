import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * KppkLoadingIndicatorComponent -
 * Loading Indicator for KPPK React-Application
 */
@Component({
  selector: 'kppk-react-loading-indicator',
  
  imports: [ MatProgressSpinnerModule ],
  template: `
  <div class="relative">
    <mat-progress-spinner
      class="z-0 h-32 w-32"
      color="accent"
      mode="indeterminate"
    ></mat-progress-spinner>
    <img
      class="absolute right-[2px] top-[30px] z-10 w-24"
      alt="KPPK Logo"
      src="././images/kppk/kppk-logo.svg"
    />
  </div>
  `,
  styles: `
  .fg_spinner_modal_backdrop {
      background-color: rgba(255, 255, 255);
    // background-color: red;
  }
  .fg_spinner_modal_panal {
    .mat-mdc-dialog-container {
      .mdc-dialog__surface {
        background-color: transparent !important;
        box-shadow: none;
      }
    }
  }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactLoadingIndicatorComponent {}
