import { FG_FORM_CONSTRUCTION_SITE_CONTEXT } from "../../types/kppk-react-calculation.types";
import { RESULT_CONSTRUCTION_SITE, result_construction_site_parser } from "../../types/kppk-react-construction-site.types";
import { add_number_units, UNIT_GCO2_KM, UNIT_KGCO2, UNIT_KGCO2_KWH, UNIT_KGCO2_L, unit_kilogram_co2_parser, unit_kilogramco2_kilowatthour_parser, unit_kilogramco2_liter_parser, unit_kilowatthours_parser, UNIT_KM, UNIT_KWH, UNIT_KWH_MONTH, UNIT_LITER, UNIT_M2, UNIT_M3, unit_megawatthours_parser, UNIT_MONTH, UNIT_MWH, UNIT_MWH_MONTH, UNIT_NUMBER, unit_number_parser } from "../../types/kppk-react-unit.types";
import { BUILD_TYPE_ENUM, POWER_SUPPLY_CALCULATION_TYPE_ENUM, HEAT_SUPPLY_CALCULATION_TYPE_ENUM } from "../../view/kppk-react-calc-view/kppk-react-constructions-site.fields.service";
import { REACT_INIT_LOAD_FROM_REMOTE_DATA } from "../react-init/react-init.types";

export const  mwh_to_kwh = ( value_MWh: UNIT_MWH  ): UNIT_KWH => {
    const value = value_MWh.value * 1000;
    return unit_kilowatthours_parser.parse({ value });
};
export const  kwh_to_mwh = ( value_kWh: UNIT_KWH  ): UNIT_MWH => {
    const value = value_kWh.value / 1000;
    return unit_megawatthours_parser.parse({ value });
  };

export const  power_supply_calculate_energy_usage = (
  operation_period: UNIT_MONTH,
  energy_usage_estimate: UNIT_KWH_MONTH
): UNIT_KWH => {
  const value = energy_usage_estimate.value * operation_period.value;
  return unit_kilowatthours_parser.parse({ value });
};

export const  power_supply_calculate_energy_usage_estimate = (
  operation_period: UNIT_MONTH,
  gross_floor_area: UNIT_M2,
  estimate_value: UNIT_NUMBER,
): UNIT_KWH => {
  const value = gross_floor_area.value * operation_period.value * estimate_value.value;
  return unit_kilowatthours_parser.parse({ value });
};

export const heating_supply_calculate_energy_usage = (
  operation_period: UNIT_MONTH,
  energy_usage_estimate: UNIT_MWH_MONTH
): UNIT_MWH => {
  const value =  energy_usage_estimate.value * operation_period.value;
  return unit_megawatthours_parser.parse({ value });
};

export const calculate_energy_usage_exact_entry = (
  year_month_values: UNIT_KWH[][],
): UNIT_KWH => {
  // Add up the values of the configured years
  const value = year_month_values.reduce( (sum_duration, year) => {
    // Add up values of month of the year
    return sum_duration += year.reduce( ( sum_year, month ) => {
      return sum_year += month.value;
    }, 0);
  } , 0)
  return unit_kilowatthours_parser.parse({ value });
};

export const calculate_energy_usage_estimate_co2 = (
  power_usage: UNIT_KWH,
  power_co2_eq: UNIT_KGCO2_KWH
): UNIT_KGCO2 => {
  const value = power_usage.value * power_co2_eq.value;
  return unit_kilogram_co2_parser.parse({value});
}

export const calculate_fuel_oil_usage_co2 = (
  oil_usage: UNIT_LITER,
  oil_co2_eq: UNIT_KGCO2_L
): UNIT_KGCO2 => {
  const value = oil_usage.value * oil_co2_eq.value;
  return unit_kilogram_co2_parser.parse({value});
}

export const calculate_fuel_usage_co2 = (
  oil_usage: UNIT_LITER,
  oil_co2_eq: UNIT_KGCO2_L
): UNIT_KGCO2 => {
  const value = oil_usage.value * oil_co2_eq.value;
  return unit_kilogram_co2_parser.parse({value});
}

export const  calculate_excavation_co2_transport = (
  volume: UNIT_M3,
  distance: UNIT_KM,
  capacity_volume: UNIT_M3,
  co2_consumption: UNIT_GCO2_KM
): UNIT_KGCO2 => {
  // =K3/'Transport Kennzahlen'!F15
  const first = volume.value / capacity_volume.value;
  // *BauGrube!K7*'Transport Kennzahlen'!E20
  const second = first * distance.value * co2_consumption.value;
  // from g to kg
  const third = second / 1000;
  // Double for two-way transport
  const value = third * 2;
  
  return unit_kilogram_co2_parser.parse({ value });
}

export const calculate_energy_usage_estimate = () => {

  return unit_kilowatthours_parser.parse({ value: 0});
}

export const calculate_construction_site_results = ( 
  form_construction_site: FG_FORM_CONSTRUCTION_SITE_CONTEXT, 
  data: REACT_INIT_LOAD_FROM_REMOTE_DATA): RESULT_CONSTRUCTION_SITE => {
  const result = result_construction_site_parser.parse({});

  // const energy_usage_estimate = calculate_energy_usage_estimate()
  // const energy_usage_estimate = data.construction_site_energy_usage.find( item => {
  //   return item.floor.value === form_construction_site.value.energy_usage_values.gross_floor_area.value;
  // })?.energy;
  // if(energy_usage_estimate) {
  //   result.power_supply.energy_usage_estimate = energy_usage_estimate;
  // }

  // const heating_supply_energy_usage_estimate = calculate_energy_usage_estimate()
  // const heating_supply_energy_usage_estimate = data.construction_site_energy_usage.find( item => {
  //   return item.floor.value === form_construction_site.value.energy_usage_values.gross_floor_area.value;
  // })?.heating;
  // if(heating_supply_energy_usage_estimate) {
  //   result.heating_supply.energy_usage_estimate = heating_supply_energy_usage_estimate;
  // }

  // Calculate energy_usage of power_supply
  if( form_construction_site.value.energy_usage_settings.energy_usage_build_type.value === BUILD_TYPE_ENUM.building_construction ) {

    let year_energy_values;
    switch(form_construction_site.value.energy_usage_settings.energy_usage_calculation_type.value) {
      case POWER_SUPPLY_CALCULATION_TYPE_ENUM.estimate:
        result.power_supply.energy_usage = power_supply_calculate_energy_usage_estimate(
          form_construction_site.value.energy_usage_values.operation_period,
          form_construction_site.value.energy_usage_values.gross_floor_area,
          unit_number_parser.parse({ value: 1.62 })
        );
      break;
      case POWER_SUPPLY_CALCULATION_TYPE_ENUM.exact_entry:
        year_energy_values = form_construction_site.value.energy_usage_values.year_energy_usage.map( year => {
          return Object.entries(year).map( item => {
              const [key, value] = item;
              return value;
            });
        });
        result.power_supply.energy_usage = calculate_energy_usage_exact_entry(
          year_energy_values
        );
      break;
      case POWER_SUPPLY_CALCULATION_TYPE_ENUM.custom:
        result.power_supply.energy_usage = power_supply_calculate_energy_usage(
          form_construction_site.value.energy_usage_values.operation_period,
          form_construction_site.value.energy_usage_values.energy_usage_custom
        );   
      break;
      default: 
        throw new Error('ERROR_CALCULATION_POWER_SUPPLY_CALCULATION_TYPE_ENUM');
      break;
    }
    // Calculate energy usage of heating_supply
    switch(form_construction_site.value.heating_supply_settings.calculation_type.value) {
      case HEAT_SUPPLY_CALCULATION_TYPE_ENUM.estimate:
          result.heating_supply.energy_usage = kwh_to_mwh(power_supply_calculate_energy_usage_estimate(
            form_construction_site.value.heating_supply_values.operation_period,
            form_construction_site.value.energy_usage_values.gross_floor_area,
            unit_number_parser.parse({ value: 0.0106 })
          ));
      break;
      case HEAT_SUPPLY_CALCULATION_TYPE_ENUM.exact_entry:
        year_energy_values = form_construction_site.value.heating_supply_values.year_energy_usage.map( year => {
          return Object.entries(year).map( item => {
              const [key, value] = item;
              return value;
            });
        });
        result.heating_supply.energy_usage = kwh_to_mwh( calculate_energy_usage_exact_entry(
          year_energy_values
        ));
      break;
      case HEAT_SUPPLY_CALCULATION_TYPE_ENUM.custom:
          result.heating_supply.energy_usage = heating_supply_calculate_energy_usage(
            form_construction_site.value.heating_supply_values.operation_period,
            form_construction_site.value.heating_supply_values.energy_usage_custom,
          );
      break;
      default: 
        throw new Error('ERROR_CALCULATION_HEAT_SUPPLY_CALCULATION_TYPE_ENUM');
      break;
    };

    
    const power_supply_energy_type = data.material_co2_equ.find( item => item.material.value === form_construction_site.value.energy_usage_settings.energy_usage_power_type.value);
    const heating_supply_power_type = data.material_co2_equ.find( item => item.material.value === form_construction_site.value.heating_supply_settings.energy_usage_power_type.value);
    
    
    if( power_supply_energy_type &&  heating_supply_power_type) {
      const power_supply_energy_co2_equ = unit_kilogramco2_kilowatthour_parser.parse(power_supply_energy_type.co2_equ)
      result.power_supply.co2_energy_usage = calculate_energy_usage_estimate_co2(
        result.power_supply.energy_usage,
        power_supply_energy_co2_equ
      );

      const heating_supply_energy_co2_equ = unit_kilogramco2_kilowatthour_parser.parse(heating_supply_power_type.co2_equ)
      result.heating_supply.co2_energy_usage = calculate_energy_usage_estimate_co2(
        mwh_to_kwh(result.heating_supply.energy_usage),
        heating_supply_energy_co2_equ
      );
    } else {
      throw new Error('ERROR_CALCULATION_EXCAVATION_PIT_REQUIRED_INPUT_MISSING');
    }
    const heating_supply_fuel_oil = data.material_co2_equ.find( item => item.material.value ==='fuel_oil');
    if( heating_supply_fuel_oil ) {
      const co2_kg_fuel_oil = unit_kilogramco2_liter_parser.parse(heating_supply_fuel_oil.co2_equ)
      result.heating_supply.fuel_oil_usage = form_construction_site.value.heating_supply_values.fuel_oil_usage;
      result.heating_supply.co2_fuel_oil_usage = calculate_fuel_oil_usage_co2(
        result.heating_supply.fuel_oil_usage,
        co2_kg_fuel_oil
      );
    }
    result.co2_power_supply = result.power_supply.co2_energy_usage;
    result.co2_heating_supply = add_number_units(result.heating_supply.co2_energy_usage, result.heating_supply.co2_fuel_oil_usage)

    result.co2_supply = add_number_units(result.power_supply.co2_energy_usage, result.co2_heating_supply);
  }
  else {
    throw `ERROR: calculate_construction_site_results doesn't support calculations for buildtype other then BUILD_TYPE_ENUM building_construction`
  }

  const cc_result =  result_construction_site_parser.parse(result);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>CC_RESULT>>>>>>>>>>>>>>>>')
  console.log(cc_result)
  return cc_result;
}