import { inject, Injectable } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';
import { TranslocoService } from '@jsverse/transloco';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { startWith } from 'rxjs';
import { map } from 'rxjs';
import { KppkReactFieldsUtils } from './kppk-react-fields-utils.service';
import { FormlyFieldProps } from '@ngx-formly/material/form-field';
import { 
  EXCAVATION_PIT_SECURITY_METHODE_ENUM,
  JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM,
  JET_BLASTING_PROCESS_TYPE_ENUM 
} from '@kppk/react-lib';

@Injectable({
  providedIn: 'root',
})
export class KppkReactExcavationPitFields extends FgBaseService {
  protected $translate = inject(TranslocoService);
  protected $utils = inject(KppkReactFieldsUtils);

  protected jet_blasting_process_cylinder_shape_enum = JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM;
  protected jet_blasting_process_cylinder_shape_options = () => { return [
    { 
      label: this.$translate.translate( 'calc.jet_blasting_process_cylinder_shape_enum.' + this.jet_blasting_process_cylinder_shape_enum.full_circle),
      value: this.jet_blasting_process_cylinder_shape_enum.full_circle 
    },
    { 
      label: this.$translate.translate( 'calc.jet_blasting_process_cylinder_shape_enum.' + this.jet_blasting_process_cylinder_shape_enum.half_circle),
      value: this.jet_blasting_process_cylinder_shape_enum.half_circle 
    },
    { 
      label: this.$translate.translate( 'calc.jet_blasting_process_cylinder_shape_enum.' + this.jet_blasting_process_cylinder_shape_enum.quater_circle),
      value: this.jet_blasting_process_cylinder_shape_enum.quater_circle 
    },
  ]};
 
  protected jet_blasting_process_type_enum = JET_BLASTING_PROCESS_TYPE_ENUM;
  protected jet_blasting_process_type_options = () => { return [
    { 
      label: this.$translate.translate( 'calc.jet_blasting_process_type_enum.' + this.jet_blasting_process_type_enum.process_type_cylinder),
      value: this.jet_blasting_process_type_enum.process_type_cylinder 
    },
    { 
      label: this.$translate.translate( 'calc.jet_blasting_process_type_enum.' + this.jet_blasting_process_type_enum.process_type_cuboid),
      value: this.jet_blasting_process_type_enum.process_type_cuboid 
    },
  ]};
  
  protected excavation_pit_security_methode_enum = EXCAVATION_PIT_SECURITY_METHODE_ENUM
  protected excavation_pit_process_type_options = () => { return [
    { 
      label: this.$translate.translate( 'calc.excavation_pit_security_methode_enum.' + this.excavation_pit_security_methode_enum.escarpment),
      value: this.excavation_pit_security_methode_enum.escarpment 
    },
    { 
      label: this.$translate.translate( 'calc.excavation_pit_security_methode_enum.' + this.excavation_pit_security_methode_enum.foundation_pile),
      value: this.excavation_pit_security_methode_enum.foundation_pile 
    },
    { 
      label: this.$translate.translate( 'calc.excavation_pit_security_methode_enum.' + this.excavation_pit_security_methode_enum.jet_blasting),
      value: this.excavation_pit_security_methode_enum.jet_blasting 
    },
    { 
      label: this.$translate.translate( 'calc.excavation_pit_security_methode_enum.' + this.excavation_pit_security_methode_enum.sheet_pile_wall),
      value: this.excavation_pit_security_methode_enum.sheet_pile_wall 
    },
    { 
      label: this.$translate.translate( 'calc.excavation_pit_security_methode_enum.' + this.excavation_pit_security_methode_enum.shotcrete),
      value: this.excavation_pit_security_methode_enum.shotcrete 
    },
  ]};


  
  protected excavation_pit_security_fields: FormlyFieldConfig[] = [
    {
      key: 'excavation_pit_security',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.excavation_pit_security_settings')
      },
      fieldGroup: [
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
            'props.label': this.$translate.selectTranslate('calc.excavation_pit_security_distance'),
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'depth.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],          
          props: {
            required: true,
            type: 'number',
            min: 1,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.excavation_pit_security_depth'),
            'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'linear_meter.value',
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
            'props.label': this.$translate.selectTranslate('calc.excavation_pit_security_linear_meter'),
           'props.unit': this.$utils.provide_unit,
          },
        },
        {
          key: 'methode.value',
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
            'props.label': this.$translate.selectTranslate('calc.excavation_pit_security_methode'),
            'props.unit': this.$utils.provide_unit,
            'props.options': this.$translate.langChanges$.pipe( 
              startWith( this.$translate.getActiveLang() ),
              map( () => this.excavation_pit_process_type_options() ) 
            )
          }
        },
        {
          key: 'building_gap.value',
          type: 'checkbox',
          wrappers: ['unit'],
          // defaultValue: 50,
          props: {
            color: 'primary'
            // required: true,
            // type: 'number',
            // unit: 'km',
            // min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            "props.label": this.$translate.selectTranslate('calc.building_gap'),
          }
        },
      ]
    },
  ];

  protected hide_unequal_jet_blasting_process = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    // field.model
    const root_model = this.$utils.get_root_parent( field ).model;
    const result = root_model.excavation_pit_security.methode.value !== EXCAVATION_PIT_SECURITY_METHODE_ENUM.jet_blasting;
    return result;
  }

  protected hide_unequal_jet_blasting_process_type_cylinder = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    // field.model
    const root_model = this.$utils.get_root_parent( field ).model;
    const result = root_model.jet_blasting_process.process_type.value !== JET_BLASTING_PROCESS_TYPE_ENUM.process_type_cylinder;
    return result;
  }
  
  protected hide_unequal_jet_blasting_process_type_cuboid = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    // field.model
    const root_model = this.$utils.get_root_parent( field ).model;
    const result = root_model.jet_blasting_process.process_type.value !== JET_BLASTING_PROCESS_TYPE_ENUM.process_type_cuboid;
    return result;
  }

  protected jet_blasting_process_cylinder_fields: FormlyFieldConfig[] = [
    {
      key: 'jet_blasting_process_cylinder',
      fieldGroupClassName: 'flex flex-row gap-2',
      // wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_cylinder'),
        'hide': this.hide_unequal_jet_blasting_process_type_cylinder
      },
      fieldGroup: [
        {
          key: 'diameter.value',
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
            'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_diameter'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'shape.value',
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
            'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_cylinder_shape'),
            'props.unit': this.$utils.provide_unit,
            'props.options': this.$translate.langChanges$.pipe( 
              startWith( this.$translate.getActiveLang() ),
              map( () => this.jet_blasting_process_cylinder_shape_options() ) 
            )
          }
        },
      ]
    },
  ];
  
  protected jet_blasting_process_cuboid_fields: FormlyFieldConfig[] = [
    {
      key: 'jet_blasting_process_cuboid',
      fieldGroupClassName: 'flex flex-row gap-2',
      // wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_cuboid'),
        'hide': this.hide_unequal_jet_blasting_process_type_cuboid
      },
      fieldGroup: [
        {
          key: 'length.value',
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
            'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_cuboid_length'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'width.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],          
          props: {
            required: true,

            type: 'number',
            unit: 'm',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_cuboid_width'),
            'props.unit': this.$utils.provide_unit,
            'props.disabled': ( ( field: FormlyFieldConfig ) => {
              console.log( 'field.options?.formState' )
              console.log( field.options?.formState )
              return false;
            })
          }
        },
      ]
    },
  ];
  
  protected jet_blasting_process_fields: FormlyFieldConfig[] = [
    {
      key: 'jet_blasting_process',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.jet_blasting_process'),
        'hide': this.hide_unequal_jet_blasting_process
      },
      fieldGroup: [
        {
          key: 'amount.value',
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
            'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_amount'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        // {
        //   key: 'process_type.value',
        //   type: 'select',
        //   wrappers: ['unit', 'form-field'],          
        //   props: {
        //     required: true,
        //     type: 'string',
        //   },
        //   modelOptions: {
        //     updateOn: 'blur',
        //     debounce: { default: 500 },
        //   },
        //   expressions: {
        //     'props.label': this.$translate.selectTranslate('calc.jet_blasting_process_process_type'),
        //     'props.unit': this.$utils.provide_unit,
        //     'props.options': this.$translate.langChanges$.pipe( 
        //       startWith( this.$translate.getActiveLang() ),
        //       map( () => this.jet_blasting_process_type_options() ) 
        //     )
        //   }
        // },
        ...this.jet_blasting_process_cylinder_fields,
        // ...this.jet_blasting_process_cuboid_fields
      ]
    },
  ];
  


  protected hide_unequal_escarpment_process = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    // field.model
    const root_model = this.$utils.get_root_parent( field ).model;
    const result = root_model.excavation_pit_security.methode.value !== EXCAVATION_PIT_SECURITY_METHODE_ENUM.escarpment;
    return result;
  }

  
  protected escarpment_fields: FormlyFieldConfig[] = [
    {
      key: 'escarpment',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.escarpment'),
        hide: this.hide_unequal_escarpment_process
      },
      fieldGroup: [
        {
          key: 'tilt.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],          
          props: {
            required: true,
            type: 'number',
            min: 1,
            max: 180
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.escarpment_tilt'),
            'props.unit': this.$utils.provide_unit,
          }
        },
      ]
    },
  ];
  
  protected hide_unequal_sheet_pile_wall_process = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    // field.model
    const root_model = this.$utils.get_root_parent( field ).model;
    const result = root_model.excavation_pit_security.methode.value !== EXCAVATION_PIT_SECURITY_METHODE_ENUM.sheet_pile_wall;
    return result;
  }

  protected sheet_pile_wall_fields: FormlyFieldConfig[] = [
  {
      key: 'sheet_pile_wall',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.sheet_pile_wall'),
        'hide': this.hide_unequal_sheet_pile_wall_process
      },
      fieldGroup: [
        {
          key: 'mass_unit_area.value',
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
            'props.label': this.$translate.selectTranslate('calc.sheet_pile_wall_mass_unit_area'),
            'props.unit': this.$utils.provide_unit,
          }
        },
      ]
    },
  ];

  protected hide_unequal_shotcrete_process = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    // field.model
    const root_model = this.$utils.get_root_parent( field ).model;
    const result = root_model.excavation_pit_security.methode.value !== EXCAVATION_PIT_SECURITY_METHODE_ENUM.shotcrete;
    return result;
  }
  
  protected shotcrete_fields: FormlyFieldConfig[] = [
    {
      key: 'shotcrete',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.shotcrete'),
        'hide': this.hide_unequal_shotcrete_process
      },
      fieldGroup: [
        {
          key: 'thickness.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],          
          props: {
            required: true,
            label: 'shotcrete_thickness',
            type: 'number',
            unit: 'm',
            min: 0
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.shotcrete_thickness'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'tilt.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],          
          props: {
            required: true,
            type: 'number',
            min: 1,
            max: 180
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.shotcrete_escarpment_tilt'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'nail_count.value',
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
            'props.label': this.$translate.selectTranslate('calc.shotcrete_nail_count'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'nail_length.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],          
          props: {
            required: true,
            type: 'number',
            min: 1,
            max: 180
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.shotcrete_nail_length'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'nail_diameter.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],          
          props: {
            required: true,
            type: 'number',
            min: 1,
            max: 180
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.shotcrete_nail_diameter'),
            'props.unit': this.$utils.provide_unit,
          }
        },

      ]
    },
  ];
  
  protected hide_unequal_foundation_pile_process = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    // field.model
    const root_model = this.$utils.get_root_parent( field ).model;
    const result = root_model.excavation_pit_security.methode.value !== EXCAVATION_PIT_SECURITY_METHODE_ENUM.foundation_pile;
    return result;
  }

  protected foundation_pile_fields: FormlyFieldConfig[] = [
    {
      key: 'foundation_pile',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.foundation_pile'),
        'hide': this.hide_unequal_foundation_pile_process
      },
      fieldGroup: [
        {
          key: 'diameter.value',
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
            'props.label': this.$translate.selectTranslate('calc.foundation_pile_diameter'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'amount.value',
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
            'props.label': this.$translate.selectTranslate('calc.foundation_pile_amount'),
            'props.unit': this.$utils.provide_unit,
          }
        },
      ]
    },
  ];
  
  protected excavation_fields: FormlyFieldConfig[] = [
    {
      key: 'excavation',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.excavation_settings')
      },
      fieldGroup: [
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
            "props.label": this.$translate.selectTranslate('calc.excavation_distance'),
            "props.unit": this.$utils.provide_unit,
          }
        },
        {
          key: 'volume.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          // defaultValue: 450,
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
            "props.label": this.$translate.selectTranslate('calc.excavation_volume'),
            "props.unit": this.$utils.provide_unit,
          }
        },
      ]
    },
  ];
  
  public excavation_pit_fields: FormlyFieldConfig[] = [
    {
      // key: 'excavation',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.excavation')
      },
      fieldGroup: [
        ...this.excavation_fields,
      ]
    },
    {
      // key: 'excavation',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.excavation_pit_security')
      },
      fieldGroup: [
        {
          fieldGroupClassName: 'flex flex-row flex-wrap gap-2',
          fieldGroup: [
            ...this.excavation_pit_security_fields,
            ...this.jet_blasting_process_fields,
            // ...this.jet_blasting_process_cylinder_fields,
            // ...this.jet_blasting_process_cuboid_fields,
            ...this.escarpment_fields,     
            ...this.sheet_pile_wall_fields,
            ...this.shotcrete_fields,
            ...this.foundation_pile_fields,
          ]
        },
        // {
        //   fieldGroupClassName: 'flex flex-row flex-wrap gap-2',
        //   fieldGroup: [
        //     ...this.excavation_fields,
        //   ]
        // }
      ]
    },

  ];
}
