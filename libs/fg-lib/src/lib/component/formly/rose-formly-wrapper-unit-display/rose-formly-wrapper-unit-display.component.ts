import { ChangeDetectionStrategy, Component, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { FgComponentBaseService } from 'src/app/modules/fg-shared/components/fg-component-base/fg-component-base.service';
import { FgDataService } from 'src/app/modules/fg-shared/service/fg-data/fg-data.service';
import { RoseApplicationInterface } from '../../../interface/rose-application-interface';
import { RoseCalculationDataInterface } from '../../../interface/rose-application-user-calculation-data.interface';

/**
 * FormlyUnitDisplayComponent -
 *
 */
@Component({
  selector: 'rose-formly-wrapper-unit-display',
  templateUrl: './rose-formly-wrapper-unit-display.component.html',
  styleUrls: ['./rose-formly-wrapper-unit-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoseFormlyWrapperUnitDisplayComponent extends FieldWrapper<FormlyFieldConfig> {
  public showUndo$: Observable<boolean>;

  protected destroy$: Subject<true> = new Subject();
  constructor(public $data: FgDataService, public $component: FgComponentBaseService) {
    super();
  }

  ngOnInit(): void {
    this.showUndo$ = this.formControl.valueChanges.pipe(
      startWith(this.formControl.value),
      filter(value => this?.to?.reset && this?.formState?.reset),
      takeUntil(this.destroy$),
      map(value => this?.formState?.reset[this.key.toString()] !== value)
    );
  }

  public resetValue($event: Event): void {
    this.formControl.setValue(this?.formState?.reset[this.key.toString()]);
  }
}
