import { z } from 'zod';
import { 
   POWER_SUPPLY_CALCULATION_TYPE_ENUM,
   BUILD_TYPE_ENUM,
   POWER_SUPPLY_POWER_TYPE_ENUM, 
   HEAT_SUPPLY_CALCULATION_TYPE_ENUM
} from '../view/kppk-react-calc-view/kppk-react-constructions-site.fields.service';
import { 
  unit_floor_parser,
  unit_kilogram_co2_parser,
  unit_kilowatthours_month_parser,
  unit_kilowatthours_parser,
  unit_liter_parser,
  unit_megawatthours_month_parser,
  unit_megawatthours_parser,
  unit_meter_square_parser,
  unit_month_parser 
} from './kppk-react-unit.types';

export const construction_site_energy_usage_calculation_type_enum_parser = z.object({
  value: z.nativeEnum(POWER_SUPPLY_CALCULATION_TYPE_ENUM).default(POWER_SUPPLY_CALCULATION_TYPE_ENUM.exact_entry),
  unit: z.literal('').default(''),
})
export type construction_site_energy_usage_calculation_type_enum = z.infer<typeof construction_site_energy_usage_calculation_type_enum_parser>;

export const construction_site_heating_supply_calculation_type_enum_parser = z.object({
  value: z.nativeEnum(HEAT_SUPPLY_CALCULATION_TYPE_ENUM).default(HEAT_SUPPLY_CALCULATION_TYPE_ENUM.estimate),
  unit: z.literal('').default(''),
});

export type construction_site_heating_supply_calculation_type_enum = z.infer<typeof construction_site_heating_supply_calculation_type_enum_parser>;

export const construction_site_build_type_enum_parser = z.object({
  value: z.nativeEnum(BUILD_TYPE_ENUM).default(BUILD_TYPE_ENUM.building_construction),
  unit: z.literal('').default(''),
});
export type construction_site_build_type_enum = z.infer<typeof construction_site_build_type_enum_parser>;

export const construction_energy_usage_site_power_type_enum_parser = z.object({
  value: z.nativeEnum(POWER_SUPPLY_POWER_TYPE_ENUM).default(POWER_SUPPLY_POWER_TYPE_ENUM.austria_common_energy_mix),
  unit: z.literal('').default(''),
}) 
export type construction_energy_usage_site_power_typen_enum = z.infer<typeof construction_energy_usage_site_power_type_enum_parser>;

export const construction_site_energy_usage_item_parser = z.object({
  floor: unit_floor_parser,
  energy: unit_kilowatthours_month_parser,
  heating: unit_megawatthours_month_parser,
});
export type CONSTRUCTION_SITE_ENERGY_USAGE_ITEM = z.infer<typeof construction_site_energy_usage_item_parser>;

export const construction_site_energy_usage_data_parser = z.array(construction_site_energy_usage_item_parser);
export type CONSTRUCTION_SITE_ENERGY_USAGE_DATA = z.infer<typeof construction_site_energy_usage_data_parser>;

export const construction_site_energy_usage_year_energy_usage_item_parser =  z.object({
  "january_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "february_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "march_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "april_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "may_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "june_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "july_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "august_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "september_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "october_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "november_energy_usage": unit_kilowatthours_parser.optional().default({}),
  "december_energy_usage": unit_kilowatthours_parser.optional().default({}),
});
export type CONSTRUCTION_SITE_ENERGY_USAGE_YEAR_ENERGY_USAGE_ITEM_EXACT = z.infer<typeof construction_site_energy_usage_year_energy_usage_item_parser>;

export const construction_site_energy_usage_year_energy_usage_parser =  z.array(construction_site_energy_usage_year_energy_usage_item_parser.optional().default({})).optional().default([]);
export type CONSTRUCTION_SITE_ENERGY_USAGE_YEAR_ENERGY_USAGE_EXACT = z.infer<typeof construction_site_energy_usage_year_energy_usage_parser>;

export const construction_site_energy_usage_exact_energy_usage_parser = z.array(construction_site_energy_usage_item_parser).optional().default([]);
export type CONSTRUCTION_SITE_ENERGY_USAGE_EXACT_ENERGY_USAGE = z.infer<typeof construction_site_energy_usage_data_parser>;

export const result_construction_site_parser = z.object({
  "power_supply": z.object({
    "energy_usage_estimate": unit_kilowatthours_month_parser.optional().default({}),
    "energy_usage": unit_kilowatthours_parser.optional().default({}),
    "co2_energy_usage": unit_kilogram_co2_parser.optional().default({}),
  }).optional().default({}),
  "heating_supply": z.object({
    "energy_usage_estimate": unit_megawatthours_month_parser.optional().default({}),
    "energy_usage": unit_megawatthours_parser.optional().default({}),
    "co2_energy_usage": unit_kilogram_co2_parser.optional().default({}),
    "fuel_oil_usage": unit_liter_parser.optional().default({}),
    "co2_fuel_oil_usage": unit_kilogram_co2_parser.optional().default({}),
  }).optional().default({}),
  "co2_power_supply": unit_kilogram_co2_parser.optional().default({}),
  "co2_heating_supply": unit_kilogram_co2_parser.optional().default({}),
  "co2_supply": unit_kilogram_co2_parser.optional().default({})
});

export type RESULT_CONSTRUCTION_SITE = z.infer<typeof result_construction_site_parser>;



export const form_construction_site_parser = z.object({
  "energy_usage_settings": z.object({
    "energy_usage_power_type": construction_energy_usage_site_power_type_enum_parser.optional().default({}),
    "energy_usage_build_type": construction_site_build_type_enum_parser.optional().default({}),
    "energy_usage_calculation_type": construction_site_energy_usage_calculation_type_enum_parser.optional().default({}),
  }).optional().default({}),
  
  "energy_usage_values": z.object({
    "operation_period": unit_month_parser.optional().default({}),
    "gross_floor_area": unit_meter_square_parser.optional().default({}),
    "energy_usage_custom": unit_kilowatthours_month_parser.optional().default({}),
    "year_energy_usage": construction_site_energy_usage_year_energy_usage_parser.optional().default([]),
  }).optional().default({}),
  
  // "exact_energy_usage": construction_site_energy_usage_exact_energy_usage_parser.optional().default([]),
  
  "heating_supply_settings": z.object({
    "energy_usage_power_type": construction_energy_usage_site_power_type_enum_parser.optional().default({}),
    "calculation_type": construction_site_heating_supply_calculation_type_enum_parser.optional().default({}),
  }).optional().default({}),
  
  "heating_supply_values": z.object({
    "operation_period": unit_month_parser.optional().default({}),
    "gross_floor_area": unit_meter_square_parser.optional().default({}),
    "energy_usage_custom": unit_megawatthours_month_parser.optional().default({}),
    "year_energy_usage": construction_site_energy_usage_year_energy_usage_parser.optional().default([]),
    "fuel_oil_usage": unit_liter_parser.optional().default({}),
  }).optional().default({}),
  "results": result_construction_site_parser.optional().default({})
});

export type FORM_CONSTRUCTION_SITE = z.infer<typeof form_construction_site_parser>;

