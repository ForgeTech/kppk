import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { FgTranslate } from '@kppk/fg-lib-new';
import { map } from 'rxjs';
@Component({
  selector: 'kppk-react-materials-material-row',

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
export class KppkReactMaterialsMaterialRowComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "name": "calc",
    "distance": "calc",
    "shipments": "calc",
    "co2_transport": "calc",
    "mass": "calc",
    "volumn": "calc",
    "density": "calc",
    "gwp": "calc",
    "area": "calc",
  });

  public row = input<any>();
  public options = input<any>();
  public index = input<number>();
  public change = output<any>();

  public form = new FormGroup({});
  protected form_status_s = toSignal(this.form.statusChanges);
  public invalid_s = computed(() => {
    const result = this.form_status_s() === 'INVALID';
    return result;
  });

  public fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          fieldGroupClassName: 'flex flex-row',
          fieldGroup: [
            {
              fieldGroupClassName: 'flex flex-row',
              fieldGroup: [
                {
                  id: 'name',
                  name: 'name',
                  key: 'name.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 0,
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
                  id: 'distance',
                  name: 'distance',
                  key: 'distance.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 100,
                  props: {
                    required: true,
                    type: 'number',
                  },
                  modelOptions: {
                    updateOn: 'blur',
                    debounce: { default: 500 },
                  },
                  expressions: {
                    'props.label': this.translations$.pipe(
                      map( trans => trans['distance'])
                    ),   
                    'props.unit': this.$utils.provide_unit,  
                  },
                },
                {
                  id: 'shipments',
                  name: 'shipments',
                  key: 'shipments.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 0,
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
                    // 'props.label':
                    // this.$translate.selectTranslate('calc.shipments'),
                    'props.label': this.translations$.pipe(
                      map( trans => trans['shipments'])
                    ), 
                    'props.unit': this.$utils.provide_unit,  
                  },
                },
                {
                  id: 'co2_transport',
                  name: 'co2_transport',
                  key: 'co2_transport.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 0,
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
                    // 'props.label':
                      // this.$translate.selectTranslate('calc.co2_transport'),
                    'props.label': this.translations$.pipe(
                      map( trans => trans['co2_transport'])
                    ), 
                    'props.unit': this.$utils.provide_unit,  
                  },
                },
                {
                  id: 'mass',
                  name: 'mass',
                  key: 'mass.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 0,
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
                    // 'props.label': this.$translate.selectTranslate('calc.mass'),
                    'props.label': this.translations$.pipe(
                      map( trans => trans['mass'])
                    ), 
                    'props.unit': this.$utils.provide_unit,  
                  },
                },
                {
                  id: 'volumn',
                  name: 'volumn',
                  key: 'volumn.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 0,
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
                      map( trans => trans['volumn'])
                    ), 
                    'props.unit': this.$utils.provide_unit,  
                  },
                },
                {
                  id: 'density',
                  name: 'density',
                  key: 'density.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 0,
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
                      map( trans => trans['name'])
                    ), 
                    'props.unit': this.$utils.provide_unit,  
                  },
                },
                {
                  id: 'gwp',
                  name: 'gwp',
                  key: 'gwp.value',
                  type: 'input',
                  wrappers: ['unit', 'form-field'],
                  // defaultValue: 0,
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
                    // 'props.label': this.$translate.selectTranslate('calc.gwp'),
                    'props.label': this.translations$.pipe(
                      map( trans => trans['name'])
                    ), 
                    'props.unit': this.$utils.provide_unit,  
                  },
                },
                // {
                //   id: "area",
                //   name: "area",
                //   key: "area.value",
                //   type: "input",
                //   wrappers: ["unit", "form-field"],
                //   // defaultValue: 0,
                //   props: {
                //     required: true,
                //     type: "number",
                //     min: 0,
                //   },
                //   modelOptions: {
                //     updateOn: 'blur',
                //     debounce: { default: 500 },
                //   },
                //   expressions: {
                //    'props.label': this.translations$.pipe(
                //      map( trans => trans['area'])
                //    ), 
                //     'props.unit': this.$utils.provide_unit,  
                //   }
                // },
              ],
            },
          ],
        },
      ],
    },
  ];

  protected emit_model_change(event: any) {
    if (this.form.valid) {
      const model_change_event: any = {
        type: 'react.view.calculation_materials.event.change_material_calculation',
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
