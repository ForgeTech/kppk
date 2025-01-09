import { AfterContentInit, AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { FgGlobalService } from '../../fg-global/fg-global.service';
import { FgRendererService } from '../service/fg-renderer/fg-renderer.service';
/**
 * FgFocusDirective -
 * Directive allowing to set and configure html-focus on
 * custom elements
 */
@Directive({
  selector: '[fgFocus]',
  host: { '[attr.fgFocus]': 'fgFocus ? true : false' },
})
export class FgFocusDirective implements AfterViewInit {
  /** Hold focus-state */
  protected FOCUS: boolean = true;
  /** Map directive-attribute input */
  @Input('fgFocus') public set setFocus(value: any) {
    if (typeof value !== 'boolean') {
      this.FOCUS = value == 'true';
      // Parse string received via
    } else {
      this.FOCUS = value;
    }
  }
  /** Map directive-attribute input */
  @Input('fgFocusDelay') public focusDelay: number = 500;
  /** Map directive-attribute input */
  @Input('fgFocusIndex') public focusIndex: number = 0;
  /** CONSTRUCTOR */
  public constructor(protected el: ElementRef, protected $global: FgGlobalService, protected $renderer: FgRendererService) {
    // console.log('FOCUS-DIRECTIVE');
  }
  /** Makes sure element was created */
  public ngAfterViewInit() {
    // Only in browser
    if (this.$global.isBrowser) {
      // console.log( 'SET FOCUS VALUE', this.setFocus );
      // If attribute has fg-focus directive make sure it is focusable by attaching tabIndex-attr to native html-element
      this.$renderer.setAttribute(this.el.nativeElement, 'tabindex', this.focusIndex);
      // If directive input validates to true set focus with given delay
      if (this.setFocus && this.focusIndex !== -1) {
        setTimeout(() => {
          // console.log('SET FOCUS: With delay of ' + this.focusDelay );
          this.el.nativeElement.focus();
        }, this.focusDelay);
      }
    }
  }
}
