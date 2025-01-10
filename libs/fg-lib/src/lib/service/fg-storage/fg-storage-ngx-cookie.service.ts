import { Injectable, InjectionToken, inject } from '@angular/core';
import { FgStorageService } from './fg-storage.service';
import { Observable, of } from 'rxjs';
import { CookieService, CookieOptions } from 'ngx-cookie';
import { NGXLogger } from 'ngx-logger';

/**
 * Injection-Token used to overwrite/extend FgStorageNgxCookieService
 * default configuration
 */
export const FG_NGXCOOKIE_STORAGE_SERVICE_OPTIONS = new InjectionToken<CookieOptions>('FgNgxCookieStorageServiceOptions');
/**
 * Key holding FgStorageNgxCookieService storage configuration
 */
export const FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY = 'FG_NGXCOOKIE_STORAGE_MAP';
/** Interface for storage map available on cookie storage service */
export interface FgStorageNgxCookieServiceStorageMapInterface {
  [name: string]: string[];
}
/**
 * FgStorageNgxCookieService -
 * Implementation of abstract FgStorageService based on ngx-cookie
 * Read https://github.com/salemdar/ngx-cookie#readme for further
 * instructions
 */
@Injectable({
  providedIn: 'root',
})
export class FgStorageNgxCookieService extends FgStorageService {
  protected $cookie = inject(CookieService);
  protected $log = inject(NGXLogger, { optional: true });
  protected FgStorageNgxCookieServiceOptions = inject<CookieOptions>(FG_NGXCOOKIE_STORAGE_SERVICE_OPTIONS, { optional: true });

  /**
   * Default values used for configuration of StorageService.
   * Can be overwritten/extended bei using FG_NGXCOOKIE_STORAGE_SERVICE_OPTIONS
   * Injection-Token and by using options-parameter of setItem-methode
   */
  protected OPTIONS: CookieOptions = {
    path: '/',
    secure: false,
    httpOnly: false,
    // domain: '',
    // expires: '',
    storeUnencoded: false,
  };
  /** GETTER for OPTIONS */
  get options(): CookieOptions {
    return this.OPTIONS;
  }
  /**
   * Holds list of available cookie 'storages' -
   * meaning a map of storage-keys and a comma-separated
   * list of it's cookies are stored seperatly - so
   * only the list of a storages-cookies can be removed
   * using clear( storageKey ).
   */
  protected STORAGE_MAP: FgStorageNgxCookieServiceStorageMapInterface = {};
  /** GETTER fro STORAGE_MAP */
  get storageMap(): FgStorageNgxCookieServiceStorageMapInterface {
    return this.STORAGE_MAP;
  }
  /** CONSTRUCTOR */
  constructor() {
    super();
    // Use optional value from FG_STORAGE_NGXCOOKIE_SERVIC_OPTIONS injection-token
    if (this.FgStorageNgxCookieServiceOptions) {
      this.OPTIONS = Object.assign(this.OPTIONS, this.FgStorageNgxCookieServiceOptions);
    }
    this.getItem(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY).subscribe(value => {
      if (value) {
        this.STORAGE_MAP = value as FgStorageNgxCookieServiceStorageMapInterface;
      }
    });
  }
  protected mergeOptions(customoptions?: CookieOptions): CookieOptions {
    const mergedOptions = Object.assign({}, this.OPTIONS);
    if (customoptions) {
      Object.assign(mergedOptions, customoptions);
    }
    return mergedOptions;
  }
  /** Create the key used for a value stored in a 'storage' */
  protected getStorageKey(key: string, storageKey?: string): string {
    return storageKey ? storageKey.concat('-', key) : key;
  }
  /**
   * Adds a storage and/or a key to a storage-map
   * @param storageKey
   * @param key
   */
  protected addToStorageMap(key: string, storageKey: string) {
    if (storageKey) {
      if (Object.keys(this.STORAGE_MAP).indexOf(storageKey) === -1) {
        this.STORAGE_MAP[storageKey] = [];
        key ? this.STORAGE_MAP[storageKey].push(key) : null;
      } else {
        if (this.STORAGE_MAP[storageKey].indexOf(key) === -1) {
          key ? this.STORAGE_MAP[storageKey].push(key) : null;
        }
      }
    }
    this.setItem(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY, this.STORAGE_MAP);
  }
  /**
   * Removes a storage and/or a key from storage-map
   * @param storageKey
   * @param key
   */
  protected removeFromStorageMap(key: string, storageKey: string) {
    if (Object.keys(this.STORAGE_MAP).indexOf(storageKey) !== -1) {
      const keyIndex = this.STORAGE_MAP[storageKey].indexOf(key);
      if (keyIndex > -1) {
        this.STORAGE_MAP[storageKey].splice(keyIndex, 1);
        // this.STORAGE_MAP[ storageKey ] = result;
        if (this.STORAGE_MAP[storageKey].length === 0) {
          delete this.STORAGE_MAP[storageKey];
        }
      }
      this.setItem(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY, this.STORAGE_MAP);
    }
  }
  /**
   * Methode to store the item passed under provided key into storage
   * @param key
   * @param value
   * @param storageKey
   * @param options
   * @returns
   */
  public setItem<T>(key: string, value: string | object, options?: CookieOptions, storageKey?: string): Observable<T | false>;
  public setItem(key: string, value: string | object, options?: CookieOptions, storageKey?: string): Observable<any | false> {
    storageKey = storageKey ? storageKey : '';
    const optionsToApply = this.mergeOptions(options);
    const keyToApply = this.getStorageKey(key, storageKey);
    try {
      if (typeof value === 'object') {
        this.$cookie.putObject(keyToApply, value, optionsToApply);
      } else {
        this.$cookie.put(keyToApply, value, optionsToApply);
      }
    } catch (error) {
      this.$log?.error(`ERROR: FgStorageNgxCookie: setItem-methode for key: ${key} failed with: ${error}!`);
      return of(false);
    }
    if (storageKey) {
      this.addToStorageMap(key, storageKey);
    }
    return of(value);
  }
  /** Methode to return from(the item with passed key from storage) */
  public getItem<T>(key: string, storageKey?: string): Observable<T | false>;
  public getItem(key: string, storageKey?: string): Observable<any | false> {
    try {
      const keyToApply = this.getStorageKey(key, storageKey);
      let cookie: string | object | undefined = this.$cookie.get(keyToApply);
      if (cookie && typeof cookie === 'string') {
        try {
          cookie = JSON.parse(cookie) as object;
        } catch (error) {
          this.$log?.debug(
            `DEBUG: FgStorageNgxCookie: JSON.parse failed for the cookie
             received for key: ${keyToApply}. Expected for string - otherwisenp
             check if malformed JSON!
            `
          );
        }
      } else if (cookie === undefined) {
        this.$log?.warn(
          `WARNING: FgStorageNgxCookie: getItem-methode for key: ${key} 
          didn't return a value!`
        );
        return of(false);
      }
      return of(cookie);
    } catch (error) {
      this.$log?.error(
        `ERROR: FgStorageNgxCookie: getItem-methode for key: ${key} 
        failed with: ${error}!`
      );
      return of(false);
    }
  }
  /**
   * Methode used internally to remove item from storage without updating
   * the storageMap property to being able to do that manually after
   * bulk removals
   */
  protected removeItemNoStorageMapupdate(key: string, storageKey?: string): Observable<boolean> {
    try {
      const keyToApply = this.getStorageKey(key, storageKey);
      this.$cookie.remove(keyToApply);
    } catch (error) {
      this.$log?.error(
        `ERROR: FgStorageNgxCookie: removeItem-methode for key: ${key} 
         failed with: ${error}!`
      );
      return of(false);
    }
    return of(true);
  }
  /** Methode to remove item from storage */
  public removeItem(key: string, storageKey: string = ''): Observable<boolean> {
    const result = this.removeItemNoStorageMapupdate(key, storageKey);
    if (storageKey) {
      this.removeFromStorageMap(key, storageKey);
    }
    return result;
  }
  /** Methode to clear the storage of all data, or if
   * pass storage key - only deletes the defined storage
   */
  public clear(storageKey?: string): Observable<boolean> {
    try {
      if (storageKey && this.STORAGE_MAP[storageKey]) {
        this.STORAGE_MAP[storageKey].forEach(key => {
          this.removeItemNoStorageMapupdate(key, storageKey);
        });
        delete this.STORAGE_MAP[storageKey];
        this.setItem(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY, this.STORAGE_MAP);
      } else {
        this.$cookie.removeAll();
        this.STORAGE_MAP = {};
        this.setItem(FG_NGXCOOKIE_STORAGE_STORAGE_MAP_KEY, this.STORAGE_MAP);
      }
    } catch (error) {
      this.$log?.error(
        `ERROR: FgStorageNgxCookie: clear-methode for storageKey: ${storageKey} 
          failed with: ${error}!`
      );
      return of(false);
    }
    return of(true);
  }
  /** Methode is implemented to satisfy fg-storage-service abstract-lass but isn't needed for
   * fg-storage-ngx-cookie service
   */
  public addStorage(storageKey: string, options?: CookieOptions): Observable<boolean> {
    this.$log?.debug(
      `DEBUG: FgStorageNgxCookie: addStorage-methode for storageKey: ${storageKey} 
       doesn't really do anything as it's not required to create storage-instances for 
       cookies and 'storage-setup' happens on the fly when value is set!`
    );
    return of(true);
  }
}
