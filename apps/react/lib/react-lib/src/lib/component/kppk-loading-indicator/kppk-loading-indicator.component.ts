import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * XstateLoadingIndicatorComponent -
 * Loading Indicator for XState-Application
 */
@Component({
  selector: 'kppk-loading-indicator',
  standalone: true,
  imports: [ MatProgressSpinnerModule ],
  templateUrl: './kppk-loading-indicator.component.html',
  styleUrls: ['./kppk-loading-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkLoadingIndicatorComponent {}
