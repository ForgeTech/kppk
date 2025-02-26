import { inject, Injectable } from '@angular/core';
import { FgBaseService, FgTranslate } from '@kppk/fg-lib-new';
import { TranslocoService } from '@jsverse/transloco';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { KppkReactFieldsUtils } from './kppk-react-fields-utils.service';
import { map, startWith } from 'rxjs';
import { FormlySelectOption } from '@ngx-formly/core/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactViewCalculationMachineActorService } from '@kppk/react-lib';

@Injectable({
  providedIn: 'root',
})
export class KppkReactHeatingSystemFields extends FgBaseService {
  protected $utils = inject(KppkReactFieldsUtils);
  protected $actor_calculation = inject(ReactViewCalculationMachineActorService);
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "heating_system_settings": "calc",
    "heating_system_system_select": "calc",
    "heating_system_system_co2_duration": "calc",
    "heating_system_system_duration": "calc",
    "heating_system_system_co2_year": "calc",
    "heating_system_calc_usage": "calc",
    "heating_system": "calc",
    "heating_system_air_water": "calc",
    "heating_system_district": "calc",
    "heating_system_gas": "calc",
    "heating_system_geothermal": "calc",
    "heating_system_pellets": "calc",
  });
  protected translationS = toSignal(this.translation$, {initialValue: undefined});

  protected heating_system_settings: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h4'],
      expressions: {
        // 'props.label': this.$translate.selectTranslate(
        //   'calc.heating_system_settings'
        // ),
        'props.label': this.translation$.pipe(
          map( trans => trans['heating_system_settings'])
        ),  
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
                // 'props.label': this.$translate.selectTranslate(
                //   'calc.heating_system_system_select'
                // ),
                'props.label': this.translation$.pipe(
                  map( trans => trans['heating_system_system_select'])
                ),  
                'props.unit': this.$utils.provide_unit,
                'props.options': this.translation$.pipe(
                  map( trans => {
                    const options: FormlySelectOption[] = [];
                    const system_data = this.$actor_calculation.stateS()?.context.calculation?.file_rose;
                    if (system_data) {
                      Object.keys(system_data).forEach((key) => {
                        const value_unit_tonco2 =
                          system_data[key as keyof typeof system_data];
                        if (value_unit_tonco2.value !== 0) {
                          const option: FormlySelectOption = {
                            label: trans?.['heating_system_' + key as keyof typeof trans],
                            value: key,
                          };
                          options.push(option);
                        }
                      });
                    }
                    return options;
                  })
                ),
              },
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
                // 'props.label': this.$translate.selectTranslate(
                //   'calc.heating_system_system_co2_duration'
                // ),
                'props.label': this.translation$.pipe(
                  map( trans => trans['heating_system_system_co2_duration'])
                ),  
                'props.unit': this.$utils.provide_unit,
              },
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
                // 'props.label': this.$translate.selectTranslate(
                //   'calc.heating_system_system_duration'
                // ),
                'props.label': this.translation$.pipe(
                  map( trans => trans['heating_system_system_duration'])
                ),  
                'props.unit': this.$utils.provide_unit,
              },
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
                // 'props.label': this.$translate.selectTranslate(
                //   'calc.heating_system_system_co2_year'
                // ),
                'props.label': this.translation$.pipe(
                  map( trans => trans['heating_system_system_co2_year'])
                ),  
                'props.unit': this.$utils.provide_unit,
              },
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
                // 'props.label': this.$translate.selectTranslate(
                //   'calc.heating_system_calc_usage'
                // ),
                'props.label': this.translation$.pipe(
                  map( trans => trans['heating_system_calc_usage'])
                ),  
                'props.unit': this.$utils.provide_unit,
              },
            },
          ],
        },
      ],
    },
  ];

  public fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-row gap-2',
      wrappers: ['section-h3'],
      expressions: {
        // 'props.label': this.$translate.selectTranslate('calc.heating_system'),
        'props.label': this.translation$.pipe(
          map( trans => trans['heating_system'])
        ),  
      },
      fieldGroup: [...this.heating_system_settings],
    },
  ];
}
