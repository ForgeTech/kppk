import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * FgSanatize -
 * TODO: Methode allows to inject untrusted resources
 * in DOM
 * CAUTION! Be extremly careful to not use this with
 * unsanatized user-data as this opens the door for
 * CrossSiteScripting(XSS) attacks
 */
@Pipe({
  name: 'sanatize',
})
export class FgSanatize implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  /**
   * Transform typescript enum-objects into an array that can
   * be iterated with ngFor-directive
   */
  transform(toSanatize: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(toSanatize);
  }
}
