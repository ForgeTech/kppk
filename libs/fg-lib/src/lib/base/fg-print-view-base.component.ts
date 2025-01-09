import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FgComponentBaseComponent } from './fg-component-base.component';
import { FgViewBaseService } from './fg-view-base.service';

/**
 * FgPrintViewBaseComponent -
 * Container used to provide view-service but without providing the usual
 * 'full' FgViewBaseComponent features like pushing view on activeView-service
 *  or unload-helpers.
 *
 * Is inherited by full-view-component to provide some printing-related
 * member-variables and features
 *
 */
@Component({
  selector: 'fg-print-view',
  templateUrl: './fg-view-base.component.html',
  styleUrls: ['./fg-view-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FgPrintViewBaseComponent extends FgComponentBaseComponent {
  /** Property to check for available print-view, used in compinaton
   * with fg-print-service to make print-target url for view available
   * to the service. */
  public printViewUrl: false | string = false;
  public printDisabled = false;
  public printDisabledMessage: false | string = false;

  protected $view = inject( FgViewBaseService );
  /** CONSTRUCTOR */
  constructor() {
    super();
  }
}
