import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTranslocoScope, TranslocoModule } from '@jsverse/transloco';
import { FORM_EXCAVATION_PIT_DATA } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-results-excavation-pit',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './kppk-react-results-excavation-pit.component.html',
  styleUrl: './kppk-react-results-excavation-pit.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('calc')],
})
export class KppkReactResultsExcavationPitComponent {
  protected $translate = inject(FgTranslate);
  protected translation$ = this.$translate.get_translations$({
    "excavation_pit": "calc",
    "excavation": "calc",
    "volumn": "calc",
    "distance": "calc",
    "co2_transport": "calc",
    "excavation_pit_security": "calc",
    "excavation_pit_security_methode": "calc",
    "excavation_pit_security_depth": "calc",
    "excavation_pit_security_linear_meter": "calc",
    "excavation_pit_security_methode_enum.escarpment": "calc",
    "excavation_pit_security_methode_enum.foundation_pile": "calc",
    "excavation_pit_security_methode_enum.jet_blasting": "calc",
    "excavation_pit_security_methode_enum.sheet_pile_wall": "calc",
    "excavation_pit_security_methode_enum.shotcrete": "calc",
    "co2_creation": "calc",
    "m3": "units",
    "m": "units",
    "km": "units",
    "kgCo2": "units",
  })
  protected translationS = toSignal(this.translation$, {initialValue: undefined});
  public form = input.required<FORM_EXCAVATION_PIT_DATA>();
  protected get_excavation_pit_security_methode_translationS = computed( () => {
    const t = this.translationS(); 
    const value = this.form().excavation_pit_security.methode.value;
    let result = '-';
    if(t && value) {
      result = t['excavation_pit_security_methode_enum.'.concat(value) as keyof typeof t];
    }
    return result;
  });
}
