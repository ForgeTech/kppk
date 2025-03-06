import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FG_FORM_CONTAINER_VILLAGE_CONTEXT } from '@kppk/react-lib';
import { FgTranslate } from '@kppk/fg-lib-new';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kppk-react-view-calculation-print-form_container_village',
  imports: [CommonModule],
  template: `
    @let t = translationsS();
    @let data = input_dataS().value;
    <h2>{{ t?.container_village  }}</h2>
    <table class="table">
      <tr>
        <th colspan="2">
          {{ t?.container_village_settings }}
        </th>
      </tr>
      <tr>
        <td>
          {{ t?.energy_usage_power_type }}
        </td>
        <td>
          {{ data.setting.distance.value }}
          <span class="unit">{{ t?.[data.setting.distance.unit] }}</span>
        </td>
        <td>
        {{ t?.distance }}
        </td>
        <td>
          {{ t?.[data.setting.energy_usage_power_type.value] }}
          <span class="unit"></span>
        </td>
      </tr>
    </table>

    <table class="table">
      <tr>
        <th>
          {{ t?.container_village_containers }}
        </th>
        <th class="text-center">
          {{ t?.amount }}
        </th>
        <th class="text-center">
          {{ t?.usage }}
        </th>
      </tr>
      @if(data.container.office.amount.value) {
        <tr>
          <td>
            {{ t?.office_container }}
          </td>
          <td class="text-right">
            {{ data.container.office.amount.value }}
            <span class="unit">{{ t?.[data.container.office.amount.unit] }}</span>
          </td>
          <td class="text-right">
            {{ data.container.office.usage.value }}
            <span class="unit">{{ t?.[data.container.office.usage.unit] }}</span>
          </td>
        </tr>
      }

      @if(data.container.meeting.amount.value) {
        <tr>
          <td>
            {{ t?.meeting_container }}
          </td>
          <td class="text-right">
            {{ data.container.meeting.amount.value }}
            <span class="unit">{{ t?.[data.container.meeting.amount.unit] }}</span>
          </td>
          <td class="text-right">
            {{ data.container.meeting.usage.value }}
            <span class="unit">{{ t?.[data.container.meeting.usage.unit] }}</span>
          </td>
        </tr>
      }

      @if(data.container.sanitary.amount.value) {
        <tr>
          <td>
            {{ t?.sanitary_container }}
          </td>
          <td class="text-right">
            {{ data.container.sanitary.amount.value }}
            <span class="unit">{{ t?.[data.container.sanitary.amount.unit] }}</span>
          </td>
          <td class="text-right">
            {{ data.container.sanitary.usage.value }}
            <span class="unit">{{ t?.[data.container.sanitary.usage.unit] }}</span>
          </td>
        </tr>
      }

      @if(data.container.residency.amount.value) {
        <tr>
          <td>
            {{ t?.residency_container }}
          </td>
          <td class="text-right">
            {{ data.container.residency.amount.value }}
            <span class="unit">{{ t?.[data.container.residency.amount.unit] }}</span>
          </td>
          <td class="text-right">
            {{ data.container.residency.usage.value }}
            <span class="unit">{{ t?.[data.container.residency.usage.unit] }}</span>
          </td>
        </tr>
      }

      @if(data.container.repository.amount.value) {
        <tr>
          <td>
            {{ t?.repository_container }}
          </td>
          <td class="text-right">
            {{ data.container.repository.amount.value }}
            <span class="unit">{{ t?.[data.container.repository.amount.unit] }}</span>
          </td>
          <td class="text-right">
            {{ data.container.repository.usage.value }}
            <span class="unit">{{ t?.[data.container.repository.usage.unit] }}</span>
          </td>
        </tr>
      }

      @if(data.container.first_aid.amount.value) {
        <tr>
          <td>
            {{ t?.first_aid_container }}
          </td>
          <td class="text-right">
            {{ data.container.first_aid.amount.value }}
            <span class="unit">{{ t?.[data.container.first_aid.amount.unit] }}</span>
          </td>
          <td class="text-right">
            {{ data.container.first_aid.usage.value }}
            <span class="unit">{{ t?.[data.container.first_aid.usage.unit] }}</span>
          </td>
        </tr>
      }
    </table>
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KppkReactViewCalculationPrintFormContainerVillageComponent {
  protected $translate = inject(FgTranslate);
  protected translations$ = this.$translate.get_translations$({
    "amount": "calc",
    "austria_common_energy_mix": "calc",
    "austria_green_power_mix": "calc",
    "container_village_containers": "calc",
    "container_village_settings": "calc",
    "container_village_transport_distance": "calc",
    "container_village": "calc",
    "distance": "calc",
    "energy_usage_power_type": "calc",
    "first_aid_container": "calc",
    "km": "units",
    "meeting_container": "calc",
    "month": "units",
    "office_container": "calc",
    "pieces": "units",
    "repository_container": "calc",
    "residency_container": "calc",
    "sanitary_container": "calc",
    "usage": "calc",
  });
  protected translationsS = toSignal(this.translations$, {initialValue: undefined});

  public input_dataS = input.required<FG_FORM_CONTAINER_VILLAGE_CONTEXT>({alias: 'data'});
}
