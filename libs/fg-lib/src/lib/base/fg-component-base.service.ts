import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NGXLogger } from 'ngx-logger';
import { FgGlobalService } from '../module/fg-global/fg-global.service';
import { FgEventService } from '../service/fg-event/fg-event.service';
import { FgTimeStringService } from '../service/fg-timestring/fg-timestring.service';
import { FgBaseService } from './fg-base.service';
/**
 * FgComponentBaseService -
 * Essential services used by FgComponentBase components and
 * higher order 'fgBase'-Components
 */
@Injectable({
  providedIn: 'root',
})
export class FgComponentBaseService extends FgBaseService {
  /** Reference to timestring service*/
  public $time = inject(FgTimeStringService);
  /** Reference to the translation service */
  public $translate = inject(TranslocoService);
  /** Reference to the global scope service */
  public $global = inject(FgGlobalService);
  /** Reference to the event service */
  public override $event = inject(FgEventService);
  /** Reference to the logging service */
  public override $log = inject(NGXLogger);
  /** CONSTRUCTOR */
  constructor(
  ) {
    super();
  }
}
