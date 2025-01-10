import { Directive, ElementRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FgGlobalService } from 'src/app/modules/fg-global/fg-global.service';

/**
 * FgLazyImageLoadingDirective -
 * Directive attaching lazy loading capabilties to html
 * image-tag when browser support is available
 * READ:
 *  https://netbasal.com/lazy-load-images-in-angular-with-two-lines-of-code-beb13cd5a1c4
 *  https://caniuse.com/#feat=loading-lazy-attr
 */
@Directive({ selector: 'img' })
export class FgLazyImageLoadingDirective implements OnChanges {
  protected $global = inject(FgGlobalService);

  /** Allows input of desired value for lazy-attribute */
  @Input() public lazy: boolean = true;
  /** Hold the set value for loading-property */
  protected LAZY_VALUE: 'lazy' | 'eager' = 'lazy';
  /** Hold native image-element */
  protected imageElement: HTMLImageElement;
  // CONSTRUCTOR
  constructor() {
    // Only check for 'loading'-support in browser
    if (this.$global.isBrowser) {
      this.imageElement = nativeElement;
      const supports = 'loading' in HTMLImageElement.prototype;
      if (supports) {
        this.setLoadingAttribute(this.lazy);
      }
    }
  }
  /** Methode sets loading attribute on native image-element */
  protected setLoadingAttribute(lazy: boolean): void {
    this.imageElement.setAttribute('loading', this.lazy ? 'lazy' : 'eager');
  }
  /** Detect changes on input-properties */
  ngOnChanges(changes: SimpleChanges) {
    /** Detects changes to lazy-value to update the loading-property */
    const lazyChange = changes.lazy;
    if (lazyChange) {
      this.setLoadingAttribute(this.lazy);
    }
  }
}
