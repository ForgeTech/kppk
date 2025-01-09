import { Component, Input, ViewContainerRef, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { KppkReactBaseComponent } from 'apps/fg-react-demo/src/app/base/xstate-base/kppk-react-base.component';

/**
 * XstateHeaderOpenNavBtnComponent
 */
@Component({
  selector: 'kppk-react-header-open-nav-btn',
  standalone: true,
  imports: [ MatIconModule ],
  templateUrl: './kppk-react-header-open-nav-btn.component.html',
  styleUrls: ['./kppk-react-header-open-nav-btn.component.scss']
})
export class KppkReactHeaderOpenNavBtnComponent extends KppkReactBaseComponent {
  public $viewContainerRef = inject(ViewContainerRef);

  /** Allows to change the direction from which the navigation is opened from */
  @Input() public from: 'start' | 'end' = 'start';
  /** Methode used to dispatch event for opening layout-drawer */
  public triggerNavOpen( event: Event ) {
    event.preventDefault();
    if ( this.from === 'start' ) {
      // this.openNavigationStartComponent( RoseNavigationComponent );
    } else {
      // this.openNavigationEndComponent( RoseNavigationComponent );
    }
  }
}
