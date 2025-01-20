import { 
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
  provideExperimentalZonelessChangeDetection, 
} from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading, withViewTransitions } from '@angular/router';
import { app_routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FG_ENVIRONMENT, FgEnvironmentService, FgStorageService, FgStorageLocalforageService } from '@kppk/fg-lib-new';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from '../environments/environment.prod';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { KppkGlobalError,TranslocoHttpLoader } from '@kppk/react-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      app_routes,
      withViewTransitions(),
      withPreloading(PreloadAllModules),
      // Provides debug output
      // withDebugTracing(),
    ),
    provideAnimations(),
    provideHttpClient(
      withFetch(), 
      withInterceptorsFromDi()
    ),
    provideTransloco({
      config: {
        availableLangs: environment.i18n.availableLangs,
        defaultLang: environment.i18n.defaultLang,
        reRenderOnLangChange: environment.i18n.reRenderOnLangChange,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
    importProvidersFrom(LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })),
    FgEnvironmentService,
    { provide: FG_ENVIRONMENT, useValue: environment },
    { provide: ErrorHandler, useClass: KppkGlobalError },
    { provide: FgStorageService, useClass: FgStorageLocalforageService },
  ],
};
