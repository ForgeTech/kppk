
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { DOCUMENT } from '@angular/common';
import { combineLatest, firstValueFrom, map } from 'rxjs';
import { react_view_calculation_context_parser } from '../../types/kppk-react-calculation.types';
import { FgBaseService, FgStorageService } from '../../../../../../../../libs/fg-lib-new/src';
import { CONTEXT_REACT_INIT } from './react-init.machine.types'
import { boundMethod } from 'autobind-decorator';



@Injectable({
    providedIn: 'root',
})
export class ReactInitMachineMethodeService extends FgBaseService {

  protected $immer = inject(FgImmutableService);
  protected $http = inject(HttpClient);
  protected $storage = inject(FgStorageService);
  protected $document = inject(DOCUMENT)

  constructor(){
    super()
  }

  @boundMethod
  public escalate_load_from_local_error() {
    throw new Error('FARKFARKFARK');
  }
  @boundMethod
  public escalate_load_from_remote_error() {
    throw new Error('FARKFARKFARK');
  }

  @boundMethod
  public escalate_result_validate_error() {
    throw new Error('FARKFARKFARK');
  }

  @boundMethod
  public react_init_input_context( { input }: { input: Partial<CONTEXT_REACT_INIT> }) {
    const context: CONTEXT_REACT_INIT = {
      environment: undefined,
      load_from_remote: undefined,
      output: undefined,
    }
    // const result = react_init_context_parser.parse( Object.assign( context, input) );
    return context;
  }


  @boundMethod
  public react_init_output( { context }: { context: CONTEXT_REACT_INIT }) {

    console.log('FIND OUT WHY NOT PARSING ANYMORE')
    // try {
    //   // result = react_init_output_parser.parse(context?.output);
    // } catch( error ) {
    //   console.log( error );
    // }
    return context;
  };

  @boundMethod
  public assign_react_init_input( { context, event }: { context: CONTEXT_REACT_INIT, event: any } ) {
    const result = this.$immer.produce( ( context, draft ) => {
      draft.environment = event.input.context;
    });
    return result;
  };

  @boundMethod
  public assign_load_from_local_result( { context, event }: { context: CONTEXT_REACT_INIT, event: any } ) {
    console.log('>>>>>>>>>>>ASSIGN_assign_load_from_local_result>>>>>>>>>>>>>');
    console.log(context);
    console.log(event);
    const result = this.$immer.produce( ( context, draft ) => {});
    return result;
  };

  @boundMethod
  public assign_load_from_remote_result( { context, event }: { context: CONTEXT_REACT_INIT, event: any } ) {
    // console.log('>>>>>>>>>>>ASSIGN_assign_load_from_remote_result>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    // const result = this.$immer.produce( context, draft  => {
    //   draft.load_from_remote = event.output;
    // });
    // // ReactAppInitV1Context_parser.parse(result);
    // return result;
  };

  @boundMethod
  public assign_load_from_url_from_route_result( { context, event }: { context: CONTEXT_REACT_INIT, event: any } ) {
    console.log('>>>>>>>>>>>ASSIGN_assign_load_from_url_from_route_result>>>>>>>>>>>>>');
    console.log(context);
    console.log(event);
    // const result = this.$immer.produce( context, draft  => {
    // });
    return context;
  };


  @boundMethod
  public assign_load_url_from_params_result( { context, event }: { context: CONTEXT_REACT_INIT, event: any } ) {
    // this.$immer.produce( context, draft => {
    // });
  };

  @boundMethod
  public assign_result_data ({ context, event }: { context: CONTEXT_REACT_INIT, event: any }) {
    // return this.$immer.produce(  context, draft  => {
    //   // if( context?.load_from_remote) {
    //   //   draft.output = context.load_from_remote
    //   // }
    // });
  };

  @boundMethod
  public async actor_load_from_local( { input }: { input: any} ) {
    const result = await firstValueFrom(this.$storage.getItem('settings-local-ui'));
    return result;
  };

  @boundMethod
  public async actor_validate_load_from_local( { input }: { input: any} ) {
    return true;
  };

  @boundMethod
  public async actor_load_from_remote( { input }: { input: any } ) {
    const data$ = combineLatest([
      this.$http.get('./data/august2024/concrete_types.json'),
      // this.$http.get('./data/august2024/construction_site_energy_usage.json'),
      this.$http.get('./data/august2024/container_disposal.json'),
      this.$http.get('./data/august2024/container_village.json'),
      this.$http.get('./data/august2024/material_co2_equ.json'),
      this.$http.get('./data/august2024/material_density.json'),
      this.$http.get('./data/august2024/truck.json'),
      this.$http.get('./data/august2024/window_frames.json'),
      this.$http.get('./data/august2024/window_glass.json'),
    ]).pipe( map( values => {
      const [ 
        concrete_types,
        // construction_site_energy_usage,
        container_disposal,
        container_village,
        material_co2_equ,
        material_density,
        truck,
        window_frame,
        window_glass,
       ] = values;
       return {
        concrete_types,
        // construction_site_energy_usage,
        container_disposal,
        container_village,
        material_co2_equ,
        material_density,
        truck,
        window_frame,
        window_glass,
       }
    }));
    const form_defaults$ = combineLatest([
      this.$http.get('./data/august2024/debug_calculation_v1/file_aufbauten.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/file_bauteilflaechen.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/file_oi3.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/file_rose.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_common.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_construction_site.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_container_village.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_demolish_disposal.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_excavation_pit.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_rose.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_selection.json'),
    ]).pipe( map( values => {
      const [ 
        file_aufbauten,
        file_bauteilflaechen,
        file_oi3,
        file_rose,
        form_common,
        form_construction_site,
        form_container_village,
        form_demolish_disposal,
        form_excavation_pit,
        form_rose,
        form_selection,
       ]  = values as any[];
      let result;
      try {
        result = react_view_calculation_context_parser.parse({
          file_aufbauten: file_aufbauten.data,
          file_bauteilflaechen: file_bauteilflaechen.data,
          file_oi3,
          file_rose,
          form_common: { value: form_common },
          form_construction_site,
          form_container_village,
          form_demolish_disposal,
          form_excavation_pit,
          form_rose: { value: form_rose },
          form_selection
        });
      } catch( error ) {
        console.log( error )
      }
      return result;
    }));
    const debug_calculation_v1$ = combineLatest([
      this.$http.get('./data/august2024/debug_calculation_v1/file_aufbauten.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/file_bauteilflaechen.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/file_oi3.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/file_rose.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_common.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_construction_site.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_container_village.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_demolish_disposal.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_excavation_pit.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_rose.json'),
      this.$http.get('./data/august2024/debug_calculation_v1/form_selection.json'),
    ]).pipe( map( values => {
      const [ 
        file_aufbauten,
        file_bauteilflaechen,
        file_oi3,
        file_rose,
        form_common,
        form_construction_site,
        form_container_village,
        form_demolish_disposal,
        form_excavation_pit,
        form_rose,
        form_selection,
       ]  = values as any[];
      let result;
      try {
        result = react_view_calculation_context_parser.parse({
          file_aufbauten: file_aufbauten.data,
          file_bauteilflaechen: file_bauteilflaechen.data,
          file_oi3,
          file_rose,
          form_common: { value: form_common },
          form_construction_site: form_construction_site,
          form_container_village,
          form_demolish_disposal,
          form_excavation_pit,
          form_rose: { value: form_rose},
          form_selection,
        });
      } catch( error ) {
        console.log( error )
      }
      return result;
    }));

    const load_from_remote$ = combineLatest([ 
      data$,
      debug_calculation_v1$,
      form_defaults$
    ]).pipe(
      map( values => {
        const [data, debug_calculation_v1, form_defaults] = values;
        return {
          data,
          debug_calculation_v1,
          form_defaults,
        }
      })
    );
    const result = await firstValueFrom(load_from_remote$);
    return result;
  };

  @boundMethod
  public async actor_validate_load_from_remote( { input }: { input: any} ) {
    // let result = input;
    // try {
    // //    result = react_init_load_from_remote_parser.parse(input);
    // } catch ( error ) {
    //   console.log( '>>>>>>>>>>>>INVESTIGATE_THIS>>>>>>>>>>>>>>>>' );
    //   console.log( error )
    // }
    // console.log( result )
    return input;
  };

  @boundMethod
  public async actor_merge_result( { input }: { input: any} ) {
    // console.log('>>>>>>ACTOR_MERGE_RESULT');
    // console.log( input );
    return input;
  };

  @boundMethod
  public async actor_validate_result( { input }: { input: any} ) {
    // console.log('>>>>>>ACTOR_VALIDATE_RESULT');
    // console.log( input );
    return input;
  };

}