import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  makeEnvironmentProviders,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withDisabledInitialNavigation,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { app_routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  FG_ENVIRONMENT,
  FgEnvironmentService,
  FgStorageService,
  FgStorageLocalforageService,
  FgStorageNgxCookieService,
  FgBreakpoint,
  FgEventService,
} from '@kppk/fg-lib-new';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import {
  FgAuthLocalMachineActorService,
  FgAuthLocalMainMachineActorService,
  FgSpinnerMachineActorService,
  FgSpinnerMainMachineActorService,
  KppkGlobalError,
  ReactMainV3MachineActorService,
  ReactRunningV7MachineActorService,
  ReactRunningV7MainMachineActorService,
  ReactViewCalculationMachineActorService,
  ReactViewCalculationMainMachineActorService,
  ReactViewHomeMachineActorService,
  ReactViewHomeMainMachineActorService,
  TranslocoHttpLoader,
} from '@kppk/react-lib';
import { CookieService } from 'ngx-cookie-service';
import { FgNavigationMainMachineActorService, FgNavigationMachineActorService } from '@kppk/react-lib';

import { GlobalWorkerOptions } from 'pdfjs-dist';
GlobalWorkerOptions.workerSrc = './pdf.worker.min.js';

export const appConfig: ApplicationConfig = {
  providers: [
    // makeEnvironmentProviders([
      FgEventService,
      FgEnvironmentService,
      { provide: FG_ENVIRONMENT, useValue: environment },
      importProvidersFrom(
        LoggerModule.forRoot({
          // serverLoggingUrl: '/api/logs',
          level: environment.logger.level,
          // serverLogLevel: NgxLoggerLevel.ERROR
        })
      ),
    // ]),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      app_routes,
      withViewTransitions(),
      withPreloading(PreloadAllModules),
      withDisabledInitialNavigation(),
      withRouterConfig({
         onSameUrlNavigation: 'ignore'
      }),
      // Provides debug output
      withDebugTracing(),
    ),
    provideAnimations(),

    provideTransloco({
      config: {
        availableLangs: environment.i18n.availableLangs,
        defaultLang: environment.i18n.defaultLang,
        reRenderOnLangChange: environment.i18n.reRenderOnLangChange,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
    // FgEnvironmentService,
    // { provide: FG_ENVIRONMENT, useValue: environment },
    { provide: ErrorHandler, useClass: KppkGlobalError },
    // { provide: FgStorageService, useClass: FgStorageLocalforageService },
    FgStorageNgxCookieService,
    FgBreakpoint,
    CookieService,
    ReactMainV3MachineActorService,
    { provide: FgSpinnerMachineActorService, useClass: FgSpinnerMainMachineActorService},
    { provide: ReactRunningV7MachineActorService, useClass: ReactRunningV7MainMachineActorService},
    { provide: FgAuthLocalMachineActorService, useClass: FgAuthLocalMainMachineActorService},
    { provide: ReactViewHomeMachineActorService, useClass: ReactViewHomeMainMachineActorService},
    { provide: ReactViewCalculationMachineActorService, useClass: ReactViewCalculationMainMachineActorService},
    { provide: FgNavigationMachineActorService, useClass: FgNavigationMainMachineActorService}
  ],
};
