import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-form-flex',
  standalone: true,
  imports: [CommonModule, FormlyModule],
  template: `
    <div class="flex flex-row flex-wrap gap-4">
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f">
      </formly-field>
    </div>
  `,
})
export class RoseFormlyFlexLayoutType extends FieldType {
  constructor() {
    super();
  }
}
