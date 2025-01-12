import { Injectable, ApplicationRef, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { FgBaseService } from '../../base/fg-base.service';
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
  protected $match = inject(MediaMatcher);
  protected $appRef = inject(ApplicationRef);

  protected PREFERED_COLOR_SCHEME$ = new BehaviorSubject(PREFERED_COLOR_SCHEME.noPreference);

  public prefered_color_scheme = this.PREFERED_COLOR_SCHEME$.asObservable();
  public preferedColorScheme: PREFERED_COLOR_SCHEME = PREFERED_COLOR_SCHEME.noPreference;
  /** CONSTRUCTOR */
  constructor() {
    super()
      // Detect initial value for os color-scheme-preference
      this.detectPreferedColorScheme();
      // Setup change detection on prefered color-scheme
      this.$match.matchMedia('(prefers-color-scheme: light)').addEventListener('change', this.detectPreferedColorScheme);
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
