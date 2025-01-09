import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-form-flex',
  // styles: [
  //   `:host { border: 1px solid red; display: block }`
  // ],
  template: `
    <div
      class="content"
      fxLayout="row wrap"
      fxLayout.lt-lg="column"
      fxLayoutGap="10px"
      fxFlexFill>
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
