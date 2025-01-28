import { assign, emit, setup } from 'xstate';

export type test_machine_context = {
  value: string;
};
export const test_machine = () =>
  setup({
    types: {
      context: {} as {
        value: string;
      },
      events: {} as
        | { type: 'emit_event'; context: test_machine_context }
        | { type: 'proceed'; context?: test_machine_context },
    },
    actions: {
      emit_event: emit(({ context }) => {
        return { type: 'test_event', context };
      }),
      assign_context_middle: assign(({ context }) => {
        context.value = 'middle';
        return context;
      }),
      assign_context_from_event: assign(({ context, event }) => {
        if (event.context) {
          context = event.context;
        }
        return context;
      }),
      assign_context_end: assign(({ context }) => {
        context.value = 'end';
        return context;
      }),
    },
  }).createMachine({
    id: 'test_machine',
    initial: 'START',
    context: {
      value: 'start',
    },
    output: ({ context }) => {
      return context;
    },
    states: {
      START: {
        entry: [{ type: 'emit_event' }],
        on: {
          proceed: {
            target: 'MIDDLE',
            actions: [
              { type: 'assign_context_middle' },
              { type: 'assign_context_from_event' },
            ],
          },
        },
      },
      MIDDLE: {
        entry: [{ type: 'emit_event' }],
        on: {
          proceed: {
            target: 'END',
            actions: [
              { type: 'assign_context_end' },
              { type: 'assign_context_from_event' },
            ],
          },
        },
      },
      END: {
        type: 'final',
        entry: [{ type: 'emit_event' }],
      },
    },
  });
