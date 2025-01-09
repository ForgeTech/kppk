import { FgBaseService, FgStorageService } from '@kppk/fg-lib';
import { Injectable, inject } from '@angular/core';
import { assign } from 'xstate';
import { REACT_VIEW_HOME_MACHINE_V1, ReactViewHomeV1Context, } from './react-view-home.machine';
import { FgImmutableService } from '../../service/fg-immutable.service';

@Injectable({
  providedIn: 'root',
})
export class ReactViewHomeService extends FgBaseService {
  public machine;

  protected $immer = inject(FgImmutableService);
  protected $storage = inject(FgStorageService);

  constructor() {
    super();
    this.machine = REACT_VIEW_HOME_MACHINE_V1.provide({
        actions: {
          assign_from_files_bauteilflaeche_data: assign( this.assign_from_files_bauteilflaeche_data ),
          assign_from_files_aufbauten_data: assign( this.assign_from_files_aufbauten_data ),
          assign_from_files_oi3_data: assign( this.assign_from_files_oi3_data ),
          assign_from_files_rose_data: assign( this.assign_from_files_rose_data ),
          assign_from_files_output_data: assign( this.assign_from_files_output_data ),
      },
    });
  }

  protected assign_from_files_bauteilflaeche_data = ({ context, event }: { context: ReactViewHomeV1Context, event: any }) => {
    // console.log('>>>>>>>>>>>assign_from_files_bauteilflaeche_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce( context, draft => {
      draft.file_bauteilflaechen = event.data;
    });
    return result;
  }

  protected assign_from_files_aufbauten_data = ({ context, event }: { context: ReactViewHomeV1Context, event: any }) => {
    // console.log('>>>>>>>>>>>assign_from_files_aufbauten_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce( context, draft => {
      draft.file_aufbauten = event.data;
    });
    return result;
  }

  protected assign_from_files_oi3_data = ({ context, event }: { context: ReactViewHomeV1Context, event: any }) => {
    // console.log('>>>>>>>>>>>assign_from_files_oi3_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce( context, draft => {
      draft.file_oi3 = event.data;
    });
    return result;
  }

  protected assign_from_files_rose_data = ({ context, event }: { context: ReactViewHomeV1Context, event: any }) => {
    // console.log('>>>>>>>>>>>assign_from_files_rose_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce( context, draft => {
      draft.file_rose = event.data;
    });
    return result;
  }

  protected assign_from_files_output_data = ({ context, event }: { context: ReactViewHomeV1Context, event: any }) => {
    // console.log('>>>>>>>>>>>assign_from_files_output_data>>>>>>>>>>>>>');
    // console.log(context);
    // console.log(event);
    const result = this.$immer.produce( context, draft => {
      draft.output = {
        file_bauteilflaechen: context.file_bauteilflaechen,
        file_aufbauten: context.file_aufbauten,
        file_oi3: context.file_oi3,
        file_rose: context.file_rose,
      }
    });
    return result;
  }

  

}
