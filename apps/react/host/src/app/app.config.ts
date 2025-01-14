import { 
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection 
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { FG_ENVIRONMENT, FgEnvironmentService } from '@kppk/fg-lib-new';
import { LoggerModule, NGXLogger, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from 'ngx-logger';
import { environment } from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    FgEnvironmentService,
    { provide: FG_ENVIRONMENT, useValue: environment },
    importProvidersFrom(LoggerModule.forRoot({
      // serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    })),
  ],
};
