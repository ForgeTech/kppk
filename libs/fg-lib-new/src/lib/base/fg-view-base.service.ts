import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// import { FgViewBaseEvent } from './fg-view-base.event';
import { FgComponentBaseService } from './fg-component-base.service';
// import { FgActiveViewService } from '../service/fg-active-view/fg-active-view.service';
import {
  FG_EVENT,
  // FgActiveRouteService,
  // FgCanUnloadService,
  FgEventService,
} from '../service';
import { FgBaseService } from './fg-base.service';
// import { NGXLogger } from 'ngx-logger';
/**
 * FgViewBaseService -
 * Service provides forge view-components with all commonly needed
 * functionality
 */
@Injectable({ providedIn: 'root' })
export class FgViewBaseService extends FgBaseService {
    public $component = inject(FgComponentBaseService);
    public $router = inject(Router)
    public $location = inject(Location);
    // public $allowCookies: FgAllowCookieService,
    // public event: FgViewBaseEvent,
    // public $activeView: FgActiveViewService,
    // public $activeRoute: FgActiveRouteService,
    /**  (Optional) Provide event service */
    protected $event = inject(FgEventService);
    // public $canUnload: FgCanUnloadService,
}
