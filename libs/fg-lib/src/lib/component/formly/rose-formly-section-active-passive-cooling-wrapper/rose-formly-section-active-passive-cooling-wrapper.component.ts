import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { FgComponentBaseService } from '../../../../fg-shared/components/fg-component-base/fg-component-base.service';

/**
 * RoseFromlySectionWrapper -
 * Wrapper for a section aka formGroup
 * within a rose-formly form
 */
@Component({
  selector: 'rose-formly-section-active-passive-cooling-wrapper',
  templateUrl: './rose-formly-section-active-passive-cooling-wrapper.component.html',
  styleUrls: ['./rose-formly-section-active-passive-cooling-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoseFormlySectionActivePassiveCoolingWrapper extends FieldWrapper {
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService) {
    super();
  }
}
