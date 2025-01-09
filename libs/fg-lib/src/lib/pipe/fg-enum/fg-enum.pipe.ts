import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe for transforming typescript enums for
 * consumation with ngFor-directive
 */
@Pipe({
  name: 'fgEnum',
})
export class FgEnumPipe implements PipeTransform {
  /**
   * Transform typescript enum-objects into an array that can
   * be iterated with ngFor-directive
   * @param value Typescript enum-object
   * @param args (optional) args are not used in this pipe
   */
  transform(value: Object, args?: any): any {
    let keys = Object.keys(value);
    keys = keys.slice(keys.length / 2);
    return keys;
  }
}
