import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXCAVATION_PIT_SECURITY_METHODE_ENUM,
  FG_FORM_EXCAVATION_PIT_CONTEXT,
  JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM,
} from '@kppk/react-lib';
import { toSignal } from '@angular/core/rxjs-interop';
import { FgTranslate } from '@kppk/fg-lib-new';

@Component({
  selector: 'kppk-react-view-calculation-print-form_excavation_pit',
  imports: [CommonModule],
  template: `
    @let t = translationsS();
    @let data = input_dataS().value;
    <h2>{{ t?.excavation_pit }}</h2>
    <table class="table">
      <tr>
        <th class="text-lg" colspan="2">
          {{ t?.excavation }}
        </th>
      </tr>
      <tr>
        <th colspan="2">
          {{ t?.excavation_settings }}
        </th>
      </tr>
      <tr>
        <td>
          {{ t?.excavation_volume }}
        </td>
        <td class="text-right">
          {{ data.excavation.volume.value }}
          <span class="unit">{{ t?.[data.excavation.volume.unit] }}</span>
        </td>
        <td>
        {{ t?.excavation_distance }}
        </td>
        <td class="text-right">
          {{ data.excavation.distance.value }}
          <span class="unit">{{ t?.[data.excavation.distance.unit]}}</span>
        </td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <th class="text-lg" colspan="2">
          {{ t?.excavation_pit_security }}
        </th>
      </tr>
      <tr>
        <th colspan="2">
          {{ t?.excavation_pit_security_settings }}
        </th>
      </tr>
      <tr>
        <td>
          {{ t?.excavation_pit_security_distance }}
        </td>
        <td class="text-right">
          {{ data.excavation_pit_security.distance.value }}
          <span class="unit">{{ t?.[data.excavation_pit_security.distance.unit] }}</span>
        </td>
        <td>
        {{ t?.excavation_pit_security_depth }}
        </td>
        <td class="text-right">
          {{ data.excavation_pit_security.depth.value }}
          <span class="unit">{{ t?.[data.excavation_pit_security.depth.unit]}}</span>
        </td>
        <td>
        {{ t?.excavation_pit_security_linear_meter }}
        </td>
        <td class="text-right">
          {{ data.excavation_pit_security.linear_meter.value }}
          <span class="unit">{{ t?.[data.excavation_pit_security.linear_meter.unit]}}</span>
        </td>
      </tr>
      <tr>
        <td>
          {{ t?.excavation_pit_security_methode }}
          </td>
          <td class="text-right">
            {{ get_excavation_pit_security_methode_translation(data.excavation_pit_security.methode.value) }}
            <span class="unit"></span>
          </td>
          <td>
          {{ t?.excavation_pit_building_gap }}
          </td>
          <td class="text-right">
            {{ data.excavation_pit_security.building_gap.value ? t?.value_yes : t?.value_no }}
            <span class="unit"></span>
          </td>
          <td colspan="2"></td>
      </tr>

      @let security_methode = data.excavation_pit_security.methode;
      @if(security_methode.value === security_methode_enum.escarpment) {
        <tr>
          <th>{{ t?.['excavation_pit_security_methode_enum.escarpment'] }}</th>
        </tr>
        <tr>
          <td>{{ t?.escarpment_tilt }}</td>
          <td class="text-right">
            {{ data.escarpment.tilt.value }}
            <span class="unit">{{ t?.[data.escarpment.tilt.unit]}}</span>
          </td>
          <td colspan="4"></td>
        </tr>
      }

      @if(security_methode.value === security_methode_enum.foundation_pile) {
        <tr>
          <th>{{ t?.['excavation_pit_security_methode_enum.foundation_pile'] }}</th>
        </tr>
        <tr>
          <td>{{ t?.foundation_pile_diameter }}</td>
          <td class="text-right">
            {{ data.foundation_pile.diameter.value }}
            <span class="unit">{{ t?.[data.foundation_pile.diameter.unit]}}</span>
          </td>
          <td>{{ t?.foundation_pile_amount }}</td>
          <td class="text-right">
            {{ data.foundation_pile.amount.value }}
            <span class="unit">{{ t?.[data.foundation_pile.amount.unit]}}</span>
          </td>
          <td colspan="2"></td>
        </tr>
      }

      @if(security_methode.value === security_methode_enum.jet_blasting) {
        <tr>
          <th>{{ t?.['excavation_pit_security_methode_enum.jet_blasting'] }}</th>
        </tr>
        <tr>
          <td>{{ t?.jet_blasting_process_amount}}</td>
          <td class="text-right">
            {{ data.jet_blasting_process.amount.value }}
            <span class="unit">{{ t?.[data.jet_blasting_process.amount.unit]}}</span>
          </td>
          <td>{{ t?.jet_blasting_process_diameter}}</td>
          <td class="text-right">
            {{ data.jet_blasting_process.jet_blasting_process_cylinder.diameter.value }}
            <span class="unit">{{ t?.[data.jet_blasting_process.jet_blasting_process_cylinder.diameter.unit]}}</span>
          </td>
          <td>{{ t?.jet_blasting_process_cylinder_shape}}</td>
          <td class="text-right">
            {{ get_jet_blasting_process_type_translation( data.jet_blasting_process.jet_blasting_process_cylinder.shape.value ) }}
            <span class="unit"></span>
          </td>
        </tr>
      }
      
      @if(security_methode.value === security_methode_enum.sheet_pile_wall) {
        <tr>
          <th>{{ t?.['excavation_pit_security_methode_enum.sheet_pile_wall'] }}</th>
        </tr>
        <tr>
          <td>{{ t?.sheet_pile_wall_mass_unit_area }}</td>
          <td class="text-right">
            {{ data.sheet_pile_wall.mass_unit_area.value }}
            <span class="unit">{{ t?.[data.sheet_pile_wall.mass_unit_area.unit]}}</span>
          </td>
          <td colspan="4"></td>
        </tr>
      }

      @if(security_methode.value === security_methode_enum.sheet_pile_wall) {
        <tr>
          <th>{{ t?.['excavation_pit_security_methode_enum.shotcrete'] }}</th>
        </tr>
        <tr>
          <td>{{ t?.shotcrete_thickness }}</td>
          <td class="text-right">
            {{ data.shotcrete.thickness.value }}
            <span class="unit">{{ t?.[data.shotcrete.thickness.unit]}}</span>
          </td>
          <td>{{ t?.shotcrete_escarpment_tilt }}</td>
          <td class="text-right">
            {{ data.shotcrete.tilt.value }}
            <span class="unit">{{ t?.[data.shotcrete.tilt.unit]}}</span>
          </td>
          <td>{{ t?.shotcrete_nail_count }}</td>
          <td class="text-right">
            {{ data.shotcrete.nail_count.value }}
            <span class="unit">{{ t?.[data.shotcrete.nail_count.unit]}}</span>
          </td>
        </tr>
        <tr>
          <td>{{ t?.shotcrete_nail_length }}</td>
          <td class="text-right">
            {{ data.shotcrete.nail_length.value }}
            <span class="unit">{{ t?.[data.shotcrete.nail_length.unit]}}</span>
          </td>
          <td>{{ t?.shotcrete_nail_diameter }}</td>
          <td class="text-right">
            {{ data.shotcrete.nail_diameter.value }}
            <span class="unit">{{ t?.[data.shotcrete.nail_diameter.unit]}}</span>
          </td>
          <td colspan="2"></td>
        </tr>
      }

    </table>
    <!-- <pre>{{ data | json }}</pre> -->
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormExcavationPitComponent {
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "excavation_pit_building_gap": "calc",
    "escarpment_tilt": "calc",
    "escarpment": "calc",
    "excavation_distance": "calc",
    "excavation_pit_security_depth": "calc",
    "excavation_pit_security_distance": "calc",
    "excavation_pit_security_linear_meter": "calc",
    "excavation_pit_security_methode_enum.escarpment": "calc",
    "excavation_pit_security_methode_enum.foundation_pile": "calc",
    "excavation_pit_security_methode_enum.jet_blasting": "calc",
    "excavation_pit_security_methode_enum.sheet_pile_wall": "calc",
    "excavation_pit_security_methode_enum.shotcrete": "calc",
    "excavation_pit_security_methode": "calc",
    "excavation_pit_security_settings": "calc",
    "excavation_pit_security": "calc",
    "excavation_pit": "calc",
    "excavation_settings": "calc",
    "excavation_volume": "calc",
    "excavation": "calc",
    "foundation_pile_amount": "calc",
    "foundation_pile_diameter": "calc",
    "foundation_pile": "calc",
    "jet_blasting_process_amount": "calc",
    "jet_blasting_process_cuboid_length": "calc",
    "jet_blasting_process_cuboid_width": "calc",
    "jet_blasting_process_cuboid": "calc",
    "jet_blasting_process_cylinder_shape_enum.full_circle": "calc",
    "jet_blasting_process_cylinder_shape_enum.half_circle": "calc",
    "jet_blasting_process_cylinder_shape_enum.quater_circle": "calc",
    "jet_blasting_process_cylinder_shape": "calc",
    "jet_blasting_process_cylinder": "calc",
    "jet_blasting_process_diameter": "calc",
    "jet_blasting_process_type_enum.process_type_cuboid": "calc",
    "jet_blasting_process_type_enum.process_type_cylinder": "calc",
    "jet_blasting_process": "calc",
    "sheet_pile_wall_mass_unit_area": "calc",
    "sheet_pile_wall": "calc",
    "shotcrete_escarpment_tilt": "calc",
    "shotcrete_nail_count": "calc",
    "shotcrete_nail_diameter": "calc",
    "shotcrete_nail_length": "calc",
    "shotcrete_thickness": "calc",
    "shotcrete": "calc",
    "km": "units",
    "m3": "units",
    "m": "units",
    "°": "units",
    "kg/m2": "units",
    "mm": "units",
    "pieces": "units",
    "value_no": "general",
    "value_yes": "general",
  });
  protected translationsS = toSignal(this.translations$, {initialValue: undefined});
  protected security_methode_enum = EXCAVATION_PIT_SECURITY_METHODE_ENUM;
  
  public input_dataS = input.required<FG_FORM_EXCAVATION_PIT_CONTEXT>({alias: 'data'});
  
  protected get_excavation_pit_security_methode_translation( methode: EXCAVATION_PIT_SECURITY_METHODE_ENUM ) {
    const trans = this.translationsS();
    const result = trans?.['excavation_pit_security_methode_enum.' + methode as keyof typeof trans] ?? 'missing_translation';
    return result;
  }

  protected get_jet_blasting_process_type_translation( jet_blasting_cylinder_shape: JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM ) {
    const trans = this.translationsS();
    const result = trans?.['jet_blasting_process_cylinder_shape_enum.' + jet_blasting_cylinder_shape as keyof typeof trans] ?? 'missing_translation';
    return result;
  }
}


