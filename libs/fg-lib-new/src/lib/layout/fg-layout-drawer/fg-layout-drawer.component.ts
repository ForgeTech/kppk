import { Component, ChangeDetectionStrategy, inject, signal, viewChild, effect, input, AfterViewInit, computed } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { Portal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { FG_EVENT, FgEventService } from '../../service';
import { BehaviorSubject, filter, map, Subject } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { fg_layout_drawer_event_close_parser, fg_layout_drawer_event_open_parser, FG_LAYOUT_DRAWER_OPEN_OPTIONS, fg_layout_event_scroll_to_parser } from './fg-layout-drawer.type';
import { values } from 'lodash-es';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'fg-layout-drawer, [fg-layout-drawer]',
  imports: [CommonModule, MatSidenavModule, PortalModule],
  templateUrl: './fg-layout-drawer.component.html',
  styleUrls: ['./fg-layout-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerComponent implements AfterViewInit{
  protected $event = inject(FgEventService);

  public fixed_in_viewportS = input<boolean>(true , {alias: 'fixed'});
  public fixed_top_gapS = input<number>(0, {alias: 'top'});
  public fixed_bottom_gapS = input<number>(0, {alias: 'bottom'});
  
  protected nameS = input<string | undefined>(undefined, {alias: 'name'});
  protected drawer_endC = viewChild<MatDrawer>('end');
  protected drawer_startC = viewChild<MatDrawer>('start');
  protected drawer_containerC = viewChild<MatDrawerContainer>('container');
  protected drawer_contentC = viewChild<MatDrawerContent>('content');

  protected drawer_contentS = signal<Portal<any> | undefined>(undefined); 
  protected drawer_activeS = signal<MatDrawer | undefined>( undefined );
  protected has_backdropS = signal(true);

  protected SCROLLABLE$ = new Subject<CdkScrollable>();
  
  protected event_open_navigationS = toSignal<FG_EVENT>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.drawer.event.open' && event.target === this.nameS())
  ), { initialValue: undefined });
  protected open_drawerE = effect( () => {
    const event = this.event_open_navigationS();
    const drawer_container = this.drawer_containerC();
    if( event && drawer_container ) {
      const event_parsed = fg_layout_drawer_event_open_parser.parse( event );
      this.openDrawer(drawer_container, event_parsed.data )
    }
  })

  protected event_close_navigationS = toSignal<FG_EVENT>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.drawer.event.close' && event.target === this.nameS()),
  ), { initialValue: undefined });
  protected close_drawerE = effect( () => {
    const event = this.event_close_navigationS();
    const drawer_container = this.drawer_containerC();
    if( event && drawer_container ) {
      const event_parsed = fg_layout_drawer_event_close_parser.parse( event );
      this.closeDrawer()
    }
  })

  protected event_scroll_toS = toSignal<FG_EVENT>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.event.scroll_to'),
  ), { initialValue: undefined });
  protected scroll_toE = effect( () => {
    const event = this.event_scroll_toS();
    const drawer_container = this.drawer_containerC();
    if( event && drawer_container ) {
      const event_parsed = fg_layout_event_scroll_to_parser.parse(event);
      this.scroll_to( event_parsed.data )
    }
  })

  public scroll_to(options: ScrollToOptions) {
    this.drawer_containerC()?.scrollable.scrollTo(options);
  }

  protected openDrawer(drawer: MatDrawerContainer, options: FG_LAYOUT_DRAWER_OPEN_OPTIONS): void {
    if (drawer?.start && drawer?.end) {
      if (options.from === 'start') {
        this.drawer_activeS.set(drawer.start);
      } else {
        this.drawer_activeS.set(drawer.end);
      }
      const drawerActive = this.drawer_activeS();
      if( drawerActive) {
        drawerActive.mode = options.mode
        this.drawer_contentS.set(options.content);
        if (options.has_backdrop) {
          this.has_backdropS.set(options.has_backdrop);
        } else {
          this.has_backdropS.set(false);
        }
        drawerActive.open();
      }
    }
  }

  protected closeDrawer(): void {
    const drawerActive = this.drawer_activeS();
    if (drawerActive) {
      drawerActive.close();
      this.drawer_contentS.set( undefined );
      // this.drawer_activeS.set( undefined );
    }
  }

  ngAfterViewInit(): void {
    const scroller = this.drawer_containerC()?.scrollable;
    if(scroller) {
      this.SCROLLABLE$.next(scroller)
    }
  }
}
