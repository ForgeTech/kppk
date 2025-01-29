import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_CONTAINER_VILLAGE } from '@kppk/react-lib';

@Component({
  selector: 'kppk-react-results-container-village',

  imports: [CommonModule, TranslocoModule],
  templateUrl: './kppk-react-results-container-village.component.html',
  styleUrl: './kppk-react-results-container-village.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsContainerVillageComponent {
  public form = input.required<FORM_CONTAINER_VILLAGE>();
}
