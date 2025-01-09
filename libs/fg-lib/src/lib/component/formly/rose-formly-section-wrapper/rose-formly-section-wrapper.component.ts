import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FieldType, FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, shareReplay } from 'rxjs/operators';
import { RoseCalcService } from 'src/app/modules/rose-shared/service/rose-calc/rose-calc.service';
import { FgComponentBaseService } from '../../../../fg-shared/components/fg-component-base/fg-component-base.service';

/**
 * RoseFromlySectionWrapper -
 * Wrapper for a section aka formGroup
 * within a rose-formly form
 */
@Component({
  selector: 'rose-formly-section-wrapper',
  templateUrl: './rose-formly-section-wrapper.component.html',
  styleUrls: ['./rose-formly-section-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoseFormlySectionWrapper extends FieldWrapper {
  public value$: Observable<number>;
  public breakPoint$: Observable<boolean> = this.$component.$breakpoint.matchedBreakpoints$.pipe(
    map(breakpoints => breakpoints.indexOf('fx-gt-md') !== -1),
    debounceTime(250),
    shareReplay(1)
  );
  /** CONSTRUCTOR */
  constructor(public $component: FgComponentBaseService, public $calc: RoseCalcService) {
    super();
    this.value$ = this.$calc.coolingSystemResults$.pipe(
      filter(results => (results ? true : false)),
      map(results => {
        return results[(this.key as string) + 'Value'];
      })
    );
  }
}
