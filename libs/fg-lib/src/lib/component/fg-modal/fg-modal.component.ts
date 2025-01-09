import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FgModalTranslationKeys } from './fg-modal.keys';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

/**
 * FgModalComponent - Base component to be extendet
 * by modal-dialogs
 */
@Component({
  selector: 'fg-modal',
  templateUrl: './fg-modal.component.html',
  styleUrls: ['./fg-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
})
export class FgModalComponent extends FgComponentBaseComponent {
  modalRef = inject<MatDialogRef<any>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  override $component = inject(FgComponentBaseService);
  $modalKeys = inject(FgModalTranslationKeys);

  /**
   * The color that should be used for input-labels -
   * it's set to accent color for dark-theme instead
   * of primary for default-theme
   */
  public inputThemeColor: string;
  /** CONSTRUCTOR */
  constructor() {
   super();
    this.inputThemeColor = 'accent';
  }
  /**
   * Methode to be called when the user wants to close the
   * modal-dialog window
   */
  closeModal($event?: Event): void {
    this.modalRef.close();
  }
}
