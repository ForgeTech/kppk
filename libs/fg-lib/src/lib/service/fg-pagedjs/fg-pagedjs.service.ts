import { Injectable } from '@angular/core';
import { Previewer } from 'pagedjs';
import { from, Observable, of } from 'rxjs';
import { FgGlobalService } from 'src/app/modules/fg-global/fg-global.service';
/**
 * FgPagedJs -
 * Service
 */
@Injectable({ providedIn: 'root' })
export class FgPagedJs {
  /** Hold Instance of PagedJs Previewer */
  // public previewer: Previewer;
  /** CONSTRUCTOR */
  constructor(public $global: FgGlobalService) {
    // this.previewer = new Previewer();
  }
  /**
   * Methode to render passed dom-content to paged HTML and return
   * result
   */
  getPagedHTML(DOMContent, pathToPrintCss: string[]): Observable<any> {
    let result$: Observable<any> = of(false);
    // if( this.$global.isBrowser ) {
    //   result$ = from( this.previewer.preview( DOMContent, pathToPrintCss, document.body ) );
    //   result$.subscribe( result => {
    //     console.log( 'PAGED_JS' );
    //     console.table( result)
    //   })
    // }
    return result$;
  }
}
