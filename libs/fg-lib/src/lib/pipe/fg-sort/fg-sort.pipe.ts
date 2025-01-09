/*
 * FgSortByPipe -
 * Pipe to be used for sorting properties on an Object or Array
 * ngFor="let c of oneDimArray | fgSortBy:'asc'"
 * ngFor="let c of arrayOfObjects | fgSortBy:'asc':'propertyName'"
 */
import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({ name: 'fgSortBy' })
export class FgSortByPipe implements PipeTransform {
  transform(value: any[], order: boolean | 'asc' | 'desc', column: string = ''): any[] {
    if (!value || !order) {
      return value;
    } // no array

    if (value.length <= 1) {
      return value;
    } // array with only one item

    if (!column || column === '') {
      if (order === 'asc') {
        return value.sort();
      } else {
        return value.sort().reverse();
      }
    } // sort 1d array

    return orderBy(value, [column], [order]);
  }
}
