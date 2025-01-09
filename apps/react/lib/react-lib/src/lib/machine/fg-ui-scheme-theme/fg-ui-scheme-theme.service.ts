import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service/fg-immutable.service';
import { FgBaseService, FgStorageLocalforageService } from '@kppk/fg-lib';
import { FG_UI_SCHEME_THEME_V1 } from '../fg-ui-scheme-theme/fg-ui-scheme-theme.machine';
import { BehaviorSubject } from 'rxjs';
import { createActor } from 'xstate';
import { NGXLogger } from 'ngx-logger';
import { createBrowserInspector } from '@statelyai/inspect';
import { FgXstateService } from '../../service/fg-xstate.service';

@Injectable({
  providedIn: 'root',
})
export class FgUiSchemeThemeService extends FgBaseService {
  public machine;

  protected $immer = inject(FgImmutableService);
  protected $storage = inject(FgStorageLocalforageService);

  constructor() {
    super();
    this.machine = FG_UI_SCHEME_THEME_V1.provide({
  
    });
  }
}
