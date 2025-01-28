import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kppk-react-placeholder',
  imports: [CommonModule],
  template: `
  <div class="flex h-full flex-row items-center justify-center border border-solid border-red-800 bg-stone-200">
    <p>PLACEHOLDER</p>
  </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {}
