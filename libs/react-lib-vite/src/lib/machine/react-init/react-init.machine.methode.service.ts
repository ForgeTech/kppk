import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { DOCUMENT } from '@angular/common';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { boundMethod } from 'autobind-decorator';
import { FgBaseService, FgStorageService } from '@kppk/fg-lib-new';
import {
  REACT_INIT_CONTEXT,
  react_init_load_from_remote_parser,
} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ReactInitMachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $http = inject(HttpClient);
  protected $storage = inject(FgStorageService);
  protected $document = inject(DOCUMENT);

  constructor() {
    super();
  }

  @boundMethod
  public escalate_result_validate_error({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    throw new Error('FARKFARKFARK');
  }

  // @boundMethod
  // public react_init_input_context( { input }: { input: Partial<REACT_INIT_CONTEXT> }) {
  //   let context: REACT_INIT_CONTEXT = {
  //     environment: undefined,
  //     load_from_remote: undefined,
  //     output: undefined,
  //   }
  //   context = react_init_context_parser.parse( Object.assign( context, input) );
  //   return context;
  // }

  @boundMethod
  public react_init_output({ context }: { context: REACT_INIT_CONTEXT }) {
    console.log('FIND OUT WHY NOT PARSING ANYMORE');
    // try {
    //   // result = react_init_output_parser.parse(context?.output);
    // } catch( error ) {
    //   console.log( error );
    // }
    return context;
  }

  @boundMethod
  public assign_react_init_input({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    // const result = this.$immer.produce( ( context, draft ) => {

    // });
    return context;
  }

  @boundMethod
  public assign_load_from_local_result({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    const result = this.$immer.produce(context, (draft) => {
      draft.load_from_remote = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_load_from_remote_result({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    const result = this.$immer.produce(context, (draft) => {
      draft.load_from_remote = event.output;
    });
    // ReactAppInitV1Context_parser.parse(result);
    return result;
  }

  @boundMethod
  public assign_load_from_url_from_route_result({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    console.log(
      '>>>>>>>>>>>ASSIGN_assign_load_from_url_from_route_result>>>>>>>>>>>>>'
    );
    console.log(context);
    console.log(event);
    // const result = this.$immer.produce( context, draft  => {
    // });
    return context;
  }

  @boundMethod
  public assign_load_url_from_params_result({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    console.log('assign_load_url_from_params_result');
    // this.$immer.produce( context, draft => {
    // });
    return context;
  }

  @boundMethod
  public assign_result_data({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    console.log('assign_result_data');
    // return this.$immer.produce(  context, draft  => {
    //   // if( context?.load_from_remote) {
    //   //   draft.output = context.load_from_remote
    //   // }
    // });
    return context;
  }

  @boundMethod
  public async actor_load_from_local({ input }: { input: any }) {
    console.log('actor_load_from_local');
    const result = await firstValueFrom(
      this.$storage.getItem('settings-local-ui')
    );
    return result;
  }

  @boundMethod
  public async actor_validate_load_from_local({ input }: { input: any }) {
    console.log('actor_validate_load_from_local');
    return input;
  }

  @boundMethod
  public escalate_load_from_local_error({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    throw new Error('FARKFARKFARK');
  }

  @boundMethod
  public async actor_load_from_remote({ input }: { input: any }) {
    const common$ = this.load_object({
      concrete_types: './react/data/august2024/common/concrete_types.json',
      //construction_site_energy_usage: './react/data/august2024/common/construction_site_energy_usage.json',
      container_disposal:
        './react/data/august2024/common/container_disposal.json',
      container_village:
        './react/data/august2024/common/container_village.json',
      material_co2_equ: './react/data/august2024/common/material_co2_equ.json',
      material_density: './react/data/august2024/common/material_density.json',
      truck: './react/data/august2024/common/truck.json',
      window_frames: './react/data/august2024/common/window_frames.json',
      window_glass: './react/data/august2024/common/window_glass.json',
    });

    const form_defaults$ = this.load_object({
      form_common: './react/data/august2024/form_default/form_common.json',
      form_construction_site:
        './react/data/august2024/form_default/form_construction_site.json',
      form_container_village:
        './react/data/august2024/form_default/form_container_village.json',
      form_demolish_disposal:
        './react/data/august2024/form_default/form_demolish_disposal.json',
      form_excavation_pit:
        './react/data/august2024/form_default/form_excavation_pit.json',
      form_rose: './react/data/august2024/form_default/form_rose.json',
      form_selection:
        './react/data/august2024/form_default/form_selection.json',
    });

    const debug_calculation_v1$ = this.load_object({
      file_aufbauten:
        './react/data/august2024/debug_calculation_v1/file_aufbauten.json',
      file_bauteilflaechen:
        './react/data/august2024/debug_calculation_v1/file_bauteilflaechen.json',
      file_oi3: './react/data/august2024/debug_calculation_v1/file_oi3.json',
      file_rose: './react/data/august2024/debug_calculation_v1/file_rose.json',
      form_common:
        './react/data/august2024/debug_calculation_v1/form_common.json',
      form_construction_site:
        './react/data/august2024/debug_calculation_v1/form_construction_site.json',
      form_container_village:
        './react/data/august2024/debug_calculation_v1/form_container_village.json',
      form_demolish_disposal:
        './react/data/august2024/debug_calculation_v1/form_demolish_disposal.json',
      form_excavation_pit:
        './react/data/august2024/debug_calculation_v1/form_excavation_pit.json',
      form_rose: './react/data/august2024/debug_calculation_v1/form_rose.json',
      form_selection:
        './react/data/august2024/debug_calculation_v1/form_selection.json',
    });

    const load_from_remote$ = forkJoin({
      common: common$,
      form_defaults: form_defaults$,
      debug_calculation_v1: debug_calculation_v1$,
    });
    const result = await firstValueFrom(load_from_remote$);
    return result;
  }

  @boundMethod
  public async actor_validate_load_from_remote({ input }: { input: any }) {
    const result = react_init_load_from_remote_parser.parse(input.event.output);
    return result;
  }

  @boundMethod
  public escalate_load_from_remote_error({
    context,
    event,
  }: {
    context: REACT_INIT_CONTEXT;
    event: any;
  }) {
    throw new Error('FARKFARKFARK');
  }

  @boundMethod
  public async actor_merge_result({ input }: { input: any }) {
    // console.log('>>>>>>ACTOR_MERGE_RESULT');
    // console.log( input );
    return input;
  }

  @boundMethod
  public async actor_validate_result({ input }: { input: any }) {
    // console.log('>>>>>>ACTOR_VALIDATE_RESULT');
    // console.log( input );
    return input;
  }

  private load_object(to_load: Record<string, string>) {
    const resources: Record<string, Observable<any>> = {};
    const sources = Object.keys(to_load).forEach((key) => {
      resources[key] = this.$http.get(to_load[key]);
    });
    return forkJoin(resources);
  }
}
