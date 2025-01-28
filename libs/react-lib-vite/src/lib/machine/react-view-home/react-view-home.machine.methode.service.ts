import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { boundMethod } from 'autobind-decorator';
import { FgBaseService } from '@kppk/fg-lib-new';
import { REACT_VIEW_HOME_CONTEXT } from './react-view-home.machine.types';

@Injectable({
  providedIn: 'root',
})
export class ReactViewHomeMachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);

  @boundMethod
  public react_view_home_output({
    context,
    event,
  }: {
    context: REACT_VIEW_HOME_CONTEXT;
    event: any;
  }) {
    // console.log('>>>>>>>>>>>>>>>>OUTPUT>>>>>>>>>>>>>')
    // console.log( context );
    // console.log( event );
    return context.output;
  }

  @boundMethod
  public assign_from_files_bauteilflaeche_data({
    context,
    event,
  }: {
    context: REACT_VIEW_HOME_CONTEXT;
    event: any;
  }) {
    // console.log('>>>>>>>>>>>assign_from_files_bauteilflaeche_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce(context, (draft) => {
      draft.file_bauteilflaechen = event.data;
    });
    return result;
  }

  @boundMethod
  public assign_from_files_aufbauten_data({
    context,
    event,
  }: {
    context: REACT_VIEW_HOME_CONTEXT;
    event: any;
  }) {
    // console.log('>>>>>>>>>>>assign_from_files_aufbauten_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce(context, (draft) => {
      draft.file_aufbauten = event.data;
    });
    return result;
  }

  @boundMethod
  public assign_from_files_oi3_data({
    context,
    event,
  }: {
    context: REACT_VIEW_HOME_CONTEXT;
    event: any;
  }) {
    // console.log('>>>>>>>>>>>assign_from_files_oi3_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce(context, (draft) => {
      draft.file_oi3 = event.data;
    });
    return result;
  }

  @boundMethod
  public assign_from_files_rose_data({
    context,
    event,
  }: {
    context: REACT_VIEW_HOME_CONTEXT;
    event: any;
  }) {
    // console.log('>>>>>>>>>>>assign_from_files_rose_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce(context, (draft) => {
      draft.file_rose = event.data;
    });
    return result;
  }

  @boundMethod
  public assign_from_files_output_data({
    context,
    event,
  }: {
    context: REACT_VIEW_HOME_CONTEXT;
    event: any;
  }) {
    // console.log('>>>>>>>>>>>assign_from_files_output_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce(context, (draft) => {
      draft.output = {
        file_bauteilflaechen: context.file_bauteilflaechen,
        file_aufbauten: context.file_aufbauten,
        file_oi3: context.file_oi3,
        file_rose: context.file_rose,
      };
    });
    return result;
  }
}
