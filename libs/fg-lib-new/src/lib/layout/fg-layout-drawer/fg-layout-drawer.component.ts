import { Component, ChangeDetectionStrategy, inject, signal, viewChild, effect } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { FgLayoutDrawerOpenDrawerOptionsInterface } from './fg-layout-drawer-open-drawer-options.interface';
import { Portal, PortalModule } from '@angular/cdk/portal';
import { FgLayoutDrawerEvent } from './fg-layout-drawer.event';
import { CommonModule } from '@angular/common';
import { FgEvent, FgEventService } from '../../service';
import { filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fg-layout-drawer, [fg-layout-drawer]',
  imports: [CommonModule, MatSidenavModule, PortalModule],
  templateUrl: './fg-layout-drawer.component.html',
  styleUrls: ['./fg-layout-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDrawerComponent {
  // override $component = inject(FgComponentBaseService);
  protected $event = inject(FgEventService);

  protected drawer_endS = viewChild<MatDrawer>('end');
  protected drawer_startS = viewChild<MatDrawer>('start');
  protected drawer_containerS = viewChild<MatDrawerContainer>('container');

  protected drawer_contentS = signal<Portal<any> | undefined>(undefined); 
  protected drawer_activeS = signal<MatDrawer | undefined>( undefined );
  public    has_backdropS = signal(true);
  
  protected event_open_navigationS = toSignal<FgEvent>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.drawer.event.open'),
  ), { initialValue: undefined });
  protected open_drawerE = effect( () => {
    const event = this.event_open_navigationS();
    const drawer_container = this.drawer_containerS();
    if( event && drawer_container ) {
      this.openDrawer(drawer_container, event.data as any )
    }
  })

  protected event_close_navigationS = toSignal<FgEvent>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.drawer.event.close'),
  ), { initialValue: undefined });
  protected close_drawerE = effect( () => {
    const event = this.event_open_navigationS();
    const drawer_container = this.drawer_containerS();
    if( event && drawer_container ) {
      this.openDrawer(drawer_container, event.data as any )
    }
  })

  protected event_scroll_toS = toSignal<FgEvent>(this.$event.event$.pipe(
    filter(event => event.type === 'fg.layout.scroll.event.to'),
  ), { initialValue: undefined });
  protected scroll_toE = effect( () => {
    const event = this.event_scroll_toS();
    const drawer_container = this.drawer_containerS();
    if( event && drawer_container ) {
      this.scrollTo(event.data as any)
    }
  })

  public scrollTo(options: ScrollToOptions) {
    this.drawer_containerS()?.scrollable.scrollTo(options);
  }

  protected openDrawer(drawer: MatDrawerContainer, options: FgLayoutDrawerOpenDrawerOptionsInterface): void {
    if (drawer?.start && drawer?.end) {
      if (options.position === 'start') {
        this.drawer_activeS.set(drawer.start);
      } else {
        this.drawer_activeS.set(drawer.end);
      }
      const drawerActive = this.drawer_activeS();
      if( drawerActive) {
        drawerActive.mode = options.mode
        this.drawer_contentS.set(options.portalContent);
        if (options.hasBackdrop) {
          this.has_backdropS.set(options.hasBackdrop);
        } else {
          this.has_backdropS.set(false);
        }
        drawerActive.open();
      }
    }
  }

  protected closeDrawer(drawer: MatDrawerContainer, options: FgLayoutDrawerOpenDrawerOptionsInterface): void {
    const drawerActive = this.drawer_activeS();
    if (drawerActive) {
      drawerActive.close();
      this.drawer_contentS.set( undefined );
      this.drawer_activeS.set( undefined );
    }
  }
}
