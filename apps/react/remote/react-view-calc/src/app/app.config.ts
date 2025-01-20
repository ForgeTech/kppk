import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
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
import { environment } from './../environments/environment';
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
        availableLangs: environment.i18n.availableLangs,
        defaultLang: environment.i18n.defaultLang,
        reRenderOnLangChange: environment.i18n.reRenderOnLangChange,
        prodMode: environment.i18n.prodMode,
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
