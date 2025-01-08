import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'kppk-react-root',
  template: `
    <h1>HOME</h1>
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="react_view_login">ReactViewLogin</a></li>
      <li><a routerLink="react_view_home">ReactViewHome</a></li>
      <li><a routerLink="react_view_calc">ReactViewCalc</a></li>
    </ul>
    <router-outlet></router-outlet>`,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'react-host';
}
