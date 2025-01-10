import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';;
import { Subject } from 'rxjs';
import { FgCommonModule } from '../../../module';

/**
 * FgFormlyWrapperSectionComponent -
 *
 */
@Component({
  selector: 'fg-formly-wrapper-section-h4',
  templateUrl: './fg-formly-wrapper-section-h4.component.html',
  styleUrls: ['./fg-formly-wrapper-section-h4.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FgCommonModule
  ],
})
export class FgFormlyWrapperSectionH4Component extends FieldWrapper<FormlyFieldConfig> {
  protected destroy$: Subject<true> = new Subject();
  constructor() {
    super();
  }
}
