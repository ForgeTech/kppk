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
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { KppkReactFieldsUtils } from '../../service/kppk-react-fields-utils.service';

@Component({
  selector: 'kppk-react-materials-defaults-form',

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
        [model]="model()"
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
  providers: [provideTranslocoScope('general', 'calc')],
})
export class KppkReactMaterialsDefaultsFormComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(TranslocoService);

  public model = input<any>();
  public event = input<any>();
  public options = input<any>();
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
                type: 'text',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.$translate.selectTranslate('calc.name'),
                'props.unit': this.$utils.provide_unit,
              },
            },
            {
              key: 'short_id.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                type: 'text',
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.$translate.selectTranslate('calc.short_id'),
                'props.unit': this.$utils.provide_unit,
              },
            },
            {
              key: 'area_coefficient.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                type: 'number',
                min: 0,
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.$translate.selectTranslate(
                  'calc.area_coefficient'
                ),
                'props.unit': this.$utils.provide_unit,
              },
            },
            {
              key: 'surface_related_mass.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                type: 'number',
                min: 0,
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label': this.$translate.selectTranslate(
                  'calc.surface_related_mass'
                ),
                'props.unit': this.$utils.provide_unit,
              },
            },
            {
              key: 'thickness.value',
              type: 'input',
              wrappers: ['unit', 'form-field'],
              props: {
                required: true,
                type: 'number',
                min: 0,
              },
              modelOptions: {
                updateOn: 'blur',
                debounce: { default: 500 },
              },
              expressions: {
                'props.label':
                  this.$translate.selectTranslate('calc.thickness'),
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
        type: this.event(),
        payload: {
          data: event,
        },
      };
      this.change.emit(model_change_event);
    }
  }
}
