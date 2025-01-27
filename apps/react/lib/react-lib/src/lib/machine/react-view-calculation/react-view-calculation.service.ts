import { FgBaseService, FgStorageService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { assign, fromPromise, raise } from 'xstate';
import { 
  REACT_VIEW_CALCULATION_MACHINE_V4, 
  ReactViewCalculationV1Context, 
} from './react-view-calculation.machine';
import { ReactCalculationMaterialsService } from './react-view-calculation-materials.service';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { concrete_items,
  material_items,
  merge_bauteilflaechen_aufbauten,
  transformed_arich_plus_oi3_source_1,
  transformed_arich_plus_oi3_source_2,
  transformed_arich_plus_oi3_source_2_found,
  transformed_arich_plus_oi3_source_2_not_found,
  transformed_arich_plus_oi3_source_2_o1,
  window_items 
} from './react-view-calculation.utils';
import { add_number_units,
  applyEditsToTarget,
  unit_id_parser,
  UNIT_KG,
  UNIT_KG_M2,
  UNIT_KG_M3,
  UNIT_KGCO2_KG,
  unit_kilogram_co2_parser,
  unit_kilogram_meter_cubic_parser,
  unit_kilogram_parser,
  unit_kilometer_parser,
  UNIT_M2,
  unit_meter_cubic_parser,
  unit_number_parser,
  UNIT_PERCENT } from '../../types/kppk-react-unit.types';
import { 
  FORM_CONCRETE_VALUE, 
  form_concrete_value_parser, 
  FORM_MATERIAL_VALUE, form_material_value_parser,
   FORM_WINDOW_VALUE,
   form_window_value_parser 
} from '../../types/kppk-react-material.types';
import { TRUCK_DATA_ITEM } from '../../types/kppk-react-truck.types';
import { WINDOW_PART_TYPE_ENUM } from '../../view/kppk-react-calc-view/kppk-react-materials/kppk-react-materials-window-row.component';
import { DecimalPipe } from '@angular/common';
import { calculate_construction_site_results } from './react-view-calculation-construction-site.utils';
import { calculate_container_village_results } from './react-view-calculation-container-village.utils';
import { calculate_demolish_disposal_results } from './react-view-calculation-demolish-disposal.utils';
import { demolish_disposal_form_result_parser } from '../../types/kppk-react-demolish-disposal.types';
import { calculate_excavation_pit_results } from './react-view-calculation-excavation-pit.utils';
import { result_excavation_pit_parser } from '../../types/kppk-react-excavation-pit.types';
import { form_heating_system_result_parser } from '../../types/kppk-react-heating-system.types';
import { calculate_heating_system_results, form_heating_system_calculate_dynamic_model_values } from './react-view-calculation-heating-system.utils';
import { form_concrete_context_parser, form_concrete_context_results_parser, form_material_context_parser, form_material_context_results_parser, form_window_context_parser, form_window_context_results_parser } from '../../types/kppk-react-calculation.types';
import { form_construction_site_parser } from '../../types/kppk-react-construction-site.types';


@Injectable({
  providedIn: 'root',
})
export class ReactViewCalculationService extends FgBaseService {
  public machine;

  protected $decimal_pipe = inject(DecimalPipe);
  protected $immer = inject(FgImmutableService);
  protected $storage = inject(FgStorageService);
  protected $calc_materials = inject(ReactCalculationMaterialsService);

  constructor() {
    super();
    this.machine = REACT_VIEW_CALCULATION_MACHINE_V4.provide({
      actors: {
        actor_transform_file_inputs: this.$calc_materials.machine,
        actor_merge_bauteilflaechen_aufbauten: fromPromise(this.actor_merge_bauteilflaechen_aufbauten),
        actor_merge_arich_oi3: fromPromise(this.actor_merge_arich_oi3),
        actor_prepare_material_types: fromPromise(this.actor_prepare_material_types),
        actor_material_calculation: fromPromise(this.actor_material_calculation),
        actor_concrete_calculation:  fromPromise(this.actor_concrete_calculation),
        actor_window_calculation:  fromPromise(this.actor_window_calculation),
        actor_container_village_calculation: fromPromise(this.actor_container_village_calculation),
        actor_construction_site_calculation: fromPromise(this.actor_construction_site_calculation),
        actor_demolish_disposal_calculation: fromPromise(this.actor_demolish_disposal_calculation),
        actor_excavation_pit_calculation: fromPromise(this.actor_excavation_pit_calculation),
        actor_heating_system_calculation: fromPromise(this.actor_heating_system_calculation),
        actor_result_calculation: fromPromise(this.actor_result_calculation),
      },
      actions: {
        // assign_form_data: assign(this.assign_form_data),
        assign_transformed_file_inputs: assign(this.assign_transformed_file_inputs),
        assign_change_aufbauten:  assign(this.assign_change_aufbauten),
        assign_change_bauteilflaechen:  assign(this.assign_change_bauteilflaechen),
        assign_change_oi3: assign(this.assign_change_oi3),
        assign_change_material_type: assign(this.assign_change_material_type),
        assign_merged_bauteilflaechen_aufbauten: assign(this.assign_merged_bauteilflaechen_aufbauten),
        assign_prepare_material_types: assign(this.assign_prepare_material_types),
        assign_merge_arich_oi3: assign(this.assign_merge_arich_oi3),
        assign_material_calculation_result: assign(this.assign_material_calculation_result),
        assign_concrete_calculation_result: assign(this.assign_concrete_calculation_result),
        assign_window_calculation_result: assign(this.assign_window_calculation_result),
        assign_change_material_calculation: assign(this.assign_change_material_calculation),
        assign_change_window_calculation: assign(this.assign_change_window_calculation),
        assign_change_concrete_calculation: assign(this.assign_change_concrete_calculation),
        assign_container_village_calculation_result: assign(this.assign_container_village_calculation_result),
        assign_construction_site_calculation_result: assign(this.assign_construction_site_calculation_result),
        assign_demolish_disposal_calculation_result: assign(this.assign_demolish_disposal_calculation_result),
        assign_excavation_pit_calculation_result: assign(this.assign_excavation_pit_calculation_result),
        assign_heating_system_calculation_result: assign(this.assign_heating_system_calculation_result),
        // raise_form_internal_update: raise(this.raise_form_internal_update),
        assign_step_selection_form_data: assign( this.assign_step_selection_form_data ),
        assign_container_village_form_data: assign( this.assign_container_village_form_data ),
        assign_construciton_form_data: assign( this.assign_construciton_form_data ),
        assign_demolish_disposal_form_data: assign( this.assign_demolish_disposal_form_data ),
        assign_excavation_pit_form_data: assign( this.assign_excavation_pit_form_data ),
        assign_heating_system_form_data: assign( this.assign_heating_system_form_data ),
        assign_common_form_data: assign( this.assign_common_form_data ),
        assign_result_calculation_result: assign( this.assign_result_calculation_result ),
        raise_form_internal_update: raise( this.raise_form_internal_update ),
      },
      guards: {
        guard_merge_bauteilflaechen_aufbauten_data_exists: this.guard_merge_bauteilflaechen_aufbauten_data_exists,
        guard_merge_arich_oi3_data_exists: this.guard_merge_arich_oi3_data_exists,
        guard_materials_with_type_data_exists: this.guard_materials_with_type_data_exists,
        guard_material_calculation_data_exist: this.guard_material_calculation_data_exist,
        guard_concrete_calculation_data_exist: this.guard_concrete_calculation_data_exist,
        guard_window_calculation_data_exist: this.guard_window_calculation_data_exist,
        guard_container_village_selected: this.guard_container_village_selected, 
        guard_construction_site_selected: this.guard_construction_site_selected,
        guard_demolish_disposal_selected: this.guard_demolish_disposal_selected, 
        guard_excavation_pit_selected: this.guard_excavation_pit_selected, 
        guard_heating_system_selected: this.guard_heating_system_selected,
      },
    });

  }

  public actor_merge_bauteilflaechen_aufbauten = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    let merged_bauteilflaechen_aufbauten: any[] = [];
    if(input.calculation?.actor_transform_file_inputs?.transformed_aufbauten && input.calculation?.actor_transform_file_inputs.transformed_bauteilflaechen) {
      const transformed_aufbauten = this.$immer.clone(input.calculation?.actor_transform_file_inputs.transformed_aufbauten, false);
      const transformed_bauteilflaechen = this.$immer.clone(input.calculation?.actor_transform_file_inputs.transformed_bauteilflaechen, false);
      merged_bauteilflaechen_aufbauten = merge_bauteilflaechen_aufbauten( transformed_aufbauten, transformed_bauteilflaechen);
    }
    return { merged_bauteilflaechen_aufbauten };
  }

  public actor_merge_arich_oi3 = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    const result: any = {};
    if(input.calculation?.actor_transform_file_inputs && input.calculation.actor_merge_bauteilflaechen_aufbauten.merged_bauteilflaechen_aufbauten) {
      const transformed_oi3 = this.$immer.clone( input.calculation.actor_transform_file_inputs.transformed_oi3, false );
      const merged_bauteilflaechen_aufbauten = this.$immer.clone( input.calculation.actor_merge_bauteilflaechen_aufbauten.merged_bauteilflaechen_aufbauten, false );
      result.transformed_arich_plus_oi3_source_1 = transformed_arich_plus_oi3_source_1( transformed_oi3 );
      result.transformed_arich_plus_oi3_source_2 = transformed_arich_plus_oi3_source_2( merged_bauteilflaechen_aufbauten, transformed_oi3 );
      
      result.transformed_arich_plus_oi3_source_2_found = transformed_arich_plus_oi3_source_2_found( result.transformed_arich_plus_oi3_source_1, result.transformed_arich_plus_oi3_source_2 );
      result.transformed_arich_plus_oi3_source_2_not_found = transformed_arich_plus_oi3_source_2_not_found( result.transformed_arich_plus_oi3_source_2 );
      result.transformed_arich_plus_oi3_source_2_o1 = transformed_arich_plus_oi3_source_2_o1( transformed_oi3, merged_bauteilflaechen_aufbauten );
      const window_category_items: any  = window_items( transformed_oi3, merged_bauteilflaechen_aufbauten );
      const concrete_category_items: any = concrete_items( result.transformed_arich_plus_oi3_source_2_found, result.transformed_arich_plus_oi3_source_2_not_found );
      const material_category_items: any = material_items( result.transformed_arich_plus_oi3_source_2_found, result.transformed_arich_plus_oi3_source_2_not_found );
      result.material_type = [
        ... material_category_items, 
        ... window_category_items, 
        ... concrete_category_items, 
      ]
    }
    // console.log('>>>>>>>>>>>>FARK_FARK_FARK>>>>>>>>>>>>>>>>>>');
    // console.log( result );
    return result;
  }


  public actor_prepare_material_types = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    let result: {
      window_items: any[],
      concrete_items: any[],
      material_items: any[],
    } = {
      window_items: [],
      concrete_items: [],
      material_items: [],
    };
    if( input.calculation && input.calculation.actor_merge_arich_oi3?.material_type ) {
      const material_types = input.calculation.actor_merge_arich_oi3.material_type;
      material_types.forEach( (item, index ) => {
        switch( item.type.value ) {
          case 'concrete': 
              let concrete_item = form_concrete_value_parser.parse(item);
              concrete_item = this.calculate_concrete_item( concrete_item, input);
              result.concrete_items.push(concrete_item);
            break;
          case 'window': 
              const window_item = form_window_value_parser.parse(item);
              // Try to assign default window_part_type
              const name = window_item.name.value.toLowerCase()
              const windows = input.data?.window_glass;
              const frames = input.data?.window_frame;
              if( windows && frames ) {
                if( 
                  name.indexOf('glas') !== -1
                  || name.indexOf('glass') !== -1
                ) {
                  window_item.window_part_type.value = WINDOW_PART_TYPE_ENUM.glass as string;
                } else if( 
                  name.indexOf('rahmen') !== -1
                  || name.indexOf('frame') !== -1
                ) {
                  window_item.window_part_type.value = WINDOW_PART_TYPE_ENUM.frame as string;
                } else {
                  window_item.window_part_type.value = WINDOW_PART_TYPE_ENUM.none as string;
                }
              }
              this.calculate_window_item( window_item, input );
              result.window_items.push(window_item);
            break;
          case 'material': 
              let material_item = form_material_value_parser.parse(item);
              material_item = this.calculate_material_item( material_item, input);
              result.material_items.push(material_item);
            break;
          default:
            this.$log.fatal('ERROR: ReactViewCalculationService => actor_prepare_material_types => item has no valid type ');
            this.$log.fatal( item ); 
            break;
        }
      });
    }
    return result;
  }

  public actor_material_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    const form = form_material_context_parser.parse(input.calculation?.form_material);
    const result = form_material_context_results_parser.parse({})
    form.value.rows.forEach( item => {
      add_number_units( result.gwp_total, item.gwp)
      add_number_units( result.gwp_transport, item.co2_transport)
    })
    return form_material_context_results_parser.parse(result);
  }
  public actor_concrete_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    const form = form_concrete_context_parser.parse(input.calculation?.form_concrete);
    const result = form_concrete_context_results_parser.parse({})
    form.value.rows.forEach( item => {
      add_number_units(result.gwp_sum, item.gwp);
      // If there is no okoe concrete selected
      if( item.gwp_oeko_id.value ) {
        // otherwise use calculated gwp_oeko
        add_number_units(result.gwp_sum_oeko, item.gwp_oeko);
      } else {
        // use normal concrete gwp
        add_number_units(result.gwp_sum_oeko, item.gwp);
      }
      add_number_units(result.gwp_transport, item.co2_transport);
    });
    // result.gwp_total.value = result.gwp_sum.value + result.gwp_transport.value;
    add_number_units(result.gwp_total, result.gwp_sum);
    add_number_units(result.gwp_total, result.gwp_transport);
    return form_concrete_context_results_parser.parse(result);
  }
  public actor_window_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    const form = form_window_context_parser.parse(input.calculation?.form_window);
    const result = form_window_context_results_parser.parse({})
    form.value.rows.forEach( item => {
      add_number_units( result.gwp_total, item.gwp)
      add_number_units( result.gwp_transport, item.co2_transport)
    })
    return form_window_context_results_parser.parse(result);
  }

  public actor_container_village_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    let result = {};
    if( input.calculation?.form_container_village && input.data ) {
      result = calculate_container_village_results( input.calculation.form_container_village, input.data );
    }
    return result;
  }
  public actor_construction_site_calculation = async ( { input }: { input: ReactViewCalculationV1Context } ) => {
      let result = {};
      if( input.calculation?.form_construction_site && input.data ) {
        result = calculate_construction_site_results( input.calculation.form_construction_site, input.data );
      }
      return result;
  }
  public actor_demolish_disposal_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    let result = demolish_disposal_form_result_parser.parse({})
    if( input.calculation?.form_demolish_disposal && input.data ) {
      result = calculate_demolish_disposal_results( input.calculation.form_demolish_disposal, input.data );
    }
    return result;
  }
  public actor_excavation_pit_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    let result = result_excavation_pit_parser.parse({})
    // let result = demolish_disposal_form_result_parser.parse({})
    if( input.calculation?.form_excavation_pit && input.data ) {
      result = calculate_excavation_pit_results( input.calculation.form_excavation_pit, input.data );
    }
    return result;
  }

  public actor_heating_system_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    // const context = form_heating_system_context_parser.parse(input.calculation.form_heating_system);
    let result = form_heating_system_result_parser.parse({});
    if( input.calculation?.form_excavation_pit && input.data ) { 
      result = calculate_heating_system_results( input.calculation.form_heating_system, input.data );
    }
    return form_heating_system_result_parser.parse(result);
  }

  public actor_result_calculation = async ( {input}: { input: ReactViewCalculationV1Context } ) => {
    if( input.calculation ) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>RESULT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      console.log( JSON.stringify( input.calculation.form_heating_system ) );
    }
    // const result = form_heating_system_context_parser.parse(input.calculation.form_heating_system);
    // return form_heating_system_result_parser.parse(result);
  }



  public assign_common_form_data = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        // const data = form_common_context_parser.parse(event.payload);
        draft.calculation.form_common.value = event.payload.data;
      }
    });
    return result;
  }

  public assign_result_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        // TODO
      }
    });
    return result;
  }
  public assign_step_selection_form_data = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        // const data = form_common_context_parser.parse(event.payload);
        draft.calculation.form_step_selection.value = event.payload.data;
      }
    });
    return result;
  }
  public assign_container_village_form_data = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        draft.calculation.form_container_village.valid = event.payload.valid;
        if( event.payload.valid) {
          // const data = form_common_context_parser.parse(event.payload);
          draft.calculation.form_container_village.value = event.payload.data;
          if(context.calculation.form_container_village.error.length > 0 ) {
            draft.calculation.form_container_village.error = [];
          } 
        } else {
          if( Array.isArray(event.payload.error) ) {
            draft.calculation.form_container_village.error = event.payload.error;
          }
        }
      }
    });
    return result;
  }
  public assign_construciton_form_data = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        draft.calculation.form_construction_site.valid = event.payload.valid;
        if( event.payload.valid) {
          const data = form_construction_site_parser.parse( event.payload.data )
          draft.calculation.form_construction_site.value = data;
          if(context.calculation.form_construction_site.error.length > 0 ) {
            draft.calculation.form_construction_site.error = [];
          } 
        } else {
          if( Array.isArray(event.payload.error) ) {
            draft.calculation.form_construction_site.error = event.payload.error;
          }
        }
        // const data = form_common_context_parser.parse(event.payload);
        // draft.calculation.form_construction_site.value = event.payload.data;
      }
    });
    return result;
  }
  public assign_demolish_disposal_form_data = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        draft.calculation.form_demolish_disposal.valid = event.payload.valid;
        if( event.payload.valid) {
          draft.calculation.form_demolish_disposal.value = event.payload.data;
          if(context.calculation.form_demolish_disposal.error.length > 0 ) {
            draft.calculation.form_demolish_disposal.error = [];
          } 
        } else {
          if( Array.isArray(event.payload.error) ) {
            draft.calculation.form_demolish_disposal.error = event.payload.error;
          }
        }
        // const data = form_common_context_parser.parse(event.payload);
        // draft.calculation.form_demolish_disposal.value = event.payload.data;
      }
    });
    return result;
  }
  public assign_excavation_pit_form_data = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        draft.calculation.form_excavation_pit.valid = event.payload.valid;
        if( event.payload.valid) {
          // const updated_dynamic_values = calculate_excavation_pit_dynamic_values( event.payload.data, context.data )
          // draft.calculation.form_excavation_pit.value = updated_dynamic_values;
          draft.calculation.form_excavation_pit.value = event.payload.data;
          if(context.calculation.form_excavation_pit.error.length > 0 ) {
            draft.calculation.form_excavation_pit.error = [];
          } 
        } else {
          if( Array.isArray(event.payload.error) ) {
            draft.calculation.form_excavation_pit.error = event.payload.error;
          }
        }
        // const data = form_common_context_parser.parse(event.payload);
        // draft.calculation.form_excavation_pit.value = event.payload.data;
      }
    });
    return result;
  }
  
  public assign_heating_system_form_data = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        draft.calculation.form_heating_system.valid = event.payload.valid;
        if( event.payload.valid) {
          const update_dynamic_values = form_heating_system_calculate_dynamic_model_values( event.payload.data, context.calculation.file_rose );
          draft.calculation.form_heating_system.value = update_dynamic_values;
          if(context.calculation.form_heating_system.error.length > 0 ) {
            draft.calculation.form_heating_system.error = [];
          } 
        } else {
          if( Array.isArray(event.payload.error) ) {
            draft.calculation.form_heating_system.error = event.payload.error;
          }
        }
        // draft.calculation.form_heating_system.value = event.payload.data;
      }
    });
    return result;
  }

  public assign_transformed_file_inputs = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ) {
        draft.calculation.actor_transform_file_inputs = event.output;
      }
    });
    return result;
  }
  public assign_change_aufbauten = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.actor_transform_file_inputs?.transformed_aufbauten &&  draft?.calculation?.actor_transform_file_inputs?.transformed_aufbauten) {
        draft.calculation.actor_transform_file_inputs.transformed_aufbauten[event.payload.index] = event.payload.data;
      }
    });
    return result;
  }
  public assign_change_bauteilflaechen = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.actor_transform_file_inputs?.transformed_bauteilflaechen &&  draft?.calculation?.actor_transform_file_inputs?.transformed_bauteilflaechen) {
        draft.calculation.actor_transform_file_inputs.transformed_bauteilflaechen[event.payload.index] = event.payload.data;
      }
    });
    return result;
  }
  public assign_change_oi3 = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.actor_transform_file_inputs?.transformed_oi3 && draft?.calculation?.actor_transform_file_inputs?.transformed_oi3) {
        draft.calculation.actor_transform_file_inputs.transformed_oi3[event.payload.index] = event.payload.data;
      }
    });
    return result;
  }
  public assign_merged_bauteilflaechen_aufbauten = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ){
        draft.calculation.actor_merge_bauteilflaechen_aufbauten = event.output;
      }
    });
    return result;
  }
  public assign_prepare_material_types = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if( context.calculation && draft.calculation ){
        draft.calculation.actor_prepare_material_types = event.output;
        draft.calculation.form_material.value.rows = event.output.material_items;
        draft.calculation.form_concrete.value.rows = event.output.concrete_items;
        draft.calculation.form_window.value.rows = event.output.window_items;
      }
    });
    return result;
  }
  public assign_merge_arich_oi3 = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context.calculation && draft.calculation) {
        draft.calculation.actor_merge_arich_oi3 = event.output;
      }
    });
    return result;
  }
  public assign_material_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_window.value.rows && draft?.calculation) {
        draft.calculation.form_material.value.results = event.output
      }
    });
    return result;
  }
  public assign_concrete_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_window.value.rows && draft?.calculation) {
        draft.calculation.form_concrete.value.results = event.output
      }
    });
    return result;
  }
  public assign_window_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_window.value.rows && draft?.calculation) {
        draft.calculation.form_window.value.results = event.output
      }
    });
    return result;
  }
  public assign_change_material_calculation = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_material.value.rows && draft?.calculation ) {
        const item = form_material_value_parser.parse(event.payload.data);
        // Test change apply methode
        // draft = applyEditsToTarget( 
        //   context.calculation.form_material.value.rows[event.payload.index], 
        //   draft.calculation.form_material.value.rows[event.payload.index],  
        //   item
        // )
        draft.calculation.form_material.value.rows[event.payload.index] = this.calculate_material_item(item, context);
      }
    });
    return result;
  }
  public assign_change_window_calculation = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_window.value.rows && draft?.calculation) {
        try {
          const prev_item: FORM_WINDOW_VALUE = context.calculation.form_window.value.rows[event.payload.index];
          const payload = event.payload.data;
          // FIX: Problem when window_part_type changes - form field for window_part_type_glass_id
          // or window_part_type_frame_id is hidden returning *_part_type_frame_id with { value: undefined, unit: 'id'}
          // leading form_window_value_parser.parse(payload); to throw an error
          // If window_part_type changed reset all window_part data
          if( prev_item.window_part_type.value !== payload.window_part_type.value ) {
              payload.window_part_type_glass_id = undefined;
              payload.window_part_type_glass = undefined;
              payload.window_part_type_frame_id = undefined;
              payload.window_part_type_frame = undefined;
          }
          const window_item = form_window_value_parser.parse(payload);
          draft.calculation.form_window.value.rows[event.payload.index] = this.calculate_window_item(window_item, context);
        } catch( error ){
          console.log(error);
        }
      }
    });
    return result;
  }
  public assign_change_concrete_calculation = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_concrete.value.rows && draft?.calculation) {
          const item = form_concrete_value_parser.parse(event.payload.data);
          draft.calculation.form_concrete.value.rows[event.payload.index] = this.calculate_concrete_item(item, context);
      }
    });
    return result;
  }
  public assign_container_village_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_container_village.value && draft?.calculation) {
        draft.calculation.form_container_village.value.results = event.output;
      }
    });
    return result;
  }
  public assign_construction_site_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_construction_site.value && draft?.calculation) {
        draft.calculation.form_construction_site.value.results = event.output;
      }
    });
    return result;
  }
  public assign_demolish_disposal_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_demolish_disposal.value && draft?.calculation) {
        draft.calculation.form_demolish_disposal.value.results = event.output;
      }
    });
    return result;
  }
  public assign_excavation_pit_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_excavation_pit.value && draft?.calculation) {
        draft.calculation.form_excavation_pit.value.results = event.output;
      }
    });
    return result;
  }
  
  public assign_heating_system_calculation_result = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.form_heating_system.value && draft?.calculation) {
        draft.calculation.form_heating_system.value.results = event.output;
      }
    });
    return result;
  }
  public assign_change_material_type = ({ context, event }: { context: ReactViewCalculationV1Context, event: any  }) => {
    const result = this.$immer.produce( context, draft => { 
      if(context?.calculation?.actor_merge_arich_oi3?.material_type && draft?.calculation?.actor_merge_arich_oi3?.material_type ) {
        draft.calculation.actor_merge_arich_oi3.material_type[event.payload.index] = event.payload.data;
        draft.calculation.actor_merge_arich_oi3.material_type[event.payload.index].type_edited = true;
      }
    });
    return result;
  }

  public raise_form_internal_update = ({ context, event }: { context: ReactViewCalculationV1Context, event: any }) => {
    return { type: 'fg.form.internal.update' } as const;
  }

  public guard_container_village_form_is_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation ? true : false;
    return result;
  }
  public guard_construction_site_form_is_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation ? true : false;
    return result;
  }
  public guard_demolish_disposal_form_is_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation ? true : false;
    return result;
  }
  public guard_excavation_pit_form_is_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation ? true : false;
    return result;
  }
  public guard_merge_bauteilflaechen_aufbauten_data_exists = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.actor_merge_bauteilflaechen_aufbauten?.merged_bauteilflaechen_aufbauten ? true : false;
    return result;
  }
  public guard_merge_arich_oi3_data_exists = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.actor_merge_arich_oi3 ? true : false;
    return result;
  }
  public guard_materials_with_type_data_exists = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.actor_merge_arich_oi3?.material_type ? true : false;
    return result;
  }
  public guard_material_calculation_data_exist = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.actor_merge_arich_oi3?.material_items ? true : false;
    return result;
  }
  public guard_concrete_calculation_data_exist = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.actor_merge_arich_oi3?.concrete_items ? true : false;
    return result;
  }
  public guard_window_calculation_data_exist = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.actor_merge_arich_oi3?.window_items ? true : false;
    return result;
  }
  public guard_container_village_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.form_step_selection.value.container_village ? true : false;
    return result;
  }
  public guard_construction_site_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.form_step_selection.value.construction_site ? true : false;
    return result;
  }
  public guard_demolish_disposal_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.form_step_selection.value.demolish_disposal ? true : false;
    return result;
  }
  public guard_excavation_pit_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.form_step_selection.value.excavation_pit ? true : false;
    return result;
  }
  public guard_heating_system_selected = ({ context }: { context: ReactViewCalculationV1Context }) => {
    const result = context.calculation?.form_step_selection.value.heating_system ? true : false;
    return result;
  }

  public calculate_shipments( item: FORM_MATERIAL_VALUE | FORM_CONCRETE_VALUE | FORM_WINDOW_VALUE, truck: TRUCK_DATA_ITEM, usage_in_percent: UNIT_PERCENT = { value: 100, unit: '%', edited: false, type: 'number'} ) {
    let shipments = 0;
    if( truck.max_density.value < item.density.value ) {
      shipments = item.mass.value / truck.capacity_weight.value;
    } else {
      shipments = item.volumn.value / truck.capacity_volume.value;
    }
    shipments = shipments * (1/usage_in_percent.value) * 100;
    const result = unit_number_parser.parse({
      value: shipments
    });
    return result;
  }

  public calculate_co2_transport( item: FORM_MATERIAL_VALUE | FORM_CONCRETE_VALUE | FORM_WINDOW_VALUE, truck: TRUCK_DATA_ITEM  ) {
    const value = (truck.co2_consumption.value * item.distance.value * item.shipments.value) / 1000;
    const result = unit_kilogram_co2_parser.parse( { value } );
    return result;
  }
  public calculate_gwp_oeko( mass: UNIT_KG, gwp_oeko: UNIT_KGCO2_KG ) {
    const value = mass.value * gwp_oeko.value;
    const result = unit_kilogram_co2_parser.parse({ value });
    return result;
  }
  public calculate_mass( area: UNIT_M2 , area_based_mass: UNIT_KG_M2  ) {
    const value = area.value * area_based_mass.value;
    const result = unit_kilogram_parser.parse( { value } );
    return result;
  }
  public calculate_volumn( mass: UNIT_KG , density: UNIT_KG_M3  ) {
    try{
      const value = mass.value / density.value;
      const result = unit_meter_cubic_parser.parse( { value } );
      return result;
    } catch( error ){
      console.log(error)
    }
    return unit_meter_cubic_parser.parse( { value: 1 } );
  }

  public calculate_material_item( item: FORM_MATERIAL_VALUE, context: ReactViewCalculationV1Context ) {
    const truck = context.data?.truck[5];
    const material_defaults = context.calculation?.form_material.value.defaults;
 
    if(item && truck && material_defaults ) {
      item.shipments = this.calculate_shipments(item, truck, material_defaults.truck_usage );
      if( item.distance.value === 0) {
        item.distance = unit_kilometer_parser.parse(material_defaults.distance);
      }
      item.co2_transport = this.calculate_co2_transport(item, truck)
      this.roundNumbersOnObject(item, material_defaults);
    }

    return item;
  }

  public calculate_concrete_item( item: FORM_CONCRETE_VALUE, context: ReactViewCalculationV1Context ) {
    const truck = context.data?.truck[0];
    const concrete_defaults = context.calculation?.form_concrete.value.defaults;
    if(item && truck && concrete_defaults ) {
      item.shipments = this.calculate_shipments(item, truck, concrete_defaults.truck_usage );
      if( item.distance.value === 0) {
        item.distance = unit_kilometer_parser.parse(concrete_defaults.distance);
      }
      const concrete = context.data?.concrete_types.find( c_item => c_item.id.value === item.gwp_oeko_id.value);
      if(concrete) {
        item.gwp_oeko = this.calculate_gwp_oeko(item.mass, concrete.gwp)
      }
      item.co2_transport = this.calculate_co2_transport(item, truck)
      this.roundNumbersOnObject(item, concrete_defaults);
    }
    return item;
  }

  public calculate_window_item( item: FORM_WINDOW_VALUE, context: ReactViewCalculationV1Context ) {
    const truck = context.data?.truck[5];
    const window_defaults = context.calculation?.form_material.value.defaults;
    const windows = context.data?.window_glass;
    const frames = context.data?.window_frame;
    if( item && truck && window_defaults && windows && frames) {
      // window_item.shipments = this.calculate_shipments(window_item, truck, window_defaults.truck_usage );
      if( item.distance.value === 0) {
        item.distance = unit_kilometer_parser.parse(window_defaults.distance);
      }
      if( item.window_part_type.value === WINDOW_PART_TYPE_ENUM.glass as string) {
        if( item.window_part_type_glass_id === undefined ) {
          item.window_part_type_glass_id = unit_id_parser.parse(windows[0].id);
        }
        item.window_part_type_glass_id = unit_id_parser.parse(windows[0].id);
        item.window_part_type_glass = windows.find( window_item => window_item.id.value === item.window_part_type_glass_id?.value);
        item.density = item.window_part_type_glass.density;
        item.mass = this.calculate_mass( item.area, item.window_part_type_glass.area_based_mass);
      } else if(
        item.window_part_type.value === WINDOW_PART_TYPE_ENUM.frame as string
      ) {
        if( item.window_part_type_frame_id === undefined ) {
          item.window_part_type_frame_id = unit_id_parser.parse(frames[0].id);
        }
        item.window_part_type_frame = frames.find( frame => frame.id.value === item.window_part_type_frame_id?.value);
        item.density = item.window_part_type_frame.density
        item.mass = this.calculate_mass( item.area, item.window_part_type_frame.area_based_mass);
      } else {
        // Reset values
        item.density = unit_kilogram_meter_cubic_parser.parse({});
        item.mass = unit_kilogram_parser.parse({});
      }
      if(item.window_part_type.value === WINDOW_PART_TYPE_ENUM.glass || item.window_part_type.value === WINDOW_PART_TYPE_ENUM.frame  ) {
        // console.log( item );
        item.volumn = this.calculate_volumn( item.mass, item.density);
        item.shipments = this.calculate_shipments(item, truck, window_defaults.truck_usage );
        item.co2_transport = this.calculate_co2_transport(item, truck)
      } else {
        // Reset values
        item.volumn = unit_meter_cubic_parser.parse({});
        item.shipments = unit_number_parser.parse({});
        item.distance = window_defaults.distance;
        item.co2_transport = unit_kilogram_co2_parser.parse({})
      }
      this.roundNumbersOnObject(item, window_defaults);
    }
    return item;
  }

  public roundNumbersOnObject<T extends { [id: string] : any; }>( item: T, defaults: any) {
    Object.keys( item ).forEach( key => {
      try {
      const item_obj: any = item[ key as keyof typeof item ];
      const isFrozen = Object.isFrozen(item_obj);
      if(item_obj?.value && typeof item_obj.value === 'number' && isFrozen === false) {
        const result = parseFloat(item_obj.value).toFixed(defaults?.round.value);
        item[ key as keyof typeof item ].value = result; 
      }
    } catch(error) {
      console.log( error );
    }
    });
    return item;
  }


}
