import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { FgViewBaseEvent } from './fg-view-base.event';
import { FgComponentBaseService } from './fg-component-base.service';
import { FgActiveViewService } from '../service/fg-active-view/fg-active-view.service';
import {
  FgActiveRouteService,
  FgCanUnloadService,
  FgEventService,
} from '../service';
import { FgBaseService } from './fg-base.service';
import { NGXLogger } from 'ngx-logger';
/**
 * FgViewBaseService -
 * Service provides forge view-components with all commonly needed
 * functionality
 */
@Injectable({ providedIn: 'root' })
export class FgViewBaseService extends FgBaseService {
  /** CONSTRUCTOR */
  constructor(
    public $component: FgComponentBaseService,
    public $router: Router,
    // public $routerTranslation: FgTranslateRouterService,
    public $location: Location,
    // public $allowCookies: FgAllowCookieService,
    public event: FgViewBaseEvent,
    public $activeView: FgActiveViewService,
    public $activeRoute: FgActiveRouteService,
    /**  (Optional) Provide event service */
    protected override $event: FgEventService,
    public $canUnload: FgCanUnloadService,
    /** (Optional) Provide logger service */
    @Optional() protected override $log: NGXLogger
  ) {
    super();
  }
}
