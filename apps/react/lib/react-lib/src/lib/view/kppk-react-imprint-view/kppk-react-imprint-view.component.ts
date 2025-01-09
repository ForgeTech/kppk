import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FgCommonModule } from '@fg-kppk/fg-base';
import { KppkReactDefaultLayoutComponent } from '../../layout/kppk-react-default-layout/kppk-react-default-layout.component';
import { KppkReactBaseComponent } from '../../base/xstate-base/kppk-react-base.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { KppkReactImprintEnglishComponent } from './component/kppk-react-imprint-english/kppk-react-imprint-english.component';
import { KppkReactImprintGermanComponent } from './component/kppk-react-imprint-german/kppk-react-imprint-german.component';

@Component({
  selector: 'kppk-react-imprint-view',
  standalone: true,
  imports: [ 
    FgCommonModule,
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
export class KppkReactImprintViewComponent extends KppkReactBaseComponent {
  protected active_language_s = toSignal(this.$component.$translate.langChanges$, { initialValue: this.$component.$translate.getActiveLang() });
  constructor() {   
    super()
  }
}
