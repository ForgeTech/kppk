import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FgSWUpdateTranslationKeys } from './fg-sw-update.translation.keys';
import { FgSWUpdateService } from '../../service/fg-sw-update/fg-sw-update.service';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

/**
 * FgSwUpdateComponent -
 */
@Component({
  selector: 'fg-sw-update-button',
  templateUrl: './fg-sw-update-button.component.html',
  styleUrls: ['./fg-sw-update-button.component.scss'],
  standalone: true,
  imports: [MatTooltipModule, MatIconModule, CommonModule, MatButtonModule, TranslocoModule],
  providers: [provideTranslocoScope('fgswu')],
})
export class FgSwUpdateButtonComponent extends FgComponentBaseComponent {
  protected $keys = inject(FgSWUpdateTranslationKeys);
  protected $sw = inject(FgSWUpdateService);

  /** Observable signaling if a sw-update is available */
  public swUpdateAvailable$ = new BehaviorSubject(true) as BehaviorSubject<boolean | 'updating'>;
  /** CONSTRUCTOR */
  constructor() {
   super();
    // Subscribe to an update becoming available
    this.subscribe(
      this.$sw.updateAvailable$.pipe(filter((updateAvailable: boolean) => updateAvailable)),
      (updateAvailable: boolean) => {
        this.swUpdateAvailable$.next(updateAvailable);
      },
    );
  }
  /**
   * Methode to defer installation of available service-worker-update
   * to FgSWUpdateService
   */
  public installUpdate(event: Event): void {
    event.preventDefault();
    this.swUpdateAvailable$.next('updating');
    this.$sw.installUpdate();
  }
}
