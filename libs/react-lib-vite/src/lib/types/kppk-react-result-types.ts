import { z } from 'zod';
import {
  unit_kilogram_co2_parser,
  unit_percent_parser,
  unit_string_parser,
} from './kppk-react-unit.types';

export const materials_result = z.object({
  name: unit_string_parser.optional().default({}),
  co2_transport: unit_kilogram_co2_parser,
  gwp: unit_kilogram_co2_parser,
  gwp_oeko: z
    .undefined()
    .transform((_) => unit_kilogram_co2_parser.parse({}))
    .or(unit_kilogram_co2_parser),
  gwp_oeko_reduction: unit_percent_parser.optional().default({}),
  gwp_percentage: unit_percent_parser.optional().default({}),
  gwp_oeko_percentage: unit_percent_parser.optional().default({}),
  gwp_transport_percentage: unit_percent_parser.optional().default({}),
});

export type MATERIALS_RESULT = z.infer<typeof materials_result>;
