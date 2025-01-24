import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkFormlyModule } from '@kppk/react-lib';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, shareReplay, startWith } from 'rxjs';
import { FormlySelectOption } from '@ngx-formly/core/select';
import { unit_id_parser } from '@kppk/react-lib';
import { FormGroup } from '@angular/forms';
import { KppkReactFieldsUtils } from'../../service/kppk-react-fields-utils.service';
import { SnapshotFrom } from 'xstate';

export enum WINDOW_PART_TYPE_ENUM {
  none = 'window_part_type_enum_none',
  glass = 'window_part_type_enum_glass',
  frame = 'window_part_type_enum_frame',
}

export const container_window_part_type_select_options = [
  { label: WINDOW_PART_TYPE_ENUM.none, value: WINDOW_PART_TYPE_ENUM.none },
  { label: WINDOW_PART_TYPE_ENUM.glass, value: WINDOW_PART_TYPE_ENUM.glass },
  { label: WINDOW_PART_TYPE_ENUM.frame, value: WINDOW_PART_TYPE_ENUM.frame },
];

@Component({
  selector: 'kppk-react-materials-window-row',
  
  imports: [CommonModule, KppkFormlyModule],
  template: `
  <!-- <pre>{{ form_state_change() | json }}</pre> -->
  <div [ngClass]="{
    'bg-red-50 border-red-300 border-2': form_status_s() === 'INVALID',
    'valid': form_status_s() === 'VALID',
    'pending': form_status_s() === 'PENDING',
    'disabled': form_status_s() === 'DISABLED',
  }">
    <formly-form
      [form]="form"
      [fields]="fields"
      [model]="row()"
      (modelChange)="emit_model_change($event)"
    />
  </div>
  `,
  styles:  `
  :host {
    display: block;
  }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:  [provideTranslocoScope( 'general', 'calc' )]
})
export class KppkReactMaterialsWindowRowComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(TranslocoService);

  public row = input<any>();
  public options = input<any>();
  public index = input<number>();
  public change = output<any>();
  
  protected form = new FormGroup({});
  protected form_status_s = toSignal(this.form.statusChanges)
  public invalid_s = computed( () => {
    const result = this.form_status_s() === 'INVALID';
    return result;
  });
 

  protected state_react_view_calculation_s = computed( () => {
    const options: FormlyFormOptions = this.options();
    const state = options.formState.state_react_view_calculation;
    return state;
  })

  protected context_s = computed( () => {
    return this.state_react_view_calculation_s().context; 
  });

  protected glass_types_s = computed( () => {
    return this.context_s().data?.window_glass;
  });

  protected frame_types_s = computed( () => {
    return this.context_s().data?.window_frame;
  });

  

  protected window_part_type_options$ = combineLatest([
    this.$translate.langChanges$.pipe( startWith(this.$translate.getActiveLang() ) ),
  ]).pipe(
    map( values => {
        const [lang, ] = values;
        const result = container_window_part_type_select_options!.map( item => {
          const option: FormlySelectOption = {
            label: this.$translate.translate('calc.' + item.label ),
            value: item.value
          }
          return option;
        });
        return result;
    }),
    shareReplay(1)
  );

  protected glass_type_options$ = combineLatest([
    this.$translate.langChanges$.pipe( startWith(this.$translate.getActiveLang() ) ),
    toObservable( this.glass_types_s )
  ]).pipe(
    map( values => {
        const [lang, glass] = values;
        const result = glass!.map( (item: any) => {
          const option: FormlySelectOption = {
            label: item.name.value,
            value: unit_id_parser.parse(item.id).value
          }
          return option;
        });
        return result;
    }),
    shareReplay(1)
  );

  protected frame_type_options$ = combineLatest([
    this.$translate.langChanges$.pipe( startWith(this.$translate.getActiveLang() ) ),
    toObservable( this.frame_types_s )
  ]).pipe(
    map( values => {
        const [lang, frames] = values;
        const result = frames!.map( (item: any) => {
          const option: FormlySelectOption = {
            label: item.name.value,
            value: unit_id_parser.parse(item.id).value
          }
          return option;
        });
        return result;
    }),
    shareReplay(1)
  );



  public fields: FormlyFieldConfig[] = [{
    fieldGroup: [{
        fieldGroupClassName: "flex flex-row",
        fieldGroup: [
          {
            id: "name",
            name: "name",
            key: "name.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
              readonly: true,
              type: "text",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.name'),
              'props.unit': this.$utils.provide_unit,
            }
          },
          {
            id: "window_part_type",
            name: "window_part_type",
            key: "window_part_type.value",
            type: "select",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.window_part_type'),
              'props.unit': this.$utils.provide_unit,
              'props.options': this.window_part_type_options$
            }
          },
          {
            id: "window_part_type_glass_id",
            name: "window_part_type_glass_id",
            key: "window_part_type_glass_id.value",
            type: "select",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.window_part_type_glass'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const result = !(field.model['window_part_type'].value === WINDOW_PART_TYPE_ENUM.glass);
                return result;
              },
              "props.options": this.glass_type_options$
            }
          },
          {
            id: "window_part_type_frame_id",
            name: "window_part_type_frame_id",
            key: "window_part_type_frame_id.value",
            type: "select",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.window_part_type_frame'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                return !(field.model['window_part_type'].value === WINDOW_PART_TYPE_ENUM.frame);
              },
              "props.options": this.frame_type_options$
            }
          },
          {
            id: "distance",
            name: "distance",
            key: "distance.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            // defaultValue: 100,
            props: {
              required: true,
              type: "number",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.distance'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const value = field.model['window_part_type'].value;
                const result = value === WINDOW_PART_TYPE_ENUM.none;
                return result;
              },
            }
          },
          {
            id: "shipments",
            name: "shipments",
            key: "shipments.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
              readonly: true,
              type: "number",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.shipments'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const value = field.model['window_part_type'].value;
                const result = value === WINDOW_PART_TYPE_ENUM.none;
                return result;
              },
            },
          },
          {
            id: "co2_transport",
            name: "co2_transport",
            key: "co2_transport.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
              readonly: true,
              type: "number",
            }, 
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.co2_transport'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const value = field.model['window_part_type'].value;
                const result = value === WINDOW_PART_TYPE_ENUM.none;
                return result;
              },
            }
          },
          {
            id: "gwp",
            name: "gwp",
            key: "gwp.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
              readonly: true,
              type: "number",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.gwp'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const value = field.model['window_part_type'].value;
                const result = value === WINDOW_PART_TYPE_ENUM.none;
                return result;
              },
            }
          },
          {
            id: "area",
            name: "area",
            key: "area.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
              readonly: true,
              label: "area",
              type: "number",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.area'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const value = field.model['window_part_type'].value;
                const result = value === WINDOW_PART_TYPE_ENUM.none;
                return result;
              },
            }
          },
          {
            id: "mass",
            name: "mass",
            key: "mass.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            props: {
              type: "number",
              required: true,
              readonly: true,
            },            
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.mass'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const value = field.model['window_part_type'].value;
                const result = value === WINDOW_PART_TYPE_ENUM.none;
                return result;
              },
            }
          },
          {
            id: "volumn",
            name: "volumn",
            key: "volumn.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
              readonly: true,
              label: "volumn",
              type: "number",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.volumn'),
              'props.unit': this.$utils.provide_unit,
              "hide": ( field ) => {
                const value = field.model['window_part_type'].value;
                const result = value === WINDOW_PART_TYPE_ENUM.none;
                return result;
              },
            }
          },
        ]
      }]
    }
  ];

  protected emit_model_change( event: any ) {
    if( this.form.valid ) {
    const model_change_event: any = {
      type: 'react.view.calculation_materials.event.change_window_calculation',
      payload: {
        index: this.index(),
        errors: this.form.errors,
        valid: this.form.valid,
        data: event
      }
    }
    this.change.emit(model_change_event)
    }
  }

}
