import { BehaviorSubject } from 'rxjs';
import { Component, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { FgPwaInstallService } from '../../service/fg-pwa-install/fg-pwa-install.service';
import { provideTranslocoScope } from '@jsverse/transloco';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FgCommonModule } from '../../module/fg-common/fg-common.module';
import { MatIconModule } from '@angular/material/icon';

/**
 * FgPwaInstallComponent -
 * Component to allow installation of applications that
 * support progressive web-application features
 */
@Component({
  selector: 'fg-pwa-install',
  templateUrl: './fg-pwa-install.component.html',
  styleUrls: ['./fg-pwa-install.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FgCommonModule, MatTooltipModule, MatButtonModule, MatIconModule],
  providers: [provideTranslocoScope('fgpwai')],
})
export class FgPwaInstallComponent extends FgComponentBaseComponent {
  @Input() forceVisible = false;
  @Input() color = 'primary';
  /** Observable signaling if a pwa install-promt was received and deferred for use with install-component */
  public pwaInstallAvailable$ = new BehaviorSubject<boolean | 'installing'>(false);
  /** CONSTRUCTOR */
  constructor(
    /** Inject component base-service */
    
    /** Inject class containing pwa-install component events */
    protected $pwa: FgPwaInstallService,
  ) {
   super();
    this.subscribe(this.$pwa.pwaDeferredPromtAvailable$, available => {
      this.$component.$log.warn('INSTALL-COMPONENT: BEFORE INSTALL PROMT');
      this.pwaInstallAvailable$.next(available);
    });
    this.subscribe(this.onChanges$, changes => {
      console.log(changes);
      const simpleChanges = changes.data as SimpleChanges;
      if (simpleChanges['forceVisible']) {
        this.pwaInstallAvailable$.next(this.forceVisible);
      }
    });
  }
  /**
   * Methode to defer installation of available service-worker-update
   * to FgPwaInstallService
   */
  public installPWA(event: Event): void {
    event.preventDefault();
    this.pwaInstallAvailable$.next('installing');
    this.$pwa.install();
  }
}
