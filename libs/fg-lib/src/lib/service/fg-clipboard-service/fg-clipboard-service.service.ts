import { Injectable, inject } from '@angular/core';
import { Subject, Observable, take } from 'rxjs';
import { FgClipboardServiceEvent } from './fg-clipboard-service.event';
import { FgBaseService } from '../../base/fg-base.service';
import { Clipboard, CDK_COPY_TO_CLIPBOARD_CONFIG, CdkCopyToClipboardConfig, PendingCopy } from '@angular/cdk/clipboard';

export interface CopySuccessInterface {
  text: string;
  message?: string;
  type?: string;
}
/**
 * FgClipboardService -
 * Service implement angular material cdk methodes to provide
 * copy-to-clipboard capabilties
 */
@Injectable({ providedIn: 'root' })
export class FgClipboardService extends FgBaseService {
  protected $clipboard = inject(Clipboard);

  public NUMBER_OF_ATTEMPTS = 3;
  /** Streams the result of the items copied to clipboard*/
  public copiedText$ = new Subject<CopySuccessInterface>();
  /** Streams the result of the last copy-attempt*/
  public copySuccess$ = new Subject<boolean>();

  /** CONSTRUCTOR */
  constructor() {
    const clipboardConfig = inject<CdkCopyToClipboardConfig>(CDK_COPY_TO_CLIPBOARD_CONFIG, { optional: true });

    super()
    if (clipboardConfig) {
      this.NUMBER_OF_ATTEMPTS = clipboardConfig.attempts || this.NUMBER_OF_ATTEMPTS;
    }
    /** Dispatch copied event on new item published on copied */
    this.subscribe(this.copiedText$, copied => {
      this.$event.emitEvent(new FgClipboardServiceEvent(FgClipboardServiceEvent.COPIED, this, copied));
    });
    this.subscribe(this.copySuccess$, success => {
      if (success) {
        this.$event.emitEvent(new FgClipboardServiceEvent(FgClipboardServiceEvent.SUCCESS, this, true));
      } else {
        this.$event.emitEvent(new FgClipboardServiceEvent(FgClipboardServiceEvent.ERROR, this, false));
      }
    });
  }
  /** Copies text into clipboard and returns success observable
   * If copy to clipboard fails due to long text tries copyLong methode
   * SEE: https://material.angular.io/cdk/clipboard/overview
   */
  public copy(text: string, message?: string, type?: string): Observable<boolean> {
    const result = this.$clipboard.copy(text);
    if (result) {
      this.copiedText$.next({ text, message, type });
      this.copySuccess$.next(true);
    }
    return this.copySuccess$.asObservable().pipe(take(1));
  }
  // Methode that uses angular material cdk helper for long texts
  // SEE: https://material.angular.io/cdk/clipboard/overview
  protected copyLong(text: string, message?: string): Observable<boolean> {
    const pending = this.$clipboard.beginCopy(text);
    let remainingAttempts = this.NUMBER_OF_ATTEMPTS;
    let result = false;
    const attempt = (message?: string) => {
      result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
        if (result === true) {
          this.copiedText$.next({ text, message });
          this.copySuccess$.next(true);
        } else {
          this.copySuccess$.next(false);
        }
      }
    };
    attempt(message);
    return this.copySuccess$.asObservable().pipe(take(1));
  }
}
