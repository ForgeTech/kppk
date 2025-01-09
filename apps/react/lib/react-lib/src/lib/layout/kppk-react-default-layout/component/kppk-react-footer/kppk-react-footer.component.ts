import { Component, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FgCommonModule, FgComponentBaseComponent } from '@fg-kppk/fg-base';

/**
 * KppkReactFooterComponent -
 * Footer component for kppk-react-default-layout
 */
@Component({
  selector: '[kppk-react-footer]',
  templateUrl: './kppk-react-footer.component.html',
  styleUrls: ['./kppk-react-footer.component.scss'],
  standalone: true,
  imports: [ FgCommonModule, MatToolbarModule]
})
export class KppkReactFooterComponent extends FgComponentBaseComponent {
  /** Provide current year for copyright statement */
  public current_year = new Date().getFullYear();

  /** CONSTRUCTOR */
  constructor(
  ) {
    super();
  }

}
