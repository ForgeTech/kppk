import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldType, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { FgComponentBaseService } from '../../../../fg-shared/components/fg-component-base/fg-component-base.service';

/**
 * RoseFromlyWrapperSystem -
 * Wrapper for a section aka formGroup
 * within a rose-formly form
 */
@Component({
  selector: 'rose-formly-section-type',
  templateUrl: './rose-formly-section-type.component.html',
  styleUrls: ['./rose-formly-section-type.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoseFormlySectionType extends FieldType {
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService) {
    super();
  }
}
