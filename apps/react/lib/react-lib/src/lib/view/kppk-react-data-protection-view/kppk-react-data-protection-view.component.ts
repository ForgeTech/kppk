import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FgCommonModule } from '@kppk/fg-lib';
import { KppkReactDefaultLayoutComponent } from '../../layout/kppk-react-default-layout/kppk-react-default-layout.component';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { KppkReactDataProtectionGermanComponent } from './component/kppk-react-data-protection-german/kppk-react-data-protection-german.component';
import { KppkReactDataProtectionEnglishComponent } from './component/kppk-react-data-protection-english/kppk-react-data-protection-english.component';
import { provideTranslocoScope } from '@jsverse/transloco';

@Component({
  selector: 'kppk-react-data-protection-view',
  standalone: true,
  imports: [ 
    FgCommonModule,
    MatCardModule,
    KppkReactDefaultLayoutComponent,
    KppkReactDataProtectionGermanComponent,
    KppkReactDataProtectionEnglishComponent, 
  ],
  templateUrl: './kppk-react-data-protection-view.component.html',
  styleUrl: './kppk-react-data-protection-view.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTranslocoScope('general')
  ]
})
export class KppkReactDataProtectionViewComponent extends KppkReactBaseComponent {
  protected active_language_s = toSignal(this.$component.$translate.langChanges$, { initialValue: this.$component.$translate.getActiveLang() });
  constructor() {
    super();
  }
}
