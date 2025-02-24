import { z } from 'zod';
import { calculation_files_parser } from './kppk-react-init.machine.types';

export const react_calculation_materials_file_data = calculation_files_parser.omit({ file_rose: true });
export type REACT_CALCULATION_MATERIALS_FILE_DATA = z.infer<typeof react_calculation_materials_file_data>;

export const react_calculation_materials_output = z.object({
  transformed_aufbauten: z.array(z.any()).default([]),
  transformed_bauteilflaechen: z.array(z.any()).default([]),
  transformed_oi3: z.array(z.any()).default([]),
});
export type REACT_CALCULATION_MATERIALS_OUTPUT = z.infer<typeof react_calculation_materials_output>;

export const react_calculation_materials_context = z.object({
  input: react_calculation_materials_file_data,
  output: react_calculation_materials_output,
});
export type REACT_CALCULATION_MATERIALS_CONTEXT = z.infer<typeof react_calculation_materials_context>;

export const react_calculation_materials_input = z.object({
  context: react_calculation_materials_context,
  event: z.any(),
});

export type REACT_CALCULATION_MATERIALS_INPUT = z.infer<typeof react_calculation_materials_input>;
