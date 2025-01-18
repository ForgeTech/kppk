import { Component, ChangeDetectionStrategy, inject, signal, input, effect } from '@angular/core';
import { FgPwaInstallService } from '../../service/fg-pwa-install/fg-pwa-install.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NGXLogger } from 'ngx-logger';

/**
 * FgPwaInstallComponent -
 * Component to allow installation of applications that
 * support progressive web-application features
 */
@Component({
  selector: 'fg-pwa-install',
  imports: [
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    NgClass
  ],
  templateUrl: './fg-pwa-install.component.html',
  styleUrls: ['./fg-pwa-install.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FgPwaInstallComponent {
  protected $pwa = inject(FgPwaInstallService);
  protected $log = inject(NGXLogger, { optional: true });

  protected pwa_deferred_promt_availableS = toSignal(this.$pwa.pwa_deferred_promt_available$)
  protected pwa_deferred_promt_availableE = effect( () => {
    const promt = this.pwa_deferred_promt_availableS();
    this.$log?.info( `FgPwaInstallComponent: pwa_deferred_promt_availableS: ${ this.pwa_deferred_promt_availableS() }`);
    this.pwa_install_availableS.set( promt ? true : false );
  });

  public readonly input_visibleS = input<boolean>(false, { alias: 'visible' });
  public readonly input_colorS = input<string | 'primary' | 'accent'>('primary', { alias: 'color' });
  public readonly input_labelS = input<string>('', { alias: 'label' });
  public readonly input_tooltipS = input<string>('', { alias: 'tooltip' });

  public readonly pwa_install_availableS = signal<boolean | 'installing'>(false);
  /**
   * Methode to defer installation of available service-worker-update
   * to FgPwaInstallService
   */
  public install_pwa(event: Event): void {
    event.preventDefault();
    this.pwa_install_availableS.set('installing');
    this.$pwa.install();
  }
}
