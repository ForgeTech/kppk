import { Injectable, inject } from '@angular/core';
import { FgImmutableService, FgXstateService } from '../../service';

import { boundMethod } from 'autobind-decorator';
import { 
  FgBaseService,
} from '@kppk/fg-lib-new';
import { 
  REACT_MAIN_ACTION_INPUT
} from './react-main_v3.machine.types';

@Injectable({
  providedIn: 'root',
})
export class ReactMainV3MachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $xstate = inject(FgXstateService);
  
  

}
