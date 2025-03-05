import { inject, Injectable } from '@angular/core';
import { FgBaseService, FgTranslate } from '@kppk/fg-lib-new';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/material/form-field';
import { map } from 'rxjs';
import { KppkReactFieldsUtils } from './kppk-react-fields-utils.service';
import {
  BUILD_TYPE_ENUM,
  CALCULATION_TYPE_ENUM,
  POWER_SUPPLY_POWER_TYPE_ENUM,
} from '@kppk/react-lib';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class KppkReactConstructionSiteFields extends FgBaseService {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "april_energy_usage": "calc",
    "august_energy_usage": "calc",
    "austria_common_energy_mix": "calc",
    "austria_green_power_mix": "calc",
    "building_construction": "calc",
    "custom": "calc",
    "december_energy_usage": "calc",
    "energy_usage_calculation_type": "calc",
    "energy_usage_custom": "calc",
    "energy_usage_headline": "calc",
    "energy_usage_power_type": "calc",
    "energy_usage_settings": "calc",
    "energy_usage_values": "calc",
    "estimate": "calc",
    "exact_entry": "calc",
    "february_energy_usage": "calc",
    "fuel_oil_usage": "calc",
    "gross_floor_area": "calc",
    "heating_supply_calculation_type": "calc",
    "heating_supply_energy_usage_custom": "calc",
    "heating_supply_gross_floor_area": "calc",
    "heating_supply_headline": "calc",
    "heating_supply_settings": "calc",
    "heating_supply_values": "calc",
    "january_energy_usage": "calc",
    "july_energy_usage": "calc",
    "june_energy_usage": "calc",
    "march_energy_usage": "calc",
    "may_energy_usage": "calc",
    "november_energy_usage": "calc",
    "october_energy_usage": "calc",
    "operation_period": "calc",
    "prefabricated_house": "calc",
    "september_energy_usage": "calc",
    "year_energy_usage_add_btn_label": "calc",
    "year_energy_usage_delete_btn_tooltip": "calc",
    "year_energy_usage_row": "calc",
    "year_energy_usage": "calc",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});

  protected calculation_type_options = () => {
    return [
      {
        label: this.translationS()?.[CALCULATION_TYPE_ENUM.estimate],
        value: CALCULATION_TYPE_ENUM.estimate,
      },
      {
        label: this.translationS()?.[CALCULATION_TYPE_ENUM.exact_entry],
        value: CALCULATION_TYPE_ENUM.exact_entry,
      },
      {
        label: this.translationS()?.[CALCULATION_TYPE_ENUM.custom],
        value: CALCULATION_TYPE_ENUM.custom,
      },
    ];
  };

  protected power_supply_power_type_enum = POWER_SUPPLY_POWER_TYPE_ENUM;
  public energy_usage_power_type_options = () => {
    return [
      {
        label: this.translationS()?.[this.power_supply_power_type_enum.austria_common_energy_mix],
        value: this.power_supply_power_type_enum.austria_common_energy_mix,
      },
      {
        label: this.translationS()?.[this.power_supply_power_type_enum.austria_green_power_mix],
        value: this.power_supply_power_type_enum.austria_green_power_mix,
      },
    ];
  };

  // protected heat_supply_calculation_options_enum =
  //   HEAT_SUPPLY_CALCULATION_TYPE_ENUM;
  // protected heat_supply_calculation_options = () => {
  //   return [
  //     {
  //       label: this.translationS()?.[this.heat_supply_calculation_options_enum.estimate],
  //       value: this.heat_supply_calculation_options_enum.estimate,
  //     },
  //     {
  //       label: this.translationS()?.[this.heat_supply_calculation_options_enum.custom],
  //       value: this.heat_supply_calculation_options_enum.custom,
  //     },
  //     {
  //       label: this.translationS()?.[this.heat_supply_calculation_options_enum.exact_entry],
  //       value: this.heat_supply_calculation_options_enum.exact_entry,
  //     },
  //   ];
  // };

  protected build_type_enum = BUILD_TYPE_ENUM;
  protected build_type_options = () => {
    return [
      {
        label: this.translationS()?.[this.build_type_enum.building_construction],
        value: this.build_type_enum.building_construction,
      },
      {
        label: this.translationS()?.[this.build_type_enum.prefabricated_house],
        value: this.build_type_enum.prefabricated_house,
      },
    ];
  };

  protected construction_site_energy_usage_settings: () => FormlyFieldConfig[] =
    () => {
      return [
        {
          key: 'energy_usage_settings',
          fieldGroupClassName: 'flex flex-row gap-2',
          wrappers: ['section-h4'],
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['energy_usage_settings'])
            ),  
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
                'props.label': this.translation$.pipe(
                  map( trans => trans['energy_usage_power_type'])
                ),  
                'props.unit': this.$utils.provide_unit,
                'props.options': this.translation$.pipe(
                  map(() => this.energy_usage_power_type_options())
                ),
              },
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
                'props.label': this.translation$.pipe(
                  map( trans => trans['energy_usage_calculation_type'])
                ),  
                'props.unit': this.$utils.provide_unit,
                'props.options': this.translation$.pipe(
                  map(() => this.calculation_type_options())
                ),
              },
            },
          ],
        },
      ];
    };

  protected hide_unequal_calculation_type_estimate = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): boolean => {
    const root_model = this.$utils.get_root_parent(field).model;
    let result = true;
    if(Object.keys(root_model).length) {
      result =root_model.energy_usage_settings.energy_usage_calculation_type.value !== CALCULATION_TYPE_ENUM.estimate;
    }       
    return result;
  };

  protected hide_equal_calculation_type_exact_entry = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): boolean => {
    const root_model = this.$utils.get_root_parent(field).model;
    let result = true;
    if(Object.keys(root_model).length) {
      result = root_model.energy_usage_settings.energy_usage_calculation_type.value === CALCULATION_TYPE_ENUM.exact_entry;
    }     
    return result;
  };

  // protected power_supply_hide_unequal_calculation_type_exact_entry = (
  //   field: FormlyFieldConfig<
  //     FormlyFieldProps & {
  //       [additionalProperties: string]: any;
  //     }
  //   >
  // ): boolean => {
  //   const result =
  //     !this.power_supply_hide_equal_calculation_type_exact_entry(field);
  //   return result;
  // };

  // protected heating_supply_hide_equal_calculation_type_exact_entry = (
  //   field: FormlyFieldConfig<
  //     FormlyFieldProps & {
  //       [additionalProperties: string]: any;
  //     }
  //   >
  // ): boolean => {
  //   const root_model = this.$utils.get_root_parent(field).model;
  //   if(!root_model || !root_model.energy_usage_settings.energy_usage_calculation_type) {
  //     console.log( root_model )
  //     throw new Error('CONSTRUCTION_SITE_FIELD_EXPRESSION_ERROR')
  //   }
  //   const result =
  //     root_model.heating_supply_settings.calculation_type.value ===
  //     CALCULATION_TYPE_ENUM.exact_entry;
  //   return result;
  // };

  protected hide_unequal_calculation_type_exact_entry = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): boolean => {
    const result =
      !this.hide_equal_calculation_type_exact_entry(field);
    return result;
  };

  protected hide_unequal_calculation_type_custom = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): boolean => {
    const root_model = this.$utils.get_root_parent(field).model;
    let result = true;
    if(Object.keys(root_model).length) {
      result =    root_model.energy_usage_settings.energy_usage_calculation_type.value !== CALCULATION_TYPE_ENUM.custom;
    }
    return result;
  };

  protected construction_site_year_fields: () => FormlyFieldConfig[] = () => {
    const result: FormlyFieldConfig[] = [
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
              'props.label': this.translation$.pipe(
                map( trans => trans['january_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['february_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['march_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['april_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['may_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['june_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
          },
        ],
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
              'props.label': this.translation$.pipe(
                map( trans => trans['july_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['august_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
          },
          {
            key: 'september_energy_usage.value',
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
                map( trans => trans['september_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['october_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['november_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['december_energy_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
          },
        ],
      },
    ];
    return result;
  };

  protected construction_site_energy_usage_values: () => FormlyFieldConfig[] =
    () => {
      const result: FormlyFieldConfig[]  = 
      [
        {
          key: 'energy_usage_values',
          fieldGroupClassName: 'flex flex-row gap-2',
          wrappers: ['section-h4'],
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['energy_usage_values'])
            ),  
            hide: this.hide_equal_calculation_type_exact_entry,
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
                'props.label': this.translation$.pipe(
                  map( trans => trans['operation_period'])
                ),  
                'props.unit': this.$utils.provide_unit,
                'hide': field => this.hide_equal_calculation_type_exact_entry(field),
              },
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
                'props.label': this.translation$.pipe(
                  map( trans => trans['gross_floor_area'])
                ),  
                'props.unit': this.$utils.provide_unit,
                hide: this.hide_unequal_calculation_type_estimate,
              },
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
                'props.label': this.translation$.pipe(
                  map( trans => trans['energy_usage_custom'])
                ),  
                'props.unit': this.$utils.provide_unit,
                hide: this.hide_unequal_calculation_type_custom,
              },
            },
          ],
        },
      ];
      return result;
    };

  protected construction_site_energy_usage_energy_usage_year: () => FormlyFieldConfig[] =
    () => {
        const result: FormlyFieldConfig[] = [
        {
          key: 'energy_usage_values.year_energy_usage',
          fieldGroupClassName: 'flex flex-col gap-2 flex-wrap',
          wrappers: ['section-h4'],
          type: 'energy-usage-yearly-array',
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['year_energy_usage'])
            ),  
            'props.row-label': this.translation$.pipe(
              map( trans => trans['year_energy_usage_row'])
            ),  
            'props.delete-btn-tooltip': this.translation$.pipe(
              map( trans => trans['year_energy_usage_delete_btn_tooltip'])
            ),  
            'props.add-btn-label': this.translation$.pipe(
              map( trans => trans['year_energy_usage_add_btn_label'])
            ),  
            hide: field => {
              console.log('FARK_FARK_FARK');
              console.log(field);
              const result = this.hide_unequal_calculation_type_exact_entry(field);
              return result; 
            },
          },
          fieldArray: {
            fieldGroup: [...this.construction_site_year_fields()],
          },
        },
      ];
      return result;
    };

  protected show_on_calculation_type_custom = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): boolean => {
    const root_model = this.$utils.get_root_parent(field).model;
    let result = true;
    if(Object.keys(root_model).length) {
      result = root_model.heating_supply_settings.calculation_type.value === CALCULATION_TYPE_ENUM.custom;
    }       
    return !result;
  };

  protected enable_on_calculation_type_estimate = (
    field: FormlyFieldConfig<
      FormlyFieldProps & {
        [additionalProperties: string]: any;
      }
    >
  ): boolean => {
    const root_model = this.$utils.get_root_parent(field).model;
    let result = true;
    if(Object.keys(root_model).length) {
      result = root_model.heating_supply_settings.calculation_type.value === CALCULATION_TYPE_ENUM.estimate;
    } 
    return !result;
  };

  protected construction_site_heating_supply_settings: () => FormlyFieldConfig[] =
    () => {
      return [
        {
          key: 'heating_supply_settings',
          fieldGroupClassName: 'flex flex-row gap-2',
          wrappers: ['section-h4'],
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['heating_supply_settings'])
            ),  
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
                'props.label': this.translation$.pipe(
                  map( trans => trans['energy_usage_power_type'])
                ),  
                'props.unit': this.$utils.provide_unit,
                'props.options': this.translation$.pipe(
                  map(() => this.energy_usage_power_type_options())
                ),
              },
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
                'props.label': this.translation$.pipe(
                  map( trans => trans['heating_supply_calculation_type'])
                ),  
                'props.unit': this.$utils.provide_unit,
                'props.options': this.translation$.pipe(
                  map(() => this.calculation_type_options())
                ),
              },
            },
          ],
        },
      ];
    };

  protected construction_site_heating_supply_values = () => {
    const result: FormlyFieldConfig[] = [
      {
        key: 'heating_supply_values',
        fieldGroupClassName: 'flex flex-row gap-2',
        wrappers: ['section-h4'],
        expressions: {
          'props.label': this.translation$.pipe(
            map( trans => trans['heating_supply_values'])
          ),  
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
              'props.label': this.translation$.pipe(
                map( trans => trans['operation_period'])
              ),  
              'props.unit': this.$utils.provide_unit,
              hide: this.hide_equal_calculation_type_exact_entry,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['heating_supply_energy_usage_custom'])
              ),  
              'props.unit': this.$utils.provide_unit,
              hide: this.show_on_calculation_type_custom,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['heating_supply_gross_floor_area'])
              ),  
              'props.unit': this.$utils.provide_unit,
              hide: this.enable_on_calculation_type_estimate,
            },
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
              'props.label': this.translation$.pipe(
                map( trans => trans['fuel_oil_usage'])
              ),  
              'props.unit': this.$utils.provide_unit,
            },
          },
        ],
      },
    ];
    return result;
  };

  protected construction_site_heating_supply_energy_usage_year: () => FormlyFieldConfig[] =
    () => {
      const result: FormlyFieldConfig[] = [
        {
          key: 'heating_supply_values.year_energy_usage',
          fieldGroupClassName: 'flex flex-col gap-2 flex-wrap',
          type: 'energy-usage-yearly-array',
          wrappers: ['section-h4'],
          expressions: {
            'props.label': this.translation$.pipe(
              map( trans => trans['year_energy_usage'])
            ),
            'props.row-label': this.translation$.pipe(
              map( trans => trans['year_energy_usage_row'])
            ),
            'props.delete-btn-tooltip': this.translation$.pipe(
              map( trans => trans['year_energy_usage_delete_btn_tooltip'])
            ),
            'props.add-btn-label': this.translation$.pipe(
              map( trans => trans['year_energy_usage_add_btn_label'])
            ),
            hide: this.hide_unequal_calculation_type_exact_entry,
          },
          fieldArray: {
            fieldGroup: [...this.construction_site_year_fields()],
          },
        },
      ];
      return result;
    };

  public fields = () => {
    const result: FormlyFieldConfig[] = [
      {
        fieldGroupClassName: 'flex flex-col gap-2 flex-wrap',
        wrappers: ['section-h3'],
        expressions: {
          'props.label': this.translation$.pipe(
            map( trans => trans['energy_usage_headline'])
          ),  
        },
        fieldGroup: [
          ...this.construction_site_energy_usage_settings(),
          ...this.construction_site_energy_usage_values(),
          ...this.construction_site_energy_usage_energy_usage_year(),
          // ...this.construction_site_energy_usage_exact,
        ],
      },
      {
        fieldGroupClassName: 'flex flex-col gap-2 flex-wrap',
        wrappers: ['section-h3'],
        expressions: {
          'props.label': this.translation$.pipe(
            map( trans => trans['heating_supply_headline'])
          ),  
        },
        fieldGroup: [
          ...this.construction_site_heating_supply_settings(),
          ...this.construction_site_heating_supply_values(),
          ...this.construction_site_heating_supply_energy_usage_year(),
        ],
      },
    ];
    return result;
  };
}
