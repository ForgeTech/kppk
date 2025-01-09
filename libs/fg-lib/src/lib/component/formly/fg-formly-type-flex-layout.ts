import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormlyModule],
  selector: 'fg-formly-form-flex',
  template: `
    <div class="flex flex-row flex-wrap gap-4">
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f">
      </formly-field>
    </div>
  `,
})
export class FgFormlyFlexLayoutType extends FieldType {
  constructor() {
    super();
  }
}
