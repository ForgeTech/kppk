import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { FgComponentBaseService } from '../../../base/fg-component-base.service';

/**
 * FormlyUnitDisplayComponent -
 *
 */
@Component({
  selector: 'fg-formly-wrapper-flex-row',
  templateUrl: './fg-formly-wrapper-flex-row.component.html',
  styleUrls: ['./fg-formly-wrapper-flex-row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgFormlyWrapperFlexRowComponent extends FieldWrapper<FormlyFieldConfig> {
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService) {
    super();
  }
}
