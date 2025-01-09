import { Injectable, Inject, Optional } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FgGlobalService } from '../../module/fg-global/fg-global.service';
import { FgEventService } from '../fg-event/fg-event.service';
import { NGXLogger } from 'ngx-logger';
import { FgBaseService } from '../../base';
/**
 * FgLazyloadService -
 * Service for lazy loading 3rdParty Javascript-Libraries
 */
@Injectable({ providedIn: 'root' })
export class FgLazyloadService extends FgBaseService {
  /** Holds an object containing key-value pairs of { libraryPath: LibraryObservable } */
  protected _LOADED_LIBS: { [url: string]: BehaviorSubject<any> } = {};
  /** Streams updated list of loaded libraries */
  protected _LOADED_LIBS$: Subject<{ [url: string]: BehaviorSubject<object> }> = new BehaviorSubject({});
  /** Provide access to observable containing references to all loaded-libraries observables */
  get loadedLibs(): Observable<{ [url: string]: BehaviorSubject<any> }> {
    return this._LOADED_LIBS$.asObservable();
  }
  /** CONSTRUCTOR */
  constructor(
    /** Provide global object service */
    public $global: FgGlobalService,
    /** Provide browser document instance */
    @Inject(DOCUMENT) protected document: any,
  ) {
    super()
  }
  /**
   * Methode loads 3rd-party javascript-library and
   * @param url
   */
  public load<T>(url: string, globalScopeRefName: string): Observable<T> {
    if (this.$global.isBrowser) {
      /** Return if script from passed url was already loaded */
      if (this._LOADED_LIBS[url]) {
        return this._LOADED_LIBS[url];
      } else {
      /** initialize _loadedLibraries url-entry if it doesn't exist */
        this._LOADED_LIBS[url] = new BehaviorSubject(false);
        this._LOADED_LIBS$.next(this._LOADED_LIBS);
      }
      // Try to set modernizr from global-scope, to get the reference
      // if the script was already loaded outside angular-context
      // ( for example - in the browser - by a script tag in index.html )
      if (this.$global.nativeGlobal<Window>()[globalScopeRefName as any]) {
        if (this.$global.nativeGlobal<Window>()[globalScopeRefName as any]) {
          this._LOADED_LIBS[url].next(this.$global.nativeGlobal<Window>()[globalScopeRefName as any]);
        }
      }
      // If library couldn't be found on global-scope, load library by attaching a script-tag
      // to document, containing
      else {
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = () => {
          this._LOADED_LIBS[url].next(this.$global.nativeGlobal<Window>()[globalScopeRefName as any]);
        };
        script.onerror = (error: Error) => {
          this.$log.error('FgLazyloadService: ERROR loading script: ', url);
          this.$log.error(error);
        };
        this.document.body.appendChild(script);
      }
    }
    // Return Subject dispatching loaded library as Observable()
    return this._LOADED_LIBS[url].asObservable();
  }
}
