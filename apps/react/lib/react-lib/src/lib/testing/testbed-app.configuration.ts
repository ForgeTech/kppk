import { provideHttpClient } from "@angular/common/http";
import { importProvidersFrom, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { CRYPTO, FG_ENVIRONMENT, FgEnvironmentService, FgStorageNgxCookieService, FgWebcryptoService } from "@kppk/fg-lib-new";
import { LoggerTestingModule } from "ngx-logger/testing";
import { environment } from "./environment";
import { provideAutoSpy } from "jest-auto-spies";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { KppkRegisterIconsService } from "../service";
import { RouterModule } from "@angular/router";
import * as crypto from "crypto";

export const testbet_app_common_config = {
    imports: [
      RouterModule,
      LoggerTestingModule
    ],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideExperimentalZonelessChangeDetection(),
      importProvidersFrom(LoggerTestingModule),
      // provideAutoSpy(ApplicationRef),
      // provideAutoSpy(FgImmutableService),
      provideAutoSpy(FgStorageNgxCookieService),
      provideAutoSpy(KppkRegisterIconsService),
      provideAutoSpy(FgEnvironmentService),
      { provide: FG_ENVIRONMENT, useValue: environment },
      provideAutoSpy(FgWebcryptoService),
      { provide: CRYPTO, useValue: crypto },
    ]
  }