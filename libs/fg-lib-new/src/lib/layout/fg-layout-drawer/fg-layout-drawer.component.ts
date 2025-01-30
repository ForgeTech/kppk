import { Component, ChangeDetectionStrategy, inject, signal, viewChild, effect, TemplateRef, input } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { Portal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { FG_EVENT, FgEventService } from '../../service';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { fg_layout_drawer_event_close_parser, fg_layout_drawer_event_open_parser, FG_LAYOUT_DRAWER_OPEN_OPTIONS, fg_layout_event_scroll_to_parser } from './fg-layout-drawer.type';

@Component({
  selector: 'fg-layout-drawer, [fg-layout-drawer]',
  imports: [CommonModule, MatSidenavModule, PortalModule],
  templateUrl: './fg-layout-drawer.component.html',
  styleUrls: ['./fg-layout-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerComponent {
  public readonly nameS = input<string | undefined>(undefined, {alias: 'name'});
  protected $event = inject(FgEventService);

  protected drawer_endS = viewChild<MatDrawer>('end');
  protected drawer_startS = viewChild<MatDrawer>('start');
  protected drawer_containerS = viewChild<MatDrawerContainer>('container');

  protected drawer_contentS = signal<Portal<any> | undefined>(undefined); 
  protected drawer_activeS = signal<MatDrawer | undefined>( undefined );
  public    has_backdropS = signal(true);
  
  protected event_open_navigationS = toSignal<FG_EVENT>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.drawer.event.open' && event.target === this.nameS())
  ), { initialValue: undefined });
  protected open_drawerE = effect( () => {
    const event = this.event_open_navigationS();
    const drawer_container = this.drawer_containerS();
    if( event && drawer_container ) {
      const event_parsed = fg_layout_drawer_event_open_parser.parse( event );
      this.openDrawer(drawer_container, event_parsed.data )
    }
  })

  protected event_close_navigationS = toSignal<FG_EVENT>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.drawer.event.close' && event.target === this.nameS()),
  ), { initialValue: undefined });
  protected close_drawerE = effect( () => {
    const event = this.event_open_navigationS();
    const drawer_container = this.drawer_containerS();
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
    const drawer_container = this.drawer_containerS();
    if( event && drawer_container ) {
      const event_parsed = fg_layout_event_scroll_to_parser.parse(event);
      this.scroll_to( event_parsed.data )
    }
  })

  public scroll_to(options: ScrollToOptions) {
    this.drawer_containerS()?.scrollable.scrollTo(options);
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
      this.drawer_activeS.set( undefined );
    }
  }
}
