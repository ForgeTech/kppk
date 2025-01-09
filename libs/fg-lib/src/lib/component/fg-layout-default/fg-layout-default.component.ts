import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FgComponentBaseService } from '../../base';
import { FgLayoutBaseComponent } from '../fg-layout-base/fg-layout-base.component';

@Component({
  selector: 'fg-layout-default',
  templateUrl: './fg-layout-default.component.html',
  styleUrls: ['./fg-layout-default.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgLayoutDefaultComponent extends FgLayoutBaseComponent {
  /** CONSTRUCTOR */
  constructor($component: FgComponentBaseService) {
   super();
  }
}
