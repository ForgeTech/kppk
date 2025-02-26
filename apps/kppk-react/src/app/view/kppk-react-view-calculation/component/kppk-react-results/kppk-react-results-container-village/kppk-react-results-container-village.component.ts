import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORM_CONTAINER_VILLAGE } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-results-container-village',
  imports: [CommonModule,],
  templateUrl: './kppk-react-results-container-village.component.html',
  styleUrl: './kppk-react-results-container-village.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppkReactResultsContainerVillageComponent {
    protected $translate = inject(FgTranslate);
    protected translation$ = this.$translate.get_translations$({
      "container_village": "calc",
      "container_co2": "calc",
      "distance_co2": "calc",
      "sum_co2": "calc",
      "kgCo2": "units",
    })
    protected translationS = toSignal(this.translation$, {initialValue: undefined});
  
  public form = input.required<FORM_CONTAINER_VILLAGE>();
}
