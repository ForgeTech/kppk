import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FgCommonModule, FgMaterialModule } from '@kppk/fg-lib';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { KppkReactDefaultLayoutComponent } from 'apps/fg-react-demo/src/app/layout/kppk-react-default-layout/kppk-react-default-layout.component';
import { KppkReactBaseComponent } from 'apps/fg-react-demo/src/app/base/xstate-base/kppk-react-base.component';

@Component({
  selector: 'kppk-react-data-protection-english',
  standalone: true,
  imports: [ FgCommonModule, FgMaterialModule, RouterModule, KppkReactDefaultLayoutComponent ],
  templateUrl: './kppk-react-data-protection-english.component.html',
  styleUrl: './kppk-react-data-protection-english.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactDataProtectionEnglishComponent extends KppkReactBaseComponent {
  protected active_language_s = toSignal(this.$component.$translate.langChanges$, { initialValue: this.$component.$translate.getActiveLang() });
  constructor() {
    super();
  }
}
