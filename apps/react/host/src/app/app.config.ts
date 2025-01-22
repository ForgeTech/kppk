import { 
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
  makeEnvironmentProviders,
  provideExperimentalZonelessChangeDetection,
  providePlatformInitializer, 
} from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading, withViewTransitions } from '@angular/router';
import { app_routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FG_ENVIRONMENT, FgEnvironmentService, FgStorageService, FgStorageLocalforageService, FgStorageNgxCookieService, FgBreakpoint, FgEventService } from '@kppk/fg-lib-new';
import { LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment.prod';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { KppkGlobalError,KppkReactSharedService,TranslocoHttpLoader } from '@kppk/react-lib';
import { CookieModule } from 'ngx-cookie';

export const appConfig: ApplicationConfig = {
  providers: [
    makeEnvironmentProviders([
      importProvidersFrom(LoggerModule.forRoot({
        // serverLoggingUrl: '/api/logs',
        level: environment.logger.level,
        // serverLogLevel: NgxLoggerLevel.ERROR
      })),
      FgEventService
    ]),
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
    FgEnvironmentService,
    { provide: FG_ENVIRONMENT, useValue: environment },
    { provide: ErrorHandler, useClass: KppkGlobalError },
    { provide: FgStorageService, useClass: FgStorageLocalforageService },
    FgStorageNgxCookieService,
    importProvidersFrom(CookieModule.forRoot()),
    FgBreakpoint,
    KppkReactSharedService,
  ],
};
