import { Injectable, ApplicationRef, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { FgBaseService } from '../../base/fg-base.service';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { boundMethod } from 'autobind-decorator';

/** Enum-Values to reflect the possible values available
 * for 'prefers-color-scheme' css-property */
export enum PREFERED_COLOR_SCHEME {
  noPreference = 'noPreference',
  light = 'light',
  dark = 'dark',
}
/**
 * FgPrefersColorSchemeService -
 * Service to detect a users prefered OS color-sheme -
 * detected using css 'prefers-color-scheme'-property
 */
@Injectable({
  providedIn: 'root',
})
export class FgPrefersColorSchemeService extends FgBaseService {
  protected $global = inject(FgGlobalService);
  protected $match = inject(MediaMatcher);
  protected $appRef = inject(ApplicationRef);

  /** Hold global window-reference when available */
  protected WINDOW?: Window;
  /** Subject to hold the value detected from the prefers-color-scheme media-queries or false, if it cannot be detected */
  protected PREFERED_COLOR_SCHEME$ = new BehaviorSubject(PREFERED_COLOR_SCHEME.noPreference);
  /** GETTER for '$PREFERED_COLOR_SCHEME'-observable */
  get preferedColorScheme$(): Observable<PREFERED_COLOR_SCHEME> {
    return this.PREFERED_COLOR_SCHEME$.asObservable();
  }
  /** Hold the value detected from the prefers-color-scheme media-queries or false, if it cannot be detected */
  public preferedColorScheme: PREFERED_COLOR_SCHEME = PREFERED_COLOR_SCHEME.noPreference;
  /** CONSTRUCTOR */
  constructor() {
    super()
    // In Browser detect initial value and setup change-detection
    if (this.$global.isBrowser) {
      this.WINDOW = this.$global.nativeGlobal();
      // Detect initial value for os color-scheme-preference
      this.detectPreferedColorScheme();
      // Setup change detection on prefered color-scheme
      this.$match.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.detectPreferedColorScheme);
    } else {
      this.PREFERED_COLOR_SCHEME$.next(PREFERED_COLOR_SCHEME.noPreference);
    }
  }
  /**
   * Use methode to detect a users prefered OS color-scheme value.
   * Detection is based on 'prefer-color-scheme' css-property
   */
  @boundMethod
  public detectPreferedColorScheme(event?: Event): PREFERED_COLOR_SCHEME {
    let detected_preference: PREFERED_COLOR_SCHEME = PREFERED_COLOR_SCHEME.noPreference;
    if (this.$match.matchMedia('( prefers-color-scheme: dark )').matches) {
      detected_preference = PREFERED_COLOR_SCHEME.dark;
    } else if (this.$match.matchMedia('( prefers-color-scheme: light )').matches) {
      detected_preference = PREFERED_COLOR_SCHEME.light;
    }
    this.preferedColorScheme = detected_preference;
    this.PREFERED_COLOR_SCHEME$.next(detected_preference);
    return detected_preference;
  }
}
