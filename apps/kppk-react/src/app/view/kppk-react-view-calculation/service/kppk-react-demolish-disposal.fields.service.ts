import { inject, Injectable } from '@angular/core';
import { FgBaseService, FgTranslate } from '@kppk/fg-lib-new';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map } from 'rxjs';
import { KppkReactFieldsUtils } from './kppk-react-fields-utils.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class KppkReactDemolishDisposalFields extends FgBaseService {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    '10_cubic_meter_container': "calc",
    'roll_off_container': "calc",
    "concrete": "calc",
    "concrete_volume": "calc",
    "concrete_transport": "calc",
    "concrete_distance": "calc",
    "steel": "calc",
    "steel_volume": "calc",
    "steel_transport": "calc",
    "steel_distance": "calc",
    "brick": "calc",
    "brick_volume": "calc",
    "brick_transport": "calc",
    "brick_distance": "calc",
    "plasterboard": "calc",
    "plasterboard_volume": "calc",
    "plasterboard_transport": "calc",
    "plasterboard_distance": "calc",
    "glass": "calc",
    "glass_volume": "calc",
    "glass_transport": "calc",
    "glass_distance": "calc",
    "rubble": "calc",
    "rubble_volume": "calc",
    "rubble_transport": "calc",
    "rubble_distance": "calc",
    "eps": "calc",
    "eps_volume": "calc",
    "eps_transport": "calc",
    "eps_distance": "calc",
    "xps": "calc",
    "xps_volume": "calc",
    "xps_transport": "calc",
    "xps_distance": "calc",
    "glass_wool": "calc",
    "glass_wool_volume": "calc",
    "glass_wool_transport": "calc",
    "glass_wool_distance": "calc",
    "rock_wool": "calc",
    "rock_wool_volume": "calc",
    "rock_wool_transport": "calc",
    "rock_wool_distance": "calc",
    "wood_fibre": "calc",
    "wood_fibre_volume": "calc",
    "wood_fibre_transport": "calc",
    "wood_fibre_distance": "calc",
    "wood": "calc",
    "wood_volume": "calc",
    "wood_transport": "calc",
    "wood_distance": "calc",
    "wood_massive": "calc",
    "wood_massive_volume": "calc",
    "wood_massive_transport": "calc",
    "wood_massive_distance": "calc",
    "wood_material": "calc",
    "wood_material_volume": "calc",
    "wood_material_transport": "calc",
    "wood_material_distance": "calc",
    "wood_latch": "calc",
    "wood_latch_volume": "calc",
    "wood_latch_transport": "calc",
    "wood_latch_distance": "calc",
    "demolish_disposal_distance": "calc",
    "demolish_disposal_usage": "calc",
    "demolish_disposal_settings": "calc",
    "material": "calc",
    "insulation": "calc",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});

  protected container_select_options = () => {
    const trans = this.translationS();
    return [
      {
        label: trans?.['10_cubic_meter_container'],
        value: '10_cubic_meter_container',
      },
      {
        label: trans?.['roll_off_container'],
        value: 'roll_off_container',
      },
    ];
  };

  protected concrete_fields: FormlyFieldConfig[] = [
    {
      key: 'concrete',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['concrete'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['concrete_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['concrete_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['concrete_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected steel_fields: FormlyFieldConfig[] = [
    {
      key: 'steel',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['steel'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['steel_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['steel_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['steel_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected brick_fields: FormlyFieldConfig[] = [
    {
      key: 'brick',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['brick'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['brick_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['brick_transport'])
            ),  
            'props.unit': this.$utils.provide_unit,
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['brick_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected plasterboard_fields: FormlyFieldConfig[] = [
    {
      key: 'plasterboard',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['plasterboard'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['plasterboard_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['plasterboard_transport'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['plasterboard_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected glass_fields: FormlyFieldConfig[] = [
    {
      key: 'glass',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['glass'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['glass_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['glass_transport'])
            ),  
            'props.unit': this.$utils.provide_unit,
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['glass_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected rubble_fields: FormlyFieldConfig[] = [
    {
      key: 'rubble',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['rubble'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['rubble_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['rubble_transport'])
            ),  
            'props.unit': this.$utils.provide_unit,
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['rubble_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected eps_fields: FormlyFieldConfig[] = [
    {
      key: 'eps',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['eps'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['eps_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['eps_transport'])
            ),  
            'props.unit': this.$utils.provide_unit,
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['eps_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected xps_fields: FormlyFieldConfig[] = [
    {
      key: 'xps',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['xps'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['xps_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['xps_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['xps_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected glass_wool_fields: FormlyFieldConfig[] = [
    {
      key: 'glass_wool',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['glass_wool'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['glass_wool_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['glass_wool_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['glass_wool_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected rock_wool_fields: FormlyFieldConfig[] = [
    {
      key: 'rock_wool',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['rock_wool'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['rock_wool_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['rock_wool_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['rock_wool_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected wood_fibre_fields: FormlyFieldConfig[] = [
    {
      key: 'wood_fibre',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['wood_fibre'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_fibre_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_fibre_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_fibre_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected wood_fields: FormlyFieldConfig[] = [
    {
      key: 'wood',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['wood'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected wood_massive_fields: FormlyFieldConfig[] = [
    {
      key: 'wood_massive',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['wood_massive'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_massive_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_massive_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_massive_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected wood_material_fields: FormlyFieldConfig[] = [
    {
      key: 'wood_material',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['wood_material'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_material_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_material_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_material_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected wood_latch_fields: FormlyFieldConfig[] = [
    {
      key: 'wood_latch',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['wood_latch'])
        ),  
      },
      fieldGroup: [
        {
          key: 'volume.value',
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
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_latch_volume'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'container.value',
          type: 'select',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_latch_transport'])
            ),  
            'props.options': this.translation$.pipe(
              map(() => this.container_select_options())
            ),
          },
        },
        {
          key: 'distance.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            unit: 'km',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['wood_latch_distance'])
            ),  
            'props.unit': this.$utils.provide_unit,
          },
        },
      ],
    },
  ];

  protected demolish_disposal_fields_material: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-col gap-2',
      fieldGroup: [
        ...this.concrete_fields,
        ...this.steel_fields,
        ...this.brick_fields,
        ...this.plasterboard_fields,
        ...this.glass_fields,
      ],
    },
    {
      fieldGroupClassName: 'flex flex-col gap-2',
      fieldGroup: [
        ...this.wood_fields,
        ...this.wood_massive_fields,
        ...this.wood_material_fields,
        ...this.wood_latch_fields,
        ...this.rubble_fields,
      ],
    },
  ];
  protected demolish_disposal_fields_insulation: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-col gap-2',
      fieldGroup: [
        ...this.eps_fields,
        ...this.xps_fields,
        ...this.glass_wool_fields,
      ],
    },
    {
      fieldGroupClassName: 'flex flex-col gap-2',
      fieldGroup: [...this.rock_wool_fields, ...this.wood_fibre_fields],
    },
  ];

  public demolish_disposal_fields_settings: FormlyFieldConfig[] = [
    {
      key: 'distance.value',
      type: 'input',
      wrappers: ['form-field'],
      props: {
        required: true,
        type: 'number',
        min: 0,
      },
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['demolish_disposal_distance'])
        ),  
        'props.unit': this.$utils.provide_unit,
      },
    },
    {
      key: 'usage.value',
      type: 'input',
      wrappers: ['unit', 'form-field'],
      props: {
        required: true,
        type: 'number',
        min: 0,
        max: 100,
      },
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['demolish_disposal_usage'])
        ),  
        'props.unit': this.$utils.provide_unit,
      },
    },
  ];

  public demolish_disposal_fields: FormlyFieldConfig[] = [
    {
      key: 'setting',
      fieldGroupClassName: 'flex flex-row flex-wrap gap-2',
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['demolish_disposal_settings'])
        ),  
      },
      fieldGroup: this.demolish_disposal_fields_settings,
    },
    {
      key: 'material',
      fieldGroupClassName: 'flex flex-row flex-wrap',
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['material'])
        ),  
      },
      fieldGroup: this.demolish_disposal_fields_material,
    },
    {
      key: 'insulation',
      fieldGroupClassName: 'flex flex-row flex-wrap',
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.translation$.pipe(
          map( trans => trans['insulation'])
        ),  
      },
      fieldGroup: this.demolish_disposal_fields_insulation,
    },
  ];
}
