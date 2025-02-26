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
import { map } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { KppkReactFieldsUtils } from '../../service/kppk-react-fields-utils.service';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  selector: 'kppk-react-materials-type-row',
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
export class KppkReactMaterialsTypeRowComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "name": "calc",
    "type": "calc",
    "type_material": "calc",
    "type_concrete": "calc",
    "type_window": "calc",
  });

  public row = input<any>();
  public options = input<any>();
  public index = input<number>();
  public change = output<any>();

  public form = new FormGroup({});
  public form_status_s = toSignal(this.form.statusChanges);

  public fields: FormlyFieldConfig[] = [
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
                  map(trans => trans['name'])
                ),
                'props.unit': this.$utils.provide_unit,  
              },
            },
            {
              key: 'type.value',
              type: 'select',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                type: 'string',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.translations$.pipe(
                  map(trans => trans['name'])
                ),
                'props.unit': this.$utils.provide_unit,  
                'props.options': this.translations$.pipe(
                  map( trans => {
                    return [
                      {
                        value: 'material',
                        label: trans['type_material'],
                      },
                      {
                        value: 'concrete',
                        label: trans['type_concrete'],
                      },
                      {
                        value: 'window',
                        label: trans['type_window'],
                      },
                    ];
                  })
                ),
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
        type: 'react.view.calculation_materials.event.change_material_type',
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
