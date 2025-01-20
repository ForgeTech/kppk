import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { optional } from 'zod';
/**
 * FgBaseLogService -
 * Meant to be extenden by FgServices to provide common service
 * functionality
 */
@Injectable({
  providedIn: 'root',
})
export class FgBaseService implements OnDestroy {
  /** Holds the classes name taken from the constructor
   * CAUTION: This can vary between envirments depending on possible
   * javascript uglification etc. So don't use if for example
   * this.classname === 'className' comparissions
   */
  public readonly className: string = this.constructor.name;

  /** (Optional) Provide logger service */
  protected $log = inject(NGXLogger);

  constructor() {
    this.$log?.info('SERVICE: ', this.className, 'created!');
  }

  public ngOnDestroy(): void {
    this.$log?.info('SERVICE: ', this.className, 'destroyed!');
  }
}
