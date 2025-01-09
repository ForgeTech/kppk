import { z } from "zod";
import { unit_gramco2_kilometer_parser, unit_gramco2_kilometerkilogram_parser, unit_kilogram_meter_cubic_parser, unit_kilogram_parser, unit_liter_hundred_kilometers_parser, unit_meter_cubic_parser, unit_string_parser } from "./kppk-react-unit.types";

export const truck_container_type_parser = z.array(
    z.literal('concrete')
    .or(z.literal('excavation'))
    .or(z.literal('demolish_disposal'))
    .or(z.literal('roll_off_container'))
    .or(z.literal('10_cubic_meter_container'))
    .or(z.literal('common'))
  );
  export type TRUCK_CONTAINER_TYPE = z.infer<typeof truck_container_type_parser>;
  
  export const truck_data_item_parser = z.object({
    name: unit_string_parser,
    capacity_weight: unit_kilogram_parser,
    capacity_volume: unit_meter_cubic_parser,
    max_density: unit_kilogram_meter_cubic_parser,
    consumption: unit_liter_hundred_kilometers_parser,
    co2_consumption: unit_gramco2_kilometer_parser,
    co2_consumption_weight: unit_gramco2_kilometerkilogram_parser,
    category: truck_container_type_parser
  });
  export type TRUCK_DATA_ITEM = z.infer<typeof truck_data_item_parser>;
  
  export const truck_data_parser = z.array(truck_data_item_parser);
  export type TRUCK_DATA = z.infer<typeof truck_data_parser>;
  
  export const truck_container_10cubic_or_roll_off_parser = z.object({
    value:  z.literal('10_cubic_meter_container').or(z.literal('roll_off_container')).optional().default('10_cubic_meter_container'),
    unit: z.literal('').optional().default(''),
  });
  export type TRUCK_CONTAINER_10CUBIC_OR_ROLLOFF_TYPE = z.infer<typeof truck_container_10cubic_or_roll_off_parser>;
  