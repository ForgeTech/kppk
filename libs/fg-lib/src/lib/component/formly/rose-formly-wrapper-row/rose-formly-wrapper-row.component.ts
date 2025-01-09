import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { FgComponentBaseService } from '../../../base/fg-component-base.service';

/**
 * FormlyUnitDisplayComponent -
 *
 */
@Component({
  selector: 'rose-formly-wrapper-row',
  templateUrl: './rose-formly-wrapper-row.component.html',
  styleUrls: ['./rose-formly-wrapper-row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoseFormlyWrapperRowComponent extends FieldWrapper<FormlyFieldConfig> {
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService) {
    super();
  }
  // public translateUnit( unit: string ): string {
  //   const scope = 'rcalc.';
  //   let translated = this.$component.$translate.translate( scope.concat( unit ) );
  //   if ( translated === scope.concat( unit ) ) {
  //     translated = unit;
  //   }
  //   return translated;
  // }
}
