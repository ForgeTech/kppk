import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgObjectPipesModule } from 'ngx-pipes';
import { KppkFormlyModule } from '@kppk/react-lib';
import { KppkReactMaterialsComponent } from './kppk-react-calc-view/kppk-react-materials/kppk-react-materials.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { KppkReactResultsComponent } from './kppk-react-calc-view/kppk-react-results/kppk-react-results.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KppkReactCommonFields } from './kppk-react-calc-view/kppk-react-common.fields.service';
import { NGXLogger } from 'ngx-logger';
import { KppkReactConstructionSiteFields } from './kppk-react-calc-view/kppk-react-constructions-site.fields.service';
import { KppkReactContainerVillageFields } from './kppk-react-calc-view/kppk-react-container-village.fields.service';
import { KppkReactDemolishDisposalFields } from './kppk-react-calc-view/kppk-react-demolish-disposal.fields.service';
import { KppkReactExcavationPitFields } from './kppk-react-calc-view/kppk-react-excavation-pit.fields.service';
import { KppkReactHeatingSystemFields } from './kppk-react-calc-view/kppk-react-heating-system.fields.service';

@Component({
  imports: [
    CommonModule,
    MatStepperModule,
    RouterModule,
    NgObjectPipesModule,
    KppkFormlyModule,
    KppkReactMaterialsComponent,
    MatCheckboxModule,
    MatCardModule,
    KppkReactResultsComponent
  ],
  selector: 'kppk-react-view-calculation',
  templateUrl: './entry.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
    protected $log = inject(NGXLogger);
    protected $fb = inject(FormBuilder);
    protected $active_route = inject(ActivatedRoute);
  
  
    protected $fields_common = inject(KppkReactCommonFields);
    protected form_common = new FormGroup({});
    protected fields_common = this.$fields_common.fields;
    protected form_common_model_s = computed( () => {
      const result = this.state_react_view_calculation_s()?.context.calculation?.form_common.value;    
      this.$log.fatal('UPDATED_COMMON_MODEL');
      this.$log.fatal(JSON.stringify( result ));
      return result;
    })
  
    protected options_s = computed( () => {
      const options: FormlyFormOptions = {
        formState: { 
          state_react_view_calculation: this.state_react_view_calculation_s()
        }
      }
      return options;
    })
  
    protected $fields_construction = inject(KppkReactConstructionSiteFields);
    protected form_construction_site = new FormGroup({});
    protected fields_construction_site = this.$fields_construction.fields();
    protected form_construction_site_model_s = computed( () => {
      const result = this.state_react_view_calculation_s()?.context.calculation?.form_construction_site.value;
      // result.exact_energy_usage = []
      return result;
    })
  
    protected $fields_container_village = inject(KppkReactContainerVillageFields);
    protected form_container_village = new FormGroup({});
    protected fields_container_village = this.$fields_container_village.fields;
    protected form_container_village_model_s = computed( () => {
      const result = this.state_react_view_calculation_s()?.context.calculation?.form_container_village.value;
      return result;
    })
  
    protected $fields_demolish_disposal = inject(KppkReactDemolishDisposalFields);
    protected fields_demolish_disposal= this.$fields_demolish_disposal.demolish_disposal_fields;
    protected form_demolish_disposal= new FormGroup({});
    protected form_demolish_disposal_model_s = computed( () => {
      const result = this.state_react_view_calculation_s()?.context.calculation?.form_demolish_disposal.value;
      return result;
    });
  
    protected $fields_excavation_pit = inject(KppkReactExcavationPitFields);
    protected fields_excavation_pit = this.$fields_excavation_pit.excavation_pit_fields;
    protected form_excavation_pit = new FormGroup({});
    protected form_excavation_pit_model_s = computed( () => {
      const result = this.state_react_view_calculation_s()?.context.calculation?.form_excavation_pit.value;
      return result;
    });
  
    protected $fields_heating_system = inject(KppkReactHeatingSystemFields);
    protected fields_heating_system = this.$fields_heating_system.fields;
    protected form_heating_system = new FormGroup({});
    protected form_heating_system_model_s = computed( () => {
      const result = this.state_react_view_calculation_s()?.context.calculation?.form_heating_system.value;
      return result;
    });
  
    protected form_step_selection = this.$fb.group({
      "material": [ true ],
      "construction_site": [ true ],
      "container_village": [ true ],
      "demolish_disposal": [ true ],
      "excavation_pit": [ true ],
      "heating_system": [ true ],
    })
    protected form_step_selection_s = computed( () => {
      const result = this.state_react_view_calculation_s()?.context.calculation?.form_step_selection.value;
      return result;
    });
  
    protected results_s = computed(() => {
      const result = this.state_react_view_calculation_s()?.context?.calculation;
      return result;
    });
  
    // protected results$ = this.state_react_view_calculation$.pipe( 
    //   map( state => {
    //     const calculation = state.context.calculation;
    //     let materials = [ 
    //       ...calculation.form_concrete.value.rows, 
    //       ...calculation.form_window.value.rows,
    //       ...calculation.form_material.value.rows, 
    //     ].map( item => {
    //       return materials_result.parse( item );
    //     }).sort( (a, b) => {
    //       if (a.gwp.value < b.gwp.value) {
    //         return -1;
    //       }
    //       if (a.gwp.value > b.gwp.value) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //     const materials_co2_transport = materials.reduce( (sum, item) => {
    //       return sum += item.co2_transport.value;
    //     }, 0)
    //     const materials_sum = materials.reduce( (sum, item) => {
    //       return sum += item.gwp.value;
    //     }, 0)
    //     const materials_sum_oeko = materials.reduce( (sum, item) => {
    //       if( item.gwp_oeko.type === 'number') {
    //         sum += item.gwp_oeko.value;
    //       } else {
    //         sum += item.gwp.value;
    //       }
    //       return sum;
    //     }, 0);
  
    //     materials = materials.map( item => {
    //       item.gwp_percentage.value =  item.gwp.value / (materials_sum/100);
    //       item.gwp_transport_percentage.value =  item.co2_transport.value / (materials_sum/100);
    //       item.gwp_oeko_percentage.value =  item.gwp_oeko.value / (materials_sum/100);
    //       return item;
    //     } );
  
        
    //     const materials_low = materials.filter((i, index) => (index < 5)); 
    //     const reversed =  materials.map( item => item).reverse();
    //     const materials_top = reversed.filter((i, index) => (index < 5)); 
  
    //     const absorbing = materials.reduce( (sum, item) => {
    //       if( item.gwp.value < 0 ) {
    //         sum += Math.abs(item.gwp.value)
    //       }
    //       return sum;
    //     }, 0);
  
    //     const emitting  = materials.reduce( (sum, item) => {
    //       if( item.gwp.value >= 0 ) {
    //         sum += item.gwp.value
    //       }
    //       return sum;
    //     }, 0);
        
    //     let overview: any = {
    //       selected: calculation.form_step_selection.value,
    //       materials_top,
    //       materials_low,
    //       pie_emit_abs: {
    //         emitting: unit_kilogram_co2_parser.parse({ value: emitting}),
    //         absorbing: unit_kilogram_co2_parser.parse({ value: absorbing}),
    //       },
    //       materials: {
    //         co2_creation:  unit_kilogram_co2_parser.parse( { value: materials_sum }),
    //         co2_oeko_creation:  unit_kilogram_co2_parser.parse( { value: materials_sum_oeko }),
    //         co2_transport: unit_kilogram_co2_parser.parse( { value: materials_co2_transport }),
    //       },
    //       excavation_pit: {
    //         excavation: {
    //           volumn: calculation.form_excavation_pit.value.excavation.volume,
    //           distance: calculation.form_excavation_pit.value.excavation.distance,
    //           co2_transport: calculation.form_excavation_pit.value.results.excavation.co2_transport,
    //         },
    //         excavation_pit_security: {
    //           methode: calculation.form_excavation_pit.value.excavation_pit_security.methode,
    //           depth: calculation.form_excavation_pit.value.excavation_pit_security.depth,
    //           distance: calculation.form_excavation_pit.value.excavation_pit_security.distance,
    //           linear_meter: calculation.form_excavation_pit.value.results.excavation_pit_security.linear_meter,
    //           co2_creation: calculation.form_excavation_pit.value.results.excavation_pit_security.co2_creation,
    //           co2_transport: calculation.form_excavation_pit.value.results.excavation_pit_security.co2_transport,
    //         }
    //       },
    //       construction_site: {
    //         building_type: calculation.form_construction_site.value.energy_usage_settings.energy_usage_build_type,
    //         power_supply: {
    //           power_type: calculation.form_construction_site.value.energy_usage_settings.energy_usage_power_type,
    //           power_usage: calculation.form_construction_site.value.results.power_supply.energy_usage,
    //           power_co2: calculation.form_construction_site.value.results.co2_power_supply,
    //         },
    //         heating_supply: {
    //           power_type: calculation.form_construction_site.value.heating_supply_settings.energy_usage_power_type,
    //           power_usage: calculation.form_construction_site.value.results.heating_supply.energy_usage,
    //           power_co2: calculation.form_construction_site.value.results.heating_supply.co2_energy_usage,
    //           oil_usage: calculation.form_construction_site.value.results.heating_supply.fuel_oil_usage,
    //           oil_co2: calculation.form_construction_site.value.results.heating_supply.co2_fuel_oil_usage,
    //         },
    //         power_supply_co2: calculation.form_construction_site.value.results.co2_power_supply,
    //         heating_supply_co2: calculation.form_construction_site.value.results.co2_heating_supply,
    //         sum_co2: calculation.form_construction_site.value.results.co2_supply,
    //       },
    //       demolish_disposal: {
    //         co2_transport: calculation.form_demolish_disposal.value.results.consumption_co2_sum,
    //       },
    //       container_village: {
    //         container_co2: calculation.form_container_village.value.results.container_co2,
    //         distance_co2: calculation.form_container_village.value.results.distance_co2,
    //         scum_co2: calculation.form_container_village.value.results.sum_co2,
    //       },
    //       heating_system: {
    //         system_select: calculation.form_heating_system.value.system_select,
    //         system_co2_year: calculation.form_heating_system.value.system_co2_year,
    //         calc_usage: calculation.form_heating_system.value.calc_usage,
    //         usage_co2: calculation.form_heating_system.value.results.calc_usage_co2,
    //       }
    //     }
  
    //     const co2_creation = overview.materials.co2_creation.value 
    //                        + overview.excavation_pit.excavation_pit_security.co2_creation.value;
    //     const co2_transport = overview.materials.co2_transport.value 
    //                         + overview.excavation_pit.excavation.co2_transport.value 
    //                         + overview.excavation_pit.excavation_pit_security.co2_transport.value
    //                         + overview.demolish_disposal.co2_transport.value;
    //     const co2_construction_site = overview.container_village.scum_co2.value + overview.construction_site.sum_co2.value;
  
    //     const sums = {
    //       co2_transport: unit_kilogram_co2_parser.parse({ value: co2_transport}),
    //       co2_creation: unit_kilogram_co2_parser.parse({ value: co2_creation}),
    //       co2_construction_site: unit_kilogram_co2_parser.parse({ value: co2_construction_site}),
    //       co2_heating_system: unit_kilogram_co2_parser.parse({ value: overview.heating_system.usage_co2.value * 1000}),
    //     }
  
    //     overview.sums = sums;
  
    //     const building = overview.materials.co2_creation.value 
    //     + overview.materials.co2_transport.value
    //     const excavation_pit = overview.excavation_pit.excavation.co2_transport.value 
    //           + overview.excavation_pit.excavation_pit_security.co2_creation.value
    //           + overview.excavation_pit.excavation_pit_security.co2_transport.value
        
    //     overview.parts = {
    //       building: unit_kilogram_co2_parser.parse({ value: building}),
    //       excavation_pit: unit_kilogram_co2_parser.parse({ value: excavation_pit}),
    //     }
  
    //     const results = {
    //       materials,
    //       overview
    //     }
    //     return results;
    //   })
    // ) 
  
    constructor() {
      // super();
      // Update form_step_select with machine context values
      effect( () => {
        const form_values = this.form_step_selection_s();
        if(form_values) {
          this.form_step_selection.patchValue(form_values, {emitEvent: false})
        }
      })
      // effect(()=> {
      //   console.log(this.state_react_view_calculation_s())
      //   console.log('CHANGE');
    // });
      effect(()=> {
        console.log(this.options_s())
        console.log('OPTIONS');
      });
    }
  
    protected handle_common_form_change_event( event: any ) {
      const event_to_dispatch = {
        type: 'fg.form.common.event.update',
        payload: {
          name: react_view_calculation_form_name_enum.common,
          errors: this.form_common.errors,
          valid: this.form_construction_site.valid,
          data: event
        }
      }
      this.send_event_to_calculation_machine(event_to_dispatch);
    }
    protected handle_construction_site_form_change_event( event: any ) {
      const event_to_dispatch = {
        type: 'fg.form.construction_site.event.update',
        payload: {
          name: react_view_calculation_form_name_enum.construction_site,
          errors: this.form_construction_site.errors,
          valid: true,
          data: event
        }
      }
      this.send_event_to_calculation_machine(event_to_dispatch);
    }
    protected handle_container_village_form_change_event( event: any ) {
      const event_to_dispatch = {
        type: 'fg.form.container_village.event.update',
        payload: {
          name: react_view_calculation_form_name_enum.container_village,
          errors: this.form_container_village.errors,
          valid: this.form_container_village.valid,
          data: event
        }
      }
      this.send_event_to_calculation_machine(event_to_dispatch);
    }
    protected handle_demolish_disposal_form_change_event( event: any ) {
      const event_to_dispatch = {
        type: 'fg.form.demolish_disposal.event.update',
        payload: {
          name: react_view_calculation_form_name_enum.demolish_disposal,
          errors: this.form_demolish_disposal.errors,
          valid: this.form_demolish_disposal.valid,
          data: event
        }
      }
      this.send_event_to_calculation_machine(event_to_dispatch);
    }
    protected handle_excavation_pit_form_change_event( event: any ) {
      const event_to_dispatch = {
        type: 'fg.form.excavation_pit.event.update',
        payload: {
          name: react_view_calculation_form_name_enum.excavation_pit,
          errors: this.form_excavation_pit.errors,
          valid: this.form_excavation_pit.valid,
          data: event
        }
      }
      this.send_event_to_calculation_machine(event_to_dispatch);
    }
    protected handle_heating_system_form_change_event( event: any ) {
      const event_to_dispatch = {
        type: 'fg.form.heating_system.event.update',
        payload: {
          name: react_view_calculation_form_name_enum.heating_system,
          errors: this.form_heating_system.errors,
          valid: this.form_heating_system.valid,
          data: event
        }
      }
      this.send_event_to_calculation_machine(event_to_dispatch);
    }
    protected handle_form_step_selection_change_event( event: any ) {
      const event_to_dispatch = {
        type: 'fg.form.step_selection.event.update',
        payload: {
          name: react_view_calculation_form_name_enum.step_selection,
          errors: this.form_step_selection.errors,
          valid: this.form_step_selection.valid,
          data: event
        }
      }
      this.send_event_to_calculation_machine(event_to_dispatch);
    }
  
    protected send_event_to_calculation_machine( event: any ) {
      this.actor_react_view_calculation_s()?.send(event)
     }
  
    protected logout( event?: Event ) {
      event?.preventDefault();
      this.actor_main_s()?.send({ type: 'fg.auth.local.event.logout' });
    };
}
