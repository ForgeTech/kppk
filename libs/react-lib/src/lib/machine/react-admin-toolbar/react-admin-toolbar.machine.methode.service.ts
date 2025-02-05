import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service';

import { load_admin_data_parser, REACT_ADMIN_TOOLBAR_CONTEXT, REACT_ADMIN_TOOLBAR_INPUT } from './react-admin-toolbar.machine.types';
import { boundMethod } from 'autobind-decorator';
import { fg_error_event, FgBaseService, FgEnvironmentService, FgEventService, FgStorageService } from '@kppk/fg-lib-new';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const ADMIN_TOOLBAR_SETTINGS_STORAGE_KEY = 'react_admin_toolbar_settings';

@Injectable({
  providedIn: 'root',
})
export class ReactAdminToolbarMachineMethodeService extends FgBaseService {
  protected $immer = inject(FgImmutableService);
  protected $http = inject(HttpClient);
  protected $env = inject(FgEnvironmentService);
  protected $storage = inject(FgStorageService);
  protected $event = inject(FgEventService);

  @boundMethod
  public async actor_load_admin_data() {
    const debug_calculation_v1$ = this.load_object({
      file_aufbauten:
        './react/data/august2024/debug_calculation_v1/file_aufbauten.json',
      file_bauteilflaechen:
        './react/data/august2024/debug_calculation_v1/file_bauteilflaechen.json',
      file_oi3: './react/data/august2024/debug_calculation_v1/file_oi3.json',
      file_rose: './react/data/august2024/debug_calculation_v1/file_rose.json',
      form_common:
        './react/data/august2024/debug_calculation_v1/form_common.json',
      form_construction_site:
        './react/data/august2024/debug_calculation_v1/form_construction_site.json',
      form_container_village:
        './react/data/august2024/debug_calculation_v1/form_container_village.json',
      form_demolish_disposal:
        './react/data/august2024/debug_calculation_v1/form_demolish_disposal.json',
      form_excavation_pit:
        './react/data/august2024/debug_calculation_v1/form_excavation_pit.json',
      form_rose: './react/data/august2024/debug_calculation_v1/form_rose.json',
      form_selection:
        './react/data/august2024/debug_calculation_v1/form_selection.json',
    });

    const loaded_data = await firstValueFrom(forkJoin({
      debug_calculation_v1: debug_calculation_v1$
    }));
    const result = load_admin_data_parser.parse(loaded_data);
    return result;
  }

  @boundMethod
  public assign_admin_data({
    context,
    event,
  }: {
      context: REACT_ADMIN_TOOLBAR_CONTEXT;
      event: any;
    }) {
    const result = this.$immer.produce<REACT_ADMIN_TOOLBAR_CONTEXT>(context, draft => {
      const data =  load_admin_data_parser.parse(event.output);
      draft.debug_culculation_v1 = data.debug_calculation_v1;
    });
    return result;
  }

  @boundMethod  
  private load_object(to_load: Record<string, string>) {
    const resources: Record<string, Observable<any>> = {};
    Object.keys(to_load).forEach((key) => {
        resources[key] = this.$http.get(to_load[key]);
    });
    return forkJoin(resources);
  }
}
