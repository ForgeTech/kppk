import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FgAllowCookieEvent } from './fg-allow-cookie.event';
import { TranslocoModule, provideTranslocoScope } from '@jsverse/transloco';
import { FgComponentBaseService } from '../../base/fg-component-base.service';
import { FgEvent } from '../../service/fg-event/fg-event.class';
import { FgComponentBaseComponent } from '../../base/fg-component-base.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FgFocusDirective } from '../../directive/fg-focus/fg-focus.directive';
import { MatButtonModule } from '@angular/material/button';

/**
 * FgAllowCookieComponent -
 * View-component used to accept or decline
 * the use of cookies within the application
 */
@Component({
  selector: 'fg-allow-cookie',
  templateUrl: './fg-allow-cookie.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, FgFocusDirective, MatButtonModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('fgac')],
})
export class FgAllowCookieComponent extends FgComponentBaseComponent {
  // public COOKIES_ROUTE = this.COOKIES_ROUTE;
  /** CONSTRUCTOR */
  constructor(
    
    private snackBar: MatSnackBar,
  ) {
   super();
  }
  /** Methode to be called when user rejects use of cookies */
  onReject($event: Event) {
    $event.preventDefault();
    this.emitEvent(new FgEvent(FgAllowCookieEvent.REJECT_COOKIES, this));
    this.snackBar.dismiss();
  }
  /** Methode to be called when user accepts use of cookies */
  onAccept($event: Event) {
    $event.preventDefault();
    this.emitEvent(new FgEvent(FgAllowCookieEvent.ACCEPT_COOKIES, this));
    this.snackBar.dismiss();
  }
}
