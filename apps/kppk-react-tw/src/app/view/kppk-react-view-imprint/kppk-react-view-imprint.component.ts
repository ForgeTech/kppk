import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { KppkReactDefaultLayoutComponent } from '../../layout/kppk-react-default-layout/kppk-react-default-layout.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { KppkReactImprintEnglishComponent } from './component/kppk-react-imprint-english/kppk-react-imprint-english.component';
import { KppkReactImprintGermanComponent } from './component/kppk-react-imprint-german/kppk-react-imprint-german.component';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'kppk-react-imprint-view',
  standalone: true,
  imports: [ 
    CommonModule,
    MatCardModule,
    KppkReactDefaultLayoutComponent,
    KppkReactImprintEnglishComponent, 
    KppkReactImprintGermanComponent,
  ],
  templateUrl: './kppk-react-imprint-view.component.html',
  styleUrl: './kppk-react-imprint-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactImprintViewComponent {
  protected $transloco = inject(TranslocoService);
  protected active_languageS = toSignal(this.$transloco.langChanges$, { initialValue: this.$transloco.getActiveLang() });

}
