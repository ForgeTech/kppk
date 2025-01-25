import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgObjectPipesModule } from 'ngx-pipes';
import { 
  KppkFormlyModule,
  react_view_calculation_form_name_enum, 
  ReactViewCalculationMachineActorService 
} from '@kppk/react-lib';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

import { KppkReactResultsComponent } from './component/kppk-react-results/kppk-react-results.component';
import { KppkReactConstructionSiteFields } from './service/kppk-react-constructions-site.fields.service';
import { KppkReactCommonFields } from './service/kppk-react-common.fields.service';
import { KppkReactContainerVillageFields } from './service/kppk-react-container-village.fields.service';
import { KppkReactDemolishDisposalFields } from './service/kppk-react-demolish-disposal.fields.service';
import { KppkReactExcavationPitFields } from './service/kppk-react-excavation-pit.fields.service';
import { KppkReactHeatingSystemFields } from './service/kppk-react-heating-system.fields.service';
import { KppkReactMaterialsComponent } from './component/kppk-react-materials/kppk-react-materials.component';
import { FormlyFormOptions } from '@ngx-formly/core';

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
  styleUrl: './entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntryComponent {
    protected $log = inject(NGXLogger);
    protected $fb = inject(FormBuilder);
    protected $active_route = inject(ActivatedRoute);
    protected $actor_view_calculation = inject(ReactViewCalculationMachineActorService)
  
  
    protected $fields_common = inject(KppkReactCommonFields);
    protected form_common = new FormGroup({});
    protected fields_common = this.$fields_common.fields;
    protected form_common_model_s = computed( () => {
      const result = this.$actor_view_calculation.stateS()?.context.calculation?.form_common.value;    
      this.$log.fatal('UPDATED_COMMON_MODEL');
      this.$log.fatal(JSON.stringify( result ));
      return result;
    })
  
    protected options_s = computed( () => {
      const options: FormlyFormOptions = {
        formState: { 
          state_react_view_calculation: this.$actor_view_calculation.stateS()
        }
      }
      return options;
    })
  
    protected $fields_construction = inject(KppkReactConstructionSiteFields);
    protected form_construction_site = new FormGroup({});
    protected fields_construction_site = this.$fields_construction.fields();
    protected form_construction_site_model_s = computed( () => {
      const result = this.$actor_view_calculation.stateS()?.context.calculation?.form_construction_site.value;
      // result.exact_energy_usage = []
      return result;
    })
  
    protected $fields_container_village = inject(KppkReactContainerVillageFields);
    protected form_container_village = new FormGroup({});
    protected fields_container_village = this.$fields_container_village.fields;
    protected form_container_village_model_s = computed( () => {
      const result = this.$actor_view_calculation.stateS()?.context.calculation?.form_container_village.value;
      return result;
    })
  
    protected $fields_demolish_disposal = inject(KppkReactDemolishDisposalFields);
    protected fields_demolish_disposal= this.$fields_demolish_disposal.demolish_disposal_fields;
    protected form_demolish_disposal= new FormGroup({});
    protected form_demolish_disposal_model_s = computed( () => {
      const result = this.$actor_view_calculation.stateS()?.context.calculation?.form_demolish_disposal.value;
      return result;
    });
  
    protected $fields_excavation_pit = inject(KppkReactExcavationPitFields);
    protected fields_excavation_pit = this.$fields_excavation_pit.excavation_pit_fields;
    protected form_excavation_pit = new FormGroup({});
    protected form_excavation_pit_model_s = computed( () => {
      const result = this.$actor_view_calculation.stateS()?.context.calculation?.form_excavation_pit.value;
      return result;
    });
  
    protected $fields_heating_system = inject(KppkReactHeatingSystemFields);
    protected fields_heating_system = this.$fields_heating_system.fields;
    protected form_heating_system = new FormGroup({});
    protected form_heating_system_model_s = computed( () => {
      const result = this.$actor_view_calculation.stateS()?.context.calculation?.form_heating_system.value;
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
      const result = this.$actor_view_calculation.stateS()?.context.calculation?.form_step_selection.value;
      return result;
    });
  
    protected results_s = computed(() => {
      const result = this.$actor_view_calculation.stateS()?.context?.calculation;
      return result;
    });
  
    constructor() {
      this.$actor_view_calculation.start()
      // super();
      // Update form_step_select with machine context values
      effect( () => {
        const form_values = this.form_step_selection_s();
        if(form_values) {
          // this.form_step_selection.patchValue(form_values, {emitEvent: false})
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
      // this.actor_react_view_calculation_s()?.send(event)
     }
  
    protected logout( event?: Event ) {
      event?.preventDefault();
      // this.actor_main_s()?.send({ type: 'fg.auth.local.event.logout' });
    };
}
