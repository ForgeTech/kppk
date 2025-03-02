import { inject, Injectable } from '@angular/core';

import { ReactAdminToolbarService } from './react-admin-toolbar.machine.service';
import { FgMachineActorAbstract } from './../fg-machine-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class ReactAdminToolbarMachineActorServiceExtended
  extends FgMachineActorAbstract<ReturnType<ReactAdminToolbarService['get_machine']>>
{
  protected $machine = inject(ReactAdminToolbarService);
  protected get_machine() {
    return this.$machine.get_machine();
  }

}
