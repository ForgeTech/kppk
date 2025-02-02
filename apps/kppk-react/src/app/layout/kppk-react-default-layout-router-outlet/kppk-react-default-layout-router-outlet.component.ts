import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { KppkReactDefaultLayoutComponent } from '../kppk-react-default-layout/kppk-react-default-layout.component';

@Component({
  selector: 'kppk-react-default-layout-router-outlet',
  imports: [RouterModule, KppkReactDefaultLayoutComponent],
  template: `
  <kppk-react-default-layout>
    <router-outlet content/>
  </kppk-react-default-layout>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KppkReactDefaultLayoutRouterOutletComponent {}
