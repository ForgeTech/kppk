import { Component, Input, ViewContainerRef, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * XstateHeaderOpenNavBtnComponent
 */
@Component({
  selector: 'kppk-react-header-open-nav-btn',

  imports: [MatIconModule],
  templateUrl: './kppk-react-header-open-nav-btn.component.html',
  styles: [],
})
export class KppkReactHeaderOpenNavBtnComponent {
  public $viewContainerRef = inject(ViewContainerRef);

  /** Allows to change the direction from which the navigation is opened from */
  @Input() public from: 'start' | 'end' = 'start';
  /** Methode used to dispatch event for opening layout-drawer */
  public triggerNavOpen(event: Event) {
    event.preventDefault();
    if (this.from === 'start') {
      // this.openNavigationStartComponent( RoseNavigationComponent );
    } else {
      // this.openNavigationEndComponent( RoseNavigationComponent );
    }
  }
}
