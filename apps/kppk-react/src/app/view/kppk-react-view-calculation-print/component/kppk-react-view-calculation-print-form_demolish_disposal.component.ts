import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FG_FORM_DEMOLISH_DISPOSAL_CONTEXT, UNIT_GENERAL } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-view-calculation-print-form_demolish_disposal',
  imports: [CommonModule],
  template: `
    @let t = translationsS();
    @let data = input_dataS().value;
    <!-- <pre>{{ data | json}}</pre> -->
    <h2>{{ t?.demolish_disposal }}</h2>
    <table class="table">
      <tr>
        <th colspan="2">
          {{ t?.demolish_disposal_settings }}
        </th>
      </tr>
      <tr>
        <td>
          {{ t?.demolish_disposal_distance }}
        </td>
        <td class="text-right">
          {{ data.setting.distance.value }}
          <span class="unit">{{ t?.[data.setting.distance.unit] }}</span>
        </td>
        <td>
        {{ t?.demolish_disposal_usage }}
        </td>
        <td class="text-right">
          {{ data.setting.usage.value }}
          <span class="unit">{{ t?.[data.setting.usage.unit]}}</span>
        </td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <th>
          Material
        </th>
        <th class="text-center">
          Volumen
        </th>
        <th class="text-center">
          Container
        </th>
        <th class="text-center">
          Distance
        </th>
      </tr>
      @if(data.material.concrete.volume.value) {
        <tr>
          <td>
            {{ t?.concrete }}
          </td>
          <td class="text-right">
            {{ data.material.concrete.volume.value }}
            <span class="unit">{{ t?.[data.material.concrete.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.concrete.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.concrete.distance.value }}
            <span class="unit">{{ t?.[data.material.concrete.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.steel.volume.value) {
        <tr>
          <td>
            {{ t?.steel }}
          </td>
          <td class="text-right">
            {{ data.material.steel.volume.value }}
            <span class="unit">{{ t?.[data.material.steel.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.steel.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.steel.distance.value }}
            <span class="unit">{{ t?.[data.material.steel.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.brick.volume.value) {
        <tr>
          <td>
            {{ t?.brick }}
          </td>
          <td class="text-right">
            {{ data.material.brick.volume.value }}
            <span class="unit">{{ t?.[data.material.brick.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.brick.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.brick.distance.value }}
            <span class="unit">{{ t?.[data.material.brick.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.plasterboard.volume.value) {
        <tr>
          <td>
            {{ t?.plasterboard }}
          </td>
          <td class="text-right">
            {{ data.material.plasterboard.volume.value }}
            <span class="unit">{{ t?.[data.material.plasterboard.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.plasterboard.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.plasterboard.distance.value }}
            <span class="unit">{{ t?.[data.material.plasterboard.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.glass.volume.value) {
        <tr>
          <td>
            {{ t?.glass }}
          </td>
          <td class="text-right">
            {{ data.material.glass.volume.value }}
            <span class="unit">{{ t?.[data.material.glass.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.glass.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.glass.distance.value }}
            <span class="unit">{{ t?.[data.material.glass.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.wood.volume.value) {
        <tr>
          <td>
            {{ t?.wood }}
          </td>
          <td class="text-right">
            {{ data.material.wood.volume.value }}
            <span class="unit">{{ t?.[data.material.wood.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.wood.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.wood.distance.value }}
            <span class="unit">{{ t?.[data.material.wood.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.wood_massive.volume.value) {
        <tr>
          <td>
            {{ t?.wood_massive }}
          </td>
          <td class="text-right">
            {{ data.material.wood_massive.volume.value }}
            <span class="unit">{{ t?.[data.material.wood_massive.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.wood_massive.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.wood_massive.distance.value }}
            <span class="unit">{{ t?.[data.material.wood_massive.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.wood_material.volume.value) {
        <tr>
          <td>
            {{ t?.wood_material }}
          </td>
          <td class="text-right">
            {{ data.material.wood_material.volume.value }}
            <span class="unit">{{ t?.[data.material.wood_material.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.wood_material.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.wood_material.distance.value }}
            <span class="unit">{{ t?.[data.material.wood_material.distance.unit]}}</span>
          </td>
        </tr>
      }
      
      @if(data.material.wood_latch.volume.value) {
        <tr>
          <td>
            {{ t?.wood_latch }}
          </td>
          <td class="text-right">
            {{ data.material.wood_latch.volume.value }}
            <span class="unit">{{ t?.[data.material.wood_latch.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.material.wood_latch.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.material.wood_latch.distance.value }}
            <span class="unit">{{ t?.[data.material.wood_latch.distance.unit]}}</span>
          </td>
        </tr>
      }
    </table>

    <table class="table">
      <tr>
        <th>
          Isolation
        </th>
        <th class="text-center">
          Volumen
        </th>
        <th class="text-center">
          Container
        </th>
        <th class="text-center">
          Distance
        </th>
      </tr>

      @if(data.insulation.eps.volume.value) {
        <tr>
          <td>
            {{ t?.eps }}
          </td>
          <td class="text-right">
            {{ data.insulation.eps.volume.value }}
            <span class="unit">{{ t?.[data.insulation.eps.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.insulation.eps.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.insulation.eps.distance.value }}
            <span class="unit">{{ t?.[data.insulation.eps.distance.unit]}}</span>
          </td>
        </tr>
      }

      @if(data.insulation.xps.volume.value) {
        <tr>
          <td>
            {{ t?.xps }}
          </td>
          <td class="text-right">
            {{ data.insulation.xps.volume.value }}
            <span class="unit">{{ t?.[data.insulation.xps.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.insulation.xps.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.insulation.xps.distance.value }}
            <span class="unit">{{ t?.[data.insulation.xps.distance.unit]}}</span>
          </td>
        </tr>
      }

      @if(data.insulation.glass_wool.volume.value) {
        <tr>
          <td>
            {{ t?.glass_wool }}
          </td>
          <td class="text-right">
            {{ data.insulation.glass_wool.volume.value }}
            <span class="unit">{{ t?.[data.insulation.glass_wool.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.insulation.glass_wool.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.insulation.glass_wool.distance.value }}
            <span class="unit">{{ t?.[data.insulation.glass_wool.distance.unit]}}</span>
          </td>
        </tr>
      }

      @if(data.insulation.rock_wool.volume.value) {
        <tr>
          <td>
            {{ t?.rock_wool }}
          </td>
          <td class="text-right">
            {{ data.insulation.rock_wool.volume.value }}
            <span class="unit">{{ t?.[data.insulation.rock_wool.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.insulation.rock_wool.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.insulation.rock_wool.distance.value }}
            <span class="unit">{{ t?.[data.insulation.rock_wool.distance.unit]}}</span>
          </td>
        </tr>
      }

      @if(data.insulation.wood_fibre.volume.value) {
        <tr>
          <td>
            {{ t?.wood_fibre }}
          </td>
          <td class="text-right">
            {{ data.insulation.wood_fibre.volume.value }}
            <span class="unit">{{ t?.[data.insulation.wood_fibre.volume.unit]}}</span>
          </td>
          <td class="text-right">
            {{ t?.[data.insulation.wood_fibre.container.value] }}
            <span class="unit"></span>
          </td>
          <td class="text-right">
            {{ data.insulation.wood_fibre.distance.value }}
            <span class="unit">{{ t?.[data.insulation.wood_fibre.distance.unit]}}</span>
          </td>
        </tr>
      }

    </table>
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormDemolishDisposalComponent {
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    '10_cubic_meter_container': "calc",
    'roll_off_container': "calc",
    "demolish_disposal": "calc",
    "concrete": "calc",
    "concrete_volume": "calc",
    "concrete_transport": "calc",
    "concrete_distance": "calc",
    "steel": "calc",
    "steel_volume": "calc",
    "steel_transport": "calc",
    "steel_distance": "calc",
    "brick": "calc",
    "brick_volume": "calc",
    "brick_transport": "calc",
    "brick_distance": "calc",
    "plasterboard": "calc",
    "plasterboard_volume": "calc",
    "plasterboard_transport": "calc",
    "plasterboard_distance": "calc",
    "glass": "calc",
    "glass_volume": "calc",
    "glass_transport": "calc",
    "glass_distance": "calc",
    "rubble": "calc",
    "rubble_volume": "calc",
    "rubble_transport": "calc",
    "rubble_distance": "calc",
    "eps": "calc",
    "eps_volume": "calc",
    "eps_transport": "calc",
    "eps_distance": "calc",
    "xps": "calc",
    "xps_volume": "calc",
    "xps_transport": "calc",
    "xps_distance": "calc",
    "glass_wool": "calc",
    "glass_wool_volume": "calc",
    "glass_wool_transport": "calc",
    "glass_wool_distance": "calc",
    "rock_wool": "calc",
    "rock_wool_volume": "calc",
    "rock_wool_transport": "calc",
    "rock_wool_distance": "calc",
    "wood_fibre": "calc",
    "wood_fibre_volume": "calc",
    "wood_fibre_transport": "calc",
    "wood_fibre_distance": "calc",
    "wood": "calc",
    "wood_volume": "calc",
    "wood_transport": "calc",
    "wood_distance": "calc",
    "wood_massive": "calc",
    "wood_massive_volume": "calc",
    "wood_massive_transport": "calc",
    "wood_massive_distance": "calc",
    "wood_material": "calc",
    "wood_material_volume": "calc",
    "wood_material_transport": "calc",
    "wood_material_distance": "calc",
    "wood_latch": "calc",
    "wood_latch_volume": "calc",
    "wood_latch_transport": "calc",
    "wood_latch_distance": "calc",
    "demolish_disposal_distance": "calc",
    "demolish_disposal_usage": "calc",
    "demolish_disposal_settings": "calc",
    "material": "calc",
    "insulation": "calc",
    "km": "units",
    "%": "units",
    "m3": "units",

  });
  protected translationsS = toSignal(this.translations$, {initialValue: undefined});
  public input_dataS = input.required<FG_FORM_DEMOLISH_DISPOSAL_CONTEXT>({alias: 'data'});
}
