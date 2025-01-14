import { TestBed } from "@angular/core/testing";
import { 
  ContextFgSpinner,
  ContextFgSpinnerParser,
  EventFgSpinnerGetContextSendToMachineIdParser,
  EventFgSpinnerGetContextSendToMachineRefParser,
  EventFgSpinnerHideParser,
  EventFgSpinnerSetContextParser,
  EventFgSpinnerSetProgress,
  EventFgSpinnerSetProgressParser,
  EventFgSpinnerShowParser,
  ProgressItemFgSpinner 
} from "./fg-spinner.machine.types";
import { ZodError } from "zod";
import { FgImmutableService } from "../../service/fg-immutable.service";
import { environment } from "../../testing/environment";
import { FG_ENVIRONMENT, FgStorageNgxCookieService } from "@kppk/fg-lib-new";
import { LoggerTestingModule } from "ngx-logger/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideAutoSpy } from "jest-auto-spies";
import { NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from "ngx-logger";
import { provideHttpClient } from "@angular/common/http";
import { FgSpinnerMethodeService } from './fg-spinner-methode.service';

describe('SERVICE: FgSpinnerService', () => {
  let service: FgSpinnerMethodeService;
  let context: ContextFgSpinner;
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
      ],
      providers: [
        FgSpinnerMethodeService,
        FgImmutableService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAutoSpy(FgStorageNgxCookieService),
        { provide: FG_ENVIRONMENT, useValue: environment },
        { provide: TOKEN_LOGGER_CONFIG, useValue: { level: NgxLoggerLevel.ERROR } },
      ],
    });
    service = TestBed.inject(FgSpinnerMethodeService);
    context = ContextFgSpinnerParser.parse({});
  });

  // afterEach(async () => {});

  describe('METHODE: ContextFgSpinnerParser', () => {
    it('validated default values', () => {
      expect(context.allowReuse).toBe(true);
      expect(context.allowTimeoutReset).toBe(true);
      expect(context.delay_auto_dismiss_timeout_error).toBe(1000);
      expect(context.delay_before_shown).toBe(250);
      expect(context.delay_min_show_time).toBe(1000);
      expect(context.delay_timeout).toBe(0);
      expect(context.progressItems).toStrictEqual([]);
      expect(context.triggerCount).toBe(0);
    })
  })

  describe('METHODE: assign_set_context', () => {
    it('CHECK: result context is frozen object (IMMER.JS)', () => {
      const event = EventFgSpinnerSetContextParser.parse({});
      const result = service.assign_set_context({ context, event });
      expect(Object.isFrozen(result)).toBe(true);
    });
    it('CHECK: empty event payload doesn\'t mutate context', () => {
      const event = EventFgSpinnerSetContextParser.parse({});
      const result = service.assign_set_context({ context, event });
      expect(result).toBe(context);
    });
    it('CHECK event payload values are applied to context', () => {
      const event = EventFgSpinnerSetContextParser.parse({ payload: {
        allowReuse: false,
        allowTimeoutReset: false,
        delay_auto_dismiss_timeout_error: 111,
        delay_before_shown: 222,
        delay_min_show_time: 333,
        delay_timeout: 444,
        progressItems: [
          { 
            name: 'test'
          }
        ],
        triggerCount: 1
      }});
      const result = service.assign_set_context({ context, event });
      expect(result.allowReuse).toBe(false);
      expect(result.allowTimeoutReset).toBe(false);
      expect(result.delay_auto_dismiss_timeout_error).toBe(111);
      expect(result.delay_before_shown).toBe(222);
      expect(result.delay_min_show_time).toBe(333);
      expect(result.delay_timeout).toBe(444);
      // Only check array with one item was applied
      expect(result.progressItems.length).toBe(1);
      expect(result.triggerCount).toBe(1);
    });
    it('THROWS on invalid event type', () => {
      const event = { type: 'invalid-event-type' };
      // CAUTION: If testing if methoed throws error and it's not working read
      // https://stackoverflow.com/a/66109855/1622564
      expect( () => service.assign_set_context({ context, event }) ).toThrow(ZodError);
    });
  });

  describe('METHODE: assign_set_progress', () => {
    let event: EventFgSpinnerSetProgress;
    const progressItem1: ProgressItemFgSpinner = { name: 'test-1', progress: 0, finished: false};
    const progressItem2: ProgressItemFgSpinner = { name: 'test-2', progress: 0, finished: false};
    const progressItem2Progress30: ProgressItemFgSpinner = { name: 'test-2', progress: 30, finished: false};
    const progressItem2Progress50: ProgressItemFgSpinner = { name: 'test-2', progress: 50, finished: false};
    const progressItem2Progress100: ProgressItemFgSpinner = { name: 'test-2', progress: 100, finished: false};
    const progressItem2Finished: ProgressItemFgSpinner = { name: 'test-2', progress: 99, finished: true};
    const progressItem2ProgressInvalidToSmall: ProgressItemFgSpinner = { name: 'test-2', progress: -111, finished: true};
    const progressItem2ProgressInvalidToBig: ProgressItemFgSpinner = { name: 'test-2', progress: 111, finished: true};
    const progressItem3: ProgressItemFgSpinner = { name: 'test-3', progress: 0, finished: false};
    beforeEach(async () => {
      event = EventFgSpinnerSetProgressParser.parse({
        payload: {
          items: []
        }
      });
    });

    // afterEach(async () => {});

    it('CHECK: result context is frozen object (IMMER.JS)', () => {
      const result = service.assign_set_progress({ context, event });
      expect(Object.isFrozen(result)).toBe(true);
    });
    it('CHECK: event without progress items doesn\'t modify context', () => {
      const result = service.assign_set_progress({context, event});
      expect(result.progressItems).toStrictEqual([]);
      expect(context===result).toBe(true);
    }); 
    it('CHECK: event with items adds them to context', () => {
      // Add single item
      event.payload.items = progressItem1;
      context = service.assign_set_progress({context, event});
      expect(context.progressItems.length).toBe(1);
      expect(context.progressItems).toStrictEqual([progressItem1]);
      // Add items from array
      event.payload.items = [ progressItem2Progress30, progressItem3 ];
      const result1 = service.assign_set_progress({context, event});
      expect(result1.progressItems).toStrictEqual([progressItem1, progressItem2Progress30, progressItem3]);
    }); 
    it('CHECK: items with progress changes update context items progress', () => {
      context.progressItems = [progressItem2];
          
      event.payload.items = progressItem2Progress30;
      context = service.assign_set_progress({context, event});
      expect(context.progressItems[0]).toStrictEqual(progressItem2Progress30);

      event.payload.items = progressItem2Progress30;
      context = service.assign_set_progress({context, event});
      expect(context.progressItems[0]).toStrictEqual(progressItem2Progress30);

      event.payload.items = progressItem2Progress50;
      context = service.assign_set_progress({context, event});
      expect(context.progressItems[0]).toStrictEqual(progressItem2Progress50);
  
      event.payload.items = progressItem2Progress100;
      context = service.assign_set_progress({context, event});
      expect(context.progressItems[0]).toStrictEqual(progressItem2Progress100);
    }); 
    it('CHECK: items with finished flags aren\'t added', () => {
      context.progressItems = [progressItem1, progressItem3];
      expect(context.progressItems.length).toBe(2);
      event.payload.items = progressItem2Finished;
      context = service.assign_set_progress({context, event});
      expect(context.progressItems.length).toBe(2);
      expect(context.progressItems).toStrictEqual([progressItem1, progressItem3]);
    }); 
    it('CHECK: items with finished flag are removed', () => {
      context.progressItems = [progressItem1, progressItem2, progressItem3];
      expect(context.progressItems.length).toBe(3);
      event.payload.items = progressItem2Finished;
      context = service.assign_set_progress({context, event});
      expect(context.progressItems.length).toBe(2);
      expect(context.progressItems).toStrictEqual([progressItem1, progressItem3]);
    }); 
    it('THROWS: on event item with invalid progress', () => {
      context.progressItems = [progressItem2];
      event.payload.items = progressItem2ProgressInvalidToSmall;
      expect(() => service.assign_set_progress({context, event})).toThrow(ZodError);

      event.payload.items = progressItem2ProgressInvalidToBig;
      expect(() => service.assign_set_progress({context, event})).toThrow(ZodError);
    }); 
    it('THROWS on invalid event type', () => {
      const event = { type: 'invalid-event-type' };
      // CAUTION: If testing if methoed throws error and it's not working read
      // https://stackoverflow.com/a/66109855/1622564
      expect( () => service.assign_set_progress({ context, event }) ).toThrow(ZodError);
    });
  });

  describe('METHODE: escalate_timeout_error', () => {
    it('THROWS timeout error ', () => {
      // CAUTION: If testing if methoed throws error and it's not working read
      // https://stackoverflow.com/a/66109855/1622564
      expect( () => service.escalate_timeout_error() ).toThrow(Error);
    });
  });

  describe('METHODE: raise_spinner_event_stop', () => {
    it('CHECK: returns \'fg.spinner.event.stop\' event', () => {
      expect( service.raise_spinner_event_stop().type ).toBe('fg.spinner.event.stop');
    });  
  });

  describe('METHODE: raise_spinner_internal_hide', () => {
    it('CHECK: returns \'fg.spinner.internal.hide\' event', () => {
      expect( service.raise_spinner_internal_hide().type ).toBe('fg.spinner.internal.hide');
    });
  });

  describe('METHODE: raise_spinner_internal_show', () => {
    it('CHECK: returns \'fg.spinner.internal.show\' event', () => {
      expect( service.raise_spinner_internal_show().type ).toBe('fg.spinner.internal.show');
    });
  });

  describe('METHODE: respond_spinner_event_context_get_target', () => {
    it('CHECK: returns machineId from context as target', () => {
      const event = EventFgSpinnerGetContextSendToMachineIdParser.parse({
        payload: {
            machineId: 'helper'
        }
      });
      const result = service.respond_spinner_event_context_get_target({ event });
      expect(result).toBe(event.payload.machineId);
    });
    it('CHECK: returns machineRef from context as target', () => {
      const testMachineRefMock = { machine: 'test'}
      const event = EventFgSpinnerGetContextSendToMachineRefParser.parse({
        payload: {
            machineRef: testMachineRefMock
        }
      });
      const result = service.respond_spinner_event_context_get_target({ event });
      expect(result).toBe(event.payload.machineRef);
    });
    it('THROWS on invalid event type', () => {
      const event = { type: 'invalid-event-type' };
      // CAUTION: If testing if methoed throws error and it's not working read
      // https://stackoverflow.com/a/66109855/1622564
      expect( () => service.respond_spinner_event_context_get_target({ event }) ).toThrow(ZodError);
    });
  });

  describe('METHODE: respond_spinner_event_context_get_event', () => {
    it('CHECK: returns \'fg.spinner.event.respond_context\' event with payload of current context', () => {
      const result = service.respond_spinner_event_context_get_event({ context });
      expect(result.type).toBe('fg.spinner.event.respond_context');
      expect(result.payload.context).toStrictEqual(context);
    });
  });

  describe('METHODE: assign_decrease_triggers_count', () => {
    it('CHECK: increases context trigger_count', () => {
      context.triggerCount = 3;
      expect( context.triggerCount ).toBe(3);
      context = service.assign_decrease_triggers_count( { context } );
      expect( context.triggerCount ).toBe(2);
      context = service.assign_decrease_triggers_count( { context } );
      expect( context.triggerCount ).toBe(1);
      context = service.assign_decrease_triggers_count( { context } );
      expect( context.triggerCount ).toBe(0);
      context = service.assign_decrease_triggers_count( { context } );
      expect( context.triggerCount ).toBe(0);
    });
  });

  describe('METHODE: assign_increase_triggers_count', () => {
    it('CHECK: increases context trigger_count', () => {
      expect( context.triggerCount ).toBe(0);
      context = service.assign_increase_triggers_count( { context } );
      expect( context.triggerCount ).toBe(1);
      context = service.assign_increase_triggers_count( { context } );
      expect( context.triggerCount ).toBe(2);
      context = service.assign_increase_triggers_count( { context } );
      expect( context.triggerCount ).toBe(3);
      context = service.assign_increase_triggers_count( { context } );
      expect( context.triggerCount ).toBe(4);
    });
  });

  describe('METHODE: raise_spinner_internal_force_hide', () => {
    it('CHECK: returns \'fg.spinner.internal.force_hide\' event', () => {
      expect( service.raise_spinner_internal_force_hide().type ).toBe('fg.spinner.internal.force_hide');
    });
  });

  describe('METHODE: raise_spinner_internal_force_show', () => {
    it('CHECK: returns \'fg.spinner.internal.force_show\' event', () => {
      expect( service.raise_spinner_internal_force_show().type ).toBe('fg.spinner.internal.force_show');
    });
  });

  describe('METHODE: raise_spinner_internal_reset_timeout', () => {
    it('CHECK: returns \'fg.spinner.internal.reset_timeout\' event', () => {
      expect( service.raise_spinner_internal_reset_timeout().type ).toBe('fg.spinner.internal.reset_timeout');
    });
  });

  describe('METHODE: guard_force_hide_is_true', () => {
    it('CHECK: returns true', () => {
      const event = EventFgSpinnerHideParser.parse({});
      event.payload.force = true;
      expect( service.guard_force_hide_is_true( { event } )).toBe(true);
    });
    it('CHECK: returns false', () => {
      const event = EventFgSpinnerHideParser.parse({});
      expect( service.guard_force_hide_is_true( { event } )).toBe(false);
    });
    it('THROWS on invalid event type', () => {
      const event = { type: 'invalid-event-type' };
      // CAUTION: If testing if methoed throws error and it's not working read
      // https://stackoverflow.com/a/66109855/1622564
      expect( () => service.guard_force_hide_is_true({ event }) ).toThrow(ZodError);
    });
  });

  describe('METHODE: guard_force_show_is_true', () => {
    it('CHECK: returns true', () => {
      const event = EventFgSpinnerShowParser.parse({});
      event.payload.force = true;
      expect( service.guard_force_show_is_true( { event } )).toBe(true);
    });
    it('CHECK: returns false', () => {
      const event = EventFgSpinnerShowParser.parse({});
      expect( service.guard_force_show_is_true( { event } )).toBe(false);
    });
    it('THROWS on invalid event type', () => {
      const event = { type: 'invalid-event-type' };
      // CAUTION: If testing if methoed throws error and it's not working read
      // https://stackoverflow.com/a/66109855/1622564
      expect( () => service.guard_force_show_is_true({ event }) ).toThrow(ZodError);
    });
  });

  describe('METHODE: guard_allow_reuse_is_false', () => {
    it('CHECK: returns true', () => {
      context.allowReuse = false;
      expect( service.guard_allow_reuse_is_false( { context } )).toBe(true);
    });
    it('CHECK: returns false', () => {
      expect( service.guard_allow_reuse_is_false( { context } )).toBe(false);
    });
  });

  describe('METHODE: guard_delay_timeout_is_not_zero', () => {
    it('CHECK: returns false', () => {
      expect( service.guard_delay_timeout_is_not_zero( { context } )).toBe(false);
    });
    it('CHECK: returns true', () => {
      context.delay_timeout = 200;
      expect( service.guard_delay_timeout_is_not_zero( { context } )).toBe(true);
    });
  });

  describe('METHODE: guard_triggers_count_equals_zero', () => {
    it('CHECK: returns true', () => {
      expect( service.guard_triggers_count_equals_zero( { context } )).toBe(true);
    });
    it('CHECK: returns false', () => {
      context.triggerCount = 1;
      expect( service.guard_triggers_count_equals_zero( { context } )).toBe(false);
    });
  });

  describe('METHODE: guard_allow_timeout_reset_is_true', () => {
    it('CHECK: returns true', () => {
      expect( service.guard_allow_timeout_reset_is_true( { context } )).toBe(true);
    });
    it('CHECK: returns false', () => {
      context.allowTimeoutReset = false;
      expect( service.guard_allow_timeout_reset_is_true( { context } )).toBe(false);
    });
  });

  describe('METHODE: guard_delay_auto_dismiss_timeout_error_is_not_zero', () => {
    it('CHECK: returns true', () => {
      expect( service.guard_delay_auto_dismiss_timeout_error_is_not_zero( { context } )).toBe(true);
    });
    it('CHECK: returns false', () => {
      context.delay_auto_dismiss_timeout_error = 0;
      expect( service.guard_delay_auto_dismiss_timeout_error_is_not_zero( { context } )).toBe(false);
    });
  });

  describe('METHODE: delay_min_show_time', () => {
    it('CHECK: returns value from context', () => {
      expect( service.delay_min_show_time( { context } )).toBe(1000);
      context.delay_min_show_time = 111;
      expect( service.delay_min_show_time( { context } )).toBe(111);
    })
  });

  describe('METHODE: delay_timeout', () => {
    it('CHECK: returns value from context', () => {
      expect( service.delay_timeout( { context } )).toBe(0);
      context.delay_timeout = 111;
      expect( service.delay_timeout( { context } )).toBe(111);
    })
  });

  describe('METHODE: delay_before_shown', () => {
    it('CHECK: returns value from context', () => {
      expect( service.delay_before_shown( { context } )).toBe(250);
      context.delay_before_shown = 111;
      expect( service.delay_before_shown( { context } )).toBe(111);
    })
  });

  describe('METHODE: delay_auto_dismiss_timeout_error', () => {
    it('CHECK: returns value from context', () => {
      expect( service.delay_auto_dismiss_timeout_error( { context } )).toBe(1000);
      context.delay_auto_dismiss_timeout_error = 111;
      expect( service.delay_auto_dismiss_timeout_error( { context } )).toBe(111);
    })
  });
});
