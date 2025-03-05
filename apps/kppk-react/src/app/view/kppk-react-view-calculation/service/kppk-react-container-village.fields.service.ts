import { inject, Injectable } from '@angular/core';
import { FgBaseService, FgTranslate } from '@kppk/fg-lib-new';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { KppkReactFieldsUtils } from './kppk-react-fields-utils.service';
import { map } from 'rxjs';
import { KppkReactConstructionSiteFields } from './kppk-react-constructions-site.fields.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class KppkReactContainerVillageFields extends FgBaseService {
  protected $construction_site = inject(KppkReactConstructionSiteFields);
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(FgTranslate);
  public translation$ = this.$translate.get_translations$({
    "container_village_transport_distance": "calc",
    "energy_usage_power_type": "calc",
    "office_container": "calc",
    "office_container_amount": "calc",
    "office_container_usage": "calc",
    "meeting_container": "calc",
    "meeting_container_amount": "calc",
    "meeting_container_usage": "calc",
    "sanitary_container": "calc",
    "sanitary_container_amount": "calc",
    "sanitary_container_usage": "calc",
    "residency_container": "calc",
    "residency_container_amount": "calc",
    "residency_container_usage": "calc",
    "repository_container": "calc",
    "repository_container_amount": "calc",
    "repository_container_usage": "calc",
    "first_aid_container": "calc",
    "first_aid_container_amount": "calc",
    "first_aid_container_usage": "calc",
    "container_village_settings": "calc",
    "container_village_containers": "calc",
  })
  public translationS = toSignal(this.translation$, {initialValue: undefined});

  public container_village_settings_fields: FormlyFieldConfig[] = [
    // {
    //   key: "transport",
    //   expressions: {
    //     "props.label": this.$translate.translate('calc.transport_container_village'),
    //   },
    //   fieldGroupClassName: "flex flex-row gap-2 flex-wrap",
    // wrappers: ['section-h4'],
    //   fieldGroup: [{
    //     key: 'amount',
    //     type: 'input',
    //     wrappers: ['unit', 'form-field'],
    //     // defaultValue: 0,
    //     props: {
    //       readonly: true,
    //       required: true,
    //       type: 'number',
    //       min: 0,
    //     },
    //     expressions: {
    //       "props.label": this.$translate.selectTranslate('calc.container_village_transport_amount'),
    //       "props.unit": this.$utils.provide_unit
    //     }
    //   },
    {
      key: 'distance.value',
      type: 'input',
      wrappers: ['unit', 'form-field'],
      // defaultValue: 50,
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
        'props.label': this.translation$.pipe(
          map( trans => trans['container_village_transport_distance'])
        ),  
        'props.unit': this.$utils.provide_unit,
      },
    },
    {
      key: 'energy_usage_power_type.value',
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
        'props.label': this.translation$.pipe(
          map( trans => trans['energy_usage_power_type'])
        ),  
        'props.unit': this.$utils.provide_unit,
        'props.options': this.translation$.pipe(
          map(() => this.$construction_site.energy_usage_power_type_options())
        ),
      },
    },
  ];

  public container_village_container_fields: FormlyFieldConfig[] = [
    // {
    //   key: "energy",
    //   fieldGroupClassName: "flex flex-row flex-wrap",
    //   fieldGroup: [
    {
      key: 'office',
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['office_container'])
        ),  
      },
      fieldGroupClassName: 'flex flex-col',
      wrappers: ['section-h4'],
      fieldGroup: [
        {
          key: 'amount.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['office_container_amount'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'usage.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['office_container_usage'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
    {
      key: 'meeting',
      fieldGroupClassName: 'flex flex-col',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['meeting_container'])
        ),  
      },
      fieldGroup: [
        {
          key: 'amount.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['meeting_container_amount'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'usage.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['meeting_container_usage'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
    {
      key: 'sanitary',
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['sanitary_container'])
        ),  
      },
      fieldGroupClassName: 'flex flex-col',
      wrappers: ['section-h4'],
      fieldGroup: [
        {
          key: 'amount.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['sanitary_container_amount'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'usage.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['sanitary_container_usage'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
    {
      key: 'residency',
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['residency_container'])
        ),  
      },
      fieldGroupClassName: 'flex flex-col',
      wrappers: ['section-h4'],
      fieldGroup: [
        {
          key: 'amount.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['residency_container_amount'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'usage.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['residency_container_usage'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
    {
      key: 'repository',
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['repository_container'])
        ),  
      },
      fieldGroupClassName: 'flex flex-col',
      wrappers: ['section-h4'],
      fieldGroup: [
        {
          key: 'amount.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['repository_container_amount'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'usage.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['repository_container_usage'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
    {
      key: 'first_aid',
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['first_aid_container'])
        ),  
      },
      fieldGroupClassName: 'flex flex-col',
      wrappers: ['section-h4'],
      fieldGroup: [
        {
          key: 'amount.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['first_aid_container_amount'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'usage.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 0,
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
            'props.label': this.translation$.pipe(
              map( trans => trans['first_aid_container_usage'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },

    //   ]
    // },
  ];

  public fields: FormlyFieldConfig[] = [
    {
      key: 'setting',
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['container_village_settings'])
        ),  
      },
      fieldGroupClassName: 'flex flex-row gap-2 flex-wrap',
      wrappers: ['section-h3'],
      fieldGroup: [...this.container_village_settings_fields],
    },
    {
      key: 'container',
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['container_village_containers'])
        ),  
      },
      fieldGroupClassName: 'flex flex-row gap-2 flex-wrap',
      wrappers: ['section-h3'],
      fieldGroup: [...this.container_village_container_fields],
    },
  ];
}
