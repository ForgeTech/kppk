import { Attribute, Directive, forwardRef, Input, OnChanges, SimpleChanges, Provider } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, FormControl } from '@angular/forms';

export const MIN_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => FgMinValueValidator),
  multi: true,
};

@Directive({
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [MIN_VALUE_VALIDATOR],
  host: { '[attr.min]': 'min ? min : 0' },
})
export class FgMinValueValidator implements Validator, OnChanges {
  private _validator: ValidatorFn;

  @Input() min: string;

  constructor(@Attribute('min') mn: string) {
    if (mn !== undefined && mn !== null) {
      // isPresent
      const attrValue = parseFloat(mn);
      if (!isNaN(attrValue)) {
        this.min = mn;
        this._createValidator();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const minChange = changes['min'];
    if (minChange) {
      this._createValidator();
    }
  }

  private _createValidator() {
    this._validator = FgMinValueValidator.min(parseFloat(this.min));
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this._validator(c);
  }

  static min(mn: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let v = +control.value;
      return v < mn ? { min: { minValue: mn, actualValue: v } } : null;
    };
  }
}
