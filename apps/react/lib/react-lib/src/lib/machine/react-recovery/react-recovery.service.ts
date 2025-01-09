import { BehaviorSubject } from 'rxjs';
import { FgBaseService, FgStorageLocalforageService } from '@fg-kppk/fg-base';
import { Injectable, inject } from '@angular/core';
import { createActor } from 'xstate';
import { FG_REACT_PWA_RECOVERY_V1, } from './react-recovery.machine';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { createBrowserInspector } from '@statelyai/inspect';
import { SYSTEM_ID_ENUM } from '../react-main/react-main.machine';
import { FgXstateService } from '../../service/fg-xstate.service';

@Injectable({
  providedIn: 'root',
})
export class ReactRecoveryService extends FgBaseService {
  public machine;
  public actor;
  public state$;

  protected $immer = inject(FgImmutableService);
  protected $storage = inject(FgStorageLocalforageService);

  constructor(
    protected $xstate: FgXstateService
  ) {
    super();
    this.machine = FG_REACT_PWA_RECOVERY_V1.provide({
  
    });

    const { inspect } = createBrowserInspector();
    this.actor = createActor(this.machine, { 
      input: {}, 
      systemId: SYSTEM_ID_ENUM.REACT_RECOVERY,
      inspect: this.$xstate.inspect
    });
    this.state$ = new BehaviorSubject( this.actor.getSnapshot());
    this.actor.subscribe({
      next: state => {
        this.$log.info('>>>>>>>>FG_REACT_PWA_RECOVERY_V1_NEXT')
        this.state$.next(state);
      },
      error: error => {
        this.$log.error('>>>>>>>>FG_REACT_PWA_RECOVERY_V1_ERROR', error)
      },
      complete: () => {
        this.$log.warn('>>>>>>>>FG_REACT_PWA_RECOVERY_V1_COMPLETE');
      }
    });
  }

}
