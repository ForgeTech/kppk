import { TestBed } from '@angular/core/testing';
import * as crypto from "crypto";
import { CRYPTO, FgWebcryptoService,  } from './fg-webcrypto.service';
import { DOCUMENT } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('FgWebcryptoService', () => {
  let spy_console_warn: jest.SpyInstance;
  let document_mock: any;
  beforeEach(()=> {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(LoggerTestingModule),
      ]
    });
    spy_console_warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    document_mock = {
      defaultView: {
        crypto: {
          subtle: 'mock'
        }
      }
    };
  });

  describe(`>> With angular 'DOCUMENT'`, () => {
    beforeEach(() => {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({
        providers: [
          importProvidersFrom(LoggerTestingModule),
          { provide: DOCUMENT, useValue: document_mock }
        ]
      });
    });
    it('should be created', () => {
      const service = TestBed.inject(FgWebcryptoService);
      expect(service).toBeTruthy();
    });
    it('crypto is set to available implementation', () => {
      const service = TestBed.inject(FgWebcryptoService);
      expect( service.crypto.subtle ).toBe('mock');
    });
  })

  describe(`>> With angular 'DOCUMENT' overwritten by 'CRYPTO' InjectionToken`, () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          importProvidersFrom(LoggerTestingModule),
          { provide: DOCUMENT, useValue: document_mock },
          { provide: CRYPTO, useValue: crypto }
        ]
      });
    });
    it(`crypto equals implementation provided by 'CRYPTO' InjectionToken`, () => {
      const service = TestBed.inject(FgWebcryptoService);
      expect( service.crypto ).toBe(crypto);
    }); 
  })

  describe(`>> Without angular 'DOCUMENT' and 'CRYPTO' InjectionToken`, () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          importProvidersFrom(LoggerTestingModule),
        ]
      });
    });
    it(`crypto equals implementation provided by 'CRYPTO' InjectionToken`, () => {
      let service;
      try {
        service = TestBed.inject(FgWebcryptoService);
      } catch (error) {
        expect(service).toBeFalsy()
      }
    }); 
  })
  
});
