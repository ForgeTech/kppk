import { DOCUMENT } from '@angular/common';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { FgBaseService } from '../../base';

/**
 * Token to provide 'WebAPI Crypto' in none browser environments
 * For example for unit-test import NODEJS implementation
 * `import * as crypto from "crypto";`
 * and then provide in angular TestBed like
 * `TestBed.configureTestingModule({
      providers: [
        { provide: CRYPTO, useValue: crypto }
      ]
    });`
 */
export const CRYPTO = new InjectionToken<Crypto>('');

/**
 * FgWebcryptoService -
 * Provides WebAPI Crypto by accessing native browser-window
 */
@Injectable({
  providedIn: 'root'
})
export class FgWebcryptoService extends FgBaseService {
  protected $document = inject(DOCUMENT);
  protected $crypto = inject(CRYPTO, {optional: true});
  public crypto!: Crypto;
  constructor() {
    super();
    const ERROR_NO_WEB_API_CRYPTO_PROVIDER = `ERROR: FgWebcryptoService: Provide 'WebAPI Crypto' implementation using 'CRYPTO' InjectionToken for none browser environments!`;
    const WARNING_NATIVE_WEB_API_CRYPTO_OVERWRITTEN = `Warning: Native 'WebAPI Crypto' implementation available, but has been overwritten using 'CRYPTO' InjectionToken!`;
    // Check for 'subtle' because angular ssr/testing implementation of
    // 'DOCUMENT' provides {} for 'crypto'
    if( this.$document.defaultView?.crypto?.subtle && !this.$crypto ) {
      this.crypto = this.$document.defaultView.crypto;
    }
    else if( this.$crypto ) {
      this.crypto = this.$crypto;
      if(this.$document.defaultView?.crypto?.subtle) {
        console.warn(WARNING_NATIVE_WEB_API_CRYPTO_OVERWRITTEN);
      }
    } else {
      throw(new Error(ERROR_NO_WEB_API_CRYPTO_PROVIDER));
    }
  }

}
