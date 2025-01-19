import { z } from 'zod';

export const context_react_init_parser = z.any();

export type CONTEXT_REACT_INIT = z.infer<typeof context_react_init_parser>;