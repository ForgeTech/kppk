import { z } from "zod";

export const react_file_importer_context_parser = z.object({
    error: z.string().optional(),
    result_raw: z.array( z.array( z.string() ) ).optional(),
    file_info: z.object({}).passthrough().optional(),
})

export type REACT_FILE_IMPORTER_CONTEXT = z.infer<typeof react_file_importer_context_parser>;