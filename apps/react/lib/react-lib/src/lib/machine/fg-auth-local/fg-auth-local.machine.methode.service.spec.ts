import { AuthCookieFgAuthLocal, ContextFgAuthLocal, ContextFgAuthLocalParser } from "./fg-auth-local.machine.types";
import { AnyEventObject, DoneActorEvent, ErrorActorEvent } from "xstate";
import { FG_ENVIRONMENT, FgStorageNgxCookieService } from "@kppk/fg-lib-new";
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Spy, provideAutoSpy } from 'jest-auto-spies';

import { FgAuthLocalMachineMethodeService } from './fg-auth-local.machine.methode.service';
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { LoggerTestingModule } from 'ngx-logger/testing';
import { TestBed } from "@angular/core/testing";
import { ZodError } from "zod";
import { test_environment } from "../../testing/test-environment";
import { FgImmutableService } from "../../service/fg-immutable.service";
import { NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from "ngx-logger";
import { CRYPTO, FgWebcryptoService } from "@kppk/fg-lib-new";
import * as crypto from "crypto";

describe('FgAuthLocalMachine', () => {
  let $service: FgAuthLocalMachineMethodeService;
  let $immer: FgImmutableService;
  let $immer_produce_mock: any;
  let $cookie_mock: Spy<FgStorageNgxCookieService>;
  let context: ContextFgAuthLocal;
  const event: AnyEventObject = { type: 'MockEvent' };
  let auth_cookie_admin: AuthCookieFgAuthLocal;
  let auth_cookie_invalid: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
      ],
      providers: [
        FgAuthLocalMachineMethodeService,
        FgWebcryptoService,
        FgImmutableService,
        provideAutoSpy(FgStorageNgxCookieService),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TOKEN_LOGGER_CONFIG, useValue: { level: NgxLoggerLevel.ERROR } },
        { provide: FG_ENVIRONMENT, useValue: test_environment },
        { provide: CRYPTO, useValue: crypto }
      ],
    });
    $service = TestBed.inject(FgAuthLocalMachineMethodeService);

    $http = TestBed.inject(HttpClient);
    $http_controller = TestBed.inject(HttpTestingController);

    $immer = TestBed.inject(FgImmutableService);
    $immer_produce_mock = jest.spyOn($immer, 'produce');
    // $log_mock = TestBed.inject(NGXLogger);
    $cookie_mock = TestBed.inject(FgStorageNgxCookieService) as Spy<FgStorageNgxCookieService>;
    $cookie_mock.getItem.mockReset();

    context = ContextFgAuthLocalParser.parse({});
    auth_cookie_admin = {
      token: "_8qcckJzybYauxZwiVlYMl7dEpUXyhbcVKPTAGKP4-k=",
      userSalt: "SA6hckAvHJVZYo8jlaao9QGn2X2Zfrmlxz19ilXg3xE=",
      sharedSalt: "5C7VHcmgj4HAUu8IVD3emCls17HtGz53/8OhHtk3xBE=",
      profile: {
        active: true,
        admin: true,
        cookieLifeTime: '2d',
        email: 'test-user@test.com',
        username: 'Test_User_1'
      }
    };
    auth_cookie_invalid = {
      invalid: 'invalid'
    };
  });
  afterEach(async () => {
    jest.resetAllMocks();
  });

  describe('METHODE: ContextFgAuthLocalParserParser', () => {
    it('validated default values', () => {
      expect(context.auth_cookie).toBe(undefined);
      expect(context.auth_cookie_storage_key).toBe('fg-auth-local-cookie');
      expect(context.error).toBe(undefined);
      expect(context.path).toBe('./auth-local/');
      expect(context.salt).toBe(undefined);
      expect(context.salt_filename).toBe('salt.json');
    })
  })

    describe('METHODE: send_authorized_event_to', () => {
      it('CHECK: returns \'fg.auth.local.event.authorized\' event', () => {
        context.auth_cookie = auth_cookie_admin;
        expect( $service.send_authorized_event_to({ context, event }).type ).toBe('fg.auth.local.event.authorized');
      }); 
      it('THROWS if authCookie on context is undefined', () => {
        context.auth_cookie = undefined;
        // CAUTION: If testing if methoed throws error and it's not working read
        // https://stackoverflow.com/a/66109855/1622564
        expect( () => $service.send_authorized_event_to({ context, event }) ).toThrow(ZodError);
      });
    });

    describe('METHODE: send_unauthorized_event_to', () => {
      it('CHECK: returns \'fg.auth.local.event.unauthorized\' event', () => {
        expect( $service.send_unauthorized_event_to({ context, event }).type ).toBe('fg.auth.local.event.unauthorized');
      });  
    });

    describe('METHODE: escalate_auth_local_key_error', () => {
      it('THROWS \'fg-auth-local-key-error\' if auth-local key-file is unable to load', () => {
        // CAUTION: If testing if methoed throws error and it's not working read
        // https://stackoverflow.com/a/66109855/1622564
        expect( () => $service.escalate_auth_local_key_error({ context, event }) ).toThrow(Error);
      });
    });

    describe('METHODE: assign_auth_cookie', () => {
      let event: DoneActorEvent;
      beforeEach(async () => {
        event = {
          type: 'xstate.done.actor.test',
          actorId: '',
          output: auth_cookie_admin
        };
      })
      it('CHECK: result context is frozen object (IMMER.JS)', () => {
        const result = $service.assign_auth_cookie({ context, event });
        expect(Object.isFrozen(result)).toBe(true);
        expect($immer_produce_mock).toHaveBeenCalledTimes(1);
      });
      it('CHECK: if auth-cookie from event is set on context', () => {
        const result = $service.assign_auth_cookie({ context, event });
        expect(result.auth_cookie).toStrictEqual(event.output);
      });
    });

    // describe('METHODE: assign_auth_key', () => {
    //   let event: DoneActorEvent;
    //   beforeEach(async () => {
    //     event = {
    //       type: 'xstate.done.actor.test',
    //       output: 'auth-key'
    //     };
    //   })
    //   it('CHECK: result context is frozen object (IMMER.JS)', () => {
    //     const result = $service.assign_auth_key({ context, event });
    //     expect(Object.isFrozen(result)).toBe(true);
    //     expect($immer_produce_mock).toHaveBeenCalledTimes(1);
    //   });
    //   it('CHECK: if auth-key from event is set on context', () => {
    //     const result = $service.assign_auth_key({ context, event });
    //     expect(result.salt).toStrictEqual(event.output);
    //   });
    // });
    
    describe('METHODE: assign_authorization_error', () => {
      let event: ErrorActorEvent;
      beforeEach(async () => {
        event = {
          type: 'xstate.error.actor.test',
          actorId: '',
          error: new Error('test-error-authorization')
        }
      })
      it('CHECK: result context is frozen object (IMMER.JS)', () => {
        const result = $service.assign_authorization_error({ context, event });
        expect(Object.isFrozen(result)).toBe(true);
        expect($immer_produce_mock).toHaveBeenCalledTimes(1);
      });
      it('CHECK: assigns error message from event to context', () => {
        const result = $service.assign_authorization_error({ context, event });
        expect(result.error).toBe((event.error as Error).message)
      });
    });

    describe('METHODE: assign_clear_authorization_error', () => {
      it('CHECK: result context is frozen object (IMMER.JS)', () => {
        const result = $service.assign_clear_authorization_error({ context, event });
        expect(Object.isFrozen(result)).toBe(true);
        expect($immer_produce_mock).toHaveBeenCalledTimes(1);
      });
      it('CHECK: removes error message from context', () => {
        context.error = 'has-error';
        const result = $service.assign_clear_authorization_error({ context, event });
        expect(result.error).toBe(undefined);
      });
    });

    describe('METHODE: assign_clear_auth_cookie', () => {
      it('CHECK: result context is frozen object (IMMER.JS)', () => {
        const result = $service.assign_clear_auth_cookie({ context, event });
        expect(Object.isFrozen(result)).toBe(true);
        expect($immer_produce_mock).toHaveBeenCalledTimes(1);
      });
      it('CHECK: removes authCookie from context', () => {
        context.auth_cookie = auth_cookie_admin;
        const result = $service.assign_clear_auth_cookie({ context, event });
        expect(result.auth_cookie).toBe(undefined);
      });
    });

    describe('METHODE: assign_revoke_authorization_error', () => {
      let event: ErrorActorEvent;
      beforeEach(async () => {
        event = {
          type: 'xstate.error.actor.test',
          actorId: '',
          error: new Error('test-error-revoke-error')
        }
      })
      it('CHECK: result context is frozen object (IMMER.JS)', () => {
        const result = $service.assign_revoke_authorization_error({ context, event });
        expect(Object.isFrozen(result)).toBe(true);
        expect($immer_produce_mock).toHaveBeenCalledTimes(1);
      });
      it('CHECK: assigns error message from event to context', () => {
        const result = $service.assign_revoke_authorization_error({ context, event });
        expect(result.error).toBe((event.error as Error).message)
      });
    });

    describe('METHODE: escalate_auth_load_cookie_error', () => {
      it('THROWS \'fg-auth-load-cookie-error\' on auth-cookie unable to load ', () => {
        // CAUTION: If testing if methoed throws error and it's not working read
        // https://stackoverflow.com/a/66109855/1622564
        expect( () => $service.escalate_auth_load_cookie_error({ context, event }) ).toThrow(Error);
      });
    });

    describe('METHODE: guard_has_auth_cookie', () => {
      it('CHECK: returns true', () => {
        context.auth_cookie = auth_cookie_admin;
        expect( $service.guard_has_auth_cookie( { context, event } )).toBe(true);
      });
      it('CHECK: returns false', () => {
        context.auth_cookie = undefined;
        expect( $service.guard_has_auth_cookie( { context, event } )).toBe(false);
      });
    });

    // describe('METHODE: actor_load_auth_cookie', () => {
    //   it('CHECK: returns valid cookie from context.authCookieStorageKey', ( done ) => {
    //     const input = { context, event };
    //     $cookie_mock.getItem.mockReturnValue(of(auth_cookie_admin));
    //     $service.actor_load_auth_cookie( { input } ).subscribe({
    //       next: result => {
    //         expect( result ).toStrictEqual(auth_cookie_admin);
    //         expect($cookie_mock.getItem).toHaveBeenCalledWith(context.authCookieStorageKey);
    //         expect($cookie_mock.getItem).toHaveBeenCalledTimes(1);
    //         done();
    //       },
    //     })
    //   });
    //   it('CHECK: THROWS on invalid cookie from context.authCookieStorageKey', ( done ) => {
    //     const input = { context, event };
    //     $cookie_mock.getItem.mockReturnValue(of({ auth_cookie_invalid }));
    //     $service.actor_load_auth_cookie( { input } ).subscribe({
    //       error: ( error ) => {
    //         expect( error.message ).toBe('error_actor_load_auth_cookie_invalid');
    //         done();
    //       }
    //     });
    //   });
    // });
});
