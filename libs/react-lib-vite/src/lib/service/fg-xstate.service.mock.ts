import { vi } from 'vitest';
import { createActor } from 'xstate';
import { test_machine } from './../testing/test-machine';
export const FgXstateServiceMock = {
  
  setup: vi.fn().mockReturnValue({
    createMachine: vi.fn().mockReturnValue(
      test_machine()
    )
  }),
  assign: vi.fn(),
  createActor: vi.fn().mockReturnValue( createActor(test_machine()) ),
  createBrowserInspector: vi.fn(),
  createMachine: vi.fn(),
  emit: vi.fn(),
  fromCallback: vi.fn(),
  fromEventObservable: vi.fn(),
  fromObservable: vi.fn(),
  fromPromise: vi.fn(),
  inspect: { inspect: 'inspect' },
  inspector: { inspector: 'inspector' },
  raise: vi.fn(),
  sendParent: vi.fn(),
  sendTo: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
}
