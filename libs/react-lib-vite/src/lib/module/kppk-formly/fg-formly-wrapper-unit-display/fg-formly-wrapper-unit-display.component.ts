import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { FgInfoTooltipComponent } from '../fg-info-tooltip/fg-info-tooltip.component';
import { CommonModule } from '@angular/common';

/**
 * FormlyUnitDisplayComponent -
 *
 */
@Component({
  selector: 'fg-formly-wrapper-unit-display',
  templateUrl: './fg-formly-wrapper-unit-display.component.html',
  styleUrls: ['./fg-formly-wrapper-unit-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    FgInfoTooltipComponent,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class FgFormlyWrapperUnitDisplayComponent extends FieldWrapper<FormlyFieldConfig> {
  protected destroy$: Subject<true> = new Subject();

  public resetValue($event: Event): void {
    // this.$event.emitEvent()
  }
}
