import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { debounceTime, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { FgBreakpointInterface } from './fg-breakpoint.interface';
import { Injectable, inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { FgEventService } from '../fg-event/fg-event.service';
import { FgBreakpointEvent } from './fg-breakpoint.event';
import { FgBaseService } from '../../base/fg-base.service';
import { NGXLogger } from 'ngx-logger';

/**
 * MaterialBreakpointsEnum -
 * Enum Containing entries for all angular
 * google-material default-breakpoints
 */
export enum BreakpointEnum {
  /** Value Initial doesn't represent an actual
   * material breakpoint-but is used as inital state
   * before breakpoints where detected
   */
  'INITIAL',
  'HANDSET',
  'HANDSET_LANDSCAPE',
  'HANDSET_PORTRAIT',
  'LARGE',
  'MEDIUM',
  'SMALL',
  'TABLET',
  'TABLET_PORTRAIT',
  'TABLET_LANSCAPE',
  'WEB',
  'WEB_PORTRAIT',
  'WEB_LANSCAPE',
}

/**
 * FgBreakpointSevice -
 * Service providing media-query functionality,
 * based on angular-material cdk to importing application
 */
@Injectable({ providedIn: 'root' })
export class FgBreakpointService extends FgBaseService {
  protected $breakpointObserver = inject(BreakpointObserver);
  protected $mediaMatcher = inject(MediaMatcher);

  /**
   * Array to contain the Media-Queries to match.
   * Contains all angular-material breakpoints by
   * default
   */
  protected MATERIAL_MEDIA_QUERIES: Array<any> = [
    Breakpoints.Handset,
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait,
    Breakpoints.Large,
    Breakpoints.Medium,
    Breakpoints.Small,
    Breakpoints.Tablet,
    Breakpoints.TabletLandscape,
    Breakpoints.TabletPortrait,
    Breakpoints.Web,
    Breakpoints.WebLandscape,
    Breakpoints.WebPortrait,
  ];
  /** Hold the custom-registered breakpoints */
  protected CUSTOM_BREAKPOINTS: FgBreakpointInterface[] = [];
  /** Observable Subject streamin enum-values
   * of active breakpoints
   */
  protected MATCHED_BREAKPOINTS$: Subject<string[]> = new Subject();
  readonly matchedBreakpoints$: Observable<string[]> = this.MATCHED_BREAKPOINTS$.asObservable().pipe(
    distinctUntilChanged((prev, curr) => (prev ? JSON.stringify(prev) === JSON.stringify(curr) : true)),
    shareReplay(1)
  );
  /** The currently matched breakpoints */
  public matchedBreakpoints: string[] = [];
  /**
   * Return breakpoint-observer result for matching
   * angular-material breakpoints
   */
  protected breakpointObserver$: Observable<BreakpointState> | undefined;
  /** Holds the subscribtion to the breakpoint-observer */
  protected breakpointObserver$$: Subscription | false = false;
  /** CONSTRUCTOR */
  constructor() {
    super()
    this.setBreakpointObserver();
    /** Dispatch breakpoint detected event */
    this.matchedBreakpoints$.subscribe(breakpoints => {
      this.$event.emitEvent(new FgBreakpointEvent(FgBreakpointEvent.DETECTED, this, breakpoints));
    });
  }
  /** Methode used to initialize/reintialize the breakpoint-Observables */
  protected setBreakpointObserver(): void {
    // console.log('SET BREAKPOINT ');
    // Initialize breakpoint-observable for all angular-material
    // default breakpoints
    this.breakpointObserver$ = this.$breakpointObserver.observe(this.MATERIAL_MEDIA_QUERIES);
    // Unsubscribe if subscription was already previously set
    if (this.breakpointObserver$$ !== false) {
      this.breakpointObserver$$.unsubscribe();
    }
    // Listen to breakpoint-observable and translate state into
    // BreakpointEnums
    this.breakpointObserver$$ = this.breakpointObserver$.subscribe(breakpointState => {
      // console.log('BREAKPOINT CHANGE')
      const breakpointEnums: Array<string> = this.getBreakpointEnumsFromBreakpointState(breakpointState);
      this.matchedBreakpoints = breakpointEnums;
      this.MATCHED_BREAKPOINTS$.next(this.matchedBreakpoints);
    });
  }
  /**
   * Methode to return a Breakpoint-Matecher observable for the passed media-query strings
   * @param mediaQueryStrings Either a single or multiple media-query strings
   */
  public getBreakpointObservable(mediaQueryStrings: string | string[]): Observable<BreakpointState> {
    let matchedBreakpoints: Array<string> = [];
    if (mediaQueryStrings.length) {
      matchedBreakpoints = mediaQueryStrings as Array<string>;
    } else {
      matchedBreakpoints.push(mediaQueryStrings as string);
    }
    return this.$breakpointObserver.observe(matchedBreakpoints);
  }
  /** Methode to return array of matched BreakpointEnums */
  protected getBreakpointEnumsFromBreakpointState(breakpointState: BreakpointState): Array<string> {
    // tslint:disable-next-line prefer-const
    const matchedBreakpointEnums: string[] = [];
    const breakpointKeys: string[] = Object.keys(breakpointState.breakpoints);
    for (const breakpointKey of breakpointKeys) {
      // tslint:disable-next-line prefer-const
      // let breakpointKey: string = breakpointKeys[ i ];
      // if breapoint matching state is true set according breakpoint-key
      if (breakpointState.breakpoints[breakpointKey] === true) {
        switch (breakpointKey) {
          case Breakpoints.Handset:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.HANDSET]);
            break;
          case Breakpoints.HandsetLandscape:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.HANDSET_LANDSCAPE]);
            break;
          case Breakpoints.HandsetPortrait:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.HANDSET_PORTRAIT]);
            break;
          case Breakpoints.Large:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.LARGE]);
            break;
          case Breakpoints.Medium:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.MEDIUM]);
            break;
          case Breakpoints.Small:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.SMALL]);
            break;
          case Breakpoints.Tablet:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.TABLET]);
            break;
          case Breakpoints.TabletLandscape:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.TABLET_LANSCAPE]);
            break;
          case Breakpoints.TabletPortrait:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.TABLET_PORTRAIT]);
            break;
          case Breakpoints.Web:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.WEB]);
            break;
          case Breakpoints.WebLandscape:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.WEB_LANSCAPE]);
            break;
          case Breakpoints.WebPortrait:
            matchedBreakpointEnums.push(BreakpointEnum[BreakpointEnum.WEB_PORTRAIT]);
            break;
          default:
            for (const customBreakpoint of this.CUSTOM_BREAKPOINTS) {
              if (customBreakpoint.mediaQuery === breakpointKey) {
                matchedBreakpointEnums.push(customBreakpoint.class);
                break;
              }
            }
            break;
        }
      }
    }
    return matchedBreakpointEnums;
  }
  /**
   * Add a key-value object with the key representing the class-name
   * and the value representing a valid media-query, or an array of this objects
   */
  public addBreakpoint(breakpoint: FgBreakpointInterface | FgBreakpointInterface[]): void {
    if (!Array.isArray(breakpoint)) {
      breakpoint = [breakpoint];
    }
    breakpoint.forEach(entry => {
      if (this.MATERIAL_MEDIA_QUERIES.indexOf(entry.mediaQuery) === -1) {
        this.CUSTOM_BREAKPOINTS.push(entry);
        this.MATERIAL_MEDIA_QUERIES.push(entry.mediaQuery);
      }
    });
    this.setBreakpointObserver();
  }
  /**
   * Remove passed mediaQueries or key from matching
   */
  public removeBreakpoint(breakpoint: FgBreakpointInterface | FgBreakpointInterface[]): void {
    if (!Array.isArray(breakpoint)) {
      breakpoint = [breakpoint];
    }
    breakpoint.forEach(entry => {
      const mediaIndex = this.MATERIAL_MEDIA_QUERIES.indexOf(entry.mediaQuery);
      if (mediaIndex !== -1) {
        this.MATERIAL_MEDIA_QUERIES.splice(mediaIndex, 1);
      }
      const customIndex = this.CUSTOM_BREAKPOINTS.indexOf(entry);
      if (customIndex !== -1) {
        this.MATERIAL_MEDIA_QUERIES.splice(customIndex, 1);
      }
    });
    this.setBreakpointObserver();
  }
  /**
   * Methode to trigger breakpoint-detection
   * TODO: Find out if that can be done and is needed
   */
  // public detectBreakpoints(): void {}
}
