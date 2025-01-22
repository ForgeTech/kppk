import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, effect, inject, viewChild } from '@angular/core';
import { Portal, PortalModule } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import {
  FgEventService,
  // FgLayoutBaseEvent,
  FgLayoutDefaultComponent,
  FgLayoutDrawerComponent,
  // FgLayoutDrawerEvent,
  // FgSwUpdateBannerComponent 
} from '@kppk/fg-lib-new';
import { MatCardModule } from '@angular/material/card';
import { KppkReactFooterComponent } from './component/kppk-react-footer/kppk-react-footer.component';
import { KppkReactHeaderComponent } from './component/kppk-react-header/kppk-react-header.component';
import { KppkReactNavigationComponent } from './component/kppk-react-navigation/kppk-react-navigation.component';
import { KppkReactHeaderOpenNavBtnComponent } from './component/kppk-react-header-open-nav-btn/kppk-react-header-open-nav-btn.component';

import { CommonModule } from '@angular/common';
import { KppkAdminToolbarComponent, KppkReactSharedService } from '@kppk/react-lib';

export interface FgOpenDrawerInterface {
  drawer: 'inner' | 'outer';
  position: 'start' | 'end';
  mode: 'over' | 'push' | 'side';
  portalContent?: Portal < any > ;
  hasBackdrop ?: boolean;
}

@Component({
  selector: 'kppk-react-default-layout',
  
  imports: [
    CommonModule,
    PortalModule,
    FgLayoutDrawerComponent,
    // FgSwUpdateBannerComponent,
    FgLayoutDefaultComponent,
    MatCardModule,
    KppkReactFooterComponent,
    KppkReactHeaderComponent,
    KppkReactNavigationComponent,
    KppkReactHeaderOpenNavBtnComponent,
    KppkAdminToolbarComponent
  ],
  templateUrl: './kppk-react-default-layout.component.html',
  styleUrls: ['./kppk-react-default-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KppkReactDefaultLayoutComponent  {
  protected $event = inject(FgEventService);
  protected $shared = inject(KppkReactSharedService);

  public drawerContent$: Subject <Portal<any>> = new Subject();
  /** Flags if layout is bigger then medium */
  // public breakPointLayout$: Observable<boolean> = this.$component.$breakpoint.matchedBreakpoints$.pipe(
  //   map( breakpoints => breakpoints.indexOf( 'fx-gt-md' ) !== -1 ),
  //   debounceTime( 250 ),
  //   shareReplay( 1 )
  // );
  /** CONSTRUCTOR */
  constructor() {

    // effect( () => {
    //   const event = this.open_navigation_event_s();
    //   const drawer = this.drawer_s();
    //   if( event && drawer) {
    //     const options = event.data as FgOpenDrawerInterface;
    //     this.openDrawer(drawer, options);
    //   }
    // });
     
    // effect( () => {
    //   const options = this.scroll_to_s()?.data;
    //   const drawer = this.drawer_s();
    //   if( options) {
    //     this.scrollTo( drawer, options as ViewportScrollPosition);
    //   }
    // });

    // effect( () => {
    //   const event = this.close_navigation_event_s();
    //   const drawer = this.drawer_s();
    //   if( event && drawer ) {
    //     const options = event.data as FgOpenDrawerInterface;
    //     this.closeDrawer( drawer, options);
    //   }
    // });
  }
  /** Override scrollTo implementation from fg-layout-base to work with
   * angular material sidenavigation-component
   */
  // public scrollTo( drawer: FgLayoutDrawerComponent, options: ViewportScrollPosition ) {
  //   drawer.container.scrollable.scrollTo( options );
  // }
  /**
   * Methode to open the passed drawer with applied options
   * @param drawer The drawer to open
   * @param options The options to apply to the drawer
   */
  // protected openDrawer(
  //   drawer: FgLayoutDrawerComponent,
  //   options: FgOpenDrawerInterface,
  // ): void {
  //   let sideDrawer: MatDrawer | undefined;
  //   if (options.position === 'start') {
  //     sideDrawer = drawer.container.start || undefined;
  //   } else {
  //     sideDrawer = drawer.container.end || undefined;
  //   }
  //   if( sideDrawer ) {
  //     sideDrawer.mode = options.mode;
  //     if( options.portalContent ) {
  //       this.drawerContent$.next(options.portalContent);
  //     }
  //     const result = sideDrawer.open();
  //     console.log('>>>>>>>>>OPEN_DRAWER>>>>>>>>>');
  //     console.log(result);
  //   }
  // }
  /**
   * Closes all passed drawer-layouts and return an observable when
   * @param drawers Array of FgLayoutDrawerComponents to close
   */
  // protected closeDrawer(
  //   drawer: FgLayoutDrawerComponent,
  //   options: FgOpenDrawerInterface
  // ): void {
  //   let sideDrawer: MatDrawer | undefined;
  //   if (options.position === 'start') {
  //     sideDrawer = drawer?.container?.start || undefined;
  //   } else {
  //     sideDrawer = drawer?.container?.end || undefined;
  //   }
  //   if( sideDrawer ) {
  //     sideDrawer.mode = options.mode;
  //     if( options.portalContent ) {
  //       this.drawerContent$.next(options.portalContent);
  //     }
  //     const result = sideDrawer.close();
  //     console.log('>>>>>>>>>CLOSE_DRAWER>>>>>>>>>');
  //     console.log(result)
  //   }
  // }
}
