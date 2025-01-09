/*
 * FgSumPipe -
 * Pipe to be used for summing up numeric values of
 * an passed array.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fgSum' })
export class FgSumPipe implements PipeTransform {
  transform(items: any[], attr: string = ''): any {
    if (attr) {
      return items.reduce((a, b) => (a += b[attr] ? b[attr] : 0), 0);
    } else {
      return items.reduce((a, b) => (a += b ? b : 0), 0);
    }
  }
}
