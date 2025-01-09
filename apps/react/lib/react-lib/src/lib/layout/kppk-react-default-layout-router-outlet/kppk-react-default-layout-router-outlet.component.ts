import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';
import { FgCommonModule } from '@fg-kppk/fg-base';
import { RouterModule } from '@angular/router';
import { KppkReactDefaultLayoutComponent } from '../kppk-react-default-layout/kppk-react-default-layout.component';

@Component({
  selector: 'kppk-react-default-layout-router-outlet',
  standalone: true,
  imports: [
    FgCommonModule,
    RouterModule,
    KppkReactDefaultLayoutComponent
  ],
  templateUrl: './kppk-react-default-layout-router-outlet.component.html',
  styleUrls: ['./kppk-react-default-layout-router-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KppkReactDefaultLayoutRouterOutletComponent extends KppkReactBaseComponent {
  /** CONSTRUCTOR */
  constructor() {
    super();  
  }
}