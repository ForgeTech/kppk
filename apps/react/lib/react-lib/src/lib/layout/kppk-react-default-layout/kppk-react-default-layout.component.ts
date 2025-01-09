import { ChangeDetectionStrategy, Component, QueryList, ViewChild, ViewEncapsulation, computed } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';
import { Portal, PortalModule } from '@angular/cdk/portal';
import { Subject, Observable, combineLatest, merge } from 'rxjs';
import { ViewportScrollPosition } from '@angular/cdk/scrolling';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';
import { FgCommonModule, FgComponentBaseComponent, FgLayoutBaseEvent, FgLayoutDefaultComponent, FgLayoutDrawerComponent, FgLayoutDrawerEvent, FgSwUpdateBannerComponent } from '@fg-kppk/fg-base';
import { MatCardModule } from '@angular/material/card';
import { FgComponentBaseEvent } from '../../base/xstate-base/fg-component-base.event';
import { KppkReactFooterComponent } from './component/kppk-react-footer/kppk-react-footer.component';
import { KppkReactHeaderComponent } from './component/kppk-react-header/kppk-react-header.component';
import { KppkReactNavigationComponent } from './component/kppk-react-navigation/kppk-react-navigation.component';
import { KppkReactHeaderOpenNavBtnComponent } from './component/kppk-react-header-open-nav-btn/kppk-react-header-open-nav-btn.component';
import { KppkAdminToolbarComponent } from '../../component/kppk-admin-toolbar/kppk-admin-toolbar.component';

export interface FgOpenDrawerInterface {
  drawer: 'inner' | 'outer';
  position: 'start' | 'end';
  mode: 'over' | 'push' | 'side';
  portalContent?: Portal < any > ;
  hasBackdrop ?: boolean;
}

@Component({
  selector: 'kppk-react-default-layout',
  standalone: true,
  imports: [
    FgCommonModule,
    PortalModule,
    FgLayoutDrawerComponent,
    FgSwUpdateBannerComponent,
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
  providers: [FgLayoutBaseEvent]
})
export class KppkReactDefaultLayoutComponent extends KppkReactBaseComponent {
  
  protected show_admin_toolbar_s = computed( () => {
    const main_context = this.state_main_s()?.context;
    const auth_context = this.state_auth_s()?.context;
    return main_context?.environment.development?.enabled || auth_context?.auth_cookie?.profile.admin ? true : false;
  })

  /** The outer drawer-component wrapping header, content and footer of the layout */
  @ViewChild('drawer', {
    static: true
  }) drawer!: FgLayoutDrawerComponent;
  /** Holds the component to be displayed within the active drawer portal */
  public drawerContent$: Subject <Portal<any>> = new Subject();
  /** Flags if layout is bigger then medium */
  // public breakPointLayout$: Observable<boolean> = this.$component.$breakpoint.matchedBreakpoints$.pipe(
  //   map( breakpoints => breakpoints.indexOf( 'fx-gt-md' ) !== -1 ),
  //   debounceTime( 250 ),
  //   shareReplay( 1 )
  // );
  /** CONSTRUCTOR */
  constructor() {
    super();
    // Get observable for open-navigation event
    const openNavigationEvent$ = this.$component.$event.event$.pipe(
      filter(event => event.signature === FgLayoutDrawerEvent.OPEN_DRAWER)
    );
    // Get observable for available outer-drawer
    const drawer$ = this.getChildrenAvailableObservable <FgLayoutDrawerComponent> ('drawer');
    // Subscribe to open-navigation event when drawer-layouts are available
    this.subscribe(
      combineLatest([
        openNavigationEvent$,
        drawer$,
      ]),
      ( value => {
        const options = value[ 0 ].data as FgOpenDrawerInterface;
        this.openDrawer(value[1], options, this);
      })
    );
    const scrollTo$ = this.$component.$event.event$.pipe(
      filter( event => event.signature === FgLayoutBaseEvent.SCROLL_TO )
    );
    this.subscribe( scrollTo$, event => {
      this.scrollTo( event.data as ViewportScrollPosition);
    } );
    // Get observable for close-navigation event
    const closeNavigationEvent$ = this.$component.$event.event$.pipe(
      filter(event => event.signature === FgLayoutDrawerEvent.CLOSE_DRAWER)
    );
    // Listen to close-event and outerDrawer ready
    this.subscribe(
      combineLatest([
        closeNavigationEvent$,
        drawer$
      ]), value  => {
      const options = value[ 0 ].data as FgOpenDrawerInterface;
      this.closeDrawer( value[ 1 ], options, this);
    });
  }
  /** Override scrollTo implementation from fg-layout-base to work with
   * angular material sidenavigation-component
   */
  public scrollTo( options: ViewportScrollPosition ) {
    // this.drawerInner.sideNavContainer.scrollable.scrollTo( options );
    this?.drawer?.container?.scrollable.scrollTo( options );
  }
  /**
   * Methode to open the passed drawer with applied options
   * @param drawer The drawer to open
   * @param options The options to apply to the drawer
   */
  protected openDrawer(
    drawer: FgLayoutDrawerComponent,
    options: FgOpenDrawerInterface,
    dispatcher: FgComponentBaseComponent
  ): void {
    let sideDrawer: MatDrawer | undefined;
    if (options.position === 'start') {
      sideDrawer = drawer?.container?.start || undefined;
    } else {
      sideDrawer = drawer?.container?.end || undefined;
    }
    if( sideDrawer ) {
      sideDrawer.mode = options.mode;
      if( options.portalContent ) {
        this.drawerContent$.next(options.portalContent);
      }
      sideDrawer.open();
    }
  }
  /**
   * Closes all passed drawer-layouts and return an observable when
   * @param drawers Array of FgLayoutDrawerComponents to close
   */
  protected closeDrawer(
    drawer: FgLayoutDrawerComponent,
    options: FgOpenDrawerInterface,
    dispatcher: FgComponentBaseComponent
  ): void {
    let sideDrawer: MatDrawer | undefined;
    if (options.position === 'start') {
      sideDrawer = drawer?.container?.start || undefined;
    } else {
      sideDrawer = drawer?.container?.end || undefined;
    }
    if( sideDrawer ) {
      sideDrawer.mode = options.mode;
      if( options.portalContent ) {
        this.drawerContent$.next(options.portalContent);
      }
      sideDrawer.close();
    }
  }

    /**
   * Returns an observable that returns the View/Content-Child/Children as soon as it has been initialized, and
   * in case it's a dynamic View/Content-Children QueryList also sends an updated array of values when query-results
   * change
   * @param childRefPropertyName The name of the Property used to hold the View/Content-Child/Children instances
   */
    protected getChildrenAvailableObservable<T>( childRefPropertyName: string ): Observable<T> {
      // Fires when the passed property-name exists after one of the events that might
      // initialize a child-element
      const exists$ = merge(
        // The events on which the passed child-instance reference can become initialized
        this.event$.pipe( filter( event => event.signature === FgComponentBaseEvent.ON_INIT ) ),
        this.event$.pipe( filter( event => event.signature === FgComponentBaseEvent.AFTER_VIEW_INIT ) ),
        this.event$.pipe( filter( event => event.signature === FgComponentBaseEvent.AFTER_CONTENT_INIT ) ),
      ).pipe(
        // Only forward when childRef-PropertyName exists on this
        filter( event => {
          return this[ childRefPropertyName as keyof typeof this] ? true : false;
        }),
        map( event => {
          return this[ childRefPropertyName as keyof typeof this];
        }),
      );
      const childExist$ = exists$.pipe(
        // Map the result to the childRef-Property on this
        map( event => {
          const property = this[ childRefPropertyName as keyof typeof this] as QueryList<T>;
          // If property has to Array-Methode it's propably a Querylist that
          // should return it's results as array
          if ( property.toArray ) {
            return property.toArray();
          } else {
            return property;
          }
        }),
        // Complete observable after childRef-Property exists on this
        take(1)
      );
      const childrenExist$: Observable<any> = exists$.pipe(
        // Only forward when existing referance has changes observable-property
        // which means it's probably a view/content-children query-list
        filter( ( childRef: any ) => {
            return childRef.changes ? true : false;
        } ),
        // switch-map to changes-observable on query-list
        switchMap( ( childRef: QueryList<any> ) => {
          return childRef.changes;
        }),
        // only forward if  Querylist contains items
        // filter( ( childRef: any ) => childRef.length ? true : false ),
        // if items exist map the stream to the array of items
        map( querylist => querylist.toArray() )
      );
      return merge(
        childExist$,
        childrenExist$
      );
    }
}
