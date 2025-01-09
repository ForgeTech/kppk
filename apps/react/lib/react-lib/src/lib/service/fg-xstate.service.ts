import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { FgBaseService } from '@kppk/fg-lib';
import { createBrowserInspector } from '@statelyai/inspect';

/**
 * FgXstateInspectorConfig -
 * Provides configuration for xstate inspector service
 * READ: Section inspector options https://stately.ai/docs/inspector
 */
export interface FgXstateInspectorConfig {
    // a function that takes an inspection event and returns true if the event should be sent to the Stately Inspector.
    filter?: undefined;
    // a function that takes an inspection event and allows you to serialize it before sending it to the Stately Inspector.
    serialize?: undefined;
    // whether to automatically start the inspector. Defaults to true.
    // If autoStart: false, you can start the inspector by calling inspector.start().
    autoStart?: boolean;
    // the URL of the Stately Inspector to open. Defaults to https://stately.ai/inspector.
    url?: string;
    // the <iframe> element to use for the inspector. Defaults to null.
    iframe?: null
}

/** Provide configuration for immerJs Plugins */
export const FG_XSTATE_INSPECTOR_CONFIG = new InjectionToken<any>('');

/**
 * FgXstateService -
 * Provides the immerjs object mutation library for use in your applicaiton with
 * MapSet and Patches support (but not ES5) and other
 * helper methodes for cloning objects and simila from
 * packages like low-dash
 */
@Injectable({
  providedIn: 'root',
})
export class FgXstateService extends FgBaseService {
  protected DEFAULT_CONFIG: FgXstateInspectorConfig = {
    // Set to false because this should be started after
    // angular is already stable - otherwise the inspection
    // tab doesn't seem to connect and automatically open
    autoStart: false,
  }
  // Holds the xstate inspector
  protected inspector;
  // Holds the xstate inspector
  public inspect;
  // CONSTRUCTOR
  constructor(
    // (OPTIONAL) Provide configuration token for inspection-service 
    @Optional()
    @Inject(FG_XSTATE_INSPECTOR_CONFIG)
    protected CONFIG: FgXstateInspectorConfig,
  ) {
    super();
    if (CONFIG === null) {
        this.inspector = createBrowserInspector(this.DEFAULT_CONFIG);
        this.inspect = this.inspector.inspect;
    } else {
        let config = {};
        Object.assign(config, this.DEFAULT_CONFIG);
        Object.assign(config, CONFIG);
        this.inspector = createBrowserInspector(this.DEFAULT_CONFIG);
        this.inspect = this.inspector.inspect;
    };
  }

  public start() {
    this.inspector.start();
  }
  public stop() {
    this.inspector.stop();
  }
}
