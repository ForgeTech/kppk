import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { FgLayoutBaseComponent } from '../fg-layout-base/fg-layout-base.component';
import { FgComponentBaseService } from '../../base';
import { FgLayoutDrawerOpenDrawerOptionsInterface } from './fg-layout-drawer-open-drawer-options.interface';
import { BehaviorSubject, combineLatest, filter, map, Observable, Subject } from 'rxjs';
import { Portal, PortalModule } from '@angular/cdk/portal';
import { FgLayoutDrawerEvent } from './fg-layout-drawer.event';
import { FgLayoutBaseEvent } from '../fg-layout-base/fg-layout-base.event';
import { FgEvent } from '../../service/fg-event/fg-event.class';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';

@Component({
  standalone: true,
  imports: [FgCommonModule, MatSidenavModule, PortalModule],
  selector: 'fg-layout-drawer',
  templateUrl: './fg-layout-drawer.component.html',
  styleUrls: ['./fg-layout-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerComponent extends FgLayoutBaseComponent {
  protected ACTIVE_DRAWER: any;
  /** Holds the component to be displayed within the active drawer portal */
  public drawerContent$: Subject<Portal<any> | undefined> = new Subject();
  /** Holds the component to be displayed within the active drawer portal */
  public hasBackdrop$ = new BehaviorSubject(true);
  /** Reference to angular material sidenav-container */
  @ViewChild('container') container: MatDrawerContainer | undefined;
  /** CONSTRUCTOR */
  constructor(public override $component: FgComponentBaseService) {
   super();
    // Get observable for open-navigation event
    const openNavigationEvent$ = this.$component.$event.event$.pipe(
      filter(event => event.signature === FgLayoutDrawerEvent.OPEN_DRAWER),
    );
    // Get observable for available outer-drawer
    const drawer$ = this.afterViewInit$.pipe(map(event => this.container as MatDrawerContainer));
    // Subscribe to open-navigation event when drawer-layouts are available
    this.subscribe(combineLatest([openNavigationEvent$, drawer$]), values => {
      const [event, drawer] = values;
      const options = event.data as FgLayoutDrawerOpenDrawerOptionsInterface;
      this.openDrawer(drawer, options);
    });
    const scrollTo$: Observable<FgEvent> = this.$component.$event.event$.pipe(
      filter(event => event.signature === FgLayoutBaseEvent.SCROLL_TO),
    );
    this.subscribe(scrollTo$, (event: FgEvent) => {
      this.scrollTo(event.data as any);
    });
    // Get observable for close-navigation event
    const closeNavigationEvent$: Observable<FgEvent> = this.$component.$event.event$.pipe(
      filter(event => event.signature === FgLayoutDrawerEvent.CLOSE_DRAWER),
    );
    // Listen to close-event and outerDrawer ready
    this.subscribe(combineLatest([closeNavigationEvent$, drawer$]), values => {
      const [event, drawer] = values;
      const options = event.data as FgLayoutDrawerOpenDrawerOptionsInterface;
      this.closeDrawer(drawer, options);
    });
  }
  /**
   * Override scrollTo implementation from fg-layout-base to work with
   * angular material sidenavigation-component
   */
  public override scrollTo(options: ScrollToOptions) {
    // if ( this.$component.$global.isBrowser ) {
    this.container?.scrollable.scrollTo(options);
    // }
  }
  /**
   * Methode to open the passed drawer with applied options
   * @param drawer The drawer to open
   * @param options The options to apply to the drawer
   */
  protected openDrawer(drawer: MatDrawerContainer, options: FgLayoutDrawerOpenDrawerOptionsInterface): void {
    if (drawer?.start && drawer?.end) {
      let sideDrawer: MatDrawer;
      if (options.position === 'start') {
        this.ACTIVE_DRAWER = sideDrawer = drawer.start;
      } else {
        this.ACTIVE_DRAWER = sideDrawer = drawer.end;
      }
      sideDrawer.mode = options.mode;
      // sideDrawer.backdrop = options.hasBackdrop
      this.drawerContent$.next(options.portalContent);
      if (options.hasBackdrop) {
        this.hasBackdrop$.next(options.hasBackdrop);
      }
      sideDrawer.open();
    }
  }
  /**
   * Closes all passed drawer-layouts and return an observable when
   * @param drawers Array of FgLayoutDrawerComponents to close
   */
  protected closeDrawer(drawer: MatDrawerContainer, options: FgLayoutDrawerOpenDrawerOptionsInterface): void {
    this.drawerContent$.next(options.portalContent);
    if (this.ACTIVE_DRAWER) {
      this.ACTIVE_DRAWER.close();
    }
  }
}
