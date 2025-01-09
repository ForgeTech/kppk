import { Directive, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';

@Directive({
  standalone: true,
  selector: '[matInput][digitOnly]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FgFormlyFieldDigitTypeAccessor),
      multi: true
    },
  ],
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()'
  },
})
export class FgFormlyFieldDigitTypeAccessor implements ControlValueAccessor {
  public onChange: any;
  public onTouched: any;
  /** CONSTRUCTOR */
  constructor(
    protected elementRef: ElementRef,
    protected $translate: TranslocoService
  ) {}

  writeValue(value: any) {
    console.log('WRITE_VALUE')
    this.elementRef.nativeElement.value = value;
  };

  registerOnChange(fn: any) {
      console.log('CHANGE_VALUE')
      this.onChange = (value: any) => {
          fn(value);
      };
  };

  registerOnTouched(fn: any) {
    console.log('TOUCH_VALUE')
    this.onTouched = fn;
  };
}