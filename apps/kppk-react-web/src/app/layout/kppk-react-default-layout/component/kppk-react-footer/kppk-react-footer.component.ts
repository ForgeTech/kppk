import { Component } from '@angular/core';

/**
 * KppkReactFooterComponent -
 * Footer component for kppk-react-default-layout
 */
@Component({
  selector: 'kppk-react-footer, [kppk-react-footer]',
  template: `
  <div class="flex h-[28px] flex-row items-center justify-center gap-2 px-4 py-1">
    <div class="flex-auto"></div>
    <div class="flex-initial text-xs">
      <a
      href="https://kppk.at/"
      target="_blank"
      >
        <span class="relative top-[1px]">KPPK Ziviltechniker GmbH &copy;{{ current_year }}</span>
      </a>
    </div>
    <a
      href="https://kppk.at/"
      target="_blank"
    >
      <img
        class="relative -top-[2px] h-[20px]"
        alt="Kppk Ziviltechniker GMBH"
        src="./images/kppk/kppk-logo.svg"
      />
    </a>
  </div>
  `,
  styles: [],
  imports: []
})
export class KppkReactFooterComponent {
  public current_year = new Date().getFullYear();
}
