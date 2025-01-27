import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * FGInfoTooltipComponent -
 * Component to display a simple tooltip
 */
@Component({
  selector: 'fg-info-tooltip',
  templateUrl: './fg-info-tooltip.component.html',
  styleUrls: ['./fg-info-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
})
export class FgInfoTooltipComponent {
  /** The text to be displayed in tooltip*/
  @Input()
  public text = '';
}
