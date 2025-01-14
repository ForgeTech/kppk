import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FgCommonModule } from '@kppk/fg-lib-new';


@Component({
  selector: 'kppk-react-imprint-english',
  
  imports: [ FgCommonModule ],
  templateUrl: './kppk-react-imprint-english.component.html',
  styleUrl: './kppk-react-imprint-english.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactImprintEnglishComponent  {
  constructor() {
    super();
  }
}
