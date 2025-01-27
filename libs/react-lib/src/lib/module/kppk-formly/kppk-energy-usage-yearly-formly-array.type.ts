import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
import { construction_site_energy_usage_year_energy_usage_item_parser } from '../../types/kppk-react-construction-site.types';

@Component({
  selector: 'kppk-energy-usage-yearly-formly-array-type',

  imports: [
    CommonModule,
    FormlyModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  template: `
    <!-- <pre>{{ field.props | json}}</pre> -->
    @for(subField of field.fieldGroup; track $index; let i = $index) {
    <div class="flex flex-col">
      <h5>{{ (field.props && field.props['row-label']) || '' }} {{ i + 1 }}</h5>
      <div class="flex flex-row">
        <formly-field class="flex-auto" [field]="subField"></formly-field>
        <div class="relative flex w-16">
          <button
            mat-mini-fab
            class="absolute left-0 top-0 mx-2 !shadow-none"
            color="warn"
            type="button"
            [matTooltip]="
              (field.props && field.props['delete-btn-tooltip']) || ''
            "
            (click)="remove(i)"
          >
            <mat-icon>delete_forever</mat-icon>
          </button>
        </div>
      </div>
    </div>
    }
    <div class="flex-row items-center justify-start">
      <button
        mat-stroked-button
        class="my-4 !min-w-[240px]"
        color="primary"
        type="button"
        [matTooltip]="(field.props && field.props['add-btn-tooltip']) || ''"
        (click)="add_construction_site_item()"
      >
        <mat-icon class="right-4">add_circle</mat-icon>
        {{ (field.props && field.props['add-btn-label']) || '' }}
      </button>
    </div>
  `,
})
export class KppkEnergyUsageYearlyArrayTypeComponent extends FieldArrayType {
  public add_construction_site_item() {
    this.add(
      this.field.fieldGroup?.length,
      construction_site_energy_usage_year_energy_usage_item_parser.parse({})
    );
  }
}
