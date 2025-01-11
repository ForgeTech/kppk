import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { FgComponentBaseService } from '../../../base/fg-component-base.service';
import { FgCommonModule } from '../../../module/fg-common/fg-common.module';
import { FgMaterialFormsModule } from '../../../module/fg-material-form/fg-material-form.module';
// import { FgInfoTooltipComponent } from '../fg-info-tooltip/fg-info-tooltip.component';
import { FgEventService } from '../../../service';

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
  standalone: true,
  imports: [
    FgCommonModule,
    FgMaterialFormsModule,
    // FgInfoTooltipComponent,
    MatIconModule,
    MatTooltipModule
  ],
})
export class FgFormlyWrapperUnitDisplayComponent extends FieldWrapper<FormlyFieldConfig> {
  protected $event = inject(FgEventService);
  protected destroy$: Subject<true> = new Subject();
  constructor(public $component: FgComponentBaseService) {
    super();
   
  }

  public resetValue($event: Event): void {
    // this.$event.emitEvent()
  }
}
