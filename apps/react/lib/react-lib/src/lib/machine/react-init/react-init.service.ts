import { FgBaseService, FgStorageService } from '@fg-kppk/fg-base';
import { Injectable, inject } from '@angular/core';
import { assign, createActor, fromPromise } from 'xstate';
import { PWA_REACT_APP_INIT_V1, ReactAppInitV1Context } from './react-init.machine';
import { HttpClient } from '@angular/common/http';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { FgXstateService } from '../../service/fg-xstate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { combineLatest, firstValueFrom, map } from 'rxjs';
import { react_init_load_from_remote_parser } from './react-init.types';
import { react_view_calculation_context_parser } from '../../types/kppk-react-calculation.types';

@Injectable({
  providedIn: 'root',
})
export class ReactInitService extends FgBaseService {
  public machine;
  // public actor;
  // public state$;

  protected $immer = inject(FgImmutableService);
  protected $storage = inject(FgStorageService);
  protected $http = inject(HttpClient);
  protected $xstate = inject(FgXstateService);
  protected $router = inject(Router);
  protected $active_route = inject(ActivatedRoute);
  protected $document = inject(DOCUMENT)

  // CONSTRUCTOR
  constructor() {
    super();
    this.machine = PWA_REACT_APP_INIT_V1.provide({
      actions: {
        assign_react_init_input: assign( this.assign_react_init_input ),
        assign_load_from_local_result: assign( this.assign_load_from_local_result ),
        assign_load_from_remote_result: assign( this.assign_load_from_remote_result ),
        assign_load_from_url_from_route_result: assign( this.assign_load_from_url_from_route_result ),
        assign_load_url_from_params_result: assign( this.assign_load_url_from_params_result ),
        assign_result_data: assign( this.assign_result_data ),
      },
      actors: {
        actor_load_from_local: fromPromise( this.actor_load_from_local ),
        actor_validate_load_from_local: fromPromise( this.actor_validate_load_from_local ),
        actor_load_from_remote: fromPromise( this.actor_load_from_remote ),
        actor_validate_load_from_remote: fromPromise( this.actor_validate_load_from_remote ),
        actor_merge_result: fromPromise( this.actor_merge_result ),
        actor_validate_result: fromPromise( this.actor_validate_result ),
      },
    });
  }


  public assign_react_init_input = ( { context, event }: { context: any, event: any } ) => {
    const result = this.$immer.produce( ( context, draft ) => {
      draft.environment = event.input.context;
    });
    return result;
  };

  public assign_load_from_local_result = ( { context, event }: { context: any, event: any } ) => {
    console.log('>>>>>>>>>>>ASSIGN_assign_load_from_local_result>>>>>>>>>>>>>');
    console.log(context);
    console.log(event);
    const result = this.$immer.produce( ( context, draft ) => {
    });
    return result;
  };

  public assign_load_from_remote_result = ( { context, event }: { context: ReactAppInitV1Context, event: any } ) => {
    // console.log('>>>>>>>>>>>ASSIGN_assign_load_from_remote_result>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce( context, draft  => {
      draft.load_from_remote = event.output;
    });
    // ReactAppInitV1Context_parser.parse(result);
    return result;
  };

  public assign_load_from_url_from_route_result = ( { context, event }: { context: ReactAppInitV1Context, event: any } ) => {
    console.log('>>>>>>>>>>>ASSIGN_assign_load_from_url_from_route_result>>>>>>>>>>>>>');
    console.log(context);
    console.log(event);
    const result = this.$immer.produce( context, draft  => {
    });
    return result;
  };


  public assign_load_url_from_params_result = ( { context, event }: { context: ReactAppInitV1Context, event: any } ) => {
    // console.log('>>>>>>>>>>>ASSIGN_assign_load_url_from_params_result>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce( context, draft => {
    });
    return result;
  };

  public assign_result_data = ({ context, event }: { context: ReactAppInitV1Context, event: any } ) => {
    const result = this.$immer.produce(  context, draft  => {
      // if( context?.load_from_remote) {
      //   draft.output = context.load_from_remote
      // }
    });
    // ReactAppInitV1Context_parser.parse(result);
    return result;
  };

  public actor_load_from_local = async ( { input }: { input: any} ) => {
    const result = await firstValueFrom(this.$storage.getItem('settings-local-ui'));
    return result;
  };

  public actor_validate_load_from_local = async ( { input }: { input: any} ) => {
    return true;
  };

  public actor_load_from_remote = async ( { input }: { input: any } ) => {
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

  public actor_validate_load_from_remote = async ( { input }: { input: any} ) => {
    let result = input;
    try {
       result = react_init_load_from_remote_parser.parse(input);
    } catch ( error ) {
      console.log( '>>>>>>>>>>>>INVESTIGATE_THIS>>>>>>>>>>>>>>>>' );
      console.log( error )
    }
    // console.log( result )
    return result;
  };

  public actor_merge_result = async ( { input }: { input: any} ) => {
    // console.log('>>>>>>ACTOR_MERGE_RESULT');
    // console.log( input );
    return input;
  };

  public actor_validate_result = async ( { input }: { input: any} ) => {
    // console.log('>>>>>>ACTOR_VALIDATE_RESULT');
    // console.log( input );
    return input;
  };
}
