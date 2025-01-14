import { Component, ChangeDetectionStrategy, Type, ViewEncapsulation } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/material/form-field';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MatInputModule } from '@angular/material/input';

interface InputNumberDigitProps extends FormlyFieldProps {
  allowNegatives: boolean,
  decimal: boolean,
  decimalNumber: number,
  decimalSeparator: string,
  fullNumberLength: number,
  max: number,
  min: number,
  placeholder: string,
  readonly: boolean,
  required: boolean,
  tabindex: number,
}
export interface FormlyDigitInputFieldConfig extends FormlyFieldConfig<InputNumberDigitProps> {
  type: 'input-number-digit' | Type<FgFormlyFieldNumberDigitInputComponent>;
}

@Component({
  
  imports: [ 
    MatInputModule,
    DigitOnlyModule 
  ],
  selector: 'fg-formly-field-digit-type',
  template: './fg-formly-field-digit-type.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgFormlyFieldNumberDigitInputComponent extends FieldType<FieldTypeConfig<InputNumberDigitProps>> {

  public getPattern() {
    let regEx = '[0-9]*';
    if( !this.props.decimalSeparator ) {
      this.props.decimalSeparator = ',';
    }
    if( this.props.decimalSeparator === '.') {
      this.props.decimalSeparator = '\.';
    }
    if(this.props.decimal){
      regEx = `[0-9]+([${this.props.decimalSeparator }][0-9]+)?`;
    }
    if(this.props.decimal && this.props.decimalNumber){
      regEx = `[0-9]+([${this.props.decimalSeparator }][0-9]{1,${this.props.decimalNumber}})?$`;
    }
    if(this.props.allowNegatives){
      regEx = '-?' + regEx;
    }
    return '^' + regEx;
  }
  public getMaxLength() {
    let maxLength = 34;
    if(this.props.fullNumberLength){
      maxLength = this.props.fullNumberLength;
    }
    if(this.props.fullNumberLength && this.props.decimal){
      maxLength++;
    }
    if(this.props.fullNumberLength && this.props.decimalNumber){
      maxLength += this.props.decimalNumber;
    }
    return maxLength;
  }
  // public getAllowNegative() {
  //   let allowNegative = false;
  //   if(this.props.allowNegative){
  //     allowNegative = this.props.allowNegative;
  //   }
  //   return allowNegative;
  // }
}
