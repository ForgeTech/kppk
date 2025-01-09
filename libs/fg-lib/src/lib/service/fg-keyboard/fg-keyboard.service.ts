import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FgGlobalService } from '../../../../modules/fg-global/fg-global.service';
import { interval } from 'rxjs';
import { map, debounce } from 'rxjs/operators';

/** */
@Injectable({ providedIn: 'root' })
export class FgKeyboardService {
  /**
   * Observable returning true if typing started
   */
  public keys$: Subject<KeyboardEvent> = new Subject();
  /**
   * Observable returning true if there is no key_up-event is
   * received after defined delay
   */
  public inputEnded$: Observable<any> = this.keys$.pipe(
    debounce(val => interval(1000)),
    map(val => {
      return val;
    })
  );

  /** CONSTRUCTOR */
  constructor(
    /**
     * Reference to global namespace, lk
     * like window - in browser, or global - in nodejs
     */
    private $global: FgGlobalService
  ) {}

  public keyDown(event: KeyboardEvent): void {
    this.keys$.next(event);
  }
  public keyUp(event: KeyboardEvent): void {}
}
