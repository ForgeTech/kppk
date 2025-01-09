import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import {
  enableMapSet,
  enablePatches,
  freeze,
  Immer,
} from 'immer';
import { merge, cloneDeep } from 'lodash-es';
import { FgBaseService } from '@forgetech/fg-lib';

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
export const FG_IMMUTABLE_CONFIG = new InjectionToken<FgImmutableConfig>('');

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
  /** Stores immer's freeze methode */
  protected freezeMeth = freeze;
  /** Instance of immer configured to autofreeze objects produced */
  public produce;
  /** Instance of immer configured to not freeze objects produced */
  public produceNoFreeze;
  /** Merges and deep-clones passed object */
  public clone<T>(target: T, freeze: boolean = true): T {
    if (freeze) {
      return this.freezeMeth(cloneDeep(target)) as T;
    }
    return cloneDeep(target) as T;
  }
  // Merges and deep-clones passed object
  public merge<T, I>(target: T, source: I, freeze: boolean = true): T & I {
    if (freeze) {
      return this.freezeMeth(cloneDeep(merge(target, source)) as T & I);
    }
    return cloneDeep(merge(target, source)) as T & I;
  }
  // CONSTRUCTOR
  constructor(
    // (OPTIONAL) Provide configuration token for immutable-service 
    @Optional()
    @Inject(FG_IMMUTABLE_CONFIG)
    protected CONFIG: FgImmutableConfig,
  ) {
    super();
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
