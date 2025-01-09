import { Injectable, Inject, InjectionToken, Optional } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { FgBaseService } from '../../base';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgEventService } from '../fg-event/fg-event.service';
import * as Modernizr from 'modernizr';
import { FgLazyloadService } from '../fg-lazyload/fg-lazyload.service';

const MODERNIZR_PATH = './assets/libs/modernizr/modernizr-custom.min.js';
/**
 * FgModernizrChecksAndPollyfillsInterface -
 * Interface to define set of checks to perform and paths to pollyfills to
 * load in case of failure
 */
export interface FgModernizrChecksAndPollyfillsInterface {
  check: string;
  polyFillPath: string;
}

/**
 * Injection-Token used to provide a custom path to the modernizr library javascript file
 */
export const FG_MODERNIZR_SERVICE_LIBRARY_PATH = new InjectionToken<string>('');
/**
 * Injection-Token used to provide a custom path to the modernizr library javascript file
 */
export const FG_MODERNIZR_SERVICE_CHECKS_AND_POLYFILLS = new InjectionToken<FgModernizrChecksAndPollyfillsInterface[]>('');
/**
 * FgModernizrService -
 * Service for loading 3rdParty feature-detection library modernizr
 */
@Injectable({ providedIn: 'root' })
export class FgModernizrService extends FgBaseService {
  protected _MODERNIZR$: Subject<typeof Modernizr | false> = new Subject();
  /** Observable providing modernizr feature-detection library */
  public readonly modernizr$ = this._MODERNIZR$.asObservable();

  /** CONSTRUCTOR */
  constructor(
    /** Provide global object service */
    protected $global: FgGlobalService,
    /** Provide lazy load service */
    protected $load: FgLazyloadService,
  ) {
    super()
    if (this.$global.isBrowser) {
      this.$load.load<typeof Modernizr>(MODERNIZR_PATH, 'Modernizr').subscribe(modernizr => {
        this._MODERNIZR$.next(modernizr);
      });
    }
  }
}
