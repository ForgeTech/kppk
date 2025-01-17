import { 
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection 
} from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FG_ENVIRONMENT, FgEnvironmentService } from '@kppk/fg-lib-new';
import { LoggerModule, NGXLogger, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from 'ngx-logger';
import { environment } from '../environments/environment.prod';
import { CookieModule, CookieService } from 'ngx-cookie';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { KppkGlobalError } from '@kppk/react-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      appRoutes,
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
    importProvidersFrom(CookieModule.withOptions({})),
    importProvidersFrom(LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })),
    FgEnvironmentService,
    { provide: FG_ENVIRONMENT, useValue: environment },

    { provide: ErrorHandler, useClass: KppkGlobalError },
  ],
};
