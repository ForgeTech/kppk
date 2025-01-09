import { Injectable, Optional } from '@angular/core';
import {
  addDays,
  addHours,
  addYears,
  addWeeks,
  endOfWeek,
  format,
  formatDistanceToNow,
  getISOWeek,
  getYear,
  isAfter,
  isBefore,
  isWithinInterval,
  parseISO,
  setDay,
  setISOWeek,
  startOfWeek,
  subYears,
  subDays,
} from 'date-fns';
import { NGXLogger } from 'ngx-logger';
import { FgBaseService } from '../../base/fg-base.service';
import { FgEventService } from '../fg-event/fg-event.service';

/**
 * FgDateTimeService -
 * Service provides functionallity for working with dates based on
 * date-fns
 *
 * CAUTION! This service should usually be copied to the project using it
 * to allow customization of provided date-fns funtionality
 */
@Injectable({
  providedIn: 'root',
})
export class FgDateTimeService extends FgBaseService {
  /** Should hold the available date-fns locals */
  protected _dateFnsLocals: any = {};
  /** Setter for available date-fns locals in form like
   * { 'en-gb': enGB, 'de-at': de } */
  public set dateFnsLocals(locals: any) {
    this._dateFnsLocals = locals;
  }
  public get dateFnsLocals(): any {
    // console.log( 'GET LOCALS' );
    // console.log( this._dateFnsLocals );
    return this._dateFnsLocals;
  }
  /** Should hold the _default-options for date-fns*/
  protected _defaultOptions: any = {};
  /** Setter for dateFns default-options, for example like
   * { 'locale': enGB, 'weekStartsOn': 0 } */
  public set defaultOptions(defaultOptions: any) {
    this._defaultOptions = defaultOptions;
  }
  /** Getter for dateFns default-options, for example like
   * { 'locale': enGB, 'weekStartsOn': 0 } */
  public get defaultOptions(): any {
    const defaultOptionWithLocale = this._defaultOptions;
    const locale = this.dateFnsLocals[defaultOptionWithLocale.locale];
    if (locale && defaultOptionWithLocale.locale) {
      defaultOptionWithLocale.locale = this.dateFnsLocals[defaultOptionWithLocale.locale];
    }
    // console.log( 'GET OPTIONS' );
    // console.log( defaultOptionWithLocale );
    return defaultOptionWithLocale;
  }
  // Provide imported date-fns functions
  // and wrap those with an option-object
  // into a function merging passed option
  // with locally defined default-options
  // that for example define the currently
  // used locale and weekStartsOn-day
  // public dateFns = {
  public addDays = addDays;
  public addHours = addHours;
  public addWeeks = addWeeks;
  public addYears = addYears;
  public subYears = subYears;
  public getISOWeek = getISOWeek;
  public getYear = getYear;
  public isAfter = isAfter;
  public isBefore = isBefore;
  public isWithinInterval = isWithinInterval;
  public setISOWeek = setISOWeek;
  // endOfWeek(date, [options])
  public endOfWeek(date: Date, options: any = {}): Date {
    return endOfWeek(date, this.mergeWithDefaultOptions(options));
  }
  public format(date: Date, formatStr: string, options: any = {}): string {
    return format(date, formatStr, this.mergeWithDefaultOptions(options));
  }
  // formatDistanceToNow(date, [options])
  public formatDistanceToNow(date: number | Date, options: any = {}): string {
    return formatDistanceToNow(date, this.mergeWithDefaultOptions(options));
  }
  // parseISO(argument, [options])
  public parseISO(dateString: string, options: any = {}): Date {
    return parseISO(dateString, this.mergeWithDefaultOptions(options));
  }
  // setDay(date, day, [options])
  public setDay(date: Date, day: number, options: any = {}): Date {
    return setDay(date, day, this.mergeWithDefaultOptions(options));
  }
  // startOfWeek(date, [options])
  public startOfWeek(date: Date, options: any = {}): Date {
    return startOfWeek(date, this.mergeWithDefaultOptions(options));
  }
  public offsetDays(date: Date, offset: number) {
    if (offset && offset < 0) {
      date = subDays(date, Math.abs(offset));
    } else if (offset && offset > 0) {
      date = addDays(date, Math.abs(offset));
    }
    return date;
  }
  /** Merge passed options with globally set default-options */
  protected mergeWithDefaultOptions(options: any): any {
    if (this.defaultOptions && options) {
      options = Object.assign(this.defaultOptions, options);
    }
    return options;
  }
  /** CONSTRUCTOR */
  constructor() {
    super()
  }
}
