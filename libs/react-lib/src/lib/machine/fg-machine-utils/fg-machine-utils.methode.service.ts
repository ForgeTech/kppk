import { Injectable, inject } from '@angular/core';
import { FgImmutableService, FgXstateService } from '../../service';

import { boundMethod } from 'autobind-decorator';
import { 
  FgBaseService,
} from '@kppk/fg-lib-new';
import { 
  ANY_ACTION_INPUT,
  any_action_input_parser,
  log_info_option_params_parser,
  LOG_INFO_OPTIONS,
} from './fg-machine-utils.machine.types';

@Injectable({
  providedIn: 'root',
})
export class FgMachineUtilsMethodeService extends FgBaseService {
  
  @boundMethod
  public log_info(input: ANY_ACTION_INPUT, params: LOG_INFO_OPTIONS ) {
    const parsed_params = log_info_option_params_parser.parse(params);
    const parsed_input = any_action_input_parser.parse(params);
    if( parsed_params.message ) {
      this.$log?.info( parsed_params?.message.toUpperCase())
    }
    if( parsed_input.event && parsed_params.log_event ) {
      this.$log?.info('EVENT: ' + parsed_input.event.type.toUpperCase)
    }
    if( parsed_input.context && parsed_params.log_context ) {
      this.$log?.info('CONTEXT: ');
      this.$log?.info(parsed_input.context)
    }
  };


    @boundMethod
    public log_error(input: ANY_ACTION_INPUT, params: LOG_INFO_OPTIONS ) {
      const parsed_params = log_info_option_params_parser.parse(params);
      const parsed_input = any_action_input_parser.parse(params);
      if( parsed_params.message ) {
        this.$log?.error(parsed_params.message.toUpperCase())
      }
      if( parsed_input.event && parsed_params.log_event ) {
        this.$log?.error('EVENT: ' + parsed_input.event.type.toUpperCase())
      }
      if( parsed_input.context && parsed_params.log_context ) {
        this.$log?.error('CONTEXT: ');
        this.$log?.error(parsed_input.context)
      }
    };

}
