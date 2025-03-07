import { Injectable } from '@angular/core';
import * as TIMESTRING from 'timestring';
import { FgBaseService } from '../../base/fg-base.service';
/**
 * FgTimeService -
 * Service provides timestring library providing tools for working and transforming
 * timestrings
 *
 * Reference to instance timestring-library
 * from https://www.npmjs.com/package/timestring
 */
@Injectable({
  providedIn: 'root',
})
export class FgTimeStringService extends FgBaseService {
  /** Allows transformation of passed timestring
   * for example transform( '1m', 'ms')
   * returns 60 000 as numeric value
   */
  public transform(
    timestring: string,
    resultUnit: TIMESTRING.ReturnUnit = 'ms'
  ): number {
    return TIMESTRING(timestring, resultUnit);
  }
  /** CONSTRUCTOR */
  constructor() {
    super();
  }
  /** Get new Date-Object for when cookie-expires */
  public getCookieExpirationDate(timestring: string): Date {
    return new Date(Date.now() + this.transform(timestring));
  }
}
