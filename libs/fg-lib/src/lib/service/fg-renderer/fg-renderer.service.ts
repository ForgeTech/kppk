import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';

/**
 * Service provides access to angular-renderer class
 * that allows to intercept and alter rendering calls
 * and provides methodes to access DOM-elements othside
 * angular-template context
 */
@Injectable({
  providedIn: 'root',
})
export class FgRendererService {
  /** Reference to render-instance */
  public renderer: Renderer2;
  /** CONSTRUCTOR */
  constructor(public $global: FgGlobalService, protected _renderer: RendererFactory2) {
    this.renderer = _renderer.createRenderer(null, null);
  }
  /** Add class to html-tag */
  addHTMLClass(classToAdd: string): void {
    if (this.$global.isBrowser) {
      this.renderer.addClass(document.documentElement, classToAdd);
    }
  }
  /** Remove class from html-tag */
  removeHTMLClass(classToRemove: string): void {
    if (this.$global.isBrowser) {
      this.renderer.removeClass(document.documentElement, classToRemove);
    }
  }
  /** Add class to html-tag */
  setHTMLLangTag(lang: string): void {
    if (this.$global.isBrowser) {
      this.renderer.setAttribute(document.documentElement, 'lang', lang.substr(0, 2));
    }
  }
  /** Methode that can be used to attach attributes to html-elements */
  setAttribute(el: ElementRef, attr: string, value: any = ''): void {
    this.renderer.setAttribute(el, attr, value);
  }
}
