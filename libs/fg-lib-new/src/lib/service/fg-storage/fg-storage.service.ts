import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * FgStorageService -
 * Purpose of this service ist to wrap and provide a storage library to the application
 * that can be later switched out by angulars dependency injection-system
 */
@Injectable({
  providedIn: 'root',
})
export abstract class FgStorageService {
  /** Methode to store the item passed under provided key into storage */
  public abstract setItem<T>(
    key: string,
    value: unknown,
    ...args: any[]
  ): Observable<T | false>;
  /** Methode to return the item with passed key from storage */
  public abstract getItem<T>(
    key: string,
    ...args: any[]
  ): Observable<T | false>;
  /** Methode to remove item with passed key from storage */
  public abstract removeItem(key: string, ...args: any[]): Observable<boolean>;
  /** Methode to clear the storage of all data, or if
   * pass storage key - only deletes the defined storage
   */
  public abstract clear(...args: any[]): Observable<boolean>;
  /** Methode to create a seperate storage instance - if seperate storage instances are supported */
  public abstract addStorage(...args: any[]): Observable<boolean>;
}
