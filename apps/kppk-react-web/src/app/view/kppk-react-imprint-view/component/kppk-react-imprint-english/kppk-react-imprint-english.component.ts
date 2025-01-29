import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FgCommonModule } from '@fg-kppk/fg-base';
import { KppkReactBaseComponent } from 'apps/fg-react-demo/src/app/base/xstate-base/kppk-react-base.component';

@Component({
  selector: 'kppk-react-imprint-english',
  standalone: true,
  imports: [ FgCommonModule ],
  templateUrl: './kppk-react-imprint-english.component.html',
  styleUrl: './kppk-react-imprint-english.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactImprintEnglishComponent extends KppkReactBaseComponent {
  constructor() {
    super();
  }
}
