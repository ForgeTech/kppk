import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import {
  test_environment,
  KppkAuthLocalActorService,
  KppkRegisterIconsService,
  KppkSpinnerActorService,
} from '@kppk/react-lib';
import { provideRouter, RouterModule } from '@angular/router';
import { provideAutoSpy } from 'jest-auto-spies';
import {
  FG_ENVIRONMENT,
  FgEnvironmentService,
  FgStorageNgxCookieService,
} from '@kppk/fg-lib-new';
import { LoggerTestingModule } from 'ngx-logger/testing';
import {
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';

describe('AppService', () => {
  const KppkSpinnerActorMock = {
    start: jest.fn(),
    stop: jest.fn(),
    send: jest.fn(),
  };
  const KppkAuthLocalActorMock = {
    start: jest.fn(),
    stop: jest.fn(),
    send: jest.fn(),
  };
  // let $appRef: ApplicationRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      providers: [
        provideRouter(appRoutes),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
        importProvidersFrom(LoggerTestingModule),
        // provideAutoSpy(ApplicationRef),
        // provideAutoSpy(FgImmutableService),
        provideAutoSpy(FgStorageNgxCookieService),
        provideAutoSpy(KppkRegisterIconsService),
        provideAutoSpy(FgEnvironmentService),
        { provide: FG_ENVIRONMENT, useValue: test_environment },
        // provideAutoSpy(FgWebcryptoService),
        // { provide: CRYPTO, useValue: crypto },
        { provide: KppkSpinnerActorService, useValue: KppkSpinnerActorMock },
        {
          provide: KppkAuthLocalActorService,
          useValue: KppkAuthLocalActorMock,
        },
        AppService,
      ],
    });
    jest.resetAllMocks();
  });

  it('should be created', () => {
    const $service = TestBed.inject(AppService);
    expect($service).toBeTruthy();
  });

  describe('>> on initialization and BEFORE promise $app_ref.whenStable resolves', () => {
    it("has 'app_readyS' signal initialized with false", () => {
      const $service = TestBed.inject(AppService);
      expect($service.app_readyS()).toBe(false);
    });
    // });
    it('$spinner is started and show event with payload force:true is sent', () => {
      const $service = TestBed.inject(AppService);
      // Start $spinner actor service
      expect($service['$spinner']['start']).toHaveBeenCalledTimes(1);
      // Force $spinner actor into DISPLAY > SHOWN state
      const event = { type: 'fg.spinner.event.show', payload: { force: true } };
      expect($service['$spinner']['send']).toHaveBeenCalledWith(event);
    });
    it('$auth actor is started', () => {
      const $service = TestBed.inject(AppService);
      // Start $spinner actor service
      expect($service['$auth']['start']).toHaveBeenCalledTimes(1);
    });
  });

  describe('>> on initialization and AFTER promise $app_ref.whenStable resolves', () => {
    it('After promise $app_ref.whenStable resolved hide event is sent to $spinner and app_readyS() is true', async () => {
      const $service = TestBed.inject(AppService);
      await $service['$app_ref']['whenStable'];
      const event = {
        type: 'fg.spinner.event.hide',
        payload: { force: false },
      };
      expect($service['$spinner']['send']).toHaveBeenCalledWith(event);
      expect($service.app_readyS()).toBe(true);
    });
  });
});
