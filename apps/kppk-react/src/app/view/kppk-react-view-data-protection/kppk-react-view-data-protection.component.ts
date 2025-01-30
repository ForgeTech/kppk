import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { KppkReactDataProtectionGermanComponent } from './component/kppk-react-data-protection-german/kppk-react-data-protection-german.component';
import { KppkReactDataProtectionEnglishComponent } from './component/kppk-react-data-protection-english/kppk-react-data-protection-english.component';
import { provideTranslocoScope, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kppk-react-view-data-protection',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    KppkReactDataProtectionGermanComponent,
    KppkReactDataProtectionEnglishComponent,
  ],
  templateUrl: './kppk-react-view-data-protection.component.html',
  styles: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('general')],
})
export class KppkReactViewDataProtectionComponent {
  protected $transloco = inject(TranslocoService);
  protected active_languageS = toSignal(this.$transloco.langChanges$, {
    initialValue: this.$transloco.getActiveLang(),
  });
}
