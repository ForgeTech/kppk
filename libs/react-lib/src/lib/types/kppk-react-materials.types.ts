import { z } from 'zod';

export const component_composition_step_1_parser = z.object({
  id: z.string(),
  short_id: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  column_2_1: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  column_2_2: z.object({
    value: z.number().or(z.null()),
    unit: z.string(),
  }),
  name: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  thickness: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  surface_related_mass: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  lathing_spacing: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  lathing_thickness: z.object({
    value: z.number(),
    unit: z.string(),
  }),
});

export const component_composition_step_2_parser = z.object({
  id: z.string(),
  short_id: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  column_2_1: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  column_2_2: z.object({
    value: z.number().or(z.null()),
    unit: z.string(),
  }),
  name: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  thickness: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  surface_related_mass: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  lathing_spacing: z.object({
    value: z.number().transform((value) => (value === 0 ? null : value)),
    unit: z.string(),
  }),
  lathing_thickness: z.object({
    value: z.number().transform((value) => (value === 0 ? null : value)),
    unit: z.string(),
  }),
});

export type COMPONENT_COMPOSITION_STEP_2 = z.infer<
  typeof component_composition_step_2_parser
>;

export const component_composition_step_3_parser = z.object({
  id: z.string(),
  short_id: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  name: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  thickness: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  surface_related_mass: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  area_coefficient: z.object({
    value: z.number(),
    unit: z.string(),
  }),
});

export type COMPONENT_COMPOSITION_STEP_3 = z.infer<
  typeof component_composition_step_3_parser
>;

export const component_surface_area_transform_step_1_parser = z.object({
  id: z.string(),
  lfd_nr: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  type: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  short_id: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  name: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  description: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  status: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  u_value: z.object({
    value: z.number(),
    unit: z.literal('W/m2K'),
  }),
  area_single: z.object({
    value: z.number().or(z.nan()),
    unit: z.literal('m2'),
  }),
  area_sum: z.object({
    value: z.number(),
    unit: z.literal('m2'),
  }),
  amount: z.object({
    value: z.number().or(z.nan()),
    unit: z.literal('pieces'),
  }),
});

export type COMPONENT_SURFACE_AREA_TRANSFORM_STEP_1 = z.infer<
  typeof component_surface_area_transform_step_1_parser
>;

export const component_surface_area_transform_step_2_parser = z.object({
  id: z.string(),
  short_id: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  name: z.object({
    value: z.string(),
    unit: z.string(),
  }),
  area_sum: z.object({
    value: z.number(),
    unit: z.literal('m2'),
  }),
});

export type COMPONENT_SURFACE_AREA_TRANSFORM_STEP_2 = z.infer<
  typeof component_surface_area_transform_step_2_parser
>;

export const material_oi3_step_1_parser = z.object({
  id: z.string(),
  name: z.object({
    value: z.string(),
    unit: z.literal(''),
  }),
  area: z.object({
    value: z.number(),
    unit: z.literal('m2'),
  }),
  oi3: z.object({
    value: z.number(),
    unit: z.literal('oi3/m2'),
  }),
  penrt: z.object({
    value: z.number(),
    unit: z.literal('MJ/m2'),
  }),
  gwp: z.object({
    value: z.number(),
    unit: z.literal('kgCo2/m2'),
  }),
  gwp_biogenic: z.object({
    value: z.number(),
    unit: z.literal('kgCo2/m2'),
  }),
  ap: z.object({
    value: z.number(),
    unit: z.literal('kgCo2/m2'),
  }),
});

export type MATERIAL_OI3_STEP_1 = z.infer<typeof material_oi3_step_1_parser>;

export const material_oi3_step_2_parser = z.object({
  id: z.string(),
  name: z.object({
    value: z.string(),
    unit: z.literal(''),
  }),
  area: z.object({
    value: z.number(),
    unit: z.literal('m2'),
  }),
  oi3: z.object({
    value: z.number(),
    unit: z.literal('oi3/m2'),
  }),
  penrt: z.object({
    value: z.number(),
    unit: z.literal('MJ/m2'),
  }),
  gwp: z.object({
    value: z.number(),
    unit: z.literal('kgCo2/m2'),
  }),
  gwp_biogenic: z.object({
    value: z.number(),
    unit: z.literal('kgCo2/m2'),
  }),
  ap: z.object({
    value: z.number(),
    unit: z.literal('kgCo2/m2'),
  }),
  gwp_total: z.object({
    value: z.number(),
    unit: z.literal(''),
  }),
});

export type MATERIAL_OI3_STEP_2 = z.infer<typeof material_oi3_step_2_parser>;
