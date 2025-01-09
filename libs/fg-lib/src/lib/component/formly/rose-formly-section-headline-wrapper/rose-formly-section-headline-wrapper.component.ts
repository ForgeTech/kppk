import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RoseCalcService } from 'src/app/modules/rose-shared/service/rose-calc/rose-calc.service';
import { FgComponentBaseService } from '../../../../fg-shared/components/fg-component-base/fg-component-base.service';

/**
 * RoseFromlySectionWrapper -
 * Wrapper for a section aka formGroup
 * within a rose-formly form
 */
@Component({
  selector: 'rose-formly-section-headline-wrapper',
  templateUrl: './rose-formly-section-headline-wrapper.component.html',
  styleUrls: ['./rose-formly-section-headline-wrapper.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoseFormlySectionHeadlineWrapper extends FieldWrapper {
  public value$: Observable<number>;
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService, public $calc: RoseCalcService) {
    super();
    this.value$ = this.$calc.coolingSystemResults$.pipe(
      filter(results => (results ? true : false)),
      map(results => {
        return results[(this.key as string) + 'Value'] ? results[(this.key as string) + 'Value'] : 0;
      })
    );
  }
}
