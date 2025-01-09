import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { FgComponentBaseService } from '../../../../fg-shared/components/fg-component-base/fg-component-base.service';

/**
 * RoseFormlySystemHeadline -
 * Wrapper for selection
 */
@Component({
  selector: 'rose-formly-wrapper-system-headline',
  templateUrl: './rose-formly-wrapper-system-headline.component.html',
  styleUrls: ['./rose-formly-wrapper-system-headline.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoseFormlyWrapperSystemHeadline extends FieldWrapper<FormlyFieldConfig> {
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService) {
    super();
  }
}
