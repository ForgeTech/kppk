import {  Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaceholderComponent } from '@forgetech/fg-lib';

@Component({
  imports: [RouterModule, PlaceholderComponent],
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
  public title = 'kppk-react';
}
