import { ChangeDetectionStrategy, Component, computed, inject, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KppkFormlyModule } from '../../../module/kppk-formly-form/kppk-formly.module';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { combineLatest, map, shareReplay, startWith } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { KppkReactFieldsUtils } from '../kppk-react-fields-utils.service';
import { ReactViewCalculationV1Snapshot } from '../../../machine/react-view-calculation/react-view-calculation.machine';
import { FormlySelectOption } from '@ngx-formly/core/select';
import { unit_id_parser } from '../../../types/kppk-react-unit.types';

@Component({
  selector: 'kppk-react-materials-concrete-row',
  
  imports: [CommonModule, KppkFormlyModule],
  template: `
  <!-- <pre>{{ options() | json }}</pre> -->
  <div [ngClass]="{
    'invalid bg-red-50 border-red-300 border-2': form_status_s() === 'INVALID',
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
export class KppkReactMaterialsConcreteRowComponent {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(TranslocoService);

  public row = input<any>();
  public options = input.required<FormlyFormOptions>();
  public index = input<number>();
  public change = output<any>();
  
  public form = new FormGroup({});
  protected form_status_s = toSignal(this.form.statusChanges);
  public invalid_s = computed( () => {
    const result = this.form_status_s() === 'INVALID';
    return result;
  });

  protected state_react_view_calculation_s = computed( () => {
    const options: FormlyFormOptions = this.options();
    const state = options.formState.state_react_view_calculation as ReactViewCalculationV1Snapshot;
    return state;
  })

  protected context_s = computed( () => {
    return this.state_react_view_calculation_s().context; 
  });

  protected concrete_types_s = computed( () => {
    return this.context_s().data?.concrete_types;
  });

  protected concrete_type_options$ = combineLatest([
    this.$translate.langChanges$.pipe( startWith(this.$translate.getActiveLang() ) ),
    toObservable( this.concrete_types_s )
  ]).pipe(
    map( values => {
        const [lang, glass] = values;
        const result = glass!.map( item => {
          const option: FormlySelectOption = {
            label: item.name.value,
            value: unit_id_parser.parse(item.id).value
          }
          return option;
        });
        result.unshift({
          label: this.$translate.translate('calc.default'),
          value: undefined
        });
        return result
    }),
    shareReplay(1)
  );

 
  public fields: FormlyFieldConfig[] = [{
    fieldGroup: [ 
      {
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
              'props.unit': this.$utils.provide_unit
            }
          },
          {
            id: "distance",
            name: "distance",
            key: "distance.value",
            type: "input",
            wrappers: ["unit", "form-field"],
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
              'props.unit': this.$utils.provide_unit
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
              'props.unit': this.$utils.provide_unit
            }
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
              'props.unit': this.$utils.provide_unit
            }
          },
          {
            id: "gwp_oeko_id",
            name: "gwp_oeko_id",
            key: "gwp_oeko_id.value",
            type: "select",
            wrappers: ["unit", "form-field"],
            props: {
              required: true,
              type: "number",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.gwp_oeko_id'),
              'props.unit': this.$utils.provide_unit,
              'props.options': this.concrete_type_options$,
              // 'props.hintStart': ( field ) => { 
              //   let result = '';
              //   if( field.options?.formState?.state_react_view_calculation ) {
              //     const state = field.options.formState.state_react_view_calculation as ReactViewCalculationV1Snapshot;
              //     const concrete = state.context.data?.concrete_types.find( item => item.id === field.model.gwp_oeko_id.value );
              //     if( concrete ) {
              //       result = `${this.$translate.translate('calc.gwp')} ${concrete.gwp.value} ${concrete.gwp.unit}`
              //     }
              //   }
              //   return result;
              // }
            }
          },
          {
            id: "gwp_oeko",
            name: "gwp_oeko",
            key: "gwp_oeko.value",
            type: "input",
            wrappers: ["unit", "form-field"],
            defaultValue: 0,
            props: {
              required: true,
              readonly: true,
              label: "gwp_oeko",
              type: "number",
              
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.gwp_oeko'),
              'props.unit': this.$utils.provide_unit,
              // 'props.options': this.concrete_type_options$ 
            }
            // expressions: {
            //   "model.gwp_oeko": ( field ) => {
            //     return field.model.mass * 0.0987
            //   }
            // }
          },
          {
            id: "mass",
            name: "mass",
            key: "mass.value",
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
              'props.label': this.$translate.selectTranslate('calc.mass'),
              'props.unit': this.$utils.provide_unit
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
              type: "number",
            },
            modelOptions: {
              updateOn: 'blur',
              debounce: { default: 500 },
            },
            expressions: {
              'props.label': this.$translate.selectTranslate('calc.volumn'),
              'props.unit': this.$utils.provide_unit
            }
          },
          {
            id: "density",
            name: "density",
            key: "density.value",
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
              'props.label': this.$translate.selectTranslate('calc.density'),
              'props.unit': this.$utils.provide_unit
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
              'props.unit': this.$utils.provide_unit
            }
          },
        ]
        }
      ]
    }
  ];

  protected emit_model_change( event: any ) {
    if( this.form.valid ) {
    const model_change_event: any = {
      type: "react.view.calculation_materials.event.change_concrete_calculation",
      payload: {
        index: this.index(),
        data: event,
        errors: this.form.errors,
        valid: this.form.valid,
      }
    }
    this.change.emit(model_change_event)
    }
  }

}
