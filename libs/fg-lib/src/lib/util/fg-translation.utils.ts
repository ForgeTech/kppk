/**
 * Marker function used to mark translation-keys in code
 * @param str
 */
export function translation_key(str: string) {
  return str;
}

/**
 * Returns the language code name from the browser, e.g. "de"
 * CAUTION! Methode based on the verion provided by ngx-translate-package service
 * ( See: https://github.com/ngx-translate/core/blob/master/projects/ngx-translate/core/src/lib/translate.service.ts)
 */
// export function getBrowserLang(): string | undefined{
//     if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
//       return undefined;
//     }

//     let browserLang: any = window.navigator.languages ? window.navigator.languages[0] : null;
//     browserLang = browserLang || window.navigator.language || window.navigator[ 'browserLanguage' ] || window.navigator [ 'userLanguage' ];

//     if (typeof browserLang === 'undefined') {
//       return undefined
//     }

//     if (browserLang.indexOf('-') !== -1) {
//       browserLang = browserLang.split('-')[0];
//     }

//     if (browserLang.indexOf('_') !== -1) {
//       browserLang = browserLang.split('_')[0];
//     }

//     return browserLang;
//   }
