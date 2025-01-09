import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as LocalForage from 'localforage';
import { FgStorageService } from './fg-storage.service';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

/**
 * Injection-Token used to overwrite/extend FgStorageNgxCookieService
 * default configuration
 */
export const FG_LOCALFORAGE_STORAGE_SERVICE_OPTIONS =
  new InjectionToken<LocalForageOptions>('');
/** Key holding FgStorageLocalforageService storage configuration */
export const FG_LOCALFORAGE_STORAGE_MAP_KEY = 'FG_LOCALFORAGE_STORAGE_MAP';
/** Interface for storage options map available on localforage storage service  */
export interface FgStorageLocalforageServiceStorageMapInterface {
  [name: string]: LocalForageOptions;
}
/** Interface for storage map available on localforage storage service*/
export interface FgStorageLocalforageServiceInstanceMapInterface {
  [name: string]: LocalForage;
}
/**
 * FgStorageLocalforageService -
 * Implementation of abstract FgStorageService based on LocalForage
 * 3rdParty-Library
 */
@Injectable({
  providedIn: 'root',
})
export class FgStorageLocalforageService extends FgStorageService {
  /**
   * Default values used for configuration of StorageService.
   * Can be overwritten/extended bei using FG_LOCALFORAGE_STORAGE_SERVIC_OPTIONS
   * Injection-Token
   */
  public OPTIONS: LocalForageOptions = {
    name: 'Fg-Localforage-Storage',
    description: 'A storage service implemeted using localforage package',
    // driver: LocalForage.LOCALSTORAGE,
    storeName: 'Localforage',
  };
  /**
   * Holds list of available cookie 'storages' -
   * meaning a map of storage-keys and a comma-separated
   * list of it's cookies are stored seperatly - so
   * only the list of a storages-cookies can be removed
   * using clear( storageKey ).
   */
  protected _STORAGE_MAP: FgStorageLocalforageServiceStorageMapInterface = {};
  /** GETTER for STORAGE_MAP */
  get storageMap(): FgStorageLocalforageServiceStorageMapInterface {
    return this._STORAGE_MAP;
  }
  /** Holds instance of Localforage storage-provider */
  protected _STORAGE: LocalForage;
  /** Holds instance of Localforage storage-provider */
  protected _STORAGE_INSTANCES_MAP: FgStorageLocalforageServiceInstanceMapInterface =
    {};
  /** GETTER for _STORAGE_INSTANCES_MAP */
  get storageInstanceMap(): FgStorageLocalforageServiceInstanceMapInterface {
    return this._STORAGE_INSTANCES_MAP;
  }

  /** CONSTRUCTOR */
  constructor(
    /** Provides reference to ngx-cookie service */
    @Optional() protected $log: NGXLogger,
    /** Optional Injection-Token to overwrite/extend ngx-cookie default options */
    @Optional()
    @Inject(FG_LOCALFORAGE_STORAGE_SERVICE_OPTIONS)
    protected FgLocalforageStorageOptions: LocalForageOptions
  ) {
    super();
    // Use optional value from FG_STORAGE_NGXCOOKIE_SERVIC_OPTIONS injection-token
    if (this.FgLocalforageStorageOptions) {
      this.OPTIONS = Object.assign(
        this.OPTIONS,
        this.FgLocalforageStorageOptions
      );
    }
    this._STORAGE = LocalForage.createInstance(this.OPTIONS);
  }
  protected getStorageInstance(storageKey?: string): Observable<LocalForage> {
    const keyToApply: string = storageKey ? storageKey : '';
    const instanceToReturn$: Observable<LocalForage> = of(
      keyToApply ? this._STORAGE : this._STORAGE_INSTANCES_MAP[keyToApply]
    ).pipe(
      switchMap((instanceToReturn) => {
        return instanceToReturn
          ? of(instanceToReturn)
          : this.addToStorageMap(keyToApply).pipe(
              tap((success) => {
                if (success === false)
                  this.$log?.debug(
                    `DEBUG: FgStorageLocalforageService: Receiving storage-instance
                       for storageKey: ${storageKey} did fail - instead default
                       storage-instace is used!;
                      `
                  );
              }),
              map((success) =>
                success
                  ? this._STORAGE_INSTANCES_MAP[keyToApply]
                  : this._STORAGE
              )
            );
      })
    );
    return instanceToReturn$;
  }
  protected mergeOptions(
    storageKey: string,
    options?: LocalForageOptions
  ): LocalForageOptions {
    let optionsToApply = Object.assign({}, this.OPTIONS);
    optionsToApply = Object.assign(optionsToApply, options);
    optionsToApply.storeName = storageKey;
    return optionsToApply as LocalForageOptions;
  }
  /**
   * Adds a storage-instance and options to according storage-maps
   */
  protected addToStorageMap(
    storageKey: string,
    options?: LocalForageOptions
  ): Observable<boolean> {
    return of({ storageKey, options }).pipe(
      switchMap((values) => {
        const { storageKey, options } = values;
        // if instance for given name already exists do nothing
        if (Object.keys(this._STORAGE_MAP).indexOf(storageKey) === -1) {
          const optionsToApply = this.mergeOptions(storageKey, options);
          this._STORAGE_MAP[storageKey] = optionsToApply;
          this._STORAGE_INSTANCES_MAP[storageKey] =
            LocalForage.createInstance(optionsToApply);
        }
        return this.setItem(
          FG_LOCALFORAGE_STORAGE_MAP_KEY,
          this._STORAGE_MAP
        ).pipe(
          // If setItem fails it returns 'false' to forward otherwise map to 'true'
          map((value) => (value === false ? value : true))
        );
      }),
      catchError((error) => {
        this.$log?.error(
          `ERROR: FgStorageLocalforageService: Creating storage-instance for 
            storageKey ${storageKey} failed with error ${error}
          `
        );
        return of(false);
      })
    );
  }
  /**
   * Removes storage-instance and options to according storage-maps
   * @param storageKey
   * @param key
   */
  protected removeFromStorageMap(storageKey: string) {
    delete this._STORAGE_MAP[storageKey];
    delete this._STORAGE_INSTANCES_MAP[storageKey];
    this.setItem<any>(FG_LOCALFORAGE_STORAGE_MAP_KEY, this._STORAGE_MAP);
  }
  /** Methode to store the item passed under provided key into storage */
  public setItem<T>(
    key: string,
    value: any,
    options?: LocalForageOptions,
    storageKey?: string
  ): Observable<T | false>;
  public setItem(
    key: string,
    value: any,
    options?: LocalForageOptions,
    storageKey?: string
  ): Observable<any | false> {
    storageKey = storageKey ? storageKey : '';
    // return from( this.getStorageInstance( storageKey ).setItem( key, value ) );
    return this.getStorageInstance(storageKey).pipe(
      switchMap((storage) => {
        return from(storage.setItem(key, value)).pipe(
          catchError((error) => {
            // LOG ERROR
            return of(false);
          })
        );
      })
    );
  }
  /** Methode to return from(the item with passed key from storage) */
  public getItem<T>(key: string, storageKey?: string): Observable<T | false>;
  public getItem(key: string, storageKey?: string): Observable<any | false> {
    return this.getStorageInstance(storageKey).pipe(
      switchMap((storage) => {
        return from(storage.getItem(key)).pipe(
          catchError((error) => {
            // LOG ERROR
            return of(false);
          })
        );
      })
    );
  }
  /** Methode to clear the storage of all data, or if
   * pass storage key - only deletes the defined storage
   */
  public clear(storageKey?: string): Observable<boolean> {
    return this.getStorageInstance(storageKey).pipe(
      switchMap((storage) => {
        return from(storage.clear()).pipe(
          map((ignore) => true),
          catchError((error) => {
            // LOG ERROR
            return of(false);
          })
        );
      })
    );
  }
  /** Methode to clear the storage of all data */
  public removeItem(key: string, storageKey: string = ''): Observable<boolean> {
    return this.getStorageInstance(storageKey).pipe(
      switchMap((storage) => {
        return from(storage.removeItem(key));
      }),
      map((ignore) => true),
      catchError((error) => {
        // LOG ERROR
        return of(false);
      })
    );
  }
  /** Methode to create and configure a new storage-instance */
  public addStorage(
    storageKey: string,
    options?: LocalForageOptions
  ): Observable<boolean> {
    return this.addToStorageMap(storageKey, options);
  }
}
