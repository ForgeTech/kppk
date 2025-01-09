import { BehaviorSubject } from 'rxjs';
import { FgBaseService, FgStorageLocalforageService } from '@fg-kppk/fg-base';
import { Injectable, inject } from '@angular/core';
import { createActor } from 'xstate';
import { REACT_DATA_IMPORTER_MACHINE, } from './react-data-importer.machine';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { SYSTEM_ID_ENUM } from '../react-main/react-main.machine';
import { FgXstateService } from '../../service/fg-xstate.service';
import { InternalReactDataImporterResetState, InternalReactDataImporterResetStateParser, InternaltReactDataImporterProcessFile, InternaltReactDataImporterProcessFileParser } from './react-data-importer.machine.types';
import { InternalFgSpinnerResetTimeout } from '../fg-spinner/fg-spinner.machine.types';

@Injectable({
  providedIn: 'root',
})
export class ReactDataImporterService extends FgBaseService {
  public machine;
  public actor;
  public state$;

  protected $immer = inject(FgImmutableService);
  protected $storage = inject(FgStorageLocalforageService);

  constructor(
    protected $xstate: FgXstateService
  ) {
    super();
    this.machine = REACT_DATA_IMPORTER_MACHINE.provide({
      actions: {
        raise_internal_reset_state: this.raise_internal_reset_state,
        raise_internal_process_file: this.raise_internal_process_file,
        guard_matching_target: this.guard_matching_target,
      }
    });
    this.actor = createActor(this.machine, { 
      input: {}, 
      systemId: SYSTEM_ID_ENUM.REACT_RUNNING,
      inspect: this.$xstate.inspect
    });
    this.state$ = new BehaviorSubject( this.actor.getSnapshot());
    this.actor.subscribe({
      next: state => {
        this.$log.info('>>>>>>>>REACT_DATA_IMPORTER_MACHINE_NEXT')
        this.state$.next(state);
      },
      error: error => {
        this.$log.error('>>>>>>>>REACT_DATA_IMPORTER_MACHINE_ERROR', error)
      },
      complete: () => {
        this.$log.warn('>>>>>>>>REACT_DATA_IMPORTER_MACHINE_COMPLETE');
      }
    });
  }

  public raise_internal_reset_state = ( { event }: {
    event: any
  } ) => {
    
    const event_to_raise: InternalReactDataImporterResetState = {
      type: 'react.data_importer.internal.reset_state'
    }
    return InternalReactDataImporterResetStateParser.parse(event_to_raise);
  }

  public raise_internal_process_file = () => {
    const event: InternaltReactDataImporterProcessFile = {
      type: 'react.data_importer.internal.process_file'
    }
    return InternaltReactDataImporterProcessFileParser.parse(event);
  }

  public guard_matching_target = () => {
    this.$log.info('FG_REACT_PWA_MAIN: log_react_running');
  }

}
