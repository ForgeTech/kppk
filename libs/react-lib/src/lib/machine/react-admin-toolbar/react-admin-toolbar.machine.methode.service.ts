import { Injectable, inject } from '@angular/core';
import { FgImmutableService } from '../../service';

import { load_admin_data_parser, REACT_ADMIN_TOOLBAR_CONTEXT } from './react-admin-toolbar.machine.types';
import { boundMethod } from 'autobind-decorator';
import { FgBaseService, FgEnvironmentService, FgEventService, FgStorageService } from '@kppk/fg-lib-new';
import { firstValueFrom, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FgMachineUtilsMethodeService } from '../fg-machine-utils';

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
  protected $common = inject(FgMachineUtilsMethodeService);

  @boundMethod
  public async actor_load_admin_data() {
    const debug_calculation_v1$ = this.$common.load_object({
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
      form_heating_system: './react/data/august2024/debug_calculation_v1/form_heating_system.json',
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
    const result = this.$immer.produce(context, draft => {
      const data =  load_admin_data_parser.parse(event.output);
      draft.debug_culculation_v1 = data.debug_calculation_v1;
    });
    return result;
  }

}
