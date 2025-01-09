import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { FgMaterialFormsModule } from '../../../module/fg-material-form/fg-material-form.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'fg-formly-field-file',
  standalone: true,
  imports: [
    FgMaterialFormsModule,
    MatIconModule,
    MatFormFieldModule
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
    <!-- <div>{{ to.label }}</div> -->
    <!-- <br />
    <input
      type="file"
      [formControl]="formControl"
      [formlyAttributes]="field" /> -->
  `,
})
export class FgFormlyFieldFile extends FieldType<FieldTypeConfig> {}
