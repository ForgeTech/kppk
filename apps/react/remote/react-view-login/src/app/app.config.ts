import { ApplicationConfig, importProvidersFrom, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '@kppk/react-lib';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { FG_ENVIRONMENT, FgEnvironmentService } from '@kppk/fg-lib-new';
import { environment } from './../../../../host/src/environments/environment';
import { CookieModule } from 'ngx-cookie';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideTransloco({
      config: {
        availableLangs: ['de', 'en'],
        defaultLang: 'de',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
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
    importProvidersFrom(CookieModule.withOptions({})),
  ],
};
