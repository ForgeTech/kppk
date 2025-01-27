import { FgBaseService } from '@kppk/fg-lib-new';
import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { transform_oi3, transform_bauteilflaechen, transform_aufbauten} from './react-view-calculation-material.utils';
import { REACT_CALCULATION_MATERIALS_CONTEXT, REACT_CALCULATION_MATERIALS_INPUT } from '../../types';
import { boundMethod } from 'autobind-decorator';


@Injectable({
  providedIn: 'root',
})
export class ReactCalculationMaterialMachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);

  @boundMethod
  public assign_oi3_transform_result({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
        draft.output.transformed_oi3 = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_bauteilflaechen_transform_result({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_bauteilflaechen = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_aufbauten_transform_result({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_change_aufbauten({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_change_bauteilflaechen({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_change_oi3({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_merge_arich_oi3({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }

  @boundMethod
  public assign_material_type({ context, event }: { context: REACT_CALCULATION_MATERIALS_CONTEXT, event: any }) {
    const result = this.$immer.produce( context, draft => { 
      draft.output.transformed_aufbauten = event.output;
    });
    return result;
  }

  @boundMethod
  public actor_tranform_oi3_file_inputs = async ({ input }: { input: REACT_CALCULATION_MATERIALS_INPUT }) {
    if( input.context.input.file_oi3?.data && input.context.input.file_oi3?.area) {
      return transform_oi3( input.context.input.file_oi3.data, input.context.input.file_oi3.area );
    } else {
      return [];
    }
  }

  @boundMethod
  public actor_tranform_bauteilflaechen_file_inputs = async ({ input }: { input: REACT_CALCULATION_MATERIALS_INPUT }) {
    if(input.context.input.file_bauteilflaechen) {
      return transform_bauteilflaechen( input.context.input.file_bauteilflaechen.data );
    } else {
      return [];
    }
  }

  @boundMethod
  public actor_tranform_aufbauten_file_inputs = async ({ input }: { input: REACT_CALCULATION_MATERIALS_INPUT }) {
    if(input.context.input.file_aufbauten) {
      const result = transform_aufbauten( input.context.input.file_aufbauten.data );
      return result;
    } else {
      return [];
    }
  }

}
