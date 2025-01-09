import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import {
  MatSelectChange,
  MatSelectModule,
} from '@angular/material/select';
import { provideTranslocoScope } from '@jsverse/transloco';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';
import { FgEnvironmentService } from '../../service/fg-environment/fg-environment.service';
import { FgLanguageSwitchEvent } from './fg-language-switch.event';
/**
 * FgLanguageSwitchComponent -
 * Component used to allow language-selection
 * from a select-list
 */
@Component({
  selector: 'fg-language-switch',
  templateUrl: './fg-language-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FgCommonModule, MatSelectModule],
  providers: [provideTranslocoScope('fgls')],
})
export class FgLanguageSwitchComponent extends FgComponentBaseComponent {
  protected $env = inject(FgEnvironmentService, { optional: true });

  /** OVERRIDE Pass language-string to be selected */
  @Input() selectedLang = '';
  /**
   *  OVERRIDE Pass array of language-strings to be
   *  available to choose form
   */
  @Input() availableLangs: string[] = [];
  /** Pass the path to the asset folder containing
   * the flag-symbols to display in the component
   */
  @Input() iconUrl = 'assets/i18n/icons/';
  /** Pass the path to the asset folder containing
   * the flag-symbols to display in the component
   */
  @Input() color = 'primary';
  /** CONSTRUCTOR */
  constructor() {
   super();
    // Set  default values from environment if available
    if (this.$env) {
      this.selectedLang = this.$env.i18n.defaultLang;
      this.availableLangs = this.$env.i18n.availableLangs as [];
      // this.iconUrl = this.$env.i18n.assetPath.concat( 'icons' );
    }
  }
  /** Methode handling language selection-change */
  public onSelctionChange(change: MatSelectChange) {
    this.selectedLang = change.value;
    this.emitEvent(new FgLanguageSwitchEvent(FgLanguageSwitchEvent.LANGUAGE_SELECTION, this, this.selectedLang));
  }
}
