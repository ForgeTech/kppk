import { inject, Injectable } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';
import { TranslocoService } from '@jsverse/transloco';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/material/form-field';
import { map, startWith } from 'rxjs';
import { KppkReactFieldsUtils } from './kppk-react-fields-utils.service';

export enum BUILD_TYPE_ENUM {
  'building_construction' = 'building_construction',
  'prefabricated_house' = 'prefabricated_house',
};

export enum POWER_SUPPLY_CALCULATION_TYPE_ENUM {
  'estimate' = 'estimate',
  'custom' = 'custom',
  'exact_entry' = 'exact_entry',
};

export enum POWER_SUPPLY_POWER_TYPE_ENUM {
  'austria_common_energy_mix' = 'austria_common_energy_mix',
  'austria_green_power_mix' = 'austria_green_power_mix',
};


export enum HEAT_SUPPLY_CALCULATION_TYPE_ENUM {
  'estimate' = 'estimate',
  'custom' = 'custom',
  'exact_entry' = 'exact_entry',
};

@Injectable({
  providedIn: 'root',
})
export class KppkReactConstructionSiteFields extends FgBaseService {
  protected $translate = inject(TranslocoService);
  protected $utils = inject(KppkReactFieldsUtils);

  protected power_supply_calculation_type_enum = POWER_SUPPLY_CALCULATION_TYPE_ENUM;
  protected power_supply_calculation_options = () => { return [
    { label: this.$translate.translate( 'calc.' + this.power_supply_calculation_type_enum.estimate ), value: this.power_supply_calculation_type_enum.estimate },
    { label: this.$translate.translate( 'calc.' + this.power_supply_calculation_type_enum.exact_entry ), value: this.power_supply_calculation_type_enum.exact_entry },
    { label: this.$translate.translate( 'calc.' + this.power_supply_calculation_type_enum.custom ), value: this.power_supply_calculation_type_enum.custom },
  ] };

  protected power_supply_power_type_enum = POWER_SUPPLY_POWER_TYPE_ENUM;
  public energy_usage_power_type_options = () => { return [
    { label: this.$translate.translate( 'calc.' + this.power_supply_power_type_enum.austria_common_energy_mix ), value: this.power_supply_power_type_enum.austria_common_energy_mix },
    { label: this.$translate.translate( 'calc.' + this.power_supply_power_type_enum.austria_green_power_mix ), value: this.power_supply_power_type_enum.austria_green_power_mix },
  ] };

  protected heat_supply_calculation_options_enum = HEAT_SUPPLY_CALCULATION_TYPE_ENUM;
  protected heat_supply_calculation_options = () => { return [
    { label: this.$translate.translate( 'calc.' + this.heat_supply_calculation_options_enum.estimate ), value: this.heat_supply_calculation_options_enum.estimate },
    { label: this.$translate.translate( 'calc.' + this.heat_supply_calculation_options_enum.custom ), value: this.heat_supply_calculation_options_enum.custom },
    { label: this.$translate.translate( 'calc.' + this.heat_supply_calculation_options_enum.exact_entry ), value: this.heat_supply_calculation_options_enum.exact_entry },
  ] };

  protected build_type_enum = BUILD_TYPE_ENUM;
  protected build_type_options = () => { return [
    { label: this.$translate.translate( 'calc.' + this.build_type_enum.building_construction ), value: this.build_type_enum.building_construction },
    { label: this.$translate.translate( 'calc.' + this.build_type_enum.prefabricated_house ), value: this.build_type_enum.prefabricated_house },
  ] };

  protected construction_site_energy_usage_settings: () => FormlyFieldConfig[] = () => { return [
    {
      key: 'energy_usage_settings',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.energy_usage_settings'),
      },
      fieldGroup: [
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
            'props.label': this.$translate.selectTranslate('calc.energy_usage_power_type'),
            'props.unit': this.$utils.provide_unit,
            'props.options': this.$translate.langChanges$.pipe( 
              startWith( this.$translate.getActiveLang() ),
              map( () => this.energy_usage_power_type_options() ) 
            )
          }
        },
        // {
        //   key: 'energy_usage_build_type.value',
        //   type: 'select',
        //   wrappers: ['unit', 'form-field'],
        //   props: {
        //     required: true,
        //     type: 'string',
        //     // options: this.build_type_options
        //   },
        //   modelOptions: {
        //     updateOn: 'blur',
        //     debounce: { default: 500 },
        //   },
        //   expressions: {
        //     'props.label': this.$translate.selectTranslate('calc.energy_usage_build_type'),
        //     'props.unit': this.$utils.provide_unit,
        //     'props.options': this.$translate.langChanges$.pipe( 
        //       startWith( this.$translate.getActiveLang() ),
        //       map( () => this.build_type_options() ) 
        //     )
        //   }
        // },
        {
          key: 'energy_usage_calculation_type.value',
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
            'props.label': this.$translate.selectTranslate('calc.energy_usage_calculation_type'),
            'props.unit': this.$utils.provide_unit,
            'props.options': this.$translate.langChanges$.pipe( 
              startWith( this.$translate.getActiveLang() ),
              map( () => this.power_supply_calculation_options() ) 
            )
          }
        },
      ]
    },
  ]};

  protected hide_unequal_calculation_type_estimate = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const root_model = this.$utils.get_root_parent( field ).model;
    // if(!root_model || !root_model.energy_usage_settings.energy_usage_calculation_type) {
    //   console.log( root_model )
    //   throw new Error('CONSTRUCTION_SITE_FIELD_EXPRESSION_ERROR')
    // }
    const result = root_model.energy_usage_settings.energy_usage_calculation_type.value !== POWER_SUPPLY_CALCULATION_TYPE_ENUM.estimate;
    return result;
  }

  protected power_supply_hide_equal_calculation_type_exact_entry = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const root_model = this.$utils.get_root_parent( field ).model;
    // if(!root_model || !root_model.energy_usage_settings.energy_usage_calculation_type) {
    //   console.log( root_model )
    //   throw new Error('CONSTRUCTION_SITE_FIELD_EXPRESSION_ERROR')
    // }
    const result = root_model.energy_usage_settings.energy_usage_calculation_type.value === POWER_SUPPLY_CALCULATION_TYPE_ENUM.exact_entry;
    return result;
  }

  protected power_supply_hide_unequal_calculation_type_exact_entry = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const result = !(this.power_supply_hide_equal_calculation_type_exact_entry(field));
    return result;
  }

  protected heating_supply_hide_equal_calculation_type_exact_entry = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const root_model = this.$utils.get_root_parent( field ).model;
    // if(!root_model || !root_model.energy_usage_settings.energy_usage_calculation_type) {
    //   console.log( root_model )
    //   throw new Error('CONSTRUCTION_SITE_FIELD_EXPRESSION_ERROR')
    // }
    const result = root_model.heating_supply_settings.calculation_type.value === POWER_SUPPLY_CALCULATION_TYPE_ENUM.exact_entry;
    return result;
  }

  protected heating_supply_hide_unequal_calculation_type_exact_entry = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const result = !(this.heating_supply_hide_equal_calculation_type_exact_entry(field));
    return result;
  }


  protected hide_unequal_calculation_type_custom = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const root_model = this.$utils.get_root_parent( field ).model;
    // if(!root_model || !root_model.energy_usage_settings.energy_usage_calculation_type) {
    //   console.log( root_model )
    //   throw new Error('CONSTRUCTION_SITE_FIELD_EXPRESSION_ERROR')
    // }
    const result = root_model.energy_usage_settings.energy_usage_calculation_type.value !== POWER_SUPPLY_CALCULATION_TYPE_ENUM.custom;
    return result;
  } 

  protected construction_site_year_fields: () => FormlyFieldConfig[] = () => {
    return [
    {
      fieldGroupClassName: 'flex flex-row gap-2 energy-year-usage',
      fieldGroup: [
        {
          key: 'january_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.january_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'february_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.february_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'march_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.march_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'april_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.april_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'may_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.may_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'june_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.june_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'flex flex-row gap-2 energy-year-usage',
      fieldGroup: [
        {
          key: 'july_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.july_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'august_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.august_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'september_energy_usage.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            label: this.$translate.translate('calc.september_energy_usage'),
            type: 'number',
            unit: 'kWh',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.september_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'october_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.october_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'november_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.november_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
        {
          key: 'december_energy_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.december_energy_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        }
      ]
    }
  ];};

  protected construction_site_energy_usage_values: () => FormlyFieldConfig[] = () => { return [
    {
      key: 'energy_usage_values',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.energy_usage_values'),
        'hide': this.power_supply_hide_equal_calculation_type_exact_entry,
      },
      fieldGroup: [
        {
          key: 'operation_period.value',
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
            'props.label': this.$translate.selectTranslate('calc.operation_period'),
            'props.unit': this.$utils.provide_unit,
            'hide': this.power_supply_hide_equal_calculation_type_exact_entry
          }
        },
        {
          key: 'gross_floor_area.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            type: 'number',
            min: 1
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.gross_floor_area'),
            'props.unit': this.$utils.provide_unit,
            'hide': this.hide_unequal_calculation_type_estimate
          }
        },
        {
          key: 'energy_usage_custom.value',
          type: 'input',
          wrappers: ['unit', 'form-field'],
          props: {
            required: true,
            label: this.$translate.translate('calc.energy_usage_custom'),
            type: 'number',
            unit: 'kWh/month',
            min: 0,
          },
          modelOptions: {
            updateOn: 'blur',
            debounce: { default: 500 },
          },
          expressions: {
            'props.label': this.$translate.selectTranslate('calc.energy_usage_custom'),
            'props.unit': this.$utils.provide_unit,
            'hide': this.hide_unequal_calculation_type_custom
          }
        },
      ]
    },
  ]};

 protected construction_site_energy_usage_energy_usage_year: () => FormlyFieldConfig[] = () => { return [
   {
     key: 'energy_usage_values.year_energy_usage',
     fieldGroupClassName: 'flex flex-col gap-2',
     wrappers: ['section-h4'],
     type: 'energy-usage-yearly-array',
     expressions: {
       'props.label': this.$translate.selectTranslate('calc.year_energy_usage'),
       'props.row-label': this.$translate.selectTranslate('calc.year_energy_usage_row'),
       'props.delete-btn-tooltip': this.$translate.selectTranslate('calc.year_energy_usage_delete_btn_tooltip'),
       'props.add-btn-label': this.$translate.selectTranslate('calc.year_energy_usage_add_btn_label'),
       'hide': this.power_supply_hide_unequal_calculation_type_exact_entry
     },
     fieldArray: {
      fieldGroup: [
        ...this.construction_site_year_fields()
      ]
     }
    }
  ]};

  protected heating_supply_enable_on_calculation_type_custom = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const root_model = this.$utils.get_root_parent( field ).model;
    if(!root_model || !root_model.heating_supply_settings.calculation_type) {
      console.log( root_model )
      throw new Error('CONSTRUCTION_SITE_FIELD_EXPRESSION_ERROR')
    }
    const result = root_model.heating_supply_settings.calculation_type.value === HEAT_SUPPLY_CALCULATION_TYPE_ENUM.custom;
    return !result;
  }

  protected heating_supply_enable_on_calculation_type_estimate = ( field: FormlyFieldConfig<FormlyFieldProps & {
    [additionalProperties: string]: any;
  }> ): boolean => {
    const root_model = this.$utils.get_root_parent( field ).model;
    if(!root_model || !root_model.heating_supply_settings.calculation_type) {
      console.log( root_model )
      throw new Error('CONSTRUCTION_SITE_FIELD_EXPRESSION_ERROR')
    }
    const result = root_model.heating_supply_settings.calculation_type.value === HEAT_SUPPLY_CALCULATION_TYPE_ENUM.estimate;
    return !result;
  }

  protected construction_site_heating_supply_settings: () => FormlyFieldConfig[] = () => { return [
    {
      key: 'heating_supply_settings',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.heating_supply_settings'),
      },
      fieldGroup: [
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
            'props.label': this.$translate.selectTranslate('calc.energy_usage_power_type'),
            'props.unit': this.$utils.provide_unit,
            'props.options': this.$translate.langChanges$.pipe( 
              startWith( this.$translate.getActiveLang() ),
              map( () => this.energy_usage_power_type_options() ) 
            )
          }
        },
        {
          key: 'calculation_type.value',
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
            'props.label': this.$translate.selectTranslate('calc.heating_supply_calculation_type'),
            'props.unit': this.$utils.provide_unit,
            'props.options': this.$translate.langChanges$.pipe( 
              startWith( this.$translate.getActiveLang() ),
              map( () => this.heat_supply_calculation_options() ) 
            )
          }
        },
      ]
    }
  ]};

  protected construction_site_heating_supply_values = () => { return [
    {
      key: 'heating_supply_values',
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.heating_supply_values'),
      },
      fieldGroup: [
        {
          key: 'operation_period.value',
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
            'props.label': this.$translate.selectTranslate('calc.operation_period'),
            'props.unit': this.$utils.provide_unit,
            'hide': this.heating_supply_hide_equal_calculation_type_exact_entry
          }
        },
        {
          key: 'energy_usage_custom.value',
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
            'props.label': this.$translate.selectTranslate('calc.heating_supply_energy_usage_custom'),
            'props.unit': this.$utils.provide_unit,
            'hide': this.heating_supply_enable_on_calculation_type_custom
          }
        },
        {
          key: 'gross_floor_area.value',
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
            'props.label': this.$translate.selectTranslate('calc.heating_supply_gross_floor_area'),
            'props.unit': this.$utils.provide_unit,
            'hide': this.heating_supply_enable_on_calculation_type_estimate
          }
        },
        {
          key: 'fuel_oil_usage.value',
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
            'props.label': this.$translate.selectTranslate('calc.fuel_oil_usage'),
            'props.unit': this.$utils.provide_unit,
          }
        },
      ]
    },
  ]};

  protected construction_site_heating_supply_energy_usage_year: () => FormlyFieldConfig[] = () => { return [
    {
      key: 'heating_supply_values.year_energy_usage',
      fieldGroupClassName: 'flex flex-col gap-2',
      type: 'energy-usage-yearly-array',
      wrappers: ['section-h4'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.year_energy_usage'),
        'props.row-label': this.$translate.selectTranslate('calc.year_energy_usage_row'),
        'props.delete-btn-tooltip': this.$translate.selectTranslate('calc.year_energy_usage_delete_btn_tooltip'),
        'props.add-btn-label': this.$translate.selectTranslate('calc.year_energy_usage_add_btn_label'),
        'hide': this.heating_supply_hide_unequal_calculation_type_exact_entry
      },
      fieldArray: {
        fieldGroup: [
          ...this.construction_site_year_fields()
        ]
      }
     }
   ]};

  public fields = () => { return [
    {
      fieldGroupClassName: 'flex flex-col gap-2',
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.energy_usage_headline'),
      },
      fieldGroup: [
        ...this.construction_site_energy_usage_settings(),
        ...this.construction_site_energy_usage_values(),
        ...this.construction_site_energy_usage_energy_usage_year(),
        // ...this.construction_site_energy_usage_exact,
      ]
    },
    {
      fieldGroupClassName: 'flex flex-col gap-2',
      wrappers: ['section-h3'],
      expressions: {
        'props.label': this.$translate.selectTranslate('calc.heating_supply_headline'),
      },
      fieldGroup: [
        ...this.construction_site_heating_supply_settings(),
        ...this.construction_site_heating_supply_values(),
        ...this.construction_site_heating_supply_energy_usage_year()
      ]
    }
  ]};

}
