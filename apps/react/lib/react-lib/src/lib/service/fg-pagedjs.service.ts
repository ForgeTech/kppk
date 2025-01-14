import { Injectable, signal } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';
import { Previewer } from 'pagedjs';

@Injectable({
  providedIn: 'root'
})
export class FgPagedjsService extends FgBaseService {
  // https://gitlab.coko.foundation/pagedjs/pagedjs/
  // https://pagedjs.org/documentation/2-getting-started-with-paged.js/#using-paged.js-as-a-polyfill-in-web-browsers
  // https://pagedjs.org/documentation/4-how-paged.js-works/#the-chunker%3A-fragmenting-the-content
  protected paged = new Previewer();
  public print_enabled_s = signal(false);
  //                                                                    ["path/to/css/file.css"]
  public transform = async ( content: HTMLElement, target: HTMLElement, css_path: string[] ) => {
    let flow = await this.paged.preview(content, css_path, target);
    console.log("Rendered", flow.total, "pages.");

  }
}
