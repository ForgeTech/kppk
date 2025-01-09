import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { FgBaseService, FgStorageLocalforageService } from '@fg-kppk/fg-base';
import { FG_UI_MACHINE_V2 } from '../fg-ui/fg-ui.machine';
import { BehaviorSubject } from 'rxjs';
import { createActor } from 'xstate';
import { SYSTEM_ID_ENUM } from '../react-main/react-main.machine';
import { createBrowserInspector } from '@statelyai/inspect';
import { FgXstateService } from '../../service/fg-xstate.service';

@Injectable({
  providedIn: 'root',
})
export class FgUiService extends FgBaseService{
  public machine;
  public actor;
  public state$;

  protected $immer = inject(FgImmutableService);
  protected $storage = inject(FgStorageLocalforageService);

  constructor(
    protected $xstate: FgXstateService
  ) {
    super();
    this.machine = FG_UI_MACHINE_V2.provide({
  
    });

    this.actor = createActor(this.machine, { 
      input: {}, 
      systemId: SYSTEM_ID_ENUM.FG_UI,
      inspect: this.$xstate.inspect
    });
    this.state$ = new BehaviorSubject( this.actor.getSnapshot() );
    this.actor.subscribe({
      next: state => {
        this.$log.info('>>>>>>>>FG_REACT_PWA_RUNNING_V1_NEXT')
        this.state$.next(state);
      },
      error: error => {
        this.$log.error('>>>>>>>>FG_REACT_PWA_RUNNING_V1_ERROR', error)
      },
      complete: () => {
        this.$log.warn('>>>>>>>>FG_REACT_PWA_RUNNING_V1_COMPLETE');
      }
    });
  }
}
