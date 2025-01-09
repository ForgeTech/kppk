import { z } from 'zod';

export const ContextReactDataImporter = z.object({
  
});
export type ContextReactData = z.infer<typeof ContextReactDataImporter>;

export const EventReactDataImporterSendFilePayloadParser = z.object({
  data: z.instanceof(ArrayBuffer)
});
export const EventReactDataImporterSendFileParser = z.object({
  type: z.literal('react.data_importer.event.send_file'),
  payload: EventReactDataImporterSendFilePayloadParser
});
export type EventReactDataImporterSendFile = z.infer<typeof EventReactDataImporterSendFileParser>;

export const EventReactDataImporterStopParser = z.object({
  type: z.literal('react.data_importer.event.stop'),
});
export type EventReactDataImporterStop = z.infer<typeof EventReactDataImporterStopParser>;

export const InternalReactDataImporterResetStateParser = z.object({
  type: z.literal('react.data_importer.internal.reset_state'),
});
export type InternalReactDataImporterResetState = z.infer<typeof InternalReactDataImporterResetStateParser>;

export const InternaltReactDataImporterProcessFileParser = z.object({
  type: z.literal('react.data_importer.internal.process_file'),
});
export type InternaltReactDataImporterProcessFile = z.infer<typeof InternaltReactDataImporterProcessFileParser>;

