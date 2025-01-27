import { z } from 'zod';

export const ProgressItemFgSpinnerParser = z.object({
  name: z.string(),
  progress: z.number().min(0).max(100).default(0),
  finished: z.boolean().default(false),
  // .or(z.undefined().transform(() => 0)),
});
export type ProgressItemFgSpinner = z.infer<typeof ProgressItemFgSpinnerParser>;

export const ContextFgSpinnerParser = z.object({
  allow_reuse: z.boolean().default(true),
  allow_timeout_reset: z.boolean().default(true),
  trigger_count: z.number().min(0).default(0),
  // .or(z.undefined().transform(() => 0)),
  progressItems: z.array(ProgressItemFgSpinnerParser).default([]),
  delay_min_show_time: z.number().min(0).default(1000),
  // .or(z.undefined().transform(() => 1000)),
  delay_timeout: z.number().min(0).default(0),
  // .or(z.undefined().transform(() => 2500)),
  delay_before_shown: z.number().min(0).default(250),
  // .or(z.undefined().transform(() => 250)),
  delay_auto_dismiss_timeout_error: z.number().min(0).default(1000),
  // .or(z.undefined().transform(() => 250)),
});

export const ContextFgSpinnerParserImmutable =
  ContextFgSpinnerParser.readonly();

export type ContextFgSpinner = z.infer<typeof ContextFgSpinnerParser>;

export const EventFgSpinnerHideParser = z.object({
  type: z.literal('fg.spinner.event.hide').default('fg.spinner.event.hide'),
  // .or(z.undefined().transform(() => 'fg.spinner.event.hide' as const)),
  payload: z
    .object({
      force: z.boolean().or(z.undefined().transform(() => false)),
    })
    .default({}),
});
export type EventFgSpinnerHide = z.infer<typeof EventFgSpinnerHideParser>;

export const EventFgSpinnerShowParser = z.object({
  type: z.literal('fg.spinner.event.show').default('fg.spinner.event.show'),
  // .or(z.undefined().transform(() => 'fg.spinner.event.show' as const)),
  payload: z
    .object({
      force: z.boolean().or(z.undefined().transform(() => false)),
    })
    .default({}),
});
export type EventFgSpinnerShow = z.infer<typeof EventFgSpinnerShowParser>;

export const EventFgSpinnerStopParser = z.object({
  type: z.literal('fg.spinner.event.stop').default('fg.spinner.event.stop'),
});
export type EventFgSpinnerStop = z.infer<typeof EventFgSpinnerStopParser>;

export const InternalFgSpinnerHideParser = z.object({
  type: z
    .literal('fg.spinner.internal.hide')
    .default('fg.spinner.internal.hide'),
});
export type InternalFgSpinnerHide = z.infer<typeof InternalFgSpinnerHideParser>;

export const InternalFgSpinnerShowParser = z.object({
  type: z
    .literal('fg.spinner.internal.show')
    .default('fg.spinner.internal.show'),
});
export type InternalFgSpinnerShow = z.infer<typeof InternalFgSpinnerShowParser>;

export const EventFgSpinnerGetContextSendToMachineIdParser = z.object({
  type: z
    .literal('fg.spinner.event.get_context')
    .default('fg.spinner.event.get_context'),
  payload: z.object({
    machineId: z.string(),
  }),
});
export const EventFgSpinnerGetContextSendToMachineRefParser = z.object({
  type: z
    .literal('fg.spinner.event.get_context')
    .default('fg.spinner.event.get_context'),
  payload: z.object({
    machineRef: z.object({}).passthrough(),
  }),
});
export const EventFgSpinnerGetContextParser =
  EventFgSpinnerGetContextSendToMachineIdParser.or(
    EventFgSpinnerGetContextSendToMachineRefParser
  );
// export const EventFgSpinnerGetContextParser =  z.object({
//   type: z
//     .literal('fg.spinner.event.get_context')
//     .default('fg.spinner.event.get_context'),
//   payload:
//     z.object({
//         machineId: z.string(),
//     }).or(
//     z.object({
//       machineRef: z.object({}).passthrough(),
//     })
//   )
// });
export type EventFgSpinnerGetContext = z.infer<
  typeof EventFgSpinnerGetContextParser
>;

export const EventFgSpinnerRespondContextParser = z.object({
  type: z
    .literal('fg.spinner.event.respond_context')
    .default('fg.spinner.event.respond_context'),
  payload: z.object({
    context: ContextFgSpinnerParser,
  }),
});
export type EventFgSpinnerRespondContext = z.infer<
  typeof EventFgSpinnerRespondContextParser
>;

export const EventFgSpinnerSetContextParser = z.object({
  type: z
    .literal('fg.spinner.event.set_context')
    .default('fg.spinner.event.set_context'),
  payload: ContextFgSpinnerParser.partial().default({}),
});
export type EventFgSpinnerSetContext = z.infer<
  typeof EventFgSpinnerSetContextParser
>;

export const PayloadEventFgSpinnerSetProgressParser = z.object({
  items: ProgressItemFgSpinnerParser.or(z.array(ProgressItemFgSpinnerParser)),
});
export type PayloadEventFgSpinnerSetProgress = z.infer<
  typeof PayloadEventFgSpinnerSetProgressParser
>;

export const EventFgSpinnerSetProgressParser = z.object({
  type: z
    .literal('fg.spinner.event.set_progress')
    .default('fg.spinner.event.set_progress'),
  payload: PayloadEventFgSpinnerSetProgressParser,
});
export type EventFgSpinnerSetProgress = z.infer<
  typeof EventFgSpinnerSetProgressParser
>;

export const InternalFgSpinnerForceHideParser = z.object({
  type: z
    .literal('fg.spinner.internal.force_hide')
    .default('fg.spinner.internal.force_hide'),
});
export type InternalFgSpinnerForceHide = z.infer<
  typeof InternalFgSpinnerForceHideParser
>;

export const InternalFgSpinnerForceShowParser = z.object({
  type: z
    .literal('fg.spinner.internal.force_show')
    .or(
      z.undefined().transform(() => 'fg.spinner.internal.force_show' as const)
    ),
});
export type InternalFgSpinnerForceShow = z.infer<
  typeof InternalFgSpinnerForceShowParser
>;

export const InternalFgSpinnerResetTimeoutParser = z.object({
  type: z
    .literal('fg.spinner.internal.reset_timeout')
    .or(
      z
        .undefined()
        .transform(() => 'fg.spinner.internal.reset_timeout' as const)
    ),
});
export type InternalFgSpinnerResetTimeout = z.infer<
  typeof InternalFgSpinnerResetTimeoutParser
>;

export const EventFgSpinnerDismissErrorParser = z.object({
  type: z
    .literal('fg.spinner.event.dismiss_error')
    .or(
      z.undefined().transform(() => 'fg.spinner.event.dismiss_error' as const)
    ),
});
export type EventFgSpinnerDismissError = z.infer<
  typeof EventFgSpinnerDismissErrorParser
>;
