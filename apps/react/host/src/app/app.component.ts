import {  ApplicationRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
// import { KppkReactLoadingIndicatorComponent } from '@kppk/react-lib';
import { filter, take } from 'rxjs';
import { KppkRegisterIconsService } from './service/kppk-register-icons.service';

@Component({
  imports: [
    RouterModule, 
    // KppkReactLoadingIndicatorComponent
  ],
  selector: 'kppk-react-root',
  template: `
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="react_view_login">ReactViewLogin</a></li>
      <li><a routerLink="react_view_home">ReactViewHome</a></li>
      <li><a routerLink="react_view_calc">ReactViewCalc</a></li>
    </ul>
    <router-outlet/>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  protected $icon = inject(KppkRegisterIconsService);
  protected $appRef = inject(ApplicationRef);
  // protected $spinner = inject(FgSpinnerService);
  // protected $auth = inject(ApplicationRef);

  protected appReadyS = toSignal(this.$appRef.isStable.pipe(
    filter( isStable => isStable ? true : false ),
    take( 1 )
  ) , { initialValue: false })
  
  public title = 'kppk-react';
}
