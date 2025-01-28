import { Injectable, InjectionToken, inject } from '@angular/core';
import { FgBaseService } from '@kppk/fg-lib-new';
import { createBrowserInspector } from '@statelyai/inspect';
import {
  setup,
  assign,
  emit,
  fromPromise,
  fromObservable,
  createActor,
  raise,
  sendTo,
  sendParent,
  fromEventObservable,
  fromCallback,
} from 'xstate';
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
  iframe?: null;
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
  protected CONFIG = inject<FgXstateInspectorConfig>(
    FG_XSTATE_INSPECTOR_CONFIG,
    { optional: true }
  );
  protected DEFAULT_CONFIG: FgXstateInspectorConfig = {
    // Set to false because this should be started after
    // angular is already stable - otherwise the inspection
    // tab doesn't seem to connect and automatically open
    autoStart: false,
  };
  public readonly inspector;
  public readonly inspect;

  public assign = assign;
  public createActor = createActor;
  public createBrowserInspector = createBrowserInspector;
  public emit = emit;
  public fromCallback = fromCallback;
  public fromEventObservable = fromEventObservable;
  public fromObservable = fromObservable;
  public fromPromise = fromPromise;
  public raise = raise;
  public sendParent = sendParent;
  public sendTo = sendTo;
  public setup = setup;

  // CONSTRUCTOR
  constructor() {
    super();
    if (this.CONFIG) {
      Object.assign(this.DEFAULT_CONFIG, this.CONFIG);
    }
    this.inspector = createBrowserInspector(this.DEFAULT_CONFIG);
    this.inspect = this.inspector.inspect;
  }
  /**
   * Methode to start and connect to
   * the xstate inspection service
   */
  public start() {
    this.inspector.start();
  }
  /**
   * Methode to stop and disconnect to
   * the xstate inspection service
   */
  public stop() {
    this.inspector.stop();
  }
}
