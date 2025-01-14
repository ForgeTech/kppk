import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FgCommonModule } from '@kppk/fg-lib-new';


@Component({
  selector: 'kppk-react-imprint-german',
  
  imports: [ FgCommonModule ],
  templateUrl: './kppk-react-imprint-german.component.html',
  styleUrl: './kppk-react-imprint-german.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactImprintGermanComponent  {
  constructor() {
    super();
  }
}
