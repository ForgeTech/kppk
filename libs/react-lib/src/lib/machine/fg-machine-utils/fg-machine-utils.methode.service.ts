import { Injectable } from '@angular/core';

import { boundMethod } from 'autobind-decorator';
import { 
  FgBaseService,
} from '@kppk/fg-lib-new';
import { 
  ANY_ACTION_INPUT,
  any_action_input_parser,
  LOG_LEVEL_OPTIONS,
  log_option_params_parser,
  LOG_OPTIONS,
} from './fg-machine-utils.machine.types';
import { fg_spinner_event_hide_parser, FG_SPINNER_EVENT_OPTION, fg_spinner_event_option_parser, fg_spinner_event_show_parser, fg_spinner_event_stop_parser } from '../fg-spinner';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class FgMachineUtilsMethodeService extends FgBaseService {

  @boundMethod
  public raise_spinner_event_show(input: ANY_ACTION_INPUT, params?: FG_SPINNER_EVENT_OPTION) {
    const data = fg_spinner_event_option_parser.parse(params);
    return fg_spinner_event_show_parser.parse({ data });
  }

  @boundMethod
  public raise_spinner_event_hide(input: ANY_ACTION_INPUT, params?: FG_SPINNER_EVENT_OPTION) {
    const data = fg_spinner_event_option_parser.parse(params);
    return fg_spinner_event_hide_parser.parse({ data });
  }

  @boundMethod
  public log_info(input: ANY_ACTION_INPUT, params: LOG_OPTIONS ) {
   const params_level: LOG_LEVEL_OPTIONS = {
    level: 'info',
    ...params
   }
   this.log(input, params_level);
  };


  @boundMethod
  public log_warn(input: ANY_ACTION_INPUT, params: LOG_OPTIONS ) {
    const params_level: LOG_LEVEL_OPTIONS = {
      level: 'warn',
      ...params
     }
     this.log(input, params_level);
  };

  @boundMethod
  public log_error(input: ANY_ACTION_INPUT, params: LOG_OPTIONS ) {
    const params_level: LOG_LEVEL_OPTIONS = {
      level: 'error',
      ...params
     }
     this.log(input, params_level);
  };
  
  @boundMethod
  public log(input: ANY_ACTION_INPUT, params: LOG_LEVEL_OPTIONS ) {
    if( this.$log && params?.level ) {
      const parsed_params = log_option_params_parser.parse(params);
      if( parsed_params?.message ) {
        this.$log[params.level](parsed_params.message.toUpperCase())
      }
      if( input ) {
        const parsed_input = any_action_input_parser.parse(params);
        if( parsed_input.event && parsed_params?.log_event ) {
          this.$log[params.level]('EVENT: ' + parsed_input.event.type.toUpperCase())
        }
        if( parsed_input.context && parsed_params?.log_context ) {
          this.$log[params.level]('CONTEXT: ');
          this.$log[params.level](parsed_input.context)
        }
      }
    }
  };

}
