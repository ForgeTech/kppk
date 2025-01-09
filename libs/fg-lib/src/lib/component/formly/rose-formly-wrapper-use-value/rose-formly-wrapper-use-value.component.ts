import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldWrapper } from '@ngx-formly/core';
import { NGXLogger } from 'ngx-logger';
import { Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { FgComponentBaseService } from 'src/app/modules/fg-shared/components/fg-component-base/fg-component-base.service';
import { FgDataService } from 'src/app/modules/fg-shared/service/fg-data/fg-data.service';
@Component({
  selector: 'rose-rose-formly-wrapper-use-value',
  templateUrl: './rose-formly-wrapper-use-value.component.html',
  styleUrls: ['./rose-formly-wrapper-use-value.component.scss'],
})
export class RoseFormlyWrapperUseValueComponent extends FieldWrapper implements OnDestroy, AfterViewInit {
  public destroy$: Subject<boolean> = new Subject();
  public useCrtl: FormControl = new FormControl();
  public useCrtlName: string;
  public checked$: Subject<boolean> = new Subject();
  constructor(public $component: FgComponentBaseService, public $log: NGXLogger, public $data: FgDataService) {
    super();
  }

  protected upperCaseFirstLetter(toTransform: string): string {
    return toTransform[0].toUpperCase() + toTransform.slice(1);
  }

  public ngAfterViewInit(): void {
    if (this?.to?.useValueName) {
      this.useCrtlName = this.to.useValueName;
    } else {
      this.useCrtlName = 'use'.concat(this.upperCaseFirstLetter(this.key.toString()));
    }

    let useCrtlValue = this.options.formState.model[this.useCrtlName] ? this.options.formState.model[this.useCrtlName] : false;

    this.form.addControl(this.useCrtlName, this.useCrtl);

    this.useCrtl.valueChanges.pipe(takeUntil(this.destroy$), startWith(useCrtlValue)).subscribe(value => {
      this.checked$.next(value);
      // Set original field disabled state
      this.to.disabled = !value;

      let patchFormValues = {};
      patchFormValues[this.useCrtlName] = value;
      if (value === false) {
        patchFormValues[this.key.toString()] = undefined;
      }
      this.form.patchValue(patchFormValues, { onlySelf: true, emitEvent: false });
      // Reset wrapped field
      if (value === false && this.form.controls[this.key.toString()]) {
        const app = this.$data.app;
        let resetValue: any = undefined;
        let resetKey = this?.to?.useValueReset ? this.to.useValueReset : this.key;
        if (resetKey) {
          resetValue = app?.user?.calculation[resetKey];
        } else {
          resetValue = app?.model?.default[resetKey];
        }
        if (this?.to?.type === 'number' && !isNaN(resetValue)) {
          resetValue = Math.round(resetValue * 100) / 100;
        }
        this.form.controls[this.key.toString()].setValue(resetValue);
      }
    });
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }
}
