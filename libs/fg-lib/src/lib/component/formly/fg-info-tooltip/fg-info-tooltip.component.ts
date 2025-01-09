import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FgCommonModule } from '../../../module/fg-common/fg-common.module';
import { FgComponentBaseComponent } from '../../../base/fg-component-base.component';
import { FgComponentBaseService } from '../../../base/fg-component-base.service';
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
  standalone: true,
  imports: [FgCommonModule, MatIconModule, MatTooltipModule],
})
export class FgInfoTooltipComponent extends FgComponentBaseComponent {
  /** The text to be displayed in tooltip*/
  @Input()
  public text = '';
  /** CONSTRUCTOR */
  constructor() {
    super();
  }
}
