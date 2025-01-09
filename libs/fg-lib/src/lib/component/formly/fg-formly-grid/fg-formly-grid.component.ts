import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { FgComponentBaseService } from '../../../base/fg-component-base.service';

/**
 * FormlyUnitDisplayComponent -
 *
 */
@Component({
  selector: 'fg-formly-grid',
  templateUrl: './fg-formly-grid.component.html',
  styleUrls: ['./fg-formly-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgFormlyGridwComponent extends FieldWrapper<FormlyFieldConfig> {
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService) {
    super();
  }
}
