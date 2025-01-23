import { FG_FORM_HEATING_SYSTEM_CONTEXT } from "../../types/kppk-react-calculation.types";
import { FORM_HEATING_SYSTEM_DATA, form_heating_system_data_parser, FORM_HEATING_SYSTEM_RESULT, form_heating_system_result_parser, ROSE_FILE_DATA } from "../../types/kppk-react-heating-system.types";
import { UNIT_TCO2, UNIT_TCO2_YEAR, unit_tonco2_parser, unit_tonco2_xyear_parser, unit_tonco2_year_parser, UNIT_YEAR } from "../../types/kppk-react-unit.types";
import { REACT_INIT_LOAD_FROM_REMOTE_COMMON } from "./../react-init/react-init.machine.types";

export const calculate_usage_co2 = ( system_co2_year: UNIT_TCO2_YEAR, calc_usage: UNIT_YEAR ): UNIT_TCO2 => {
    const value = system_co2_year.value * calc_usage.value;
    return unit_tonco2_parser.parse({ value });
}

export const form_heating_system_calculate_dynamic_model_values = ( form_heating_system: FORM_HEATING_SYSTEM_DATA, rose_file_data: ROSE_FILE_DATA ): FORM_HEATING_SYSTEM_DATA => {
  const result = form_heating_system_data_parser.parse(form_heating_system);
  let found_item = rose_file_data[ form_heating_system.system_select.value as keyof typeof rose_file_data];
  if( !found_item ) {
    found_item = unit_tonco2_xyear_parser.parse({ value: 0 });
  }
  result.system_co2_duration = unit_tonco2_xyear_parser.parse(found_item)
  const co2_year = found_item.value / form_heating_system.system_duration.value;
  result.system_co2_year = unit_tonco2_year_parser.parse( { value: co2_year} )
  return form_heating_system_data_parser.parse(result);
}

export const calculate_heating_system_results = ( 
    form_heating_system: FG_FORM_HEATING_SYSTEM_CONTEXT,
    data: REACT_INIT_LOAD_FROM_REMOTE_COMMON
  ): FORM_HEATING_SYSTEM_RESULT  => {
    const result: FORM_HEATING_SYSTEM_RESULT = {
        calc_usage_co2: calculate_usage_co2( form_heating_system.value.system_co2_year, form_heating_system.value.calc_usage)
    }
    return form_heating_system_result_parser.parse(result);
  }