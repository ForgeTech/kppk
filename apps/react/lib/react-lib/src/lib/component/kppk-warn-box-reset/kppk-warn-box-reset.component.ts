import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kppk-warn-box-reset',
  
  imports: [ 
    CommonModule,
  ],
  template: `
  <div class="border-l-4 border-yellow-500 bg-yellow-100 p-2 text-yellow-700" role="alert">
    <p class="font-bold">{{ 'calc.caution' }}</p>
    <p>{{ 'calc.caution_resets_following' }}</p>
  </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkWarnBoxResetComponent  {}
