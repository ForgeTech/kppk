import {
  FG_FORM_CONTAINER_VILLAGE_CONTEXT,
  REACT_INIT_LOAD_FROM_REMOTE_DATA,
} from '../../types';
import {
  container_village_energy_result_item,
  CONTAINER_VILLAGE_ENERGY_RESULT_ITEM,
  CONTAINER_VILLAGE_ENERGY_WEEK_CATEGORY_VALUES,
  CONTAINER_VILLAGE_FORM_ENERGY_VALUE,
  CONTAINER_VILLAGE_RESULT,
  container_village_result_parser,
} from '../../types/kppk-react-container-village.types';
import { material_co2_equ_item_parser } from '../../types/kppk-react-material.types';
import {
  add_number_units,
  UNIT_GCO2_KM,
  unit_gramco2_kilometer_parser,
  UNIT_KGCO2,
  UNIT_KGCO2_KWH,
  unit_kilogram_co2_parser,
  unit_kilogramco2_kilowatthour_parser,
  unit_kilowatthours_month_parser,
  unit_kilowatthours_parser,
  unit_kilowatthours_week_parser,
  UNIT_KM,
  UNIT_KWH,
  UNIT_KWH_MONTH,
  UNIT_KWH_WEEK,
  UNIT_MONTH,
  unit_number_parser,
  UNIT_PIECES,
  unit_pieces_parser,
  unit_string_parser,
} from '../../types/kppk-react-unit.types';

export const calculate_energy_week = (
  amount: UNIT_PIECES,
  energy_week: UNIT_KWH_WEEK
): UNIT_KWH_WEEK => {
  const value = amount.value * energy_week.value;
  return unit_kilowatthours_week_parser.parse({ value });
};

export const calculate_energy_month = (
  energy_week: UNIT_KWH_WEEK
): UNIT_KWH_MONTH => {
  const value = energy_week.value * 4;
  return unit_kilowatthours_month_parser.parse({ value });
};

export const calculate_energy = (
  usage: UNIT_MONTH,
  energy_month: UNIT_KWH_MONTH
): UNIT_KWH => {
  const value = usage.value * energy_month.value;
  return unit_kilowatthours_parser.parse({ value });
};

export const calculate_energy_co2 = (
  energy: UNIT_KWH,
  co2_equ: UNIT_KGCO2_KWH
): UNIT_KGCO2 => {
  const value = energy.value * co2_equ.value;
  return unit_kilogram_co2_parser.parse({ value });
};

export const calculate_container_energy_results = (
  container_values: CONTAINER_VILLAGE_FORM_ENERGY_VALUE,
  container_type: CONTAINER_VILLAGE_ENERGY_WEEK_CATEGORY_VALUES,
  co2_equ: UNIT_KGCO2_KWH
): CONTAINER_VILLAGE_ENERGY_RESULT_ITEM[] => {
  const result = Object.keys(container_type).map((key) => {
    const energy_week = calculate_energy_week(
      container_values.amount,
      container_type[key as keyof typeof container_type]
    );
    const energy_month = calculate_energy_month(energy_week);
    const energy = calculate_energy(container_values.usage, energy_month);
    const co2 = calculate_energy_co2(energy, co2_equ);
    const inner_result = container_village_energy_result_item.parse({
      key: unit_string_parser.parse({ key }),
      energy,
      co2,
    });
    return inner_result;
  });
  return result;
};

export const calculate_container_energy_sum = (
  container_items: CONTAINER_VILLAGE_ENERGY_RESULT_ITEM[]
): UNIT_KWH => {
  const value = container_items.reduce((sum, item) => {
    return (sum += item.energy.value);
  }, 0);
  return unit_kilowatthours_parser.parse({ value });
};

export const calculate_container_co2_sum = (
  container_items: CONTAINER_VILLAGE_ENERGY_RESULT_ITEM[]
): UNIT_KGCO2 => {
  const value = container_items.reduce((sum, item) => {
    return (sum += item.co2.value);
  }, 0);
  return unit_kilogram_co2_parser.parse({ value });
};

export const calculate_distance_co2 = (
  distance: UNIT_KM,
  amount: UNIT_PIECES,
  co2_equ: UNIT_GCO2_KM
): UNIT_KGCO2 => {
  const distance_sum_one_way = distance.value * amount.value;
  const distance_sum_two_ways = distance_sum_one_way * 2;
  const gram_co2 = co2_equ.value * distance_sum_two_ways;
  const kg_co2 = gram_co2 / 1000;
  return unit_kilogram_co2_parser.parse({ value: kg_co2 });
};

export const calculate_container_village_results = (
  form_container_village: FG_FORM_CONTAINER_VILLAGE_CONTEXT,
  data: REACT_INIT_LOAD_FROM_REMOTE_DATA
): CONTAINER_VILLAGE_RESULT => {
  const result = container_village_result_parser.parse({});
  const container_count = unit_pieces_parser.parse({});
  const energy_type = material_co2_equ_item_parser.parse(
    data.material_co2_equ.find((item) => {
      return (
        item.material.value ===
        form_container_village.value.setting.energy_usage_power_type.value
      );
    })
  );
  const energy_type_co2 = unit_kilogramco2_kilowatthour_parser.parse(
    energy_type.co2_equ
  );

  // Calculate energy co2
  const container_results = Object.keys(
    form_container_village.value.container
  ).forEach((key) => {
    const container_data =
      form_container_village.value.container[
        key as keyof typeof form_container_village.value.container
      ];
    const container_type =
      data.container_village[key as keyof typeof data.container_village];
    const container_usage_results = calculate_container_energy_results(
      container_data,
      container_type,
      energy_type_co2
    );
    const container_energy_sum = calculate_container_energy_sum(
      container_usage_results
    );
    const container_co2_sum = calculate_container_co2_sum(
      container_usage_results
    );
    // add container co2
    add_number_units(result.container_co2, container_co2_sum);
    // count number of containers for calculation of transport co2
    add_number_units(container_count, container_data.amount);
  });

  // Calculate energy co2
  const distance_co2_equ = unit_gramco2_kilometer_parser.parse(
    data.truck.find((item) => {
      return item.category.includes('common');
    })?.co2_consumption
  );
  result.distance_co2 = calculate_distance_co2(
    form_container_village.value.setting.distance,
    container_count,
    distance_co2_equ
  );

  // Calculate co2 sum
  add_number_units(result.sum_co2, result.distance_co2);
  add_number_units(result.sum_co2, result.container_co2);

  return container_village_result_parser.parse(result);
};
