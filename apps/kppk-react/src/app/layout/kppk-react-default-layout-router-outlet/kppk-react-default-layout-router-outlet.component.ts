import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KppkReactDefaultLayoutComponent } from '../kppk-react-default-layout/kppk-react-default-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kppk-react-default-layout-router-outlet',
  imports: [
    CommonModule,
    RouterModule,
    KppkReactDefaultLayoutComponent
  ],
  templateUrl: './kppk-react-default-layout-router-outlet.component.html',
  styles: [`
    :host {
      display: inline-block;
      min-height: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KppkReactDefaultLayoutRouterOutletComponent  {}