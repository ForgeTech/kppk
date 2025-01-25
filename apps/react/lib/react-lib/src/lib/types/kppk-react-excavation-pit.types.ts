import { z } from 'zod';
import { 
  unit_boolean_parser,
  unit_degree_parser,
  unit_kilogram_co2_parser,
  unit_kilogram_meter_square_parser,
  unit_kilogram_parser,
  unit_kilogramco2_kilometer_parser, 
  unit_kilogramco2_liter_parser,
  unit_kilometer_parser,
  unit_meter_cubic_parser,
  unit_meter_parser,
  unit_milimeter_parser,
  unit_pieces_parser 
} from './kppk-react-unit.types';
import { 
  EXCAVATION_PIT_SECURITY_METHODE_ENUM,
  JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM,
  JET_BLASTING_PROCESS_TYPE_ENUM 
} from '@kppk/react-lib';


export const unit_excavation_pit_security_methode_enum_parser = z.object({
  value: z.nativeEnum(EXCAVATION_PIT_SECURITY_METHODE_ENUM).default(EXCAVATION_PIT_SECURITY_METHODE_ENUM.jet_blasting),
  unit: z.literal('').default('')
});
export type UNIT_EXCAVATION_PIT_SECURITY_METHODE = z.infer<typeof unit_excavation_pit_security_methode_enum_parser>;

export const unit_jet_blasting_process_type_enum_parser = z.object({
  value: z.nativeEnum(JET_BLASTING_PROCESS_TYPE_ENUM).default(JET_BLASTING_PROCESS_TYPE_ENUM.process_type_cylinder),
  unit: z.literal('').default(''),
});
export type UNIT_JET_BLASTING_PROCESS = z.infer<typeof unit_jet_blasting_process_type_enum_parser>;

export const unit_jet_blasting_process_cylinder_shape_enum_parser = z.object({
  value: z.nativeEnum(JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM).default(JET_BLASTING_PROCESS_CYLINDER_SHAPE_ENUM.full_circle),
  unit: z.literal('').default(''),
})
export type UNIT_JET_BLASTING_PROCESS_CYLINDER_SHAPE = z.infer<typeof unit_jet_blasting_process_cylinder_shape_enum_parser>;

export const result_excavation_pit_parser = z.object({
  // linear_meter: unit_meter_parser.optional().default({}),
  excavation_pit_security: z.object({
    linear_meter: unit_meter_parser.optional().default({}),
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
    co2_creation: unit_kilogram_co2_parser.optional().default({}),
  }).optional().default({}),
  jet_blasting_process: z.object({
    jet_blasting_process_cylinder: z.object({
      concrete_mass: unit_kilogram_parser.optional().default({}),
      concrete_volume: unit_meter_cubic_parser.optional().default({}),
      co2_transport: unit_kilogram_co2_parser.optional().default({}),
      co2_creation: unit_kilogram_co2_parser.optional().default({})
    }).optional().default({}),
    jet_blasting_process_cuboid: z.object({
      concrete_mass: unit_kilogram_parser.optional().default({}),
      concrete_volume: unit_meter_cubic_parser.optional().default({}),
      co2_transport: unit_kilogram_co2_parser.optional().default({}),
      co2_creation: unit_kilogram_co2_parser.optional().default({})
    }).optional().default({}),
    concrete_mass: unit_kilogram_parser.optional().default({}),
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
    co2_creation: unit_kilogram_co2_parser.optional().default({}),
  }).optional().default({}),
  escarpment: z.object({
    additional_excavation: unit_kilogram_parser.optional().default({}),
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
    co2_creation: unit_kilogram_co2_parser.optional().default({}),
  }).optional().default({}),
  sheet_pile_wall: z.object({
    steel_mass: unit_kilogram_parser.optional().default({}),
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
    co2_creation: unit_kilogram_co2_parser.optional().default({})
  }).optional().default({}),
  shotcrete: z.object({
    additional_excavation: unit_kilogram_parser.optional().default({}),
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
    co2_creation: unit_kilogram_co2_parser.optional().default({})
  }).optional().default({}),
  foundation_pile: z.object({
    concrete_mass: unit_kilogram_parser.optional().default({}),
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
    co2_creation: unit_kilogram_co2_parser.optional().default({})
  }).optional().default({}),
  excavation: z.object({
    co2_transport: unit_kilogram_co2_parser.optional().default({}),
  }).optional().default({}),
});

export type RESULT_EXCAVATION_PIT = z.infer<typeof result_excavation_pit_parser>;

export const form_excavation_pit_parser = z.object({
  excavation_pit_security: z.object({
    depth: unit_meter_parser.optional().default({ value: 1}),
    linear_meter: unit_meter_parser.optional().default({}),
    distance: unit_kilometer_parser.optional().default({value: 100}),
    methode: unit_excavation_pit_security_methode_enum_parser.optional().default({}),
    building_gap: unit_boolean_parser.optional().default({}),
  }).optional().default({}),
  jet_blasting_process: z.object({
    amount: unit_pieces_parser.optional().default({}),
    process_type: unit_jet_blasting_process_type_enum_parser.optional().default({}),
    jet_blasting_process_cylinder: z.object({
      diameter: unit_meter_parser.optional().default({}),
      shape: unit_jet_blasting_process_cylinder_shape_enum_parser.optional().default({}),
    }).optional().default({}),
    jet_blasting_process_cuboid: z.object({
      length: unit_meter_parser.optional().default({}),
      width: unit_meter_parser.optional().default({}),
    }).optional().default({}),
  }).optional().default({}),
  escarpment: z.object({
    tilt: unit_degree_parser.optional().default({ value: 45 })
  }).optional().default({}),
  sheet_pile_wall: z.object({
    mass_unit_area: unit_kilogram_meter_square_parser.optional().default({})
  }).optional().default({}),
  shotcrete: z.object({
    thickness: unit_meter_parser.optional().default({}),
    tilt: unit_degree_parser.optional().default({ value: 45 }),
    nail_count: unit_pieces_parser.optional().default({ value: 20 }),
    nail_length: unit_meter_parser.optional().default({ value: 5 }),
    nail_diameter: unit_milimeter_parser.optional().default({ value: 20 }),
  }).optional().default({}),
  foundation_pile: z.object({
    diameter: unit_meter_parser.optional().default({}),
    amount: unit_pieces_parser.optional().default({}),
  }).optional().default({}),
  excavation: z.object({
    volume: unit_meter_cubic_parser.optional().default({}),
    distance: unit_kilometer_parser.optional().default({ value: 100 }),
  }).optional().default({}),
  results: result_excavation_pit_parser.optional().default({})
});
export type FORM_EXCAVATION_PIT_DATA = z.infer<typeof form_excavation_pit_parser>;