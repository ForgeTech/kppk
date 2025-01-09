import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable, of, iif } from 'rxjs';
import { map, bufferCount, switchMap, delay, startWith } from 'rxjs/operators';
import { FgSWUpdateBannerTranslationKeys } from './fg-sw-update-banner.translation.keys';
import { FgSwUpdateModalComponent } from '../fg-sw-update-modal/fg-sw-update-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FgSWUpdateService } from '../../service/fg-sw-update/fg-sw-update.service';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { FgSwUpdateButtonComponent } from '../fg-sw-update-button/fg-sw-update-button.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * FgSwUpdateBannerComponent -
 * Component used to signal an available service-worker update to the user
 */
@Component({
  selector: 'fg-sw-update-banner',
  templateUrl: './fg-sw-update-banner.component.html',
  styleUrls: ['./fg-sw-update-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FgSwUpdateButtonComponent,
    FgSwUpdateModalComponent,
    CommonModule,
    MatTooltipModule,
    MatToolbarModule,
    TranslocoModule,
  ],
  providers: [provideTranslocoScope('fgswu')],
})
export class FgSwUpdateBannerComponent extends FgComponentBaseComponent {
  protected $keys = inject(FgSWUpdateBannerTranslationKeys);
  protected $dialog = inject(MatDialog);
  protected $sw = inject(FgSWUpdateService);

  /**
   * If set to true, instead of activating the update directly an
   * modal window containing conformation-dialog is displayed
   */
  @Input() confirm = false;
  /**
   * If set to true, instead of activating the update directly an
   * modal window containing conformation-dialog is displayed
   */
  @Input() options: MatDialogConfig = {
    height: '90%',
    width: '100vw',
    maxWidth: '800px',
    maxHeight: '600px',
  };
  /**
   * Show should return 'true' when update becomes available immediatly but return a
   * delayed false - the delay should allow the fade-out animation to finish before hiding
   * the banner
   */
  public show$: Observable<boolean> = this.$sw.updateAvailable$.pipe(
    switchMap(value => iif(() => value, of(true), of(false).pipe(delay(this.$sw.delayReload)))),
    startWith(false),
  );

  /**
   * Fade-In effect should only be activated when update wasn't available
   * first, but became available afterwards - so if update is available from
   * the beginning - like when switching fews - banner is visible without showing
   * fade-in effect
   */
  public fadeIn$: Observable<boolean> = this.$sw.updateAvailable$.pipe(
    // distinct(),
    bufferCount(2, 1),
    map(values => {
      return values[0] === false && values[1] === true;
    }),
  );
  /** Fade-out should always trigger when update-becomes unavailable */
  public fadeOut$: Observable<boolean> = this.$sw.updateAvailable$.pipe(
    // distinct(),
    bufferCount(2, 1),
    map(values => {
      return values[0] === true && values[1] === false;
    }),
  );
  /** Allows opening a confirmation-modal to confirm update activation */
  public openModal(event: Event) {
    this.$dialog.open(FgSwUpdateModalComponent, this.options);
  }
}
