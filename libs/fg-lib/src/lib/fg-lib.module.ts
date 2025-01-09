import { CommonModule } from '@angular/common';
import { FgComponentBaseComponent, FgViewBaseComponent } from './base';
import { FgLayoutBaseComponent } from './component/fg-layout-base/fg-layout-base.component';
import { FgLayoutDefaultComponent } from './component/fg-layout-default/fg-layout-default.component';
import { FgLayoutDrawerComponent } from './component/fg-layout-drawer/fg-layout-drawer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
// import { FgFormlyFormComponent } from './component/fg-formly-form/fg-formly-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    FgLayoutDefaultComponent,
    FgLayoutBaseComponent,
    FgLayoutDefaultComponent,
    FgLayoutDrawerComponent,
  ],
  declarations: [
    // COMPONENTS (START)
    FgComponentBaseComponent,
    // FgLayoutBaseComponent,
    // FgLayoutDrawerComponent,
    FgViewBaseComponent,
    // FgFormlyFormComponent,
    // COMPONENTS (END)
  ],
  exports: [
    // COMPONENTS (START)
    FgComponentBaseComponent,
    FgLayoutBaseComponent,
    FgLayoutDefaultComponent,
    FgLayoutDrawerComponent,
    FgViewBaseComponent,
    // COMPONENTS (END)
  ],
})
export class FgLibModule {}
