import { z } from 'zod';

const literal_schema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type literal = z.infer<typeof literal_schema>;

export const json_parser: z.ZodType<Json> = z.lazy(() =>
    z.union([literal_schema, z.array(json_parser), z.record(json_parser)])
);

export type Json = literal | { [key: string]: Json } | Json[];