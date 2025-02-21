import { Injectable, inject } from '@angular/core';
import { FgImmutableService, FgXstateService } from '../../service';

import { boundMethod } from 'autobind-decorator';
import { 
  FgBaseService,
} from '@kppk/fg-lib-new';
import { 
  REACT_MAIN_ACTION_INPUT
} from './react-main_v3.machine.types';
import { fg_auth_emitted_parser } from '../fg-auth-local';

@Injectable({
  providedIn: 'root',
})
export class ReactMainV3MachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $xstate = inject(FgXstateService);
  
    @boundMethod
    public assign_auth_emitted({ context, event }: REACT_MAIN_ACTION_INPUT) {
      const parsed_event = fg_auth_emitted_parser.parse(event);
      const result = this.$immer.produce( context, draft => {
        draft.auth_cookie = parsed_event.data.auth_cookie;
      });
      return result;
    };

}
