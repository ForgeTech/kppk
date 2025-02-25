import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkFormlyModule } from '@kppk/react-lib';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { KppkReactFieldsUtils } from '../../service/kppk-react-fields-utils.service';
import { map } from 'rxjs';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  selector: 'kppk-react-materials-oi3-row',

  imports: [CommonModule, KppkFormlyModule],
  template: `
    <div
      [ngClass]="{
        'bg-red-50 border-red-300 border-2': form_status_s() === 'INVALID',
        'valid': form_status_s() === 'VALID',
        'pending': form_status_s() === 'PENDING',
        'disabled': form_status_s() === 'DISABLED',
      }"
    >
      <formly-form
        [form]="form"
        [fields]="fields"
        [model]="row()"
        (modelChange)="emit_model_change($event)"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactMaterialsOi3RowComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "name": "calc",
    "area": "calc",
    "oi3": "calc",
    "penrt": "calc",
    "gwp": "calc",
    "gwp_biogenic": "calc",
    "ap": "calc",
    "gwp_total": "calc",
  });

  public row = input<any>();
  public options = input<any>();
  public index = input<number>();
  public change = output<any>();

  public form = new FormGroup({});
  public form_status_s = toSignal(this.form.statusChanges);

  protected fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          fieldGroupClassName: 'flex flex-row',
          fieldGroup: [
            {
              key: 'name.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'text',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['name'])
                ),                
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'area.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'number',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['area'])
                ), 
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'oi3.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'number',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['oi3'])
                ), 
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'penrt.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'number',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['penrt'])
                ), 
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'gwp.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'number',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['gwp'])
                ), 
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'gwp_biogenic.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'number',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['gwp_biogenic'])
                ), 
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'ap.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'number',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['ap'])
                ), 
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'gwp_total.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                readonly: true,
                type: 'number',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map( trans => trans['gwp_total'])
                ), 
                'props.unit': this.$utils.provide_unit,  
              },
            },
          ],
        },
      ],
    },
  ];

  protected emit_model_change(event: any) {
    if (this.form.valid) {
      const model_change_event: any = {
        type: 'react.view.calculation_materials.event.change_oi3',
        payload: {
          index: this.index(),
          errors: this.form.errors,
          valid: this.form.valid,
          data: event,
        },
      };
      this.change.emit(model_change_event);
    }
  }
}
