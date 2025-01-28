import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';

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

  imports: [CommonModule],
})
export class FgFormlyWrapperSectionH4Component extends FieldWrapper<FormlyFieldConfig> {
  protected destroy$: Subject<true> = new Subject();
  constructor() {
    super();
  }
}
