import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'fg-formly-field-file',

  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    FormlyModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field>
      <ngx-mat-file-input
        [formControl]="formControl"
        [formlyAttributes]="field"
        placeholder="Bauteilflaechen file"
      />
      <mat-icon matSuffix>folder</mat-icon>
    </mat-form-field>
  `,
})
export class FgFormlyFieldFile extends FieldType<FieldTypeConfig> {}
