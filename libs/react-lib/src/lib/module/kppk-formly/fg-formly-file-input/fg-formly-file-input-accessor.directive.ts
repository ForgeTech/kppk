import { Directive } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
    selector: 'input[type=file]',
    host: {
      '(change)': 'onChange($event.target.files)',
      '(blur)': 'onTouched()',
    },
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor, multi: true }],
  })
  // https://github.com/angular/angular/issues/7341
  export class FileValueAccessor implements ControlValueAccessor {
    value: any;
    onChange = (_: any) => {};
    onTouched = () => {};
  
    writeValue(_value: any) {}
    registerOnChange(fn: any) {
      this.onChange = fn;
    }
    registerOnTouched(fn: any) {
      this.onTouched = fn;
    }
  }