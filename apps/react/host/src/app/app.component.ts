import {  ApplicationRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { KppkRegisterIconsService } from '@kppk/react-lib';

@Component({
  imports: [
    RouterModule, 
    // KppkReactLoadingIndicatorComponent
  ],
  selector: 'kppk-react-root',
  template: `
    <!-- <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="react_view_login">ReactViewLogin</a></li>
      <li><a routerLink="react_view_home">ReactViewHome</a></li>
      <li><a routerLink="react_view_calc">ReactViewCalc</a></li>
    </ul> -->
    <router-outlet/>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  protected $icon = inject(KppkRegisterIconsService);
  protected $app = inject(AppService);
  protected $appRef = inject(ApplicationRef);
  
  public title = 'kppk-react';
}
