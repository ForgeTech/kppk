import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import {
  FgEventService,
  FgLayoutDefaultComponent,
  FgLayoutDrawerCloseButtonComponent,
  FgLayoutDrawerComponent,
} from '@kppk/fg-lib-new';
import { MatCardModule } from '@angular/material/card';
import { KppkReactFooterComponent } from './component/kppk-react-footer/kppk-react-footer.component';
import { KppkReactHeaderComponent } from './component/kppk-react-header/kppk-react-header.component';
import { KppkReactNavigationComponent } from './component/kppk-react-navigation/kppk-react-navigation.component';

import { CommonModule, DOCUMENT } from '@angular/common';
import {
  KppkAdminToolbarComponent,
  KppkReactSharedService,
} from '@kppk/react-lib';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { values } from 'lodash-es';

@Component({
  selector: 'kppk-react-default-layout',

  imports: [
    // FgSwUpdateBannerComponent,
    CommonModule,
    FgLayoutDefaultComponent,
    FgLayoutDrawerCloseButtonComponent,
    FgLayoutDrawerComponent,
    KppkAdminToolbarComponent,
    KppkReactFooterComponent,
    KppkReactHeaderComponent,
    KppkReactNavigationComponent,
    MatCardModule,
    PortalModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './kppk-react-default-layout.component.html',
  styleUrl: './kppk-react-default-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class KppkReactDefaultLayoutComponent {
  protected $document = inject(DOCUMENT);
  protected $event = inject(FgEventService);
  protected $shared = inject(KppkReactSharedService);
  protected translationS = toSignal(this.$shared.kppk_react_default_layout_translation$, {initialValue: undefined})

  protected window = this.$document.defaultView;
  protected headerC = viewChild(KppkReactHeaderComponent);
  protected adminC = viewChild(KppkAdminToolbarComponent);
  protected drawerC = viewChild(FgLayoutDrawerComponent);

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: Event) {
    // console.log('>>>>SCROLL_WINDOW_EVENT>>>>>>')
    // console.log(event);
    const offset = this.window?.screenY;
    this.offsetS.set(offset);
  }
  protected offsetS = signal<any | undefined>(undefined);

  public topS = computed( () => {
    let offset = this.offsetS();
    let height = 0;

    height += this.adminC()?.$element_ref.nativeElement.offsetHeight;
    // height += this.headerC()?.$element_ref.nativeElement.offsetHeight;
    const top = height - offset;
    // console.log('>>>>TOP>>>>>>')
    // console.log( top );
    // console.log('>>>>OFFSET>>>>>>')
    // console.log( top );
    return top <= 0 ? 0 : top;
  });
  /** Flags if layout is bigger then medium */
  // public breakPointLayout$: Observable<boolean> = this.$component.$breakpoint.matchedBreakpoints$.pipe(
  //   map( breakpoints => breakpoints.indexOf( 'fx-gt-md' ) !== -1 ),
  //   debounceTime( 250 ),
  //   shareReplay( 1 )
  // );


  // ngAfterViewInit(): void {
  //   this.offsetS.set(0)
  //   this.drawerC()?.$scroll?.subscribe(
  //     values => {
  //       console.log('SCROLL');
  //       console.log(values);
  //     }
  //   )
  // }
  /** Override scrollTo implementation from fg-layout-base to work with
   * angular material sidenavigation-component
   */
  // public scrollTo( drawer: FgLayoutDrawerComponent, options: ViewportScrollPosition ) {
  //   drawer.container.scrollable.scrollTo( options );
  // }

}
