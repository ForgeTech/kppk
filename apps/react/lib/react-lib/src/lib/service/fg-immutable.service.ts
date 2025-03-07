import { Injectable, InjectionToken, inject } from '@angular/core';
import {
  enableMapSet,
  enablePatches,
  freeze,
  Immer,
} from 'immer';
import { NGXLogger } from 'ngx-logger';
import { FgBaseService, FgEventService } from '@kppk/fg-lib-new';

/**
 * FgImmutableConfig -
 * Provides configuration for immuatable service -
 * basic implementation contains immerjs plugin
 * configuration values, but can be extended
 */
export interface FgImmutableConfig {
  enableMapSet: boolean;
  enablePatches: boolean;
  [other: string]: unknown;
}

/** Provide configuration for immerJs Plugins */
export const FG_IMMUTABLE_CONFIG = new InjectionToken<any>('');

/**
 * FgImmutableService -
 * Provides the immerjs object mutation library for use in your applicaiton with
 * MapSet and Patches support (but not ES5) and other
 * helper methodes for cloning objects and simila from
 * packages like low-dash
 */
@Injectable({
  providedIn: 'root',
})
export class FgImmutableService extends FgBaseService {
  protected CONFIG = inject<FgImmutableConfig>(FG_IMMUTABLE_CONFIG, { optional: true });

  /** Stores immer's freeze methode */
  protected freezeMeth = freeze;
  /** Instance of immer configured to autofreeze objects produced */
  public produce;
  /** Instance of immer configured to not freeze objects produced */
  public produceNoFreeze;
  /** Merges and deep-clones passed object */
  // public clone<T>(target: T, freeze: boolean = true): T {
  //   if (freeze) {
  //     return this.freezeMeth(cloneDeep(target)) as T;
  //   }
  //   return cloneDeep(target) as T;
  // }
  // // Merges and deep-clones passed object
  // public merge<T, I>(target: T, source: I, freeze: boolean = true): T & I {
  //   if (freeze) {
  //     return this.freezeMeth(cloneDeep(merge(target, source)) as T & I);
  //   }
  //   return cloneDeep(merge(target, source)) as T & I;
  // }
  // CONSTRUCTOR
  constructor() {
    super();
    const CONFIG = this.CONFIG;

    if (CONFIG === null) {
      /** Enable all immer plugins */
      enableMapSet();
      enablePatches();
    } else {
      if (CONFIG.enableMapSet) {
        enableMapSet();
      }
      if (CONFIG.enablePatches) {
        enablePatches();
      }
    }
    /** Instance of immer configured to freeze objects produced */
    this.produce = new Immer({
      autoFreeze: true,
    }).produce;
    /** Instance of immer configured to not freeze objects produced */
    this.produceNoFreeze = new Immer({
      autoFreeze: false,
    }).produce;
  }
}
