import { Injectable, inject } from '@angular/core';
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
  protected $component = inject(FgComponentBaseService);
  protected $router = inject(Router);
  protected $location = inject(Location);
  protected event = inject(FgViewBaseEvent);
  protected $activeView = inject(FgActiveViewService);
  protected $activeRoute = inject(FgActiveRouteService);
  protected $canUnload = inject(FgCanUnloadService);

}
