import { NgClass } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, NgClass],
  selector: 'fg-layout-print-outlet',
  template: `
  <div
    [ngClass]="{
      'is-printing': is_printingS() === false
    }"
  >
    <section
      class="print-content"
      [ngClass]="{
        invisible: print_outlet_activatedS() === false
      }"
    >
      <router-outlet
        class="print-outlet"
        name="print_outlet"
        (activate)="print_outlet_activatedS.set(true)"
        (deactivate)="print_outlet_activatedS.set(false)"
      />
    </section>
    <section
      class="page-content"
    >
      <router-outlet class="content-outlet" />
    </section>
  </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class FgLayoutPrintOutletComponent {
  protected print_outlet_activatedS = signal(false);
  protected is_printingS = signal(true);
}
