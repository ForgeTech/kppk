import { NgxLoggerLevel } from 'ngx-logger';

// import localforage from 'localforage';
import { PREFERED_COLOR_SCHEME } from '@kppk/fg-lib';
import { FgEnvironmentConfigInterface } from '@kppk/fg-lib';
import { AppConfigInterface } from '../interface';

// import { FgSpinnerGuardEvent } from '@fg-kppk/fg-base';
const version = 'TEST.TEST.TEST';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: FgEnvironmentConfigInterface<AppConfigInterface> = {
  version,
  production: false,
  test: false,
  serviceWorker: {
    enabled: false,
    registrationStrategy: 'registerWhenStable:30000',
    // script: './ngsw-worker.js',
    // pushServerPublicKey: 'BHIGrJyrJC7NW0RZSgJ6cnpws_9nm-NpQDxnAK8FiTTRwIvrhmiC2b5T9elNdr2x0M19rgSMP0CT-dI2v9kmX6c',
  },
  logger: {
    level: NgxLoggerLevel.WARN,
  },
  request: {
    apiBaseUrl: 'api/',
    urlOverrides: [
      // { match: './assets/', replace: './assets2/' }
    ],
    httpHeaders: [
      // { header: 'X-Test', value: 'FARK_FARK_FARK' }
      // { header: 'Access-Control-Allow-Origin', value: '*' },
    ],
  },
  development: {
    enabled: false,
    authorize: {
      credentials: {
        username: 'ADMIN',
        password: 'ADMIN!2023',
        cache: false,
      },
      // token: {
      //   username: 'TestUser',
      //   token: 'testToken',
      //   forcePasswordChange: false,
      // },
    },
    // httpHeaders: [
    //   // { header: 'X-Dev-Test', value: 'DEV_DEV_DEV' }
    // ],
    event: {
      eventsTolog: [
        // FgBaseEvent.AFTER_VIEW_INIT,
        // FgBaseEvent.ON_INIT,
        // FgBreakpointEvent.DETECTED,
        // FgAuthEvent.LOGIN,
        // FgAuthEvent.LOGOUT,
        // FgAuthEvent.AUTHORIZATION_ERROR,
        // FgAuthEvent.AUTHORIZED,
        // FgAuthEvent.SET_CREDENTIALS
        // FgLayoutDrawerEvent.OPEN_DRAWER,
        // FgAutocompleteTypeEvent.INIT,
        // FgSpinnerGuardEvent.DISABLE,
        // FgSpinnerGuardEvent.ENABLE,
        // FgSpinnerGuardEvent.START,
        // FgSpinnerGuardEvent.END,
        // FgFormlyFormEvent.SUBMIT,
        // FgAllowCookieEvent.SHOW_COOKIE_WARNING,
      ],
      level: 'fatal',
    },
  },
  storage: {
    name: 'Fg-Localforage-IndexDB',
    // driver: localforage.WEBSQL,
    storeName: 'FgBaseApp',
  },
  i18n: {
    scopes: {
      keepCasing: undefined
    },
    assetPath: 'assets/i18n/',
    defaultLang: 'de',
    fallbackLang: ['en'],
    availableLangs: ['en', 'de'],
    reRenderOnLangChange: true,
    prodMode: false,
    failedRetries: 1,
    interpolation: ['{{', '}}'],
    missingHandler: {
      allowEmpty: false,
      logMissingKey: true,
      useFallbackTranslation: true,
    },
    flatten: {
      aot: false,
    },
  },
  app: {
    config: {
      settings: {
        acceptedCookies: true,
        lang: 'de',
        textDirection: 'left-to-right',
        theme: PREFERED_COLOR_SCHEME.light,
        uiLeftHanded: true,
      },
      breakpoint: undefined,
      device: undefined,
      // orientation: undefined,
    },
    user: {
      roles: {
        root: 'admin',
        active: 'admin',
        available: ['admin', 'authenticated', 'unauthorized'],
      },
      settings: {
        acceptedCookies: true,
        lang: 'de',
        textDirection: 'left-to-right',
        theme: PREFERED_COLOR_SCHEME.light,
        uiLeftHanded: true,
      },
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
