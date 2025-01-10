import { Component, inject } from '@angular/core';
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
  protected $keys = inject(FgSWUpdateModalTranslationKeys);
  protected $buttonKeys = inject(FgSWUpdateTranslationKeys);
}
