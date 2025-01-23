import { z } from "zod";
import { react_view_calculation_context_parser } from "../../types";

export const react_view_calculation_v1_context_parser = z.object({
//   calculation_defaults: react_view_calculation_context_parser, 
  calculation_defaults: z.any(),
//   calculation: react_view_calculation_context_parser,
  calculation: z.any(),
  data: z.any(),
});

export type REACT_VIEW_CALCULATION_CONTEXT_V1 =  z.infer<typeof react_view_calculation_v1_context_parser>;