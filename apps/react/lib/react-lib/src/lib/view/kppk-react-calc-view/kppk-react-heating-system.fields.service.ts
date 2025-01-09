import { inject, Injectable } from "@angular/core";
import { FgBaseService } from "@fg-kppk/fg-base";
import { TranslocoService } from "@jsverse/transloco";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { KppkReactFieldsUtils } from "./kppk-react-fields-utils.service";
import { map, startWith } from "rxjs";
import { KppkReactComponentBaseService } from "../../base/xstate-base/kppk-react-component-base.service";
import { FormlySelectOption } from "@ngx-formly/core/select";

@Injectable({
    providedIn: 'root',
  })
  export class KppkReactHeatingSystemFields extends FgBaseService { 
    protected $utils = inject(KppkReactFieldsUtils);

    protected heating_system_settings: FormlyFieldConfig[] = [
      {
        fieldGroupClassName: 'flex flex-row gap-2',
        wrappers: ['section-h4'],
        expressions: {
          'props.label': this.$translate.selectTranslate('calc.heating_system_settings')
        },
        fieldGroup: [
          {
            fieldGroupClassName: 'flex flex-row flex-wrap gap-2',
            fieldGroup: [
              {
                key: 'system_select.value',
                type: 'select',
                wrappers: ['unit', 'form-field'],          
                props: {
                  required: true,
                  type: 'string',
                },
                expressions: {
                  'props.label': this.$translate.selectTranslate('calc.heating_system_system_select'),
                  'props.unit': this.$utils.provide_unit,
                  'props.options': this.$translate.langChanges$.pipe( 
                    startWith( this.$translate.getActiveLang() ),
                    map( () => {
                      const options: FormlySelectOption[] = [];
                      const system_data = this.$base.state_react_view_calculation_s()?.context.calculation?.file_rose;
                      if( system_data ) {
                        Object.keys( system_data ).forEach( key => {
                            const value_unit_tonco2 = system_data[ key as keyof typeof system_data];
                            if( value_unit_tonco2.value !== 0) {
                            const option: FormlySelectOption = {
                              label: this.$translate.translate('calc.heating_system_' + key ),
                              value: key
                            };
                            options.push( option );
                            }
                        });
                      }
                      return options;
                    }) 
                  )
                }
              },
              {
                key: 'system_co2_duration.value',
                type: 'input',
                wrappers: ['unit', 'form-field'],
                props: {
                  required: true,
                  disabled: true,
                  type: 'number',
                  min: 0,
                },
                modelOptions: {
                  updateOn: 'blur',
                  debounce: { default: 500 },
                },
                expressions: {
                  'props.label': this.$translate.selectTranslate('calc.heating_system_system_co2_duration'),
                  'props.unit': this.$utils.provide_unit,
                }
              },
              {
                key: 'system_duration.value',
                type: 'input',
                wrappers: ['unit', 'form-field'],
                props: {
                  required: true,
                  disabled: true,
                  type: 'number',
                  min: 20,
                },
                modelOptions: {
                  updateOn: 'blur',
                  debounce: { default: 500 },
                },
                expressions: {
                  'props.label': this.$translate.selectTranslate('calc.heating_system_system_duration'),
                  'props.unit': this.$utils.provide_unit,
                }
              },
              {
                key: 'system_co2_year.value',
                type: 'input',
                wrappers: ['unit', 'form-field'],
                props: {
                  required: true,
                  disabled: true,
                  type: 'number',
                  min: 0,
                },
                modelOptions: {
                  updateOn: 'blur',
                  debounce: { default: 500 },
                },
                expressions: {
                  'props.label': this.$translate.selectTranslate('calc.heating_system_system_co2_year'),
                  'props.unit': this.$utils.provide_unit,
                }
              },
              {
                key: 'calc_usage.value',
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
                  'props.label': this.$translate.selectTranslate('calc.heating_system_calc_usage'),
                  'props.unit': this.$utils.provide_unit,
                }
              },
            ]
          },
        ]
      }
    ]

    public fields: FormlyFieldConfig[] = [
      {
        fieldGroupClassName: 'flex flex-row gap-2',
        wrappers: ['section-h3'],
        expressions: {
          'props.label': this.$translate.selectTranslate('calc.heating_system')
        },
        fieldGroup: [
          ...this.heating_system_settings
        ]
      },
    ];

    constructor(
        protected $translate: TranslocoService,
        protected $base: KppkReactComponentBaseService
    ) {
        super()
    }

  }