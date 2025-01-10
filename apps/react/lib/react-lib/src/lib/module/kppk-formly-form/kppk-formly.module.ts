import { AbstractControl, ValidationErrors } from '@angular/forms';
// import { DateAdapter, MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { FormlyConfig, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
// import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
// import { InputMaskModule } from '@ngneat/input-mask';
import { NgModule, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FgMaterialFormsModule } from '@kppk/fg-lib';
import { FgCommonModule } from '@kppk/fg-lib';
import { FgFormlyWrapperUnitDisplayComponent } from '@kppk/fg-lib';
import { FgFormlyFieldNumberDigitInputComponent } from '@kppk/fg-lib';
import { FgFormlyFieldDigitTypeAccessor } from '@kppk/fg-lib';
import { FgFormlyFieldFile } from '@kppk/fg-lib';
import { FgFormlyWrapperSectionH3Component, FgFormlyWrapperSectionH4Component  } from '@kppk/fg-lib';
// import { FgArrayTypeComponent } from '@kppk/fg-lib';
import { MaterialFileInputModule } from 'ngx-custom-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { KppkEnergyUsageYearlyArrayTypeComponent } from './kppk-energy-usage-yearly-formly-array.type';


/**
 * Validator to match the values of to fields
 * CAUTION! As this validator has to be placed on the parent form-group of the
 * matched fields to correcly trigger when either of the two changes.
 * @param control
 * @param field
 * @returns
 */
export function matchValidator(control: AbstractControl, field: FormlyFieldConfig): ValidationErrors | null {
  let isValid = false;
  let source: AbstractControl | null = null;
  let target: AbstractControl | null = null;
  let errorField: AbstractControl | null = null;
  // Get child controls being validated
  if (field.props && field.props['matchSource'] && field?.props['matchTarget']) {
    source = control.get(field.props['matchSource']);
    target = control.get(field.props['matchTarget']);
  }
  // Throw error if required match-validator child fields are not configured or don't exist
  if (source === null && target === null) {
    throw new Error(
      "Error: matchValidator - requires 'matchSource' and 'matchTarget' set on 'field.props' and those fields to exist!"
    );
  }

  if (field.props && field.props['matchErrorTarget']) {
    errorField = control.get(field.props['matchErrorTarget']);
  }
  // Check if field values are matching
  isValid = source?.value === target?.value;
  // Get error
  const error = isValid ? null : { match: true };
  if (errorField) {
    if (!isValid) {
      errorField.setErrors(error);
    } else if (errorField.errors) {
      const errors = errorField.errors;
      delete errors['match'];
      errorField.setErrors(error);
    }
  }
  return error;
}

export function isPasswordValidator(control: AbstractControl) {
  const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!-\\/:-@[-`{-~])[A-Za-z\\d[!-\\/:-@[-`{-~]{10,}$');
  return regex.test(control.value) ? null : { isPassword: true };
}

export function isEmailValidator(control: AbstractControl) {
  const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
  return !control.value || regex.test(control.value) ? null : { isEmail: true };
}

export function isWindowPartTypeValidator(control: AbstractControl) {
  const result = control.value === '-' ? { requires_window_part_type: true } : null;
  return result;
}

// export function isEmailValidator(control: AbstractControl) {
//   const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
//   return !control.value || regex.test(control.value) ? null : { isEmail: true };
// }

@NgModule({
  imports: [
    FgFormlyFieldDigitTypeAccessor,
    FgFormlyFieldNumberDigitInputComponent,
    FgFormlyFieldFile,
    FgCommonModule,
    FgMaterialFormsModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    KppkEnergyUsageYearlyArrayTypeComponent,
    FormlyModule.forRoot({
      extras: {
        immutable: true,
        resetFieldOnHide: false,
      },
      types: [
        { name: 'input-number-digit', component: FgFormlyFieldNumberDigitInputComponent },
        { name: 'input-file', component: FgFormlyFieldFile },
        { name: 'energy-usage-yearly-array', component: KppkEnergyUsageYearlyArrayTypeComponent },
      ],
      validators: [
        { name: 'isPassword', validation: isPasswordValidator },
        { name: 'isEmail', validation: isEmailValidator },
        { name: 'isWindowPartType', validation: isWindowPartTypeValidator },
      ],
      wrappers: [
        { name: 'unit', component: FgFormlyWrapperUnitDisplayComponent },
        { name: 'section-h3', component: FgFormlyWrapperSectionH3Component },
        { name: 'section-h4', component: FgFormlyWrapperSectionH4Component },
        // { name: 'fieldMultiply', component: RoseFormlyWrapperMultiplyFieldComponent },
        // { name: 'useValue', component: RoseFormlyWrapperUseValueComponent },
      ],
      validationMessages: [
        // { name: 'required', message: thisformlyValidationMessageErrorRequired },
        // { name: 'belowZero', message: formlyValidationMessageBelowZero },
        // { name: 'min', message: formlyValidatioMessageMin },
        // { name: 'max', message: formlyValidatioMessageMax },
        // { name: 'colonSeperatedNumbers', message: formlyValidatioMessageColonSeperatedNumbers },
        // { name: 'greaterThenZero', message: formlyValidatioMessageGreaterThenZero},
      ]
    }),
  ],
  exports: [
    FgFormlyFieldDigitTypeAccessor,
    FgFormlyFieldNumberDigitInputComponent,
    FgFormlyFieldFile,
    FgCommonModule,
    FgMaterialFormsModule,
    FormlyMaterialModule,
    MaterialFileInputModule,
    MatFormFieldModule,
  ],
  providers: [
    provideTranslocoScope('form')
  ],
})
export class KppkFormlyModule {
  protected $translate = inject(TranslocoService);
  protected $log = inject(NGXLogger);
  protected $config = inject(FormlyConfig);

//CONSTRUCTOR
constructor() {

    this.$log.info('FG_FORMLY_MODULE_LOADED');
    this.$config.addValidatorMessage('required', this.formly_validation_message_error_required);
    this.$config.addValidatorMessage('isWindowPartType', this.formly_validation_message_is_window_part_type);
  }

  public formly_validation_message_error_required = (err: any) => {
    return this.$translate.translate('form.error_required');
  }
  public formly_validation_message_is_window_part_type = (err: any) => {
    return this.$translate.translate('form.is_window_part_type');
  }
}
