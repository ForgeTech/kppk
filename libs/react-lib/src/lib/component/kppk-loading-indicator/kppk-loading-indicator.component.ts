import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * KppkLoadingIndicatorComponent -
 * Loading Indicator for KPPK React-Application
 */
@Component({
  selector: 'kppk-react-loading-indicator',

  imports: [MatProgressSpinnerModule, CommonModule],
  template: `
    <div class="relative"
      [ngClass]="{
        'grayscale': disabledS()
      }"
    >
      <mat-progress-spinner
        class="z-0 h-32 w-32"
        [ngClass]="{
          'opacity-15': disabledS()
        }"
        [color]="colorS()"
        [value]="100"
        [mode]="disabledS() ? 'determinate' : 'indeterminate'"
      ></mat-progress-spinner>
      <img
        class="absolute right-[2px] top-[30px] z-10 w-24"
        [ngClass]="{
          'opacity-75': disabledS()
        }"
        alt="KPPK Logo"
        src="./images/kppk/kppk-logo.svg"
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
export class KppkReactLoadingIndicatorComponent {
  public colorS = input('accent', { alias: 'color'});
  public disabledS = input(false, { alias: 'disabled'});
}
