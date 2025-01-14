import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { FG_ENVIRONMENT, CRYPTO, FgEnvironmentService, FgStorageNgxCookieService } from '@kppk/fg-lib-new';
import { NGXLogger, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from 'ngx-logger';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import {  FgWebcryptoService } from '@kppk/fg-lib-new';
import { FgAuthLocalMethodeService, FgImmutableService, FgXstateService } from '@kppk/react-lib';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import * as crypto from "crypto";
import { ApplicationRef } from '@angular/core';


describe.only('AppService', () => {
  let $service: AppService;
  let $appRef: ApplicationRef;
  let spy_console_log = jest.spyOn(console, "log").mockImplementation(() => {});
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAutoSpy(ApplicationRef),
        provideAutoSpy(FgAuthLocalMethodeService),
        provideAutoSpy(FgImmutableService),
        provideAutoSpy(FgStorageNgxCookieService),
        provideAutoSpy(FgStorageNgxCookieService),
        provideAutoSpy(FgXstateService),
        provideAutoSpy(FgEnvironmentService),
        { provide: FG_ENVIRONMENT, useValue: {} },
        provideAutoSpy(NGXLogger),
        { provide: TOKEN_LOGGER_CONFIG, useValue: { level: NgxLoggerLevel.INFO } },
        provideAutoSpy(FgWebcryptoService),
        { provide: CRYPTO, useValue: crypto }
      ]
    });
    $service = TestBed.inject(AppService);
    $appRef = TestBed.inject(ApplicationRef);
  });
  it('should be created', () => {
    expect($service).toBeTruthy();
  });
  it('has app ', () => {
    expect($service.app_readyS).toBeTruthy();
  });
});
