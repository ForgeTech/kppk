import { RouterModule } from "@angular/router";
import { KppkReactViewAuthLayoutComponent } from "../kppk-react-view-auth-layout/kppk-react-view-auth-layout.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  imports: [
    KppkReactViewAuthLayoutComponent,
    RouterModule,
  ],
  selector: 'kppk-react-view-auth-layout-router-outlet',
  template: `
    <kppk-react-view-auth-layout>
      <router-outlet />
    </kppk-react-view-auth-layout>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewAuthLayoutRouterOutletComponent {}
