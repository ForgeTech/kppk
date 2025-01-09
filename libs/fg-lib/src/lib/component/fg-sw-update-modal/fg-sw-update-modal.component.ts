import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FgSWUpdateModalTranslationKeys } from './fg-sw-update-modal.translation.keys';
import { FgModalTranslationKeys } from '../fg-modal/fg-modal.keys';
import { FgSWUpdateTranslationKeys } from '../fg-sw-update-button/fg-sw-update.translation.keys';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FgModalComponent } from '../fg-modal/fg-modal.component';
import { FgSwUpdateButtonComponent } from '../fg-sw-update-button/fg-sw-update-button.component';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'fg-sw-update-modal',
  templateUrl: './fg-sw-update-modal.component.html',
  styleUrls: ['./fg-sw-update-modal.component.scss'],
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, FgModalComponent, FgSwUpdateButtonComponent, TranslocoModule],
})
export class FgSwUpdateModalComponent extends FgModalComponent {
  /** CONSTRUCTOR */
  constructor(
    /** Allows the injection of data passed via the modal-service
     * creating the modal-component */
    @Inject(MAT_DIALOG_DATA) public override data: any,
    /** Inject a ref to the displayed modal-window */
    public override modalRef: MatDialogRef<any>,
    /** Provide base-component service */
    public override $component: FgComponentBaseService,
    /** Provide translation-keys for help-content*/
    public $keys: FgSWUpdateModalTranslationKeys,
    /** Translation-Keys for modal */
    public override $modalKeys: FgModalTranslationKeys,
    /** Translation-Keys for modal */
    public $buttonKeys: FgSWUpdateTranslationKeys,
  ) {
    super(modalRef, data, $component, $modalKeys);
  }
}
