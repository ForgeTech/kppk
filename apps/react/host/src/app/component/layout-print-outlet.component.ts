import { NgClass } from '@angular/common';
import {  Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, NgClass],
  selector: 'kppk-react-layout-print-outlet',
  template: `
    <ul class="remote-menu">
      <li><a routerLink="/">Home</a></li>
      <li><a routerLink="react_view_login">ReactViewLogin</a></li>
      <li><a routerLink="react_view_home">ReactViewHome</a></li>
      <li><a routerLink="react_view_calc">ReactViewCalc</a></li>
    </ul>
    <section 
      class="page-content"
      [ngClass]="{
        'invisible': printOutletActivated_s() === true
      }"
    >
      <router-outlet class="content-outlet"/>
    </section>
    <section class="print-content"
      [ngClass]="{
        'invisible': printOutletActivated_s() === false
      }"
    >
      <router-outlet 
        class="print-outlet" 
        name="print-outlet"
        (activate)="printOutletActivated_s.set(true)"
        (deactivate)="printOutletActivated_s.set(false)"
      />
    </section>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class KppkReactComponent {
  public title = 'react-host';
  protected printOutletActivated_s = signal(false);
}
