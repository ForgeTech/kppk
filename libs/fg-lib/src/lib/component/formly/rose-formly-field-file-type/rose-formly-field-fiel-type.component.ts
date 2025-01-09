import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'rose-formly-field-file',
  template: `
    <div>{{ to.label }}</div>
    <br />
    <input
      type="file"
      [formControl]="formControl"
      [formlyAttributes]="field" />
  `,
})
export class RoseFormlyFieldFile extends FieldType<FieldTypeConfig> {}
