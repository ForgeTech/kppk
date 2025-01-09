import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, computed, effect, inject, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';
import { FgCommonModule } from '@fg-kppk/fg-base';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'kppk-warn-box-reset',
  standalone: true,
  imports: [ 
    CommonModule,
    TranslocoModule
  ],
  template: `
  <div *transloco="let t;" class="border-l-4 border-yellow-500 bg-yellow-100 p-2 text-yellow-700" role="alert">
    <p class="font-bold">{{ t('calc.caution')}}</p>
    <p>{{ t('calc.caution_resets_following') }}</p>
  </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('calc')
  ]
})
export class KppkWarnBoxResetComponent extends KppkReactBaseComponent {}
