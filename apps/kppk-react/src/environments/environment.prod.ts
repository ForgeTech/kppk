import { NgxLoggerLevel } from 'ngx-logger';

import localforage from 'localforage';

import { PREFERED_COLOR_SCHEME } from '@kppk/fg-lib-new';
import { FgEnvironmentConfigInterface } from '@kppk/fg-lib-new';
import { AppConfigInterface } from '@kppk/react-lib';

const version = require('package.json').version;
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: FgEnvironmentConfigInterface<AppConfigInterface> = {
  version,
  production: true,
  test: false,
  serviceWorker: {
    enabled: true,
    registrationStrategy: 'registerWhenStable:30000',
    // script: './ngsw-worker.js',
    // pushServerPublicKey: 'BHIGrJyrJC7NW0RZSgJ6cnpws_9nm-NpQDxnAK8FiTTRwIvrhmiC2b5T9elNdr2x0M19rgSMP0CT-dI2v9kmX6c',
  },
  request: {
    apiBaseUrl: 'api/',
    urlOverrides: [
      // { match: './assets/', replace: './assets2/' }
    ],
    httpHeaders: [
      // { header: 'X-Test', value: 'FARK_FARK_FARK'}
    ],
  },
  logger: {
    level: NgxLoggerLevel.ERROR,
  },
  storage: {
    name: 'Fg-Localforage-IndexDB',
    driver: localforage.WEBSQL,
    storeName: 'FgBaseApp',
  },
  i18n: {
    assetPath: './i18n/icons/',
    scopes: {
      keepCasing: undefined,
    },
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
      aot: true,
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
  },
};
