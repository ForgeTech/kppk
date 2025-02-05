import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  imports: [ReactiveFormsModule, FormlyModule],
  template: `
  <input matInput type="file" [formControl]="formControl" [formlyAttributes]="field" /> 
  `,
})
export class FormlyFieldFile extends FieldType<FieldTypeConfig> {}