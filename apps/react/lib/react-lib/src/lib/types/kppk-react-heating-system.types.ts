import { z } from "zod";
import { 
  unit_string_parser,
  unit_tonco2_parser,
  unit_tonco2_xyear_parser,
  unit_tonco2_year_parser,
  unit_years_parser 
} from "./kppk-react-unit.types";

export const rose_file_data_parser = z.object({
  gas: unit_tonco2_xyear_parser.optional().default({ value: 20}),
  air_water: unit_tonco2_xyear_parser.optional().default({ value: 80}),
  geothermal: unit_tonco2_xyear_parser.optional().default({ value: 90}),
  district: unit_tonco2_xyear_parser.optional().default({ value: 100}),
  pellets: unit_tonco2_xyear_parser.optional().default({value: 20}),
}).optional().default({});
export type ROSE_FILE_DATA = z.infer<typeof rose_file_data_parser>;

export const form_heating_system_result_parser = z.object({
  calc_usage_co2: unit_tonco2_parser.optional().default({})
});
export type FORM_HEATING_SYSTEM_RESULT = z.infer<typeof form_heating_system_result_parser>;

export const form_heating_system_data_parser = z.object({
    system_select: unit_string_parser.optional().default({}),
    system_co2_duration: unit_tonco2_xyear_parser.optional().default({}),
    system_duration: unit_years_parser.optional().default({ value: 20 }),
    system_co2_year: unit_tonco2_year_parser.optional().default({}),
    calc_usage: unit_years_parser.optional().default({ value: 50 }),
    results: form_heating_system_result_parser.optional().default({})
  }).optional().default({});
export type FORM_HEATING_SYSTEM_DATA = z.infer<typeof form_heating_system_data_parser>;

