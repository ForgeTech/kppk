import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder, FormlyModule } from '@ngx-formly/core';

// READ:
// https://stackblitz.com/edit/angular-formly-repeat?file=src%2Fapp%2Frepeat-section.type.ts
@Component({
  selector: 'formly-repeat-section',
  standalone: true,
  imports: [FormlyModule],
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index">
      <formly-group
        [model]="model"
        [field]="field"
        [options]="options"
        [form]="formControl">
        <div class="col-sm-2 d-flex align-items-center">
          <button
            class="btn btn-danger"
            type="button"
            (click)="remove(i)">
            Remove
          </button>
        </div>
      </formly-group>
    </div>
    <div style="margin:30px 0;">
      <button
        class="btn btn-primary"
        type="button"
        (click)="add()">
        {{ field.fieldArray.templateOptions.btnText }}
      </button>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {
  constructor(builder: FormlyFormBuilder) {
    super();
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
