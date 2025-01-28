import { FormlyFieldConfig } from '@ngx-formly/core';

export const form_extract_field_units = (fields: FormlyFieldConfig[]) => {
  let formUnit: any = {};
  fields.forEach((field) => {
    // console.log( '>>>>>>>>>>>>>>>>>>WHAT???' );
    // console.log( field );
    if (field.key) {
      const key = getFormKey(field.key);
      if (field.fieldGroup) {
        formUnit[key] = form_extract_field_units(field.fieldGroup);
      }
      // else if( field.fieldArray ) {
      //   formUnit[key] = this.getFormUnits([field.fieldArray()]);
      // }
      else {
        formUnit[key] =
          field?.props && field.props['unit'] ? field.props['unit'] : '';
      }
    } else if (field.fieldGroup) {
      const fieldGroup = form_extract_field_units(field.fieldGroup);
      formUnit = { ...formUnit, ...fieldGroup };
      // throw new Error( 'ERROR_GET_FORM_UNITS_NO_KEY_SET_ON_FIELD' );
    }
  });
  return formUnit;
};

const getFormKey = (key: string | number | (string | number)[]) => {
  let keyToReturn: string;
  if (Array.isArray(key)) {
    // Find out how that is joined
    keyToReturn = key.toString();
  } else {
    keyToReturn = key.toString();
  }
  return keyToReturn;
};
